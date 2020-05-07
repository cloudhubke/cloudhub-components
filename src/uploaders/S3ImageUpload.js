/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
import React from 'react';
import qs from 'qs';
import { Block, Text, toastr, IconButton, Dialog, Button } from '..';
import { DialogHeader, DialogContent, DialogActions } from '../dialog';
import { AddAPhotoSharp, Cancel } from '@material-ui/icons';
import AntProgress from '../ant/AntProgress';
import { colors, sizes, Images } from '../theme';
const S3Uploader = ({
  dirname,
  ACL,
  signaxiosinstance,
  uploadaxiosinstance,
  input: { onChange, value },
  signurl,
  deleteurl,
  limit,
  maxSize,
  accept,
  previewWidth,
  previewHeight,
  input: { name },
}) => {
  const [fileList, setfileList] = React.useState(value || []);
  const [confirmdelete, setconfirmdelete] = React.useState(false);
  const [deleting, setdeleting] = React.useState(null);

  React.useEffect(() => {
    if (deleting && confirmdelete) {
      signaxiosinstance()
        .post(deleteurl, { files: [deleting] })
        .then(({ data }) => {
          toastr.success(data.message);
          setfileList((files) => {
            if (files.length > 0) {
              const progressArray = files
                .map((obj) => {
                  if (obj.fd === deleting) {
                    return null;
                  }
                  return obj;
                })
                .filter(Boolean);
              return progressArray;
            }
          });
          setdeleting(null);
          setconfirmdelete(false);
        })
        .catch((error) => {
          const response = error.response || {};
          const data = response.data || {};
          toastr.error(data.message || data);
        });
    }
  }, [confirmdelete, deleting]);

  React.useEffect(() => {
    onChange(fileList);
  }, [fileList, onChange]);

  const onprogress = (progressEvent, url) => {
    setfileList((urls) => {
      if (urls.length > 0) {
        const progressArray = urls.map((obj) => {
          if (obj.signedUrl === url) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            return { ...obj, progress };
          }
          return obj;
        });
        return progressArray;
      }
      return urls;
    });
  };
  const onUploadFinish = (url) => {
    setfileList((urls) => {
      if (urls.length > 0) {
        const progressArray = urls.map((obj) => {
          if (obj.signedUrl === url) {
            const newobj = { ...obj, status: 'done' };
            delete newobj.signedUrl;
            delete newobj.progress;
            return { ...newobj };
          }
          return obj;
        });
        return progressArray;
      }
      return urls;
    });
  };
  const handleFiles = async (event) => {
    const { files } = event.target;
    if (limit && files.length + fileList.length > limit) {
      return toastr.error(`Only a maximum of ${limit} files allowed`);
    }
    if (maxSize && maxSize > 0) {
      const sizelimit = Number(maxSize * 1024 * 1024);
      const inds = [...(files || [])]
        .map((file, index) => (file.size > sizelimit ? index + 1 : null))
        .filter(Boolean);
      if (inds.length > 0) {
        return toastr.error(
          `File "${
            files[inds[0] - 1].name
          }" exceeds ${maxSize}MB. Please try again with a smaller file`
        );
      }
    }
    const fileArray = [...(files || [])].map((file) => ({
      name: file.name.replace(/[^\w\d_\-.]+/gi, ''),
      type: file.type,
      size: file.size,
    }));

    if (fileArray.length > 0) {
      const signedUrls = await getSignedUrl(fileArray).then((urls) => urls);
      const uploads = [...(files || [])].map(
        (file) =>
          signedUrls
            .map(({ signedUrl, filename }) => {
              if (filename === file.name.replace(/[^\w\d_\-.]+/gi, '')) {
                return {
                  signedUrl,
                  file,
                  options: {
                    headers: {
                      'Content-Type': qs.parse(signedUrl)['Content-Type'],
                      Expires: qs.parse(signedUrl).Expires,
                      'x-amz-acl':
                        qs.parse(signedUrl)['x-amz-acl'] || 'public-read',
                    },
                    onUploadProgress: (progressEvent) => {
                      onprogress(progressEvent, signedUrl);
                    },
                  },
                };
              }
              return null;
            })
            .filter(Boolean)[0]
      );
      uploads.map(({ signedUrl, file, options }) =>
        uploadaxiosinstance
          .put(signedUrl, file, options)
          .then(() => {
            onUploadFinish(signedUrl);
            toastr.success('One file uploaded successfully');
          })
          .catch((error) => {
            onUploadError(signedUrl);
            toastr.error(
              `${
                error.response
                  ? error.response.data
                  : 'File upload failed, try again later'
              }`
            );
          })
      );
    }
  };

  const onUploadError = (url) => {
    setfileList((files) => {
      if (files.length > 0) {
        const progressArray = files
          .map((obj) => {
            if (obj.signedUrl === url) {
              toastr.error(
                `File ${
                  obj.filename || obj.name
                } upload failed. please try again later`
              );
              return null;
            }
            return obj;
          })
          .filter(Boolean);

        return progressArray;
      }
      return files;
    });
  };

  const onDelete = (fd) => {
    setdeleting(fd);
  };

  const getSignedUrl = async (files) => {
    const urls = await signaxiosinstance()
      .post(signurl, {
        files,
        ACL: ACL || 'public-read',
        dirname: dirname || 'images/',
      })
      .then(({ data }) => {
        const signedUrls = data.signedUrls.map((obj) => ({
          ...obj,
          progress: 0,
        }));
        setfileList((files) => [...files, ...signedUrls]);
        return signedUrls;
      })
      .catch(() => {
        toastr.error(
          'There was an error uploading file. Please try again later'
        );
      });
    return urls;
  };
  return (
    <Block paper padding={20}>
      <input
        type="file"
        id={`fileElem${name}`}
        multiple={limit && limit > 1}
        accept={accept || 'image/*'}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(1px, 1px, 1px, 1px)',
        }}
        onChange={handleFiles}
      />
      <label htmlFor={`fileElem${name}`} style={{ cursor: 'pointer' }}>
        <Block middle center>
          <AddAPhotoSharp />
          <Text caption>upload</Text>
        </Block>
      </label>
      <Block row wrap>
        {fileList.map(({ Location, fd, uid, filename, progress, status }) => (
          <Block
            middle
            bottom={status === 'done'}
            center={status !== 'done'}
            flex={false}
            style={{
              backgroundImage: `url(${
                status === 'done' ? Location : Images.logo
              })`,
              backgroundSize: 'cover',
              width: previewWidth || 100,
              height: previewHeight || 100,
            }}
            padding={sizes.padding}
          >
            {status === 'done' ? (
              <React.Fragment>
                <Cancel
                  onClick={() => onDelete(fd)}
                  style={{
                    color: colors.danger,
                    marginLeft: 'auto',
                    marginBottom: 'auto',
                    cursor: 'pointer',
                  }}
                />
                <Text caption style={{ backgroundColor: colors.milkyWhite }}>
                  {filename}
                </Text>
              </React.Fragment>
            ) : (
              <AntProgress
                type="circle"
                percent={progress}
                width={60}
                strokeColor={colors.success}
              />
            )}
          </Block>
        ))}
      </Block>
      <Dialog
        maxWidth="sm"
        open={deleting !== null}
        onClose={() => setdeleting(null)}
        onConfirm={() => setconfirmdelete(true)}
        minHeight={200}
      >
        <DialogHeader onClose={() => setdeleting(null)} />
        <DialogContent>
          <Text>Sure you want to remove video?</Text>
        </DialogContent>
        <DialogActions>
          <Button
            contained
            color={colors.error}
            onClick={() => {
              setdeleting(null);
            }}
          >
            Cancel
          </Button>
          <Button
            contained
            color={colors.success}
            onClick={() => {
              setconfirmdelete(true);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Block>
  );
};

S3Uploader.defaultProps = {
  onChange: () => {},
};
export default S3Uploader;

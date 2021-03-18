/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
import React from 'react';
import qs from 'qs';
import uniq from 'uid';
import { Block, Text, toastr, IconButton, Dialog, Button } from '..';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import isEqual from 'lodash/isEqual';
import { AttachFile, Attachment, Close } from '@material-ui/icons';
import { DialogHeader, DialogContent, DialogActions } from '../dialog';
import ThemeContext from '../theme/ThemeContext';

const S3Uploader = ({
  dirname,
  ACL,
  signaxiosinstance,
  uploadaxiosinstance,
  input,
  value,
  onChange,
  signurl,
  deleteurl,
  limit,
  maxSize,
  accept,
  setuploading,
  disabled,
  readOnly,
}) => {
  const incominginput = input.value || value;
  const { colors } = React.useContext(ThemeContext);
  const [fileList, setfileList] = React.useState(
    Array.isArray(incominginput) ? incominginput : []
  );
  const [confirmdelete, setconfirmdelete] = React.useState(false);
  const [deleting, setdeleting] = React.useState(null);

  const elemId = uniq(5);

  React.useEffect(() => {
    if (Array.isArray(incominginput) && !isEqual(incominginput, fileList)) {
      setfileList(incominginput);
    }
  }, [incominginput]);

  const logChange = (fileUpdate) => {
    if (typeof input.onChange === 'function') {
      input.onChange(fileUpdate || []);
    }
    if (typeof onChange === 'function') {
      onChange(fileUpdate || []);
    }
  };

  React.useEffect(() => {
    if (Array.isArray(fileList)) {
      const uploading = fileList.filter(Boolean).map(({ status }) => {
        if (status === 'done') return 'done';
        return 'uploading';
      });
      if (uploading.indexOf('uploading') !== -1) {
        setuploading(true);
        logChange(fileList);
      } else {
        setuploading(false);
        logChange(fileList);
      }
    }
  }, [fileList]);

  React.useEffect(() => {
    if (deleting && confirmdelete) {
      signaxiosinstance()
        .post(deleteurl, { files: [deleting] })
        .then(({ data }) => {
          toastr.success(data.message);
          setfileList((files) => {
            if (files.length > 0) {
              const progressArray = files
                .filter(Boolean)
                .map((obj) => {
                  if ((obj || {}).fd === deleting) {
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

  const onprogress = (progressEvent, url) => {
    if (progressEvent && url) {
      setfileList((urls) => {
        if (urls.length > 0) {
          const progressArray = urls.map((obj) => {
            if (obj && obj.signedUrl === url) {
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
    }
  };

  const onUploadFinish = (url) => {
    if (url) {
      setfileList((urls) => {
        if (urls.length > 0) {
          const progressArray = urls.map((obj) => {
            if (obj && url === obj.signedUrl) {
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
    }
  };

  const onUploadError = (url) => {
    if (url) {
      setfileList((urls) => {
        if (urls.length > 0) {
          const progressArray = urls.map((obj) => {
            if (obj && url === obj.signedUrl) {
              toastr.error(
                `File ${
                  obj.filename || obj.name
                } upload failed. please try again later`
              );
              return null;
            }
            return obj;
          });
          return progressArray;
        }
        return urls;
      });
    }
  };

  const handleFiles = async (event) => {
    const { files } = event.target;
    if (
      limit &&
      Array.isArray(fileList) &&
      Array.isArray(files) &&
      files.length + fileList.length > limit
    ) {
      return toastr.error(`Only a maximum of ${limit} files allowed`);
    }
    if (maxSize && maxSize > 0) {
      const sizelimit = Number(maxSize * 1024 * 1024);
      const inds = [...(files || [])]
        .map((file, index) =>
          file && file.size > sizelimit ? index + 1 : null
        )
        .filter(Boolean);
      if (inds.length > 0) {
        return toastr.error(
          `File "${
            files[inds[0] - 1].name
          }" exceeds ${maxSize}MB. Please try again with a smaller file`
        );
      }
    }

    const fileArray = [...(files || [])].filter(Boolean).map((file) => ({
      name: file.name.replace(/[^\w\d_\-.]+/gi, ''),
      type: file.type,
      size: file.size,
    }));

    if (fileArray.length > 0) {
      const signedUrls = await getSignedUrl(fileArray).then((urls) => urls);
      signedUrls.filter(Boolean);
      const uploads = [...(files || [])].filter(Boolean).map(
        (file) =>
          signedUrls
            .filter(Boolean)
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

      for (const upload of uploads) {
        // eslint-disable-next-line no-await-in-loop
        await uploadaxiosinstance
          .put(upload.signedUrl, upload.file, upload.options)
          .then(() => {
            onUploadFinish(upload.signedUrl);
            toastr.success('Image uploaded successfully');
          })
          .catch((error) => {
            onUploadError(upload.signedUrl);
            toastr.error(
              `${
                error.response
                  ? error.response.data
                  : 'Image upload failed, try again later'
              }`
            );
          });
      }
    }
  };

  const onDelete = (fd) => {
    setdeleting(fd);
  };

  const getSignedUrl = async (files) => {
    const urls = await signaxiosinstance()
      .post(signurl, {
        files,
        ACL: ACL || 'public-read',
        dirname: dirname || 'files/',
      })
      .then(({ data }) => {
        if (data && Array.isArray(data.signedUrls)) {
          const signedUrls = data.signedUrls.map((obj) => ({
            ...obj,
            progress: 0,
          }));
          setfileList((files) => [...files, ...signedUrls]);
          return signedUrls;
        }
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
        id={`fileElem${elemId}`}
        multiple={limit && limit > 1}
        accept={accept}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(1px, 1px, 1px, 1px)',
        }}
        onChange={handleFiles}
        disabled={disabled || readOnly}
      />
      <label htmlFor={`fileElem${elemId}`} style={{ cursor: 'pointer' }}>
        <Block middle center>
          <AttachFile />
          <Text caption>upload</Text>
        </Block>
      </label>
      <List>
        {Array.isArray(fileList) &&
          fileList.filter(Boolean).map(({ fd, filename, progress, status }) => (
            <ListItem key={fd} dense divider>
              <ListItemIcon>
                <Attachment edge="start" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Text
                    subHeader
                    underline
                    style={{
                      marginRight: progress < 100 ? 75 : 25,
                      overflow: 'hidden',
                    }}
                  >
                    {filename}
                  </Text>
                }
              />
              <ListItemSecondaryAction>
                {progress < 100 && (
                  <Text small edge="end" style={{ backgroundColor: 'white' }}>
                    ...uploading <Text subHeader>{`${progress}%`}</Text>
                  </Text>
                )}
                {status === 'done' && (
                  <IconButton
                    edge="end"
                    onClick={() => {
                      if (!disabled && !readOnly) {
                        onDelete(fd);
                      }
                    }}
                    style={{ backgroundColor: 'white' }}
                  >
                    <Close />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
      <Dialog
        maxWidth="sm"
        open={deleting !== null}
        onClose={() => setdeleting(null)}
        // onConfirm={() => setconfirmdelete(true)}
        minHeight={200}
      >
        <DialogHeader onClose={() => setdeleting(null)} />
        <DialogContent>
          <Text>Sure you want to remove File?</Text>
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
  input: {
    value: null,
    onChange: () => {},
  },
  setuploading: () => {},
};
export default S3Uploader;

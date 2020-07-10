/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
import React from 'react';
import qs from 'qs';
import uniq from 'uid';
import { AddAPhotoSharp, Cancel } from '@material-ui/icons';
import { Block, Text, toastr, Dialog, Button, Form, Field, Input } from '..';
import { Tooltip } from '@material-ui/core';
import isEqual from 'lodash/isEqual';
import { DialogHeader, DialogContent, DialogActions } from '../dialog';
import AntProgress from '../ant/AntProgress';
import ThemeContext from '../theme/ThemeContext';
import useDebounce from '../customhooks/useDebounce';

const S3Uploader = ({
  dirname,
  ACL,
  signaxiosinstance,
  uploadaxiosinstance,
  value,
  input,
  onChange,
  signurl,
  deleteurl,
  limit,
  maxSize,
  accept,
  previewWidth,
  previewHeight,
  maxWidth,
  minWidth,
  aspectratio,
  tolerance,
  setuploading,
  readOnly,
  disabled,
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);

  const incominginput = input.value || value || [];

  const [fileList, setfileList] = React.useState(incominginput || []);
  const [confirmdelete, setconfirmdelete] = React.useState(false);
  const [deleting, setdeleting] = React.useState(null);
  const [uploaderror, setuploaderror] = React.useState(false);
  const [addinginfo, setaddinginfo] = React.useState(null);
  const [updating, setupdating] = React.useState(null);
  const [finished, setfinished] = React.useState([]);
  const [uploadError, setuploadError] = React.useState([]);

  const elemId = uniq(5);

  React.useEffect(() => {
    if (Array.isArray(incominginput) && !isEqual(incominginput, fileList)) {
      setfileList(incominginput);
    }
  }, [incominginput]);

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

  const logChange = () => {
    if (
      typeof input.onChange === 'function' &&
      !isEqual(fileList, incominginput)
    ) {
      input.onChange(fileList || []);
    }
    if (typeof onChange === 'function' && !isEqual(fileList, incominginput)) {
      onChange(fileList || []);
    }
  };

  React.useEffect(() => {
    if (Array.isArray(fileList)) {
      const uploading = fileList.map(({ status }) => {
        if (status === 'done') return 'done';
        return 'uploading';
      });
      if (uploading.indexOf('uploading') !== -1) {
        setuploading(true);
      } else {
        setuploading(false);
        logChange();
      }
    }
  }, [fileList]);

  const onprogress = (progressEvent, url) => {
    setupdating({ progressEvent, url });
  };

  const progressobj = useDebounce(updating, 200);

  React.useEffect(() => {
    if (progressobj) {
      setfileList((urls) => {
        if (urls.length > 0) {
          const progressArray = urls.map((obj) => {
            if (obj.signedUrl === progressobj.url) {
              const progress = Math.round(
                (progressobj.progressEvent.loaded * 100) /
                  progressobj.progressEvent.total
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
  }, [progressobj]);

  const onUploadFinish = (url) => {
    setfinished((finished) => [...(finished || []), url]);
  };

  const finishedArray = useDebounce(finished, 300);

  React.useEffect(() => {
    if (finishedArray) {
      setfileList((urls) => {
        if (urls.length > 0) {
          const progressArray = urls.map((obj) => {
            if (finishedArray.indexOf(obj.signedUrl) !== -1) {
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
  }, [finishedArray]);

  const onUploadError = (url) => {
    setuploadError((errors) => [...(errors || []), url]);
  };

  const errorArray = useDebounce(uploadError, 300);

  React.useEffect(() => {
    if (errorArray) {
      setfileList((urls) => {
        if (urls.length > 0) {
          const progressArray = urls.map((obj) => {
            if (errorArray.indexOf(obj.signedUrl) !== -1) {
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
  }, [errorArray]);

  const addImageInfo = (vals) => {
    const fileobj = { ...addinginfo, ...vals };
    setfileList((files) => {
      if (files.length > 0) {
        const progressArray = files.map((obj) => {
          if (obj.fd === fileobj.fd) {
            return fileobj;
          }
          return obj;
        });
        return progressArray;
      }
    });
    setaddinginfo(null);
  };

  const handleFiles = async (event) => {
    setuploaderror(false);
    const { files } = event.target;
    if (
      limit &&
      Array.isArray(fileList) &&
      Array.isArray(files) &&
      files.length + fileList.length > limit
    ) {
      return toastr.error(`Only a maximum of ${limit} files allowed`);
    }
    const fileArray = [];
    const filesArray = [];
    await [...(files || [])].map((file) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (minWidth && img.width < minWidth) {
          toastr.error(
            `Image ${file.name} has a width smaller than the required ${minWidth}px`
          );
          setuploaderror(true);
          return null;
        }
        if (
          aspectratio &&
          !tolerance &&
          (img.width / img.height).toFixed(2) !== aspectratio.toFixed(2)
        ) {
          toastr.error(
            `Image  ${file.name} aspect ratio is ${(
              img.width / img.height
            ).toFixed(2)} but must be ${aspectratio.toFixed(2)}`
          );
          setuploaderror(true);
          return null;
        }

        if (
          aspectratio &&
          tolerance &&
          Math.abs(img.width / img.height - aspectratio) > tolerance
        ) {
          toastr.error(
            `Image  ${file.name} aspect ratio is ${(
              img.width / img.height
            ).toFixed(2)} but must be ${aspectratio.toFixed(2)}`
          );
          setuploaderror(true);
          return null;
        }

        if (!uploaderror) {
          const elem = document.createElement('canvas');
          elem.width = maxWidth || img.width;
          elem.height = maxWidth
            ? Math.floor((maxWidth * img.height) / img.width)
            : img.height;
          const ctx = elem.getContext('2d');
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(
            img,
            0,
            0,
            maxWidth || img.width,
            maxWidth
              ? Math.floor((maxWidth * img.height) / img.width)
              : img.height
          );
          ctx.canvas.toBlob(
            (blob) => {
              const newfile = new File(
                [blob],
                file.name.replace(/[^\w\d_\-.]+/gi, ''),
                {
                  type: file.type,
                  lastModified: Date.now(),
                }
              );
              if (maxSize && maxSize > 0) {
                const sizelimit = Number(maxSize * 1024);
                if (file.size > sizelimit) {
                  toastr.error(
                    `Image "${file.name}" exceeds ${maxSize}KB. Please try again with a smaller file`
                  );
                  setuploaderror(true);
                  return null;
                }
              }
              filesArray.push(newfile);
              fileArray.push({
                name: file.name.replace(/[^\w\d_\-.]+/gi, ''),
                type: file.type,
                size: newfile.size,
                width: maxWidth || img.width,
                height: maxWidth
                  ? Math.floor((maxWidth * img.height) / img.width)
                  : img.height,
              });

              return newfile;
            },
            file.type,
            1
          );
        }
      };
      return null;
    });

    const fetchUrls = setInterval(async () => {
      if (uploaderror) {
        clearInterval(fetchUrls);
      }
      if (
        fileArray.length === files.length &&
        filesArray.length === files.length &&
        files.length > 0 &&
        !uploaderror
      ) {
        try {
          const signedUrls = await getSignedUrl(fileArray, true).then(
            (urls) => urls
          );
          const uploads = [...(filesArray || [])].map(
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
                toastr.success('Image uploaded successfully');
              })
              .catch((error) => {
                onUploadError(signedUrl);
                toastr.error(
                  `${
                    error.response
                      ? error.response.data
                      : 'Image upload failed, try again later'
                  }`
                );
              })
          );
          clearInterval(fetchUrls);
        } catch (error) {
          clearInterval(fetchUrls);
        }
      }
    }, 100);
  };

  const onDelete = (fd) => {
    setdeleting(fd);
  };

  const getSignedUrl = async (files) => {
    try {
      const { data } = await signaxiosinstance().post(signurl, {
        files,
        ACL: ACL || 'public-read',
        dirname: dirname || 'images/',
      });
      const signedUrls = data.signedUrls.map((obj) => ({
        ...obj,
        progress: 0,
      }));
      setfileList((files) => [...(files || []), ...signedUrls]);
      return signedUrls;
    } catch (error) {
      toastr.error('There was an error uploading file. Please try again later');
    }
  };

  return (
    <Block paper padding={20}>
      <input
        type="file"
        id={`fileElem${elemId}`}
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
        disabled={readOnly || disabled}
      />
      <label htmlFor={`fileElem${elemId}`} style={{ cursor: 'pointer' }}>
        <Block middle center>
          <AddAPhotoSharp />
          <Text caption>upload</Text>
        </Block>
      </label>
      <Block row wrap>
        {Array.isArray(fileList) &&
          fileList.map((file) => (
            <Block
              key={file.fd}
              middle
              bottom={file.status === 'done'}
              center={file.status !== 'done'}
              flex={false}
              style={{
                backgroundImage: `url(${
                  file.status === 'done' ? file.Location : ''
                })`,
                backgroundSize: 'cover',
                width: previewWidth || 150,
                height:
                  previewHeight || (file.width && file.height)
                    ? Math.floor((150 * file.height) / file.width)
                    : 150,
              }}
              padding={sizes.padding}
            >
              {file.status === 'done' ? (
                <React.Fragment>
                  <Cancel
                    onClick={() => {
                      if (!disabled && !readOnly) {
                        onDelete(file.fd);
                      }
                    }}
                    style={{
                      color: colors.danger,
                      marginLeft: 'auto',
                      marginBottom: 'auto',
                      cursor: 'pointer',
                    }}
                  />
                  <Text
                    caption
                    style={{
                      backgroundColor: colors.milkyWhite,
                      border: '1px solid transparent',
                      borderRadius: 5,
                      textAlign: 'center',
                    }}
                  >
                    {file.filename}
                  </Text>
                  <Tooltip
                    title={
                      <div
                        style={{
                          backgroundColor: colors.milkyWhite,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {file.caption && (
                          <Text small>caption: {file.caption}</Text>
                        )}
                        {file.author && (
                          <Text small>author: {file.author}</Text>
                        )}
                        {file.imagelocation && (
                          <Text small>location: {file.imagelocation}</Text>
                        )}
                        {file.externallink && (
                          <Text small>link: {file.externallink}</Text>
                        )}
                      </div>
                    }
                  >
                    <div>
                      <Text
                        caption
                        link
                        milkyWhite
                        onClick={() => {
                          if (!disabled && !readOnly) {
                            setaddinginfo(file);
                          }
                        }}
                        style={{
                          backgroundColor: colors.twitterColor,
                          border: '1px solid transparent',
                          borderRadius: 5,
                          textAlign: 'center',
                        }}
                      >
                        + Add Caption
                      </Text>
                    </div>
                  </Tooltip>
                </React.Fragment>
              ) : (
                <AntProgress
                  type="circle"
                  percent={file.progress}
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
        // onConfirm={() => setconfirmdelete(true)}
        minHeight={200}
      >
        <DialogHeader onClose={() => setdeleting(null)} />
        <DialogContent>
          <Text>Sure you want to remove image?</Text>
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
      <Dialog
        maxWidth="sm"
        open={addinginfo !== null}
        onClose={() => setaddinginfo(null)}
        minHeight={400}
      >
        <DialogHeader onClose={() => setdeleting(null)} />
        <Form
          onSubmit={addImageInfo}
          initialValues={
            addinginfo
              ? {
                  caption: addinginfo.caption,
                  author: addinginfo.author,
                  imagelocation: addinginfo.imagelocation,
                  externallink: addinginfo.externallink,
                }
              : {}
          }
          render={({ handleSubmit, pristine }) => (
            <React.Fragment>
              <DialogContent>
                <Block>
                  <Field
                    type="text"
                    name="caption"
                    label="Image caption"
                    component={Input}
                    flex
                  />
                  <Field
                    type="text"
                    name="author"
                    label="Who took/owns this image?"
                    component={Input}
                    flex
                  />
                  <Field
                    type="text"
                    name="imagelocation"
                    label="Where was image taken?"
                    component={Input}
                    flex
                  />
                  <Field
                    type="text"
                    name="externallink"
                    label="Website of author or image collction"
                    component={Input}
                    flex
                  />
                </Block>
              </DialogContent>
              <DialogActions>
                <Button
                  contained
                  color={colors.error}
                  onClick={() => {
                    setaddinginfo(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  contained
                  color={colors.success}
                  disabled={pristine}
                  onClick={handleSubmit}
                >
                  Save Image Info
                </Button>
              </DialogActions>
            </React.Fragment>
          )}
        />
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

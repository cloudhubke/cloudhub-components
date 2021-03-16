/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
import React from 'react';
import qs from 'qs';
import uniq from 'uid';
import { List, ListItem, ListItemSecondaryAction } from '@material-ui/core';
import {
  VideoLibrarySharp,
  Delete,
  AddPhotoAlternate,
  Close,
  InfoOutlined,
} from '@material-ui/icons';
import isEqual from 'lodash/isEqual';
import {
  Block,
  Text,
  toastr,
  VideoThumbnail,
  Button,
  Dialog,
  Form,
  Field,
  Input,
} from '..';
import { DialogHeader, DialogContent, DialogActions } from '../dialog';
import ThemeContext from '../theme/ThemeContext';
import AntProgress from '../ant/AntProgress';

const S3Uploader = ({
  dirname,
  ACL,
  signaxiosinstance,
  uploadaxiosinstance,
  input,
  onChange,
  value,
  signurl,
  deleteurl,
  limit,
  maxSize,
  thumbMaxSize,
  thumbdirname,
  accept,
  acceptThumb,
  maxWidth,
  minWidth,
  aspectratio,
  tolerance,
  maxDuration,
  minDuration,
  setuploading,
  uploading,
  disabled,
  readOnly,
}) => {
  const incominginput = input.value || value || [];
  const { sizes, colors } = React.useContext(ThemeContext);
  const [fileList, setfileList] = React.useState(incominginput || []);
  const [addingThumbnail, setaddingThumbnail] = React.useState(null);
  const [confirmdelete, setconfirmdelete] = React.useState(false);
  const [deleting, setdeleting] = React.useState(null);
  const [uploaderror, setuploaderror] = React.useState(false);
  const [addinginfo, setaddinginfo] = React.useState(null);
  const [thumberror, setthumberror] = React.useState(false);

  const elemId = uniq(5);

  React.useEffect(() => {
    if (Array.isArray(incominginput) && !isEqual(incominginput, fileList)) {
      setfileList(incominginput);
    }
  }, [incominginput]);

  React.useEffect(() => {
    if (uploaderror) {
      setTimeout(() => {
        setuploaderror(false);
      }, 500);
    }
  }, [uploaderror]);
  React.useEffect(() => {
    if (thumberror) {
      setTimeout(() => {
        setthumberror(false);
      }, 500);
    }
  }, [thumberror]);

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
      const isuploading = fileList.filter(Boolean).map(({ status }) => {
        if (status === 'done') return 'done';
        return 'uploading';
      });
      if (
        isuploading.indexOf('uploading') !== -1 ||
        (addingThumbnail &&
          addingThumbnail.video &&
          addingThumbnail.status !== 'done')
      ) {
        if (!uploading) {
          setuploading(true);
        }
        logChange(fileList);
      } else {
        setuploading(false);
        logChange(fileList);
      }
    }
  }, [fileList, addingThumbnail]);

  React.useEffect(() => {
    if (deleting && confirmdelete && Array.isArray(fileList)) {
      const fileArr = fileList
        .filter(Boolean)
        .map(({ Location, fd, thumbfd }) => {
          if (Location === deleting) {
            if (thumbfd) {
              return [fd, thumbfd];
            }
            return fd;
          }
          return null;
        })
        .flat()
        .filter(Boolean);
      signaxiosinstance()
        .post(deleteurl, { files: fileArr })
        .then(({ data }) => {
          toastr.success(data.message);
          setfileList((files) => {
            if (files.length > 0) {
              const progressArray = files
                .map((obj) => {
                  if (obj && obj.Location === deleting) {
                    return null;
                  }
                  return obj;
                })
                .filter(Boolean);
              return progressArray;
            }
          });
          setconfirmdelete(false);
          setdeleting(null);
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

  const onthumbprogress = (progressEvent, url) => {
    setaddingThumbnail((thumb) => {
      if (thumb.signedUrl === url) {
        return {
          ...thumb,
          progress: (progressEvent.loaded * 100) / progressEvent.total,
        };
      }
      return thumb;
    });
  };

  const onThumbFinish = () => {
    setaddingThumbnail((current) => {
      if (current) {
        setfileList((urls) => {
          if (urls.length > 0) {
            const progressArray = urls.map((obj) => {
              if (obj && obj.uid === current.video) {
                const newobj = {
                  ...obj,
                  status: 'done',
                  thumbnail: current.Location,
                  thumbfd: current.fd,
                };
                return { ...newobj };
              }
              return obj;
            });
            return progressArray;
          }
          return urls;
        });
      }
      return null;
    });
  };

  const onThumbError = () => {
    setaddingThumbnail(null);
  };

  const handleFiles = async (event) => {
    try {
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
      const fileObjArray = await [...(files || [])].filter(Boolean).map(
        async (file) =>
          new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
              if (maxWidth && video.videoWidth > maxWidth) {
                toastr.error(
                  `Video ${file.name} is wider than the maximum allowed ${maxWidth}px`
                );
                setuploaderror(true);
                reject(new Error('Invalid Width'));
              }

              if (minWidth && video.videoWidth < minWidth) {
                toastr.error(
                  `Video ${file.name} is narrower than the minimum allowed ${minWidth}px`
                );
                setuploaderror(true);
                reject(new Error('Invalid Width'));
              }
              if (
                aspectratio &&
                !tolerance &&
                (video.videoWidth / video.videoHeight).toFixed(2) !==
                  aspectratio.toFixed(2)
              ) {
                toastr.error(
                  `Video ${file.name} aspect ratio doesn't match the required ${aspectratio}`
                );
                setuploaderror(true);
                reject(new Error('Invalid aspect ratio'));
              }
              if (
                aspectratio &&
                tolerance &&
                Math.abs(video.videoWidth / video.videoHeight - aspectratio) >
                  tolerance
              ) {
                toastr.error(
                  `Video ${file.name} aspect ratio doesn't match the required ${aspectratio}`
                );
                setuploaderror(true);
                reject(new Error('Invalid aspect ratio'));
              }
              if (minDuration && video.duration < minDuration) {
                toastr.error(
                  `Video ${file.name} is shorter than the minimum required ${minDuration} seconds`
                );
                setuploaderror(true);
                reject(new Error('Invalid video duration'));
              }
              if (maxDuration && video.duration > maxDuration) {
                toastr.error(
                  `Video ${file.name} is longer than the maximum allowed ${maxDuration} seconds`
                );
                setuploaderror(true);
                reject(new Error('Invalid video duration'));
              }
              if (!uploaderror) {
                const fileprops = {
                  name: file.name.replace(/[^\w\d_\-.]+/gi, ''),
                  type: file.type,
                  size: file.size,
                  length: video.duration,
                  videoWidth: video.videoWidth,
                  videoHeight: video.videoHeight,
                };
                resolve({ file, fileprops });
              }
            };
          })
      );
      let Allfiles = [];
      await Promise.all(fileObjArray).then((Files) => {
        Allfiles = Files;
      });

      const fileArray = Allfiles.filter(Boolean).map(
        ({ fileprops }) => fileprops
      );
      const filesArray = Allfiles.filter(Boolean).map(({ file }) => file);

      const signedUrls = await getSignedUrl(fileArray, true);
      signedUrls.filter(Boolean);
      const uploads = [...(filesArray || [])].map(
        (file) =>
          signedUrls
            .filter(Boolean)
            .map(({ signedUrl, filename }) => {
              if (
                file &&
                filename === file.name.replace(/[^\w\d_\-.]+/gi, '')
              ) {
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
            toastr.success('Video uploaded successfully');
          })
          .catch((error) => {
            onUploadError(upload.signedUrl);
            toastr.error(
              `${
                error.response
                  ? error.response.data
                  : 'Video upload failed, try again later'
              }`
            );
          });
      }
    } catch {
      toastr.error('Some files could not be uploaded');
    }
  };

  const addThumb = async (event) => {
    let thumb;
    setaddingThumbnail((current) => {
      thumb = current;
      return current;
    });
    setthumberror(false);
    const { files } = event.target;
    if (thumbMaxSize && thumbMaxSize > 0) {
      const sizelimit = Number(thumbMaxSize * 1024);
      const inds = [...(files || [])]
        .map((file, index) =>
          file && file.size > sizelimit ? index + 1 : null
        )
        .filter(Boolean);
      if (inds.length > 0) {
        return toastr.error(
          `File "${
            files[inds[0] - 1].name
          }" exceeds ${thumbMaxSize}MB. Please try again with a smaller file`
        );
      }
    }
    const fileObjArray = await [...(files || [])].filter(Boolean).map(
      async (file) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            const tol = tolerance || 0.3;
            if (
              thumb &&
              thumb.videoHeight &&
              thumb.videoWidth &&
              Math.abs(
                img.width / img.height - thumb.videoWidth / thumb.videoHeight
              ) > tol
            ) {
              setthumberror(true);
              reject(new Error('Thumbnail aspect ratio does not match video'));
            } else if (!thumberror) {
              const fileprops = {
                name: file.name.replace(/[^\w\d_\-.]+/gi, ''),
                type: file.type,
                size: file.size,
              };
              resolve({ file, fileprops });
            }
          };
        })
    );
    let Allfiles = [];
    await Promise.all(fileObjArray).then((Files) => {
      Allfiles = Files;
    });

    const fileArray = Allfiles.map(({ fileprops }) => fileprops);
    const filesArray = Allfiles.map(({ file }) => file);
    const signedUrls = await getSignedUrl(fileArray, false).then(
      (urls) => urls
    );
    const uploads = [...(filesArray || [])].map(
      (file) =>
        signedUrls
          .filter(Boolean)
          .map(({ signedUrl, filename }) => {
            if (file && filename === file.name.replace(/[^\w\d_\-.]+/gi, '')) {
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
                    onthumbprogress(progressEvent, signedUrl);
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
          onThumbFinish(upload.signedUrl);
          toastr.success('Thumbnail added successfully');
        })
        .catch((error) => {
          onThumbError(upload.signedUrl);
          toastr.error(
            `${
              error.response
                ? error.response.data
                : 'Image upload failed, try again later'
            }`
          );
        });
    }
  };

  const onDelete = (Location) => {
    setdeleting(Location);
  };

  const getSignedUrl = async (files, video) => {
    try {
      const { data } = await signaxiosinstance().post(signurl, {
        files,
        ACL: ACL || 'public-read',
        dirname: video ? dirname || 'video/' : thumbdirname || 'thumbnail/',
      });
      const signedUrls = data.signedUrls.map((obj) => ({
        ...obj,
        progress: 0,
      }));
      if (video) {
        setfileList((files) => [...files, ...signedUrls]);
      } else {
        setaddingThumbnail(({ video }) => ({ ...signedUrls[0], video }));
      }
      return signedUrls;
    } catch (error) {
      toastr.error('There was an error uploading file. Please try again later');
    }
  };

  const addVideoInfo = (vals) => {
    const fileobj = { ...addinginfo, ...vals };
    setfileList((files) => {
      if (files.length > 0) {
        const progressArray = files.map((obj) => {
          if (obj && obj.fd === fileobj.fd) {
            return fileobj;
          }
          return obj;
        });
        return progressArray;
      }
    });
    setaddinginfo(null);
  };

  return (
    <Block paper padding={20}>
      {!uploaderror && (
        <input
          type="file"
          id={`videoElem${elemId}`}
          multiple={limit && limit > 1}
          accept={accept || 'video/*'}
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
      )}
      <label htmlFor={`videoElem${elemId}`} style={{ cursor: 'pointer' }}>
        <Block middle center>
          <VideoLibrarySharp />
          <Text caption>upload</Text>
        </Block>
      </label>
      <List>
        {Array.isArray(fileList) &&
          fileList.filter(Boolean).map((file) => (
            <ListItem dense key={file.fd}>
              <Block row paper>
                {file.status === 'done' && (
                  <React.Fragment>
                    <VideoThumbnail
                      small
                      title={file.filename}
                      length={file.length}
                      list
                      flex={false}
                      thumbnail={`/cloud${
                        (file.thumbfd || '').substring(0, 1) === '/' ? '' : '/'
                      }${file.thumbfd}`}
                    />
                    {!file.thumbnail && (
                      <React.Fragment>
                        {!thumberror && (
                          <input
                            type="file"
                            id={`thumbElem${elemId}`}
                            accept={acceptThumb || 'image/*'}
                            style={{
                              position: 'absolute',
                              width: 1,
                              height: 1,
                              overflow: 'hidden',
                              clip: 'rect(1px, 1px, 1px, 1px)',
                            }}
                            onChange={(e) => {
                              setaddingThumbnail({
                                video: file.uid,
                                videoHeight: file.videoHeight,
                                videoWidth: file.videoWidth,
                              });
                              addThumb(e);
                            }}
                            disabled={disabled || readOnly}
                          />
                        )}
                        {!addingThumbnail && (
                          <label
                            htmlFor={`thumbElem${elemId}`}
                            style={{
                              cursor: 'pointer',
                              marginTop: 'auto',
                              marginBottom: 'auto',
                            }}
                          >
                            <Block
                              flex={false}
                              margin={[0, sizes.doubleBaseMargin]}
                              center
                              middle
                              style={{
                                cursor: 'pointer',
                              }}
                            >
                              <AddPhotoAlternate />
                              <Text small bold success>
                                Add Thumbnail
                              </Text>
                            </Block>
                          </label>
                        )}
                        {addingThumbnail && addingThumbnail.video === file.uid && (
                          <AntProgress
                            type="circle"
                            percent={addingThumbnail.progress}
                            width={40}
                            strokeColor={colors.blue}
                            style={{
                              marginTop: 'auto',
                              marginBottom: 'auto',
                              marginLeft: sizes.doubleBaseMargin,
                            }}
                          />
                        )}
                      </React.Fragment>
                    )}
                    <Block
                      flex={false}
                      margin={[0, sizes.doubleBaseMargin]}
                      center
                      middle
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        if (!disabled && !readOnly) {
                          setaddinginfo(file);
                        }
                      }}
                    >
                      <InfoOutlined style={{ color: colors.twitterColor }} />
                      <Text small bold twitterColor>
                        Add Caption
                      </Text>
                    </Block>
                  </React.Fragment>
                )}
                {file.progress < 100 && (
                  <Block row bottom space="between">
                    <AntProgress
                      type="circle"
                      percent={file.progress}
                      width={40}
                      strokeColor={colors.success}
                    />
                    <Text style={{ margin: sizes.baseMargin }}>
                      ...uploading
                    </Text>
                  </Block>
                )}
              </Block>
              <ListItemSecondaryAction>
                {file.status === 'done' ? (
                  <Delete
                    style={{ color: colors.error, cursor: 'pointer' }}
                    onClick={() => {
                      if (!disabled && !readOnly) {
                        onDelete(file.Location);
                      }
                    }}
                  />
                ) : (
                  <Close
                    style={{ color: colors.error, cursor: 'pointer' }}
                    onClick={() => {
                      if (!disabled && !readOnly) {
                        onDelete(file.Location);
                      }
                    }}
                  />
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
      <Dialog
        maxWidth="sm"
        open={addinginfo !== null}
        onClose={() => setaddinginfo(null)}
        minHeight={400}
      >
        <DialogHeader onClose={() => setaddinginfo(null)} />
        <Form
          onSubmit={addVideoInfo}
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
                    label="Video caption"
                    component={Input}
                    flex
                  />
                  <Field
                    type="text"
                    name="author"
                    label="Who shot/owns this video?"
                    component={Input}
                    flex
                  />
                  <Field
                    type="text"
                    name="videolocation"
                    label="Where was video taken?"
                    component={Input}
                    flex
                  />
                  <Field
                    type="text"
                    name="externallink"
                    label="Website of author or video collection"
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
                  Save Video Info
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

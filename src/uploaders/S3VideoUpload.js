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
} from '@material-ui/icons';
import { Block, Text, toastr, VideoThumbnail, Button, Dialog } from '..';
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
}) => {
  const { sizes, colors, Images } = React.useContext(ThemeContext);
  const [fileList, setfileList] = React.useState(input.value || value || []);
  const [addingThumbnail, setaddingThumbnail] = React.useState(null);
  const [confirmdelete, setconfirmdelete] = React.useState(false);
  const [deleting, setdeleting] = React.useState(null);

  const elemId = uniq(5);

  React.useEffect(() => {
    if (typeof input.onChange === 'function') {
      input.onChange(fileList || []);
    }
    if (typeof onChange === 'function') {
      onChange(fileList || []);
    }
  }, [fileList, onChange]);

  React.useEffect(() => {
    if (addingThumbnail && addingThumbnail.status === 'done') {
      setfileList((urls) => {
        if (urls.length > 0) {
          const progressArray = urls.map((obj) => {
            if (obj.uid === addingThumbnail.video) {
              const newobj = {
                ...obj,
                status: 'done',
                thumbnail: addingThumbnail.Location,
                thumbfd: addingThumbnail.fd,
              };
              setaddingThumbnail(null);
              return { ...newobj };
            }
            return obj;
          });
          return progressArray;
        }
        return urls;
      });
    }
  }, [addingThumbnail]);

  React.useEffect(() => {
    if (deleting && confirmdelete) {
      const fileArr = fileList
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
                  if (obj.Location === deleting) {
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

  const onThumbFinish = (url) => {
    setaddingThumbnail((thumb) => ({ ...thumb, status: 'done' }));
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
    const fileArray = [];
    await [...(files || [])].map((file) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        fileArray.push({
          name: file.name.replace(/[^\w\d_\-.]+/gi, ''),
          type: file.type,
          size: file.size,
          length: video.duration,
        });
      };
    });
    const fetchUrls = setInterval(async () => {
      if (fileArray.length === files.length && files.length > 0) {
        try {
          const signedUrls = await getSignedUrl(fileArray, true).then(
            (urls) => urls
          );
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
                toastr.success('Video uploaded successfully');
              })
              .catch((error) => {
                onUploadError(signedUrl);
                toastr.error(
                  `${
                    error.response
                      ? error.response.data
                      : 'Video upload failed, try again later'
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

  const addThumb = async (event) => {
    const { files } = event.target;
    if (thumbMaxSize && thumbMaxSize > 0) {
      const sizelimit = Number(thumbMaxSize * 1024 * 1024);
      const inds = [...(files || [])]
        .map((file, index) => (file.size > sizelimit ? index + 1 : null))
        .filter(Boolean);
      if (inds.length > 0) {
        return toastr.error(
          `File "${
            files[inds[0] - 1].name
          }" exceeds ${thumbMaxSize}MB. Please try again with a smaller file`
        );
      }
    }
    const fileArray = [...(files || [])].map((file) => ({
      name: file.name.replace(/[^\w\d_\-.]+/gi, ''),
      type: file.type,
      size: file.size,
    }));
    if (fileArray.length > 0) {
      try {
        const signedUrls = await getSignedUrl(fileArray, false).then(
          (urls) => urls
        );
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
                        onthumbprogress(progressEvent, signedUrl);
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
              onThumbFinish(signedUrl);
              toastr.success('Thumbnail added successfully');
            })
            .catch((error) => {
              setaddingThumbnail(null);
              toastr.error(
                `${
                  error.response
                    ? error.response.data
                    : 'Thumbnail upload failed, try again later'
                }`
              );
            })
        );
      } catch (error) {
        toastr.error(
          'There was an error adding thumbnail. Please try again later'
        );
      }
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

  const onDelete = (Location) => {
    setdeleting(Location);
  };
  const getSignedUrl = async (files, video) => {
    const urls = await signaxiosinstance()
      .post(signurl, {
        files,
        ACL: ACL || 'public-read',
        dirname: video ? dirname || 'video/' : thumbdirname || 'thumbnail/',
      })
      .then(({ data }) => {
        const signedUrls = video
          ? data.signedUrls.map((obj) => ({
              ...obj,
              progress: 0,
              length:
                files
                  .map(({ length, name }) => {
                    if (obj.filename === name) {
                      return length;
                    }
                    return null;
                  })
                  .filter(Boolean)[0] || NaN,
            }))
          : data.signedUrls.map((obj) => ({
              ...obj,
              progress: 0,
            }));
        if (video) {
          setfileList((files) => [...files, ...signedUrls]);
        } else {
          setaddingThumbnail(({ video }) => ({ ...signedUrls[0], video }));
        }

        return signedUrls;
      })
      .catch((error) => {
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
      />
      <label htmlFor={`videoElem${elemId}`} style={{ cursor: 'pointer' }}>
        <Block middle center>
          <VideoLibrarySharp />
          <Text caption>upload</Text>
        </Block>
      </label>
      <List>
        {fileList.map(
          ({
            uid,
            filename,
            progress,
            status,
            length,
            Location,
            thumbnail,
          }) => (
            <ListItem dense key={uid}>
              <Block row paper>
                {status === 'done' && (
                  <React.Fragment>
                    <VideoThumbnail
                      small
                      title={filename}
                      length={length}
                      list
                      flex={false}
                      thumbnail={thumbnail || Images.logo}
                    />

                    {!thumbnail && (
                      <React.Fragment>
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
                            setaddingThumbnail({ video: uid });
                            addThumb(e);
                          }}
                        />
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
                        {addingThumbnail && addingThumbnail.video === uid && (
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
                  </React.Fragment>
                )}
                {progress < 100 && (
                  <Block row bottom space="between">
                    <AntProgress
                      type="circle"
                      percent={progress}
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
                {status === 'done' ? (
                  <Delete
                    style={{ color: colors.error, cursor: 'pointer' }}
                    onClick={() => onDelete(Location)}
                  />
                ) : (
                  <Close
                    style={{ color: colors.error, cursor: 'pointer' }}
                    onClick={() => onDelete(Location)}
                  />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          )
        )}
      </List>
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
  input: {
    value: null,
    onChange: () => {},
  },
};
export default S3Uploader;

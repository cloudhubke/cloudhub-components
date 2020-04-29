/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
import React from 'react';
import qs from 'qs';
import { List, ListItem, ListItemSecondaryAction } from '@material-ui/core';
import {
  AttachFile,
  Delete,
  AddPhotoAlternate,
  Close,
} from '@material-ui/icons';
import { Block, Text, toastr, IconButton, VideoThumbnail, Button } from '..';
import { colors, sizes, Images } from '../theme';
import AntProgress from '../ant/AntProgress';

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
  thumbMaxSize,
  accept,
}) => {
  const [fileList, setfileList] = React.useState(value || []);
  const [addingThumbnail, setaddingThumbnail] = React.useState(null);

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
              toastr.success('Thumbnail added successfully');
            })
            .catch((error) => {
              onUploadError(signedUrl);
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

  const onDelete = (uid) => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this file?'
    );
    if (confirmDelete) {
      const file = fileList
        .map((file) => (file.uid === uid ? file : null))
        .filter(Boolean)[0];
      signaxiosinstance()
        .post(deleteurl, file)
        .then(({ data }) => {
          toastr.success(data.message);
          setfileList((files) => {
            if (files.length > 0) {
              const progressArray = files
                .map((obj) => {
                  if (obj.uid === uid) {
                    return null;
                  }
                  return obj;
                })
                .filter(Boolean);

              return progressArray;
            }
          });
        })
        .catch((error) => {
          const response = error.response || {};
          const data = response.data || {};
          toastr.error(data.message || data);
        });
    }
  };
  const getSignedUrl = async (files, video) => {
    const urls = await signaxiosinstance()
      .post(signurl, {
        files,
        ACL: ACL || 'public-read',
        dirname: dirname || video ? 'video/' : 'thumbnail',
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
        id="videoElem"
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
      />
      <label htmlFor="videoElem" style={{ cursor: 'pointer' }}>
        <Block middle center>
          <AttachFile />
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
                          id="thumbElem"
                          accept={accept}
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
                            htmlFor="thumbElem"
                            style={{ cursor: 'pointer' }}
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
                    style={{ color: colors.error }}
                    onClick={() => onDelete(Location)}
                  />
                ) : (
                  <Close style={{ color: colors.error }} />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          )
        )}
      </List>
    </Block>
  );
};

S3Uploader.defaultProps = {
  onChange: () => {},
};
export default S3Uploader;

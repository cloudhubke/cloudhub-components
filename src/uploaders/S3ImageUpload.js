/* eslint-disable no-restricted-syntax */
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
// import useDebounce from '../customhooks/useDebounce';

const S3ImageUpload = ({
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
  uploading,
  mime,
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);
  const incominginput = input && input.value ? input.value : value;
  const [fileList, setfileList] = React.useState(
    Array.isArray(incominginput) ? incominginput : []
  );
  const [confirmdelete, setconfirmdelete] = React.useState(false);
  const [deleting, setdeleting] = React.useState(null);
  const [uploaderror, setuploaderror] = React.useState(false);
  const [addinginfo, setaddinginfo] = React.useState(null);

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
    if (deleting && confirmdelete) {
      signaxiosinstance()
        .post(deleteurl, { files: [deleting] })
        .then(({ data }) => {
          toastr.success(data.message);
          setfileList((files) => {
            if (files.length > 0) {
              const progressArray = files
                .map((obj) => {
                  if (obj && obj.fd === deleting) {
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

  const logChange = (fileUpdate) => {
    const incominginput = input && input.value ? input.value : value || [];
    if (
      typeof input.onChange === 'function' &&
      !isEqual(fileUpdate, incominginput)
    ) {
      input.onChange(fileUpdate || []);
    }
    if (typeof onChange === 'function' && !isEqual(fileUpdate, incominginput)) {
      onChange(fileUpdate || []);
    }
  };

  React.useEffect(() => {
    if (Array.isArray(fileList)) {
      const isuploading = fileList.filter(Boolean).map(({ status }) => {
        if (status === 'done') return 'done';
        return 'uploading';
      });
      if (isuploading.indexOf('uploading') !== -1) {
        if (!uploading) {
          setuploading(true);
        }
        logChange(fileList);
      } else {
        setuploading(false);
        logChange(fileList);
      }
    }
  }, [fileList]);

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

  const addImageInfo = (vals) => {
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
      const fileObjArray = await [...(files || [])].filter(Boolean).map(
        async (file) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
              if (minWidth && img.width < minWidth) {
                toastr.error(
                  `Image ${file.name} has a width smaller than the required ${minWidth}px`
                );
                setuploaderror(true);
                reject(new Error('Invalid Width'));
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
                reject(new Error('Invalid aspect ratio'));
              }

              if (
                aspectratio &&
                tolerance &&
                Math.abs(
                  Number(img.width) / Number(img.height) - Number(aspectratio)
                ) > Number(tolerance)
              ) {
                toastr.error(
                  `Image  ${file.name} aspect ratio is ${(
                    img.width / img.height
                  ).toFixed(2)} but must be ${aspectratio.toFixed(2)}`
                );
                setuploaderror(true);
                reject(new Error('Invalid aspect ration'));
              }

              if (!uploaderror) {
                const elem = document.createElement('canvas');
                elem.width = maxWidth || minWidth || img.width;
                elem.height = Math.floor((elem.width * img.height) / img.width);
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

                const newname = () => {
                  if (mime) {
                    const oldname = file.name.replace(/[^\w\d_\-.]+/gi, '');
                    const oldtype = `.${(file.type || '').split('/')[1] || ''}`;
                    const newtype = `.${(mime || '').split('/')[1] || ''}`;
                    const newfilename = oldname.replace(oldtype, newtype);
                    return newfilename;
                  }
                  return file.name.replace(/[^\w\d_\-.]+/gi, '');
                };
                ctx.canvas.toBlob((blob) => {
                  const newfile = new File([blob], newname(), {
                    type: mime || file.type,
                    lastModified: Date.now(),
                  });
                  if (maxSize && maxSize > 0) {
                    const sizelimit = Number(maxSize * 1024);
                    if (newfile.size > sizelimit) {
                      toastr.error(
                        `Image "${file.name}" exceeds ${maxSize}KB. Please try again with a smaller file`
                      );
                      setuploaderror(true);
                      reject(new Error('File too large'));
                    }
                  }
                  const fileprops = {
                    name: newfile.name,
                    type: newfile.type,
                    size: newfile.size,
                    width: maxWidth || img.width,
                    height: maxWidth
                      ? Math.floor((maxWidth * img.height) / img.width)
                      : img.height,
                  };
                  const result = { newfile, fileprops };
                  resolve(result);
                }, mime || file.type);
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
      const filesArray = Allfiles.filter(Boolean).map(({ newfile }) => newfile);
      const signedUrls = await getSignedUrl(fileArray, true).then(
        (urls) => urls
      );
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
    } catch (error) {
      toastr.error('Some files could not be uploaded');
    }
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
        ...(obj || {}),
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
      {!uploaderror && (
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
      )}
      <Block row wrap>
        {Array.isArray(fileList) &&
          fileList.filter(Boolean).map((file) => (
            <Block
              key={file.fd}
              middle
              bottom={file.status === 'done'}
              center={file.status !== 'done'}
              flex={false}
              style={{
                backgroundImage: `url(${
                  file.status === 'done' ? file.url : ''
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
        <label htmlFor={`fileElem${elemId}`} style={{ cursor: 'pointer' }}>
          <Block
            paper
            shadowhover
            middle
            center
            margin={[0, sizes.baseMargin]}
            style={{
              width: previewWidth || 150,
              height: previewHeight || 150,
            }}
          >
            <AddAPhotoSharp />
            <Text caption>upload</Text>
          </Block>
        </label>
      </Block>
      <Dialog
        maxWidth="sm"
        open={deleting !== null}
        onClose={() => setdeleting(null)}
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
                    label="Website of author or image collection"
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

S3ImageUpload.defaultProps = {
  onChange: () => {},
  input: {
    value: null,
    onChange: () => {},
  },
  setuploading: () => {},
};
export default S3ImageUpload;

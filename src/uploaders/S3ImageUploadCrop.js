/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import qs from 'qs';
import uniq from 'uid';
import { AddAPhotoSharp, Cancel } from '@material-ui/icons';
import { Block, Text, toastr, Dialog, Button, Form, Field, Input } from '..';
import { Tooltip } from '@material-ui/core';
import isEqual from 'lodash/isEqual';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import { DialogHeader, DialogContent, DialogActions } from '../dialog';
import AntProgress from '../ant/AntProgress';
import ThemeContext from '../theme/ThemeContext';

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
  height,
  aspectratio,
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
  const [cropping, setcropping] = React.useState(null);
  const [cropurls, setcropurls] = React.useState([]);

  const elemId = uniq(5);
  React.useEffect(() => {
    if (Array.isArray(incominginput) && !isEqual(incominginput, fileList)) {
      setfileList(incominginput || []);
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
        if (urls && urls.length > 0) {
          const progressArray = urls
            .map((obj) => {
              if (obj && url === obj.signedUrl) {
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
      setcropping(null);
      const { files } = event.target;
      if (
        limit &&
        Array.isArray(fileList) &&
        Array.isArray(files) &&
        files.length + fileList.length > limit
      ) {
        return toastr.error(`Only a maximum of ${limit} files allowed`);
      }
      const fileObjArray = [];

      const fileURLs = [...(files || [])].map((file) => {
        const url = URL.createObjectURL(file);
        return url;
      });
      setcropurls(fileURLs);
      let i = 0;
      const cropImage = (file) =>
        new Promise(async (resolve, reject) => {
          {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            // eslint-disable-next-line
            img.onload = () => {
              if (minWidth && img.width < minWidth) {
                toastr.error(
                  `Image ${file.name} has a width smaller than the required ${minWidth}px`
                );
                setuploaderror(true);
                reject(new Error('Invalid Width'));
              }
            };
            if (!uploaderror) {
              setTimeout(async () => {
                setcropping(i);
                const cropperView = document.getElementById(`cropper-view${i}`);
                const cancelCrop = document.getElementById(`cancel-crop${i}`);
                const cropButton = document.getElementById(`crop-button${i}`);
                const cropper = new Cropper(cropperView, {
                  aspectRatio: aspectratio || NaN,
                  movable: true,
                  rotatable: true,
                  scalable: true,
                  zoomable: true,
                  minCropBoxWidth: 600,

                  viewMode: 1,
                });
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
                // if (cropperView) {
                //   cropperView.addEventListener('zoom', (event) => {
                //     // console.log(
                //     //   event.detail.ratio,
                //     //   event.target.naturalWidth,
                //     //   event.target.clientWidth
                //     // );
                //     // if (event.detail.ratio > event.detail.oldRatio) {
                //     //   event.preventDefault(); // Prevent zoom in below minWidth
                //     // }
                //   });
                // }
                if (cropButton) {
                  cropButton.addEventListener('click', () => {
                    if (
                      cropper &&
                      cropper.getCroppedCanvas({
                        minWidth: minWidth || maxWidth || 0,
                        maxWidth: minWidth || maxWidth || Infinity,
                      })
                    ) {
                      cropper
                        .getCroppedCanvas({
                          minWidth: minWidth || 0,
                          maxWidth: maxWidth || minWidth || Infinity,
                        })
                        .toBlob((blob) => {
                          const newfile = new File([blob], newname(), {
                            type: mime || file.type,
                            lastModified: Date.now(),
                          });
                          if (
                            maxSize &&
                            maxSize > 0 &&
                            newfile.size > Number(maxSize * 1024)
                          ) {
                            toastr.error(
                              `Image "${file.name}" exceeds ${maxSize}KB. Please try again with a smaller file`
                            );
                            reject(
                              new Error(
                                `Image "${file.name}" exceeds ${maxSize}KB. Please try again with a smaller file`
                              )
                            );
                          } else {
                            const fileprops = {
                              name: newfile.name,
                              type: newfile.type,
                              size: newfile.size,
                              width: maxWidth || img.width,
                              height: maxWidth
                                ? Math.floor(
                                    (maxWidth * img.height) / img.width
                                  )
                                : img.height,
                            };
                            const result = { newfile, fileprops };
                            resolve(result);
                          }
                        }, mime || file.type);
                    }
                  });
                }
                if (cancelCrop) {
                  cancelCrop.addEventListener('click', () => {
                    setuploaderror(true);
                    reject(new Error('Upload Cancelled'));
                    setcropping(null);
                  });
                }
              }, 200);
            }
          }
        });

      for (const file of files) {
        const fileObj = await cropImage(file);
        await fileObjArray.push(fileObj);
        setcropping(null);
        i += 1;
        if (i === files.length) {
          const fileArray = fileObjArray
            .filter(Boolean)
            .map(({ fileprops }) => fileprops);
          const filesArray = fileObjArray
            .filter(Boolean)
            .map(({ newfile }) => newfile);
          const signedUrls = await getSignedUrl(fileArray, true).then(
            (urls) => urls
          );
          signedUrls.filter(Boolean);
          const uploads = [...(filesArray || [])].filter(Boolean).map(
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
            // eslint-disable-next-line
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
      const signedUrls = (data.signedUrls || []).map((obj) => ({
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
      <label htmlFor={`fileElem${elemId}`} style={{ cursor: 'pointer' }}>
        <Block middle center>
          <AddAPhotoSharp />
          <Text caption>upload</Text>
        </Block>
      </label>
      {cropurls.filter(Boolean).map((fileURL, index) => (
        <Block
          key={fileURL}
          middle
          style={{
            display: cropping === index ? 'flex' : 'none',
            alignSelf: 'center',
          }}
        >
          <Block>
            <img
              src={fileURL}
              alt="cropper-preview"
              id={`cropper-view${index}`}
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: height || '100%',
              }}
            />
          </Block>
          <Block
            row
            flex={false}
            right
            style={{ width: '60%' }}
            margin={sizes.baseMargin}
          >
            <Button
              contained
              color={colors.error}
              id={`cancel-crop${index}`}
              style={{ marginRight: sizes.doubleBaseMargin }}
            >
              <Text button>Cancel</Text>
            </Button>
            <Button contained color={colors.success} id={`crop-button${index}`}>
              <Text button>Save</Text>
            </Button>
          </Block>
        </Block>
      ))}
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
    name: '',
  },
  setuploading: () => {},
};
export default S3ImageUpload;

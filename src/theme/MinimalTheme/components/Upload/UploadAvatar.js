import clsx from 'clsx';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

import { useDropzone } from 'react-dropzone';
import React, { useCallback, useState } from 'react';
import roundAddAPhoto from '@iconify-icons/ic/round-add-a-photo';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Typography,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';

import { fData } from '../../utils/formatNumber';
import useIsMountedRef from '../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

const PHOTO_SIZE = 3145728; // bytes
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const useStyles = makeStyles((theme) => ({
  root: {
    width: 144,
    height: 144,
    margin: 'auto',
    borderRadius: '50%',
    padding: theme.spacing(1),
    border: `1px dashed ${theme.palette.grey['500_32']}`,
  },
  dropZone: {
    zIndex: 0,
    width: '100%',
    height: '100%',
    outline: 'none',
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '50%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': { width: '100%', height: '100%' },
    '&:hover': { cursor: 'pointer', '& $placeholder': { zIndex: 9 } },
  },
  loading: {
    zIndex: 99,
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: alpha(theme.palette.grey['900'], 0.72),
  },
  placeholder: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.neutral,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': { opacity: 0.72 },
  },
  hover: {
    opacity: 0,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey['900'],
    '&:hover': { opacity: 0.8 },
  },
  isDragActive: { opacity: 0.72 },
  isDragReject: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.light,
    backgroundColor: theme.palette.error.lighter,
  },
  isDragAccept: {},
}));

// ----------------------------------------------------------------------

UploadAvatar.propTypes = {
  disabled: PropTypes.bool,
  caption: PropTypes.string,
  error: PropTypes.bool,
  file: PropTypes.object,
  setFile: PropTypes.func,
  className: PropTypes.string,
};

function UploadAvatar({
  disabled,
  caption,
  error = false,
  value: file,
  onChange: setFile,
  className,
  config = {},
  ...other
}) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const isMountedRef = useIsMountedRef();

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      let file = acceptedFiles[0];

      const checkSize = file.size < PHOTO_SIZE;
      const checkType = FILE_FORMATS.includes(file.type);

      if (!checkSize) {
        setIsError('size-invalid');
      }

      if (!checkType) {
        setIsError('type-invalid');
      }

      try {
        if (checkSize && checkType) {
          setIsLoading(true);
          const formData = new FormData();
          formData.append('file', file);
          formData.append('folder', 'upload_minimal/avatar');
          formData.append('upload_preset', config.cloudinaryPreset || '');
          formData.append('api_key', config.cloudinaryKey || '');
          return axios
            .post(config.cloudinaryUrl || '', formData, {
              headers: { 'X-Requested-With': 'XMLHttpRequest' },
            })
            .then((response) => {
              const data = response.data;
              if (isMountedRef.current) {
                setFile(data.secure_url);
                setIsLoading(false);
                setIsError(null);
              }
            });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [isMountedRef, setFile]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    disabled: disabled,
  });

  return (
    <>
      <div className={clsx(classes.root, className)} {...other}>
        <div
          className={clsx(classes.dropZone, {
            [classes.isDragActive]: isDragActive,
            [classes.isDragAccept]: isDragAccept,
            [classes.isDragReject]: isDragReject || error,
          })}
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          {isLoading && (
            <Box className={classes.loading}>
              <CircularProgress size={32} thickness={2.4} />
            </Box>
          )}

          {file && (
            <Box
              component="img"
              alt="avatar"
              src={file}
              sx={{ zIndex: 8, objectFit: 'cover' }}
            />
          )}

          <div className={clsx(classes.placeholder, { [classes.hover]: file })}>
            <Box
              component={Icon}
              icon={roundAddAPhoto}
              sx={{ width: 24, height: 24, mb: 1 }}
            />
            <Typography variant="caption">
              {file ? 'Update photo' : 'Upload photo'}
            </Typography>
          </div>
        </div>
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isError === 'size-invalid' && (
          <FormHelperText error>{`File is larger than ${fData(
            PHOTO_SIZE
          )}`}</FormHelperText>
        )}

        {isError === 'type-invalid' && (
          <FormHelperText error>
            File type must be *.jpeg, *.jpg, *.png, *.gif
          </FormHelperText>
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{
          mt: 2,
          mb: 5,
          mx: 'auto',
          display: 'block',
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        {caption ? (
          caption
        ) : (
          <>
            Allowed *.jpeg, *.jpg, *.png, *.gif
            <br /> Max size of {fData(PHOTO_SIZE)}
          </>
        )}
      </Typography>
    </>
  );
}

export default UploadAvatar;

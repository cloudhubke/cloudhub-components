import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import Block from '../Block';
import CloudhubImagesUpload from './uploader/ImagesUpload';
import ThemeContext from '../theme/ThemeContext';

const ImagesUpload = (props) => {
  const value = props.input ? props.input.value : props.value;

  const { CONFIG, sizes } = React.useContext(ThemeContext);

  if (CONFIG.FILEAPI_ENDPOINT) {
    if (Array.isArray(value)) {
      value.map((file) => {
        if (!`${file.url}`.includes('http')) {
          const url = `${CONFIG.FILEAPI_ENDPOINT}${`${file.url}`.replace(
            '/fileapi',
            ''
          )}`;
          return { ...file, url };
        }
        return file;
      });
    }

    if (isPlainObject(value)) {
      if (!`${value.url}`.includes('http')) {
        value.url = `${CONFIG.FILEAPI_ENDPOINT}${`${value.url}`.replace(
          '/fileapi',
          ''
        )}`;
      }
    }
  }

  return (
    <Block style={{ position: 'relative', margin: sizes.margin }}>
      <CloudhubImagesUpload url="/fileapi/media/upload/image" {...props} />
    </Block>
  );
};

export default ImagesUpload;

import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import placeholdersvg from '../assets/placeholder.svg';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    objectFit: 'cover',
  },
}));

// ----------------------------------------------------------------------

LazySize.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  size: PropTypes.string,
  noBlur: PropTypes.bool,
  noPlaceholder: PropTypes.bool,
  className: PropTypes.string,
};

function LazySize({
  component = 'img',
  alt,
  src,
  size,
  noBlur = true,
  noPlaceholder = false,
  className,
  ...other
}) {
  const classes = useStyles();
  const lazyClass = noBlur ? 'lazyload' : 'lazyload blur-up';
  const placeholder = noPlaceholder ? '' : placeholdersvg;
  const isAuto = Boolean(size);

  return (
    <>
      {isAuto ? (
        <Box
          component={component}
          alt={alt}
          data-sizes="auto"
          src={placeholder}
          data-src={src}
          data-srcset={size}
          className={clsx(classes.root, lazyClass, className)}
          {...other}
        />
      ) : (
        <Box
          component={component}
          alt={alt}
          src={placeholder}
          data-src={src}
          className={clsx(classes.root, lazyClass, className)}
          {...other}
        />
      )}
    </>
  );
}

export default LazySize;

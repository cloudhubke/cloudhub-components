import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  className: PropTypes.string
};

function Logo({ className, src = '/static/brand/logo_single.svg', ...other }) {
  return (
    <Box
      component="img"
      alt="logo"
      src={src}
      height={40}
      className={className}
      {...other}
    />
  );
}

export default Logo;

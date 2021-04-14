import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '@material-ui/core/utils';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  colorInfo: { color: theme.palette.info.main },
  colorSuccess: { color: theme.palette.success.main },
  colorWarning: { color: theme.palette.warning.main },
  colorError: { color: theme.palette.error.main }
}));

// ----------------------------------------------------------------------

function MCircularProgress({ color = 'primary', className, ...other }) {
  const classes = useStyles();

  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return <CircularProgress color={color} className={className} {...other} />;
  }

  return (
    <CircularProgress
      className={clsx(
        {
          [classes[`color${capitalize(color)}`]]: color
        },
        className
      )}
      {...other}
    />
  );
}

MCircularProgress.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error'
  ])
};

export default MCircularProgress;

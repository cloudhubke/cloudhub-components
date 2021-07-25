import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { darken, lighten, makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { LinearProgress } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const isLight = theme.palette.mode === 'light';

  const gradientDashed = (color) => {
    const getColor = isLight ? lighten(color, 0.62) : darken(color, 0.5);
    return `radial-gradient(${getColor} 0%, ${getColor}  16%, transparent 42%)`;
  };

  const createStyle = (color) => {
    return {
      '& .MuiLinearProgress-bar': {
        backgroundColor: theme.palette[color].main
      },
      '&.MuiLinearProgress-indeterminate, &.MuiLinearProgress-determinate, & .MuiLinearProgress-bar2Buffer, &.MuiLinearProgress-query': {
        backgroundColor: isLight
          ? theme.palette[color].lighter
          : theme.palette[color].darker
      },
      '& .MuiLinearProgress-dashed': {
        backgroundImage: gradientDashed(theme.palette[color].main)
      }
    };
  };

  return {
    colorInfo: createStyle('info'),
    colorSuccess: createStyle('success'),
    colorWarning: createStyle('warning'),
    colorError: createStyle('error')
  };
});

function MLinearProgress({ className, color = 'primary', ...other }) {
  const classes = useStyles();

  if (color === 'primary' || color === 'secondary') {
    return <LinearProgress color={color} className={className} {...other} />;
  }

  return (
    <LinearProgress
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

MLinearProgress.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error'
  ])
};

export default MLinearProgress;

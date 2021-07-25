import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { Switch } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const createStyle = (color) => {
    return {
      '& .Mui-checked': {
        color: theme.palette[color].main,
        '&:hover': {
          backgroundColor: alpha(
            theme.palette[color].main,
            theme.palette.action.hoverOpacity
          )
        }
      },
      '& .Mui-checked + .MuiSwitch-track': {
        backgroundColor: theme.palette[color].main
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

// ----------------------------------------------------------------------

function MSwitch({ color = 'primary', className, ...other }) {
  const classes = useStyles();

  if (color === 'default' || color === 'primary' || color === 'secondary') {
    return <Switch color={color} className={className} {...other} />;
  }

  return (
    <Switch
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

MSwitch.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error'
  ])
};

export default MSwitch;

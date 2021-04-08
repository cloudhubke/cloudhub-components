import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { Badge } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const createStyle = (color) => {
    return {
      '& .MuiBadge-badge ': {
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main
      }
    };
  };
  return {
    colorInfo: createStyle('info'),
    colorSuccess: createStyle('success'),
    colorWarning: createStyle('warning')
  };
});

// ----------------------------------------------------------------------

const MBadge = forwardRef(
  ({ color = 'default', children, className, ...other }, ref) => {
    const classes = useStyles();

    if (
      color === 'default' ||
      color === 'error' ||
      color === 'primary' ||
      color === 'secondary'
    ) {
      return (
        <Badge color={color} className={className} {...other}>
          {children}
        </Badge>
      );
    }

    return (
      <Badge
        className={clsx(
          {
            [classes[`color${capitalize(color)}`]]: color
          },
          className
        )}
        {...other}
      >
        {children}
      </Badge>
    );
  }
);

MBadge.propTypes = {
  children: PropTypes.node,
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

export default MBadge;

import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Avatar } from '@mui/material';
import { capitalize } from '@mui/material/utils';
import { makeStyles } from '@mui/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const createStyle = (color) => ({
    color: `${theme.palette[color].contrastText} !important`,
    backgroundColor: `${theme.palette[color].main} !important`,
  });

  return {
    root: {
      fontWeight: theme.typography.fontWeightMedium,
    },
    colorPrimary: createStyle('primary'),
    colorSecondary: createStyle('secondary'),
    colorInfo: createStyle('info'),
    colorSuccess: createStyle('success'),
    colorWarning: createStyle('warning'),
    colorError: createStyle('error'),
  };
});

// ----------------------------------------------------------------------

const MAvatar = forwardRef(
  ({ color = 'default', children, className, ...other }, ref) => {
    const classes = useStyles();

    return (
      <Avatar
        ref={ref}
        className={clsx(
          classes.root,
          {
            [classes[`color${capitalize(color)}`]]: color,
          },
          className
        )}
        {...other}
      >
        {children}
      </Avatar>
    );
  }
);

MAvatar.propTypes = {
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
    'error',
  ]),
};

export default MAvatar;

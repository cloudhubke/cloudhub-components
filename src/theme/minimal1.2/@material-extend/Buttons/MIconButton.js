import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { IconButton } from '@material-ui/core';
import { ButtonAnimate } from '../../components/Animate';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const createStyle = (color) => {
    return {
      color: theme.palette[color].main,
      '&:hover': {
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity
        ),
      },
    };
  };

  return {
    colorInfo: createStyle('info'),
    colorSuccess: createStyle('success'),
    colorWarning: createStyle('warning'),
    colorError: createStyle('error'),
    colorWhite: {
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.common.white,
          theme.palette.action.hoverOpacity
        ),
      },
    },
  };
});

// ----------------------------------------------------------------------

const MIconButton = forwardRef(
  ({ color = 'default', children, className, ...other }, ref) => {
    const classes = useStyles();

    if (
      color === 'default' ||
      color === 'inherit' ||
      color === 'primary' ||
      color === 'secondary'
    ) {
      return (
        <ButtonAnimate>
          <IconButton ref={ref} color={color} className={className} {...other}>
            {children}
          </IconButton>
        </ButtonAnimate>
      );
    }

    return (
      <ButtonAnimate>
        <IconButton
          ref={ref}
          className={clsx(
            {
              [classes[`color${capitalize(color)}`]]: color !== 'default',
            },
            className
          )}
          {...other}
        >
          {children}
        </IconButton>
      </ButtonAnimate>
    );
  }
);

MIconButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'default',
    'inherit',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'white',
  ]),
};

export default MIconButton;

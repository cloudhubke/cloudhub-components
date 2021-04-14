import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { Button } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const styleContained = (color) => {
    return {
      boxShadow: theme.shadows['25'][color],
      color: theme.palette[color].contrastText,
      backgroundColor: theme.palette[color].main,
      '&:hover': {
        backgroundColor: theme.palette[color].dark
      }
    };
  };

  const styleOutlined = (color) => {
    return {
      color: theme.palette[color].main,
      border: `1px solid ${alpha(theme.palette[color].main, 0.48)}`,
      '&:hover': {
        border: `1px solid ${theme.palette[color].main}`,
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity
        )
      }
    };
  };

  const styleText = (color) => {
    return {
      color: theme.palette[color].main,
      '&:hover': {
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity
        )
      }
    };
  };
  return {
    containedInfo: styleContained('info'),
    containedSuccess: styleContained('success'),
    containedWarning: styleContained('warning'),
    containedError: styleContained('error'),
    containedWhite: {
      boxShadow: theme.shadows['25'].z8,
      color: theme.palette.getContrastText(theme.palette.common.white),
      backgroundColor: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.grey['300']
      }
    },

    outlinedInfo: styleOutlined('info'),
    outlinedSuccess: styleOutlined('success'),
    outlinedWarning: styleOutlined('warning'),
    outlinedError: styleOutlined('error'),

    textInfo: styleText('info'),
    textSuccess: styleText('success'),
    textWarning: styleText('warning'),
    textError: styleText('error')
  };
});

// ----------------------------------------------------------------------

const MButton = forwardRef(
  (
    { color = 'primary', variant = 'text', children, className, ...other },
    ref
  ) => {
    const classes = useStyles();

    if (color === 'inherit' || color === 'primary' || color === 'secondary') {
      return (
        <Button
          ref={ref}
          color={color}
          variant={variant}
          className={className}
          {...other}
        >
          {children}
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        variant={variant}
        className={clsx(
          classes[variant],
          {
            [classes[`${variant}${capitalize(color)}`]]: color
          },
          className
        )}
        {...other}
      >
        {children}
      </Button>
    );
  }
);

MButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'white'
  ]),
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string
  ])
};

export default MButton;

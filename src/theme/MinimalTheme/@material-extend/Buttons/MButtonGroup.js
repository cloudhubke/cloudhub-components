import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { ButtonGroup } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const styleContained = (color) => {
    return {
      boxShadow: theme.shadows['25'][color],
      '& .MuiButtonGroup-grouped': {
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        borderColor: `${theme.palette[color].dark} !important`,
        '&:hover': {
          backgroundColor: theme.palette[color].dark
        }
      }
    };
  };

  const styleOutlined = (color) => {
    return {
      '& .MuiButtonGroup-grouped': {
        color: theme.palette[color].main,
        borderColor: `${alpha(theme.palette[color].main, 0.48)} !important`,
        '&:hover': {
          borderColor: `${theme.palette[color].main} !important`,
          backgroundColor: alpha(
            theme.palette[color].main,
            theme.palette.action.hoverOpacity
          )
        }
      }
    };
  };

  const styleText = (color) => {
    return {
      '& .MuiButtonGroup-grouped': {
        color: theme.palette[color].main,
        borderColor: `${theme.palette[color].main} !important`,
        '&:hover': {
          backgroundColor: alpha(
            theme.palette[color].main,
            theme.palette.action.hoverOpacity
          )
        }
      }
    };
  };
  return {
    containedInfo: styleContained('info'),
    containedSuccess: styleContained('success'),
    containedWarning: styleContained('warning'),
    containedError: styleContained('error'),

    outlinedInfo: styleOutlined('info'),
    outlinedWarning: styleOutlined('success'),
    outlinedSuccess: styleOutlined('warning'),
    outlinedError: styleOutlined('error'),

    textInfo: styleText('info'),
    textSuccess: styleText('success'),
    textWarning: styleText('warning'),
    textError: styleText('error')
  };
});

// ----------------------------------------------------------------------

function MButtonGroup({
  color = 'primary',
  variant = 'outlined',
  children,
  className,
  ...other
}) {
  const classes = useStyles();

  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return (
      <ButtonGroup
        color={color}
        variant={variant}
        className={className}
        {...other}
      >
        {children}
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup
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
    </ButtonGroup>
  );
}

MButtonGroup.propTypes = {
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
    'error'
  ]),
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string
  ])
};

export default MButtonGroup;

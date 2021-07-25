import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Chip } from '@material-ui/core';
import { capitalize } from '@material-ui/core/utils';
import { alpha, makeStyles, emphasize } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  // Filled
  const styleFilled = (color) => {
    return {
      backgroundColor: theme.palette[color].main,
      color: theme.palette[color].contrastText,
      '& .MuiChip-deleteIcon': {
        color: alpha(theme.palette[color].contrastText, 0.7),
        '&:hover, &:active': {
          color: theme.palette[color].contrastText
        }
      },
      '& .MuiChip-avatar': {
        color: theme.palette[color].lighter,
        backgroundColor: theme.palette[color].dark
      },
      '& .MuiChip-icon': {
        color: 'inherit'
      }
    };
  };
  const styleFilledClickable = (color) => {
    return {
      '&:hover, &:focus': {
        backgroundColor: emphasize(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity
        )
      }
    };
  };
  const styleFilledDeletable = (color) => {
    return {
      '&:focus': {
        backgroundColor: emphasize(
          theme.palette[color].main,
          theme.palette.action.focusOpacity
        )
      }
    };
  };

  // Outlined
  const styleOutlined = (color) => {
    return {
      color: theme.palette[color].main,
      border: `1px solid ${theme.palette[color].main}`,
      backgroundColor: 'transparent',
      '&:focus, &.MuiChip-clickable:hover': {
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity
        )
      },
      '& .MuiChip-deleteIcon': {
        color: alpha(theme.palette[color].main, 0.7),
        '&:hover, &:active': {
          color: theme.palette[color].main
        }
      }
    };
  };

  return {
    // Filled
    colorInfo: styleFilled('info'),
    clickableColorInfo: styleFilledClickable('info'),
    deletableColorInfo: styleFilledDeletable('info'),

    colorSuccess: styleFilled('success'),
    clickableColorSuccess: styleFilledClickable('success'),
    deletableColorSuccess: styleFilledDeletable('success'),

    colorWarning: styleFilled('warning'),
    clickableColorWarning: styleFilledClickable('warning'),
    deletableColorWarning: styleFilledDeletable('warning'),

    colorError: styleFilled('error'),
    clickableColorError: styleFilledClickable('error'),
    deletableColorError: styleFilledDeletable('error'),

    // Outlined
    outlinedInfo: styleOutlined('info'),
    outlinedSuccess: styleOutlined('success'),
    outlinedWarning: styleOutlined('warning'),
    outlinedError: styleOutlined('error')
  };
});

// ----------------------------------------------------------------------

const Mchip = forwardRef(
  (
    {
      color = 'default',
      variant = 'filled',
      clickable: clickableProp,
      onDelete: onDeleteProp,
      className,
      ...other
    },
    ref
  ) => {
    const classes = useStyles();

    if (color === 'default' || color === 'primary' || color === 'secondary') {
      return (
        <Chip
          ref={ref}
          color={color}
          variant={variant}
          clickable={clickableProp && clickableProp}
          onDelete={onDeleteProp && onDeleteProp}
          className={className}
          {...other}
        />
      );
    }

    return (
      <Chip
        ref={ref}
        variant={variant}
        clickable={clickableProp && clickableProp}
        onDelete={onDeleteProp && onDeleteProp}
        className={clsx(
          classes[variant],
          {
            [classes[`color${capitalize(color)}`]]: color !== 'default',
            [classes[`clickableColor${capitalize(color)}`]]:
              clickableProp && color !== 'default',
            [classes[`deletableColor${capitalize(color)}`]]:
              onDeleteProp && color !== 'default',
            [classes.outlinedInfo]: variant === 'outlined' && color === 'info',
            [classes.outlinedSuccess]:
              variant === 'outlined' && color === 'success',
            [classes.outlinedWarning]:
              variant === 'outlined' && color === 'warning',
            [classes.outlinedError]: variant === 'outlined' && color === 'error'
          },
          className
        )}
        {...other}
      />
    );
  }
);

Mchip.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  clickableProp: PropTypes.bool,
  onDeleteProp: PropTypes.func,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error'
  ]),
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(['filled', 'outlined']),
    PropTypes.string
  ])
};

export default Mchip;

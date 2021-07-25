import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const isLight = theme.palette.mode === 'light';

  const styleFilled = (color) => {
    return {
      color: theme.palette[color].contrastText,
      backgroundColor: theme.palette[color].main
    };
  };

  const styleOutlined = (color) => {
    return {
      color: theme.palette[color].main,
      border: `1px solid ${theme.palette[color].main}`
    };
  };

  const styleGhost = (color) => {
    return {
      color: theme.palette[color][isLight ? 'dark' : 'light'],
      backgroundColor: alpha(theme.palette[color].main, 0.16)
    };
  };

  return {
    root: {
      height: 22,
      minWidth: 22,
      lineHeight: 0,
      borderRadius: 8,
      cursor: 'default',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      justifyContent: 'center',
      padding: theme.spacing(0, 1),
      color: theme.palette.grey['800'],
      fontSize: theme.typography.pxToRem(12),
      fontFamily: theme.typography.fontFamily,
      backgroundColor: theme.palette.grey['300'],
      fontWeight: theme.typography.fontWeightBold
    },

    // Filled
    filledPrimary: styleFilled('primary'),
    filledSecondary: styleFilled('secondary'),
    filledInfo: styleFilled('info'),
    filledSuccess: styleFilled('success'),
    filledWarning: styleFilled('warning'),
    filledError: styleFilled('error'),

    // Outlined
    outlined: {
      backgroundColor: 'transparent',
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.grey['500_32']}`
    },
    outlinedPrimary: styleOutlined('primary'),
    outlinedSecondary: styleOutlined('secondary'),
    outlinedInfo: styleOutlined('info'),
    outlinedSuccess: styleOutlined('success'),
    outlinedWarning: styleOutlined('warning'),
    outlinedError: styleOutlined('error'),

    // Ghost
    ghost: {
      color: isLight
        ? theme.palette.text.secondary
        : theme.palette.common.white,
      backgroundColor: theme.palette.grey['500_16']
    },
    ghostPrimary: styleGhost('primary'),
    ghostSecondary: styleGhost('secondary'),
    ghostInfo: styleGhost('info'),
    ghostSuccess: styleGhost('success'),
    ghostWarning: styleGhost('warning'),
    ghostError: styleGhost('error')
  };
});

function MLabel({
  color = 'default',
  variant = 'ghost',
  children,
  className,
  ...other
}) {
  const classes = useStyles();

  return (
    <Box
      component="span"
      className={clsx(
        classes.root,
        classes[variant],
        {
          [classes[`${variant}${capitalize(color)}`]]: color !== 'default'
        },
        className
      )}
      {...other}
    >
      {children}
    </Box>
  );
}

MLabel.propTypes = {
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
    'error'
  ]),
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost'])
};

export default MLabel;

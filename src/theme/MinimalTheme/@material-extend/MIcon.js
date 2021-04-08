import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { capitalize } from '@material-ui/core/utils';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const createStyle = (color) => {
    return {
      '& svg path': { fill: color }
    };
  };

  return {
    root: {
      lineHeight: 0,
      '& svg': { height: '100%' }
    },
    colorInitial: {},
    colorInherit: createStyle('currentColor'),
    colorAction: createStyle(theme.palette.action.active),
    colorDisabled: createStyle(theme.palette.action.disabled),
    colorPrimary: createStyle(theme.palette.primary.main),
    colorSecondary: createStyle(theme.palette.secondary.main),
    colorInfo: createStyle(theme.palette.info.main),
    colorSuccess: createStyle(theme.palette.success.main),
    colorWarning: createStyle(theme.palette.warning.main),
    colorError: createStyle(theme.palette.error.main),
    colorPaper: createStyle(theme.palette.background.paper)
  };
});

// ----------------------------------------------------------------------

function MIcon({ src, color = 'inherit', size = 24, className, ...other }) {
  const classes = useStyles();

  return (
    <ReactSVG
      src={src}
      beforeInjection={(svg) => {
        svg.setAttribute('style', `width: ${size}px`);
      }}
      className={clsx(
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color
        },
        className
      )}
      {...other}
    />
  );
}

MIcon.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.oneOf([
    'initial',
    'inherit',
    'action',
    'disabled',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'paper'
  ])
};

export default MIcon;

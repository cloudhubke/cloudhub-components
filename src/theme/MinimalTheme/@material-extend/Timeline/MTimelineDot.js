import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { TimelineDot } from '@material-ui/lab';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  // Filled
  filledInfo: { backgroundColor: theme.palette.info.main },
  filledSuccess: { backgroundColor: theme.palette.success.main },
  filledWarning: { backgroundColor: theme.palette.warning.main },
  filledError: { backgroundColor: theme.palette.error.main },

  // Outlined
  outlinedInfo: { borderColor: theme.palette.info.main },
  outlinedSuccess: { borderColor: theme.palette.success.main },
  outlinedWarning: { borderColor: theme.palette.warning.main },
  outlinedError: { borderColor: theme.palette.error.main }
}));

// ----------------------------------------------------------------------

function MTimelineDot({
  color = 'grey',
  variant = 'filled',
  className,
  ...other
}) {
  const classes = useStyles();

  if (
    color === 'grey' ||
    color === 'inherit' ||
    color === 'primary' ||
    color === 'secondary'
  ) {
    return (
      <TimelineDot
        color={color}
        variant={variant}
        className={className}
        {...other}
      />
    );
  }

  return (
    <TimelineDot
      variant={variant}
      className={clsx(
        classes[variant],
        {
          [classes[`${variant}${capitalize(color)}`]]: color
        },

        className
      )}
      {...other}
    />
  );
}

MTimelineDot.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'grey',
    'inherit',
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

export default MTimelineDot;

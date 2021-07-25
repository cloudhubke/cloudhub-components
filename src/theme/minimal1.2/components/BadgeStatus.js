import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    '&:before, &:after': {
      content: "''",
      borderRadius: 1,
      backgroundColor: theme.palette.common.white
    }
  },
  small: {
    height: theme.spacing(1),
    width: theme.spacing(1)
  },
  medium: {
    width: theme.spacing(1.25),
    height: theme.spacing(1.25)
  },
  offline: {
    backgroundColor: 'transparent'
  },
  away: {
    backgroundColor: theme.palette.warning.main,
    '&:before': {
      width: 2,
      height: 4,
      transform: 'translateX(1px) translateY(-1px)'
    },
    '&:after': {
      width: 2,
      height: 4,
      transform: 'translateY(1px) rotate(125deg)'
    }
  },
  busy: {
    backgroundColor: theme.palette.error.main,
    '&:before': { width: 6, height: 2 }
  },
  online: {
    backgroundColor: theme.palette.success.main
  },
  invisible: {
    backgroundColor: theme.palette.text.disabled,
    '&:before': { width: 6, height: 6, borderRadius: '50%' }
  },
  unread: {
    backgroundColor: theme.palette.info.main
  }
}));

// ----------------------------------------------------------------------

BadgeStatus.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  status: PropTypes.oneOf([
    'away',
    'busy',
    'unread',
    'online',
    'offline',
    'invisible'
  ]),
  className: PropTypes.string
};

function BadgeStatus({
  size = 'medium',
  status = 'offline',
  className,
  ...other
}) {
  const classes = useStyles();

  return (
    <Box
      component="span"
      className={clsx(
        classes.root,
        {
          [classes[size]]: size,
          [classes[status]]: status
        },
        className
      )}
      {...other}
    />
  );
}

export default BadgeStatus;

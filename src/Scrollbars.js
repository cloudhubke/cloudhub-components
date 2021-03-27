import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import 'simplebar/dist/simplebar.min.css';
import SimpleBarReact from 'simplebar-react';
import { alpha, makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = (absolute) =>
  makeStyles((theme) => ({
    root: {
      overflowY: 'hidden',
      overflowX: 'hidden',
      ...(absolute
        ? { right: 0, left: 0, top: 0, bottom: 0, position: 'absolute' }
        : { flexGrow: 1, height: '100%' }),
    },
    scroll: {
      maxHeight: '100%',
      display: 'flex',
      '& .simplebar-scrollbar': {
        '&:before': {
          backgroundColor: alpha(theme.palette.grey['600'], 0.48),
        },
        '&.simplebar-visible:before': {
          opacity: 1,
        },
      },
      '& .simplebar-vertical': {
        width: 10,
      },
      '& .simplebar-horizontal .simplebar-scrollbar': {
        height: 6,
      },
      '& .simplebar-mask': {
        zIndex: 'inherit',
      },
      '& .simplebar-content-wrapper::-webkit-scrollbar': {
        display: 'none',
      },
    },
  }));

// ----------------------------------------------------------------------

Scrollbars.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function Scrollbars({ children, className, absolute, ...other }) {
  const classes = useStyles(absolute)();

  return (
    <div className={classes.root}>
      <SimpleBarReact
        timeout={500}
        clickOnTrack={false}
        className={clsx(classes.scroll, className)}
        {...other}
      >
        {children}
      </SimpleBarReact>
    </div>
  );
}

export default Scrollbars;

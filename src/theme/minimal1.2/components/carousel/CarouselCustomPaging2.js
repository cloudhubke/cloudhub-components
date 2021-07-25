import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    listStyle: 'none',
    justifyContent: 'center',
    '& li': {
      width: 24,
      height: 24,
      opacity: 0.32,
      cursor: 'pointer',
      '&.slick-active': {
        opacity: 1,
        '& $dot': { width: 18, borderRadius: 8 }
      }
    }
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    transition: theme.transitions.create('width')
  }
}));

// ----------------------------------------------------------------------

CarouselCustomPaging1.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string
};

function CarouselCustomPaging1({ color, className, ...other }) {
  const classes = useStyles();

  return {
    appendDots: (dots) => (
      <>
        <Box
          component="ul"
          className={clsx(classes.root, className)}
          {...other}
        >
          {dots}
        </Box>
      </>
    ),
    customPaging: (dot) => (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          component="span"
          className={classes.dot}
          sx={{
            bgcolor: color ? color : 'primary.main'
          }}
        />
      </Box>
    )
  };
}

export default CarouselCustomPaging1;

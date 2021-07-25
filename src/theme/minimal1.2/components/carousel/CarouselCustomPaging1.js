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
    alignItems: 'center',
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    '& li': {
      width: 18,
      height: 18,
      opacity: 0.32,
      cursor: 'pointer',
      '&.slick-active': { opacity: 1 }
    }
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
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: color ? color : 'common.white'
          }}
        />
      </Box>
    )
  };
}

export default CarouselCustomPaging1;

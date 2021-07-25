import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { varWrapEnter } from '.';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

MotionContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node
};

function MotionContainer({ open, children, className, ...other }) {
  const classes = useStyles();

  return (
    <Box
      component={motion.div}
      initial={false}
      animate={open ? 'animate' : 'exit'}
      variants={varWrapEnter}
      className={clsx(classes.root, className)}
      {...other}
    >
      {children}
    </Box>
  );
}

export default MotionContainer;

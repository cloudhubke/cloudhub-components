import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { varFadeInUp } from '.';
import { motion, AnimatePresence } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: theme.palette.background.paper
  }
}));

// ----------------------------------------------------------------------

DialogAnimate.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

function DialogAnimate({
  open = false,
  onClose,
  children,
  className,
  ...other
}) {
  const classes = useStyles();

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={open}
          onClose={onClose}
          PaperComponent={motion.div}
          PaperProps={{ ...varFadeInUp }}
          classes={{ paper: classes.paper }}
          className={clsx(classes.root, className)}
          {...other}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
}

export default DialogAnimate;

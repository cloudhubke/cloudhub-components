import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

MotionInView.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.object,
  transition: PropTypes.object,
  triggerOnce: PropTypes.bool,
  threshold: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

function MotionInView({
  children,
  className,
  variants,
  transition,
  threshold,
  ...other
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: threshold ? threshold : 0,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start(Object.keys(variants)[1]);
    } else {
      controls.start(Object.keys(variants)[0]);
    }
  }, [controls, inView, variants]);

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={Object.keys(variants)[0]}
      animate={controls}
      variants={variants}
      transition={transition}
      className={className}
      {...other}
    >
      {children}
    </Box>
  );
}

export default MotionInView;

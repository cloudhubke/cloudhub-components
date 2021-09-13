import React from 'react';
import each from 'lodash/each';
import {
  ToastContainer as RootContainer,
  toast as roottoast,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { makeStyles } from '@mui/styles';
import colors from '../theme/Colors';

const ToastContainer = ({ constainerStyle, ...props }) => {
  const classes = makeStyles({
    toastcontainer: {
      '& .Toastify__toast--default': {
        background: colors.milkyWhite,
        color: colors.dark,
      },
      '& .Toastify__toast--info': {
        background: colors.info,
      },
      '& .Toastify__toast--success': {
        background: colors.success,
      },
      '& .Toastify__toast--warning': {
        background: colors.warning,
      },
      '& .Toastify__toast--error': {
        background: colors.danger,
      },
    },
    toast: {
      borderRadius: 5,
    },
  })();

  return (
    <RootContainer
      enableMultiContainer
      containerId="main"
      position={roottoast.POSITION.BOTTOM_RIGHT}
      className={classes.toastcontainer}
      toastClassName={classes.toast}
      hideProgressBar
      {...props}
    />
  );
};

ToastContainer.defaultProps = {
  constainerStyle: {
    borderRadius: 5,
  },
};

const defaultOptions = {
  containerId: 'main',
};

const toast = (content, options = {}) => {
  const newOptions = { ...defaultOptions, ...options };
  roottoast(content, newOptions);
};

each(roottoast, (value, key) => {
  toast[key] = value;
});

toast.success = (content, options) => {
  const newOptions = { ...defaultOptions, ...options };
  roottoast.success(content, newOptions);
};
toast.info = (content, options) => {
  const newOptions = { ...defaultOptions, ...options };
  roottoast.info(content, newOptions);
};
toast.warn = (content, options) => {
  const newOptions = { ...defaultOptions, ...options };
  roottoast.warn(content, newOptions);
};
toast.error = (content, options) => {
  const newOptions = { ...defaultOptions, ...options };
  roottoast.error(content, newOptions);
};

export { ToastContainer, toast };

export default toast;

import React from 'react';
import { SlideComponent } from 'components';
import MuiDialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../theme';

const getAnimation = animation => {
  switch (animation) {
    case 'slide':
      return {
        TransitionComponent: SlideComponent,
      };

    default:
      return {};
  }
};

const getStyles = ({ minHeight, height, fullScreen, style }) => {
  const useStyles = makeStyles({
    paper: {
      ...(!fullScreen && { minHeight, height }),
      backgroundColor: colors.milkyWhite,
      ...style,
    },
  });

  return {
    useStyles,
  };
};

const Dialog = ({
  paper,
  maxWidth,
  minHeight,
  maxHeight,
  fullScreen,
  open,
  animation,
  onClose,
  children,
  title,
  ...props
}) => {
  const classes = getStyles({ minHeight, maxHeight, fullScreen }).useStyles();

  const dialogprops = {
    ...(!fullScreen && { maxWidth }),
    fullScreen,
  };

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      {...dialogprops}
      {...getAnimation(animation)}
      classes={{ paper: classes.paper }}
      {...props}
    >
      {children}
    </MuiDialog>
  );
};
Dialog.defaultProps = {
  paper: false,
  maxWidth: 'lg',
  fullWidth: true,
  open: false,
  onClose: () => {},
  animation: 'slide',
  height: 'auto',
  minHeight: 500,
  tabs: null,
  actions: null,
};

export default Dialog;

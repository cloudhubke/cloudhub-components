import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import SlideComponent from '../SlideComponent';
import ThemeContext from '../theme/ThemeContext';

const getAnimation = (animation) => {
  switch (animation) {
    case 'slide':
      return {
        TransitionComponent: SlideComponent,
      };

    default:
      return {};
  }
};

const getStyles = ({ minHeight, height, fullScreen, colors, style }) => {
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
  children,
  title,
  ...props
}) => {
  const { colors } = React.useContext(ThemeContext);
  const classes = getStyles({
    minHeight,
    maxHeight,
    fullScreen,
    colors,
  }).useStyles();

  const dialogprops = {
    ...(!fullScreen && { maxWidth }),
    fullScreen,
  };

  const closeDialog = () => {
    props.onClose();
  };

  const fn = (child) => {
    if (!child) {
      return null;
    }
    if (child.props.onClose && typeof child.props.onClose === 'function') {
      return React.cloneElement(child, {
        ...child.props,
        onClose: closeDialog,
      });
    }

    return child;
  };
  const childitems = React.Children.map(children, fn);

  return (
    <MuiDialog
      open={open}
      onClose={props.onClose}
      {...dialogprops}
      {...getAnimation(animation)}
      classes={{ paper: classes.paper }}
      {...props}
    >
      {childitems}
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

import React from 'react';
import AntPopOver from 'antd/lib/popover';

import 'antd/lib/popover/style/index.css';
// import './popover.css';

import { makeStyles } from '@mui/styles';

import ThemeContext from '../theme/ThemeContext';

const useStyles = ({
  fonts,
  padding,
  sizes,
  style,
  containerStyles,
  arrowStyles,
}) =>
  makeStyles({
    popper: {
      ...fonts.default,
      zIndex: 1,

      '& [class*=" ant-popover-placement-bottom"]': {
        paddingTop: padding,
      },
      '& [class*=" ant-popover-placement-top"]': {
        paddingBottom: padding,
      },
      '& [class*=" ant-popover-placement-left"]': {
        paddingRight: padding,
      },
      '& [class*=" ant-popover-placement-right"]': {
        paddingLeft: padding,
      },
      '& div.ant-popover-arrow': {
        width: padding * 2,
        height: padding * 2,
        margin: -5,
        boxShadow: '-2px -2px 5px rgba(0, 0, 0, 0.06)',
        ...arrowStyles,
      },
      '& div.ant-popover-inner-content': {
        padding: 0,
        ...containerStyles,
      },
    },
    overlay: {
      ...fonts.default,
      margin: 1,
      ...style,
    },
  });

const PopOver = ({
  style,
  arrowStyle,
  containerStyle,
  color = '#FFF',
  padding = 15,
  ...props
}) => {
  const { fonts, sizes } = React.useContext(ThemeContext);
  const arrowStyles = {
    ...(color
      ? {
          backgroundColor: color,
          background: color,
          borderTopColor: color,
          borderBottomColor: color,
          borderLeft: color,
          borderRightColor: color,
        }
      : {}),
    borderWidth: 0,
    boxShadow: '-2px -2px 5px rgba(0, 0, 0, 0.06)',
    ...arrowStyle,
  };

  const containerStyles = {
    padding: sizes.padding,
    ...containerStyle,
  };

  const classes = useStyles({
    padding,
    fonts,
    style,
    containerStyles,
    arrowStyles,
  })();

  return (
    <div className={classes.popper}>
      <AntPopOver overlayClassName={classes.overlay} {...props} />
    </div>
  );
};

export default PopOver;

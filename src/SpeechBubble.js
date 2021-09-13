import React from 'react';
import { makeStyles } from '@mui/styles';
import Block from './Block';
import ThemeContext from './theme/ThemeContext';

const useStyles = makeStyles({
  speech: (props) => ({
    width: props.width || 'auto',
    minHeight: props.height,
    maxHeight: props.height,
    border: `1px solid ${props.borderColor}`,
    borderRadius: 10,
    boxShadow: props.noshadow ? 'none' : `2px 2px 4px ${props.borderColor}`,
    position: 'relative',
    margin: 20,
    '&::before': {
      content: '" "',
      position: 'absolute',
      width: 0,
      height: 0,
      left: () => {
        if (props.top || props.bottom) return '50%';
        if (props.topleft || props.bottomleft) return 30;
        if (props.left || props.leftbottom || props.lefttop) return -20;
        return 'auto';
      },
      right: () => {
        if (props.top || props.bottom) return '50%';
        if (props.topright) return 30;
        if (props.bottomright) return 28;
        if (props.right || props.rightbottom || props.righttop) return -20;
        return 'auto';
      },
      bottom: () => {
        if (props.right || props.left) return '50%';
        if (props.bottom) return -40;
        if (props.bottomright || props.bottomleft) return -20;
        if (props.leftbottom || props.rightbottom) return 12;
        return 'auto';
      },
      top: () => {
        if (props.topright || props.topleft) return -20;
        if (props.top) return -40;
        if (props.right || props.left) return '50%';
        if (props.righttop || props.lefttop) return 18;
        return 'auto';
      },
      border: () => {
        if (props.top || props.bottom) {
          return '20px solid';
        }
        return '10px solid';
      },
      borderColor: () => {
        if (props.bottomleft) {
          return `${props.borderColor} ${props.borderColor} transparent transparent`;
        }
        if (props.bottom) {
          return `${props.borderColor} transparent transparent transparent`;
        }
        if (props.bottomright) {
          return `${props.borderColor} transparent transparent ${props.borderColor}`;
        }
        if (props.rightbottom) {
          return `${props.borderColor} transparent transparent ${props.borderColor}`;
        }
        if (props.right) {
          return `${props.borderColor} transparent transparent ${props.borderColor}`;
        }
        if (props.righttop) {
          return `transparent transparent ${props.borderColor} ${props.borderColor}`;
        }
        if (props.topright) {
          return `transparent transparent ${props.borderColor} ${props.borderColor}`;
        }
        if (props.top) {
          return `transparent transparent ${props.borderColor} transparent`;
        }
        if (props.topleft) {
          return `transparent ${props.borderColor} ${props.borderColor} transparent`;
        }
        if (props.lefttop) {
          return `transparent ${props.borderColor} ${props.borderColor} transparent`;
        }
        if (props.left) {
          return `${props.borderColor} ${props.borderColor} transparent transparent`;
        }
        if (props.leftbottom) {
          return `${props.borderColor} ${props.borderColor} transparent  transparent`;
        }
        return 'transparent';
      },
    },
    '&::after ': {
      content: '" "',
      position: 'absolute',
      width: 0,
      height: 0,
      marginLeft: () => {
        if (props.bottom || props.top) {
          return 10;
        }
        return 0;
      },
      marginTop: () => {
        if (props.right || props.left) {
          return 2;
        }
        return 0;
      },
      left: () => {
        if (props.top || props.bottom) return '50%';
        if (props.topleft || props.bottomleft) return 33;
        if (props.left || props.leftbottom || props.lefttop) return -10;
        return 'auto';
      },
      right: () => {
        if (props.top || props.bottom) return '50%';
        if (props.bottomright) return 35;
        if (props.topright) return 37;
        if (props.right || props.rightbottom || props.righttop) return -10;
        return 'auto';
      },
      bottom: () => {
        if (props.right || props.left) return '50%';
        if (props.bottom) return -20;
        if (props.bottom || props.bottomright || props.bottomleft) return -10;
        if (props.leftbottom || props.rightbottom) return 20;
        return 'auto';
      },
      top: () => {
        if (props.topright || props.topleft) return -10;
        if (props.top) return -20;
        if (props.right || props.left) return '50%';
        if (props.righttop || props.lefttop) return 20;
        return 'auto';
      },
      border: () => {
        if (props.top || props.bottom) {
          return '10px solid';
        }
        return '5px solid';
      },
      borderColor: () => {
        if (props.bottomleft) {
          return `${props.color} ${props.color} transparent transparent`;
        }
        if (props.bottom) {
          return `${props.color} transparent transparent transparent`;
        }
        if (props.bottomright) {
          return `${props.color} transparent transparent ${props.color}`;
        }
        if (props.rightbottom) {
          return `${props.color} transparent transparent ${props.color}`;
        }
        if (props.right) {
          return `${props.color} transparent transparent ${props.color}`;
        }
        if (props.righttop) {
          return `transparent transparent ${props.color} ${props.color}`;
        }
        if (props.topright) {
          return `transparent transparent ${props.color} ${props.color}`;
        }
        if (props.top) {
          return `transparent transparent ${props.color}  transparent`;
        }
        if (props.topleft) {
          return `transparent ${props.color} ${props.color} transparent`;
        }
        if (props.lefttop) {
          return `transparent ${props.color} ${props.color} transparent`;
        }
        if (props.left) {
          return `${props.color} ${props.color} transparent transparent`;
        }
        if (props.leftbottom) {
          return `${props.color} ${props.color} transparent transparent`;
        }
        return 'transparent';
      },
    },
  }),
});

const SpeechBubble = ({
  borderColor,
  color,
  width,
  height,
  top,
  bottom,
  right,
  left,
  topright,
  bottomright,
  righttop,
  lefttop,
  topleft,
  bottomleft,
  rightbottom,
  leftbottom,
  noshadow,
  ...props
}) => {
  const { sizes } = React.useContext(ThemeContext);
  const classes = useStyles({
    width,
    height,
    borderColor,
    color,
    top,
    bottom,
    right,
    left,
    topright,
    bottomright,
    righttop,
    lefttop,
    topleft,
    bottomleft,
    rightbottom,
    leftbottom,
    noshadow,
  });

  return (
    <Block className={classes.speech} padding={sizes.padding} color={color}>
      {props.children}
    </Block>
  );
};
export default SpeechBubble;

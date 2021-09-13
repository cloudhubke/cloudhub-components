// just copy this code from the driving repo :)

import React from 'react';

import { makeStyles } from '@mui/styles';
import { Slide, Grow, Paper } from '@mui/material';
import classNames from 'classnames';
import ThemeContext from './theme/ThemeContext';

const useStyles = () =>
  makeStyles({
    shadowhover: {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      '&:hover': {
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      },
    },
  });

let styles;

const Block = React.forwardRef((props, ref) => {
  const { colors, sizes } = React.useContext(ThemeContext);

  const classes = useStyles();
  if (!styles) {
    styles = createStyles({ sizes, colors });
  }

  const handleMargins = () => {
    const { margin } = props;
    if (typeof margin === 'number') {
      return {
        marginTop: margin,
        marginRight: margin,
        marginBottom: margin,
        marginLeft: margin,
      };
    }

    if (typeof margin === 'object') {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: margin[0],
            marginRight: margin[0],
            marginBottom: margin[0],
            marginLeft: margin[0],
          };
        case 2:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[0],
            marginLeft: margin[1],
          };
        case 3:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[1],
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3],
          };
      }
    }
    return null;
  };

  const handlePaddings = () => {
    const { padding } = props;
    if (typeof padding === 'number') {
      return {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding,
      };
    }

    if (typeof padding === 'object') {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: padding[0],
            paddingRight: padding[0],
            paddingBottom: padding[0],
            paddingLeft: padding[0],
          };
        case 2:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[0],
            paddingLeft: padding[1],
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[1],
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3],
          };
      }
    }
    return null;
  };

  const {
    absolute,
    flex,
    row,
    column,
    wrap,
    center,
    middle,
    left,
    right,
    top,
    bottom,
    margin,
    padding,
    card,
    shadow,
    shadowhover,
    elevation,
    color,
    space,
    style,
    animated,
    slideAnimated,
    animationDirection,
    paper,
    visible,
    children,
    ...rest
  } = props;

  const blockStyles = {
    ...(flex === false
      ? { display: 'flex', position: 'relative', flexDirection: 'column' }
      : { ...styles.block }), // reset / disable flex
    ...(row && styles.row),
    ...(absolute && {
      position: 'absolute',
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
    }),
    ...(column && styles.column),
    ...(wrap && { flexWrap: 'wrap' }),
    ...(center && (row ? { justifyContent: 'center' } : styles.center)),
    ...(middle && (row ? { alignItems: 'center' } : styles.middle)),
    ...(left && (row ? { justifyContent: 'flex-start' } : styles.left)),
    ...(right && (row ? { justifyContent: 'flex-end' } : styles.right)),
    ...(top && (row ? { alignItems: 'flex-start' } : styles.top)),
    ...(bottom && (row ? { alignItems: 'flex-end' } : styles.bottom)),
    ...(margin && { ...handleMargins() }),
    ...(padding && { ...handlePaddings() }),
    ...(card && styles.card),
    ...(shadow && styles.shadow),
    ...(shadowhover && styles.shadowhover),
    ...(elevation && { elevation }),
    ...(space && { justifyContent: `space-${space}` }),
    ...(color && styles[color]), // predefined styles colors for backgroundColor
    ...(color && !styles[color] && { backgroundColor: color }), // custom backgroundColor
    ...style, // rewrite predefined styles
  };

  if (animated) {
    return (
      <Grow in={visible}>
        <div ref={ref} style={blockStyles} {...rest}>
          {children}
        </div>
      </Grow>
    );
  }

  if (slideAnimated) {
    return (
      <Slide
        direction={animationDirection || 'up'}
        in={visible}
        mountOnEnter
        unmountOnExit
      >
        <div ref={ref} style={blockStyles} {...rest}>
          {children}
        </div>
      </Slide>
    );
  }

  if (paper) {
    return (
      <Paper
        ref={ref}
        className={classNames({ [classes.shadowhover]: shadowhover })}
        elevation={elevation >= 0 ? elevation : 1}
        style={blockStyles}
        {...rest}
      >
        {children}
      </Paper>
    );
  }

  return (
    <div
      ref={ref}
      className={classNames({ [classes.shadowhover]: shadowhover })}
      style={blockStyles}
      {...rest}
    >
      {children}
    </div>
  );
});

const createStyles = ({ sizes, colors }) => ({
  block: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: sizes.border,
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  shadow: {
    // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)',
    transition: 'all .2s ease-in-out',
  },
  accent: { backgroundColor: colors.accent },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondary },
  tertiary: { backgroundColor: colors.tertiary },
  black: { backgroundColor: colors.black },
  white: { backgroundColor: colors.white },
  gray: { backgroundColor: colors.gray },
  gray2: { backgroundColor: colors.gray2 },
  gray3: { backgroundColor: colors.gray3 },
  gray4: { backgroundColor: colors.gray4 },
  dark: { backgroundColor: colors.dark },
  mistyWhite: { backgroundColor: colors.mistyWhite },
  milkyWhite: { backgroundColor: colors.milkyWhite },
  error: { backgroundColor: colors.error },
  clear: { backgroundColor: colors.clear },
  facebook: { backgroundColor: colors.facebook },
  transparent: { backgroundColor: colors.transparent },
  silver: { backgroundColor: colors.silver },
  steel: { backgroundColor: colors.steel },
  ricePaper: { backgroundColor: colors.ricePaper },
  frost: { backgroundColor: colors.frost },
  cloud: { backgroundColor: colors.cloud },
  windowTint: { backgroundColor: colors.windowTint },
  panther: { backgroundColor: colors.panther },
  charcoal: { backgroundColor: colors.charcoal },
  coal: { backgroundColor: colors.coal },
  bloodOrange: { backgroundColor: colors.bloodOrange },
  snow: { backgroundColor: colors.snow },
  ember: { backgroundColor: colors.ember },
  fire: { backgroundColor: colors.fire },
  drawer: { backgroundColor: colors.drawer },
  eggplant: { backgroundColor: colors.eggplant },

  twitterColor: { backgroundColor: colors.twitterColor },
  facebookColor: { backgroundColor: colors.twitterColor },
  googleColor: { backgroundColor: colors.twitterColor },
  linkedinColor: { backgroundColor: colors.twitterColor },
  pinterestColor: { backgroundColor: colors.twitterColor },
  youtubeColor: { backgroundColor: colors.twitterColor },
  tumblrColor: { backgroundColor: colors.twitterColor },
  behanceColor: { backgroundColor: colors.twitterColor },
  dribbbleColor: { backgroundColor: colors.twitterColor },
  redditColor: { backgroundColor: colors.twitterColor },
  instagramColor: { backgroundColor: colors.twitterColor },
  success: { backgroundColor: colors.success },
  info: { backgroundColor: colors.info },
  rose: { backgroundColor: colors.rose },
  warning: { backgroundColor: colors.warning },
  danger: { backgroundColor: colors.danger },
});

Block.defaultProps = {
  visible: true,
};

export default Block;

import React from 'react';
import MuiContainer from '@mui/material/Container';
import { useMetrics } from './customhooks';
import ThemeContext from './theme/ThemeContext';

let styles;

const Container = ({
  children,
  color,
  style,
  flex,
  row,
  column,
  center,
  middle,
  padding,
  margin,
  bottom,
  top,
  right,
  left,
  wrap,
  maxWidth: mxWidth,
  ...otherprops
}) => {
  const { maxWidth } = mxWidth ? { maxWidth: mxWidth } : useMetrics();
  const { colors, sizes } = React.useContext(ThemeContext);

  if (!styles) {
    styles = createStyles({ colors, sizes });
  }

  const handleMargins = () => {
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

  const containerStyles = {
    ...styles.containerStyles,
    ...(flex && { flex: 1 }),
    ...(row && styles.row),
    ...(column && styles.column),
    ...(wrap && { flexWrap: 'wrap' }),
    ...(center && (row ? { justifyContent: 'center' } : styles.center)),
    ...(middle && (row ? { alignItems: 'center' } : styles.middle)),
    ...(left && (row ? { justifyContent: 'flex-start' } : styles.left)),
    ...(right && (row ? { justifyContent: 'flex-end' } : styles.right)),
    ...(top && (row ? { alignItems: 'flex-start' } : styles.top)),
    ...(bottom && (row ? { alignItems: 'flex-end' } : styles.bottom)),
    ...(margin === 0
      ? { ...handleMargins() }
      : margin && { ...handleMargins() }),
    ...(padding === 0
      ? { ...handlePaddings() }
      : padding && { ...handlePaddings() }),

    ...(color && styles[color]), // predefined styles colors for backgroundColor
    ...(color && !styles[color] && { backgroundColor: color }), // custom backgroundColor
    ...style, // rewrite predefined styles
  };

  return (
    <MuiContainer style={containerStyles} maxWidth={maxWidth} {...otherprops}>
      {children}
    </MuiContainer>
  );
};

const createStyles = ({ colors }) => ({
  containerStyles: {
    display: 'flex',
    position: 'relative',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
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

export default Container;

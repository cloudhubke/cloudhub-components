import React from 'react';
import MuiIconButton from '@mui/material/IconButton';
import Block from './Block';
import ThemeContext from './theme/ThemeContext';

let styles;

const IconButton = React.forwardRef((props, ref) => {
  const { children, outlined, padding, margin, color, size, style, ...rest } =
    props;
  const { colors } = React.useContext(ThemeContext);

  if (!styles) {
    styles = createStyles({ colors });
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

  const buttonStyles = {
    ...styles.button,
    ...(size && { height: size, width: size }),
    ...(margin && { ...handleMargins() }),
    ...(padding && { ...handlePaddings() }),
    ...(color && styles[color]), // predefined styles colors for backgroundColor
    ...(color && !styles[color] && { backgroundColor: color }), // custom backgroundColor
    ...(outlined && {
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: 0.5,
      display: 'flex',
    }),
    ...style,
  };

  return (
    <Block row flex={false}>
      <MuiIconButton ref={ref} {...rest} style={buttonStyles}>
        {children}
      </MuiIconButton>
    </Block>
  );
});
const createStyles = ({ colors }) => ({
  button: {
    height: 'auto',
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  },
  accent: { backgroundColor: colors.accent, borderColor: colors.accent },
  primary: { backgroundColor: colors.primary, borderColor: colors.primary },
  secondary: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  tertiary: { backgroundColor: colors.tertiary, borderColor: colors.tertiary },
  black: { backgroundColor: colors.black, borderColor: colors.black },
  white: { backgroundColor: colors.white, borderColor: colors.white },
  gray: { backgroundColor: colors.gray, borderColor: colors.gray },
  gray2: { backgroundColor: colors.gray2, borderColor: colors.gray2 },
  gray3: { backgroundColor: colors.gray3, borderColor: colors.gray3 },
  gray4: { backgroundColor: colors.gray4, borderColor: colors.gray4 },
  dark: { backgroundColor: colors.dark, borderColor: colors.dark },
  mistyWhite: {
    backgroundColor: colors.mistyWhite,
    borderColor: colors.mistyWhite,
  },
  milkyWhite: {
    backgroundColor: colors.milkyWhite,
    borderColor: colors.milkyWhite,
  },
  error: { backgroundColor: colors.error, borderColor: colors.error },
  clear: { backgroundColor: colors.clear, borderColor: colors.clear },
  facebook: { backgroundColor: colors.facebook, borderColor: colors.facebook },
  transparent: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
  },
  silver: { backgroundColor: colors.silver, borderColor: colors.silver },
  steel: { backgroundColor: colors.steel, borderColor: colors.steel },
  ricePaper: {
    backgroundColor: colors.ricePaper,
    borderColor: colors.ricePaper,
  },
  frost: { backgroundColor: colors.frost, borderColor: colors.frost },
  cloud: { backgroundColor: colors.cloud, borderColor: colors.cloud },
  windowTint: {
    backgroundColor: colors.windowTint,
    borderColor: colors.windowTint,
  },
  panther: { backgroundColor: colors.panther, borderColor: colors.panther },
  charcoal: { backgroundColor: colors.charcoal, borderColor: colors.charcoal },
  coal: { backgroundColor: colors.coal, borderColor: colors.coal },
  bloodOrange: {
    backgroundColor: colors.bloodOrange,
    borderColor: colors.bloodOrange,
  },
  snow: { backgroundColor: colors.snow, borderColor: colors.snow },
  ember: { backgroundColor: colors.ember, borderColor: colors.ember },
  fire: { backgroundColor: colors.fire, borderColor: colors.fire },
  drawer: { backgroundColor: colors.drawer, borderColor: colors.drawer },
  eggplant: { backgroundColor: colors.eggplan, borderColor: colors.eggplantt },
});

export default IconButton;

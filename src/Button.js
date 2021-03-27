import React from 'react';
import MuiButton from '@material-ui/core/Button';
import ThemeContext from './theme/ThemeContext';
import hexContrastColor from 'hex-contrast-color';

let height = 48;

const Button = React.forwardRef(
  (
    {
      children,
      flat,
      outlined,
      contained,
      small,
      medium,
      large,
      rounded,
      padding,
      margin,
      color,
      textColor,
      style,
      disabled,

      primary,
      secondary,
      tertiary,
      success,
      danger,
      info,

      ...props
    },
    ref
  ) => {
    const { sizes, colors } = React.useContext(ThemeContext);

    const styles = {
      button: {
        textTransform: 'none',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: sizes.padding,
        paddingRight: sizes.padding,
        height: sizes.inputHeight,
        display: 'flex',
        flexDirection: 'row',
      },
      accent: {
        backgroundColor: colors.accent,
        borderColor: colors.accent,
      },
      primary: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      },
      secondary: {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
      },
      tertiary: {
        backgroundColor: colors.tertiary,
        borderColor: colors.tertiary,
      },
      black: {
        backgroundColor: colors.black,
        borderColor: colors.black,
      },
      white: {
        backgroundColor: colors.white,
        borderColor: colors.white,
      },
      gray: {
        backgroundColor: colors.gray,
        borderColor: colors.gray,
      },
      gray2: {
        backgroundColor: colors.gray2,
        borderColor: colors.gray2,
      },
      gray3: {
        backgroundColor: colors.gray3,
        borderColor: colors.gray3,
      },
      gray4: {
        backgroundColor: colors.gray4,
        borderColor: colors.gray4,
      },
      dark: { backgroundColor: colors.dark, borderColor: colors.dark },
      mistyWhite: {
        backgroundColor: colors.mistyWhite,
        borderColor: colors.mistyWhite,
      },
      milkyWhite: {
        backgroundColor: colors.milkyWhite,
        borderColor: colors.milkyWhite,
      },
      error: {
        backgroundColor: colors.error,
        borderColor: colors.error,
      },
      clear: {
        backgroundColor: colors.clear,
        borderColor: colors.clear,
      },
      facebook: {
        backgroundColor: colors.facebook,
        borderColor: colors.facebook,
      },
      transparent: {
        backgroundColor: colors.transparent,
        borderColor: colors.transparent,
      },
      silver: {
        backgroundColor: colors.silver,
        borderColor: colors.silver,
      },
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
      charcoal: {
        backgroundColor: colors.charcoal,
        borderColor: colors.charcoal,
      },
      coal: {
        backgroundColor: colors.coal,
        borderColor: colors.coal,
      },
      bloodOrange: {
        backgroundColor: colors.bloodOrange,
        borderColor: colors.bloodOrange,
      },
      snow: {
        backgroundColor: colors.snow,
        borderColor: colors.snow,
      },
      ember: {
        backgroundColor: colors.ember,
        borderColor: colors.ember,
      },
      fire: {
        backgroundColor: colors.fire,
        borderColor: colors.fire,
      },
      drawer: { backgroundColor: colors.drawer, borderColor: colors.drawer },
      eggplant: {
        backgroundColor: colors.eggplan,
        borderColor: colors.eggplantt,
      },
      twitterColor: {
        backgroundColor: colors.twitterColor,
        borderColor: colors.twitterColor,
      },
      facebookColor: {
        backgroundColor: colors.twitterColor,
        borderColor: colors.facebookColor,
      },
      googleColor: {
        backgroundColor: colors.twitterColor,
        borderColor: colors.googleColor,
      },
      linkedinColor: {
        backgroundColor: colors.twitterColor,
        borderColor: colors.linkedinColor,
      },
      pinterestColor: {
        backgroundColor: colors.twitterColor,
        borderColor: colors.pinterestColor,
      },
      youtubeColor: {
        backgroundColor: colors.twitterColor,
        borderColor: colors.youtubeColor,
      },
      tumblrColor: {
        backgroundColor: colors.twitterColor,
        borderColor: colors.tumblrColor,
      },
      behanceColor: {
        backgroundColor: colors.twitterColor,
        borderColor: colors.behanceColor,
      },
      dribbbleColor: {
        backgroundColor: colors.twitterColor,
        borderColor: colors.dribbbleColor,
      },
      redditColor: {
        backgroundColor: colors.twitterColor,
        borderColor: colors.redditColor,
      },
      instagramColor: {
        backgroundColor: colors.twitterColor,
        borderColor: colors.instagramColor,
      },
      success: {
        backgroundColor: colors.success,
        borderColor: colors.success,
      },
      info: {
        backgroundColor: colors.info,
        borderColor: colors.info,
      },
      rose: {
        backgroundColor: colors.rose,
        borderColor: colors.rose,
      },
      warning: {
        backgroundColor: colors.warning,
        borderColor: colors.warning,
      },
      danger: {
        backgroundColor: colors.danger,
        borderColor: colors.danger,
      },
    };

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

    const buttonProps = {
      ...{},
      ...(contained && { variant: 'contained' }),
      ...(outlined && { variant: 'outlined' }),
      ...(small && { size: 'small' }),
      ...(medium && { size: 'medium' }),
      ...(large && { size: 'large' }),
    };

    const getHeight = (newHeight) => {
      height = newHeight;
      return height;
    };

    const buttonStyles = props.className
      ? {}
      : {
          ...styles.button,
          ...(large && { height: getHeight(64), padding: '0, 15px' }),
          ...(medium && { height: getHeight(48), padding: '0, 15px' }),
          ...(small && { height: getHeight(32), padding: '0, 15px' }),
          ...(margin && { ...handleMargins() }),
          ...(padding && { ...handlePaddings() }),
          ...(color && styles[color]), // predefined styles colors for backgroundColor
          ...(primary && styles[primary]),
          ...(secondary && styles[secondary]),
          ...(tertiary && styles[tertiary]),
          ...(info && styles[info]),
          ...(success && styles[success]),
          ...(danger && styles[danger]),
          ...(color && !styles[color] && { backgroundColor: color }), // custom backgroundColor
          ...(outlined && { backgroundColor: 'transparent' }),
          ...(rounded && { borderRadius: height / 2 }),
          ...(disabled && { opacity: 0.7 }),
          ...style,
        };

    return (
      <MuiButton
        ref={ref}
        style={{
          ...buttonStyles,
          color: hexContrastColor(buttonStyles.backgroundColor),
        }}
        {...buttonProps}
        disabled={disabled}
        {...props}
      >
        {children}
      </MuiButton>
    );
  }
);

export default Button;

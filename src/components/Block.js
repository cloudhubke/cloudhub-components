// just copy this code from the driving repo :)

import React, { Component } from 'react';
import Grow from '@material-ui/core/Grow';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import { sizes, colors } from './theme';

class Block extends Component {
  static defaultProps = {
    visible: true
  };

  handleMargins() {
    const { margin } = this.props;
    if (typeof margin === 'number') {
      return {
        marginTop: margin,
        marginRight: margin,
        marginBottom: margin,
        marginLeft: margin
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
            marginLeft: margin[0]
          };
        case 2:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[0],
            marginLeft: margin[1]
          };
        case 3:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[1]
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3]
          };
      }
    }
    return null;
  }

  handlePaddings() {
    const { padding } = this.props;
    if (typeof padding === 'number') {
      return {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding
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
            paddingLeft: padding[0]
          };
        case 2:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[0],
            paddingLeft: padding[1]
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[1]
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3]
          };
      }
    }
    return null;
  }

  render() {
    const {
      classes,
      flex,
      row,
      column,
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
      children,
      visible,
      ...props
    } = this.props;

    const blockStyles = {
      ...(flex === false
        ? { display: 'flex', position: 'relative', flexDirection: 'column' }
        : { ...styles.block }), // reset / disable flex
      ...(row && styles.row),
      ...(column && styles.column),
      ...(center && (row ? { justifyContent: 'center' } : styles.center)),
      ...(middle && (row ? { alignItems: 'center' } : styles.middle)),
      ...(left && (row ? { justifyContent: 'flex-start' } : styles.left)),
      ...(right && (row ? { justifyContent: 'flex-end' } : styles.right)),
      ...(top && (row ? { alignItems: 'flex-start' } : styles.top)),
      ...(bottom && (row ? { alignItems: 'flex-end' } : styles.bottom)),
      ...(margin && { ...this.handleMargins() }),
      ...(padding && { ...this.handlePaddings() }),
      ...(card && styles.card),
      ...(shadow && styles.shadow),
      ...(shadowhover && styles.shadowhover),
      ...(elevation && { elevation }),
      ...(space && { justifyContent: `space-${space}` }),
      ...(color && styles[color]), // predefined styles colors for backgroundColor
      ...(color && !styles[color] && { backgroundColor: color }), // custom backgroundColor
      ...style // rewrite predefined styles
    };

    if (animated) {
      return (
        <Grow in={visible}>
          <div style={blockStyles} {...props}>
            {children}
          </div>
        </Grow>
      );
    }

    return (
      <div
        className={classNames({ [classes.shadowhover]: shadowhover })}
        style={blockStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
}

export const styles = {
  block: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  card: {
    borderRadius: sizes.border
  },
  center: {
    alignItems: 'center'
  },
  middle: {
    justifyContent: 'center'
  },
  left: {
    alignItems: 'flex-start'
  },
  right: {
    alignItems: 'flex-end'
  },
  top: {
    justifyContent: 'flex-start'
  },
  bottom: {
    justifyContent: 'flex-end'
  },
  shadow: {
    // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)',
    transition: 'all .2s ease-in-out'
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
  success: { backgroundColor: colors.successColor[0] },
  info: { backgroundColor: colors.infoColor[0] },
  rose: { backgroundColor: colors.roseColor[0] },
  warning: { backgroundColor: colors.warningColor[0] },
  danger: { backgroundColor: colors.dangerColor[0] }
};

const classStyles = () => ({
  shadowhover: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',

    '&:hover': {
      boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
    }
  }
});
export default withStyles(classStyles)(Block);

import React, { Component } from 'react';

import { sizes } from './theme';
import Block from './Block';

export default class Badge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, style, size, color, ...props } = this.props;

    const badgeStyles = {
      ...{
        height: sizes.base || size,
        width: sizes.base || size,
        borderRadius: size ? size / 2 : sizes.base / 2,
      },
      ...(size && {
        minWidth: size,
        minHeight: size,
        borderRadius: size / 2,
      }),
      ...style,
    };

    return (
      <Block
        flex={false}
        middle
        center
        color={color}
        style={badgeStyles}
        {...props}
      >
        {children}
      </Block>
    );
  }
}

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
        borderRadius: '50%',
        height: 'auto',
        width: 'auto'
      },
      ...(size && {
        minWidth: size,
        minHeight: size
      }),
      ...style
    };

    return (
      <span>
        <Block
          flex={false}
          row
          middle
          center
          color={color}
          style={badgeStyles}
          {...props}
        >
          {children}
        </Block>
      </span>
    );
  }
}

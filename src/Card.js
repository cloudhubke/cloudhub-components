import React, { Component } from 'react';

import { sizes, colors } from 'theme';
import Block from './Block';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { color, style, hover, children, ...props } = this.props;
    const cardStyles = { ...styles.card, ...(hover && styles.hover), ...style };

    return (
      <Block color={color || colors.white} style={cardStyles} {...props}>
        {children}
      </Block>
    );
  }
}

export const styles = {
  card: {
    borderRadius: sizes.border,
    padding: sizes.base + 4,
    marginBottom: sizes.base
  }
};

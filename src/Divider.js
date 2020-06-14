import React from 'react';
import Block from './Block';
import { sizes, colors } from './theme';

const Divider = ({ children, height, style, ...props }) => {
  if (children) {
    return (
      <Block flex={false} row middle>
        <Block
          style={{ height, marginRight: sizes.margin, ...style }}
          {...props}
        />
        <Block flex={false}>{children}</Block>
        <Block
          style={{ height, marginLeft: sizes.margin, ...style }}
          {...props}
        />
      </Block>
    );
  }

  return <Block flex={false} style={{ height, ...style }} {...props} />;
};

Divider.defaultProps = {
  color: colors.gray,
  height: 1,
};

export default Divider;

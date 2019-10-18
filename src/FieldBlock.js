import React from 'react';
import { sizes } from 'theme';
import Block from './Block';

const FieldBlock = ({ children, style, ...rest }) => (
  <Block
    flex={false}
    style={{
      marginTop: 2.5,
      minWidth: 250,
      minHeight: sizes.inputHeight + 13,
      ...style,
    }}
    middle
    wrap
    {...rest}
  >
    {children}
  </Block>
);

export default FieldBlock;

import React from 'react';
import { sizes } from './theme';
import Block from './Block';

const FieldBlock = ({ children, style, label, ...rest }) => (
  <Block
    flex={false}
    style={{
      marginTop: 2.5,
      minWidth: 250,
      minHeight: sizes.inputHeight + 13,
      ...style,
    }}
    bottom
    wrap
    {...rest}
  >
    {label && <label>{label}</label>}
    {children}
  </Block>
);

export default FieldBlock;

import React from 'react';
import Block from '../Block';
import { sizes } from '../theme';

const DialogActions = ({ children, ...props }) => (
  <Block
    flex={false}
    row
    right
    middle
    padding={sizes.padding}
    styles={{ postion: 'relative' }}
    {...props}
  >
    {children}
  </Block>
);

export default DialogActions;

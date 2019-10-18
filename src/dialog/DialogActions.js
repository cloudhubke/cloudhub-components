import React from 'react';
import { Block } from 'components';
import { sizes } from 'theme';

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

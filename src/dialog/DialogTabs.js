import React from 'react';
import Block from '../Block';

import { sizes } from '../theme';

const DialogTabs = ({ children, ...props }) => (
  <Block flex={false} padding={[sizes.padding, 0]} {...props}>
    <div>{children}</div>
  </Block>
);

export default DialogTabs;

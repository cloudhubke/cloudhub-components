import React from 'react';
import Block from '../Block';
import { sizes } from '../theme';

const DialogActions = ({ children, ...props }) => {
  const childbuttons = React.Children.map(children, child =>
    React.cloneElement(child, {
      ...child.props,
      style: { ...(child.props.style || {}), marginLeft: 10 },
    }));

  return (
    <Block
      flex={false}
      row
      right
      middle
      padding={sizes.padding}
      styles={{ postion: 'relative' }}
      {...props}
    >
      {childbuttons}
    </Block>
  );
};

export default DialogActions;

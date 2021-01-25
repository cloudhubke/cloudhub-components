import React from 'react';
import Block from '../Block';
import ThemeContext from '../theme/ThemeContext';

const DialogActions = ({ children, ...props }) => {
  const { sizes } = React.useContext(ThemeContext);

  const childbuttons = React.Children.map(children, (child) => {
    if (!child) {
      return null;
    }

    return React.cloneElement(child, {
      ...child.props,
      style: { ...(child.props.style || {}), marginLeft: 10 },
    });
  });

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

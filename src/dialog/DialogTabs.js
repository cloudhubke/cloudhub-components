import React from 'react';
import Block from '../Block';
import ThemeContext from '../theme/ThemeContext';

const DialogTabs = ({ children, ...props }) => {
  const { sizes } = React.useContext(ThemeContext);

  return (
    <Block flex={false} padding={sizes.padding} {...props}>
      <div>{children}</div>
    </Block>
  );
};
export default DialogTabs;

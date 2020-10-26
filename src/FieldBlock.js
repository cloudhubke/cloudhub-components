import React from 'react';

import Block from './Block';
import ThemeContext from './theme/ThemeContext';

const FieldBlock = ({ children, style, label, ...rest }) => {
  const { sizes } = React.useContext(ThemeContext);

  let childitems = children;

  const fn = (child, index) => {
    if (index > 0) {
      if (!child) {
        return child;
      }
      return React.cloneElement(child, {
        ...child.props,
        containerStyle: {
          ...child.props.containerStyle,
          marginLeft: sizes.margin / 2,
        },
      });
    }

    return child;
  };

  if (rest.row === true) {
    childitems = React.Children.map(children, fn);
  }

  return (
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
      {childitems}
    </Block>
  );
};

export default FieldBlock;

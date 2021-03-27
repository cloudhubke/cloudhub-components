import React from 'react';

import Block from './Block';
import ThemeContext from './theme/ThemeContext';

const FieldBlock = ({ children, style, label, ...rest }) => {
  const { sizes } = React.useContext(ThemeContext);

  let childitems = children;

  const fn = (child, index) => {
    if (!child) {
      return child;
    }
    if (
      index > 0 &&
      child.type &&
      child.type.prototype &&
      child.type.prototype.constructor
    ) {
      const ComponentName =
        child.type.prototype.constructor.displayName ||
        child.type.prototype.constructor.name;

      if (ComponentName !== 'FormField') {
        return React.cloneElement(child, {
          ...child.props,
          style: {
            paddingLeft: sizes.margin / 2,
            ...child.props.style,
          },
        });
      }

      return React.cloneElement(child, {
        ...child.props,
        containerStyle: {
          marginLeft: sizes.margin / 2,
          ...child.props.containerStyle,
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

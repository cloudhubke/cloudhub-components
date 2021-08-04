import React from 'react';
import Block from './Block';

const Badge = ({ color, size, style, children, ...props }) => {
  const badgeStyles = {
    ...{
      borderRadius: '50%',
      height: 'auto',
      width: 'auto',
    },
    ...(size && {
      minWidth: size,
      minHeight: size,
    }),
    ...style,
  };

  return (
    <span>
      <Block
        flex={false}
        row
        middle
        center
        color={color}
        style={badgeStyles}
        {...props}
      >
        {children}
      </Block>
    </span>
  );
};

export default Badge;

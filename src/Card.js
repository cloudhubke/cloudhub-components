import React from 'react';

import Block from './Block';
import ThemeContext from './theme/ThemeContext';

const Card = ({ color, style, hover, children, ...props }) => {
  const { colors, sizes } = React.useContext(ThemeContext);
  const styles = {
    card: {
      borderRadius: sizes.border,
      padding: sizes.base + 4,
      marginBottom: sizes.base,
    },
  };
  const cardStyles = { ...styles.card, ...(hover && styles.hover), ...style };

  return (
    <Block color={color || colors.white} style={cardStyles} {...props}>
      {children}
    </Block>
  );
};

export default Card;

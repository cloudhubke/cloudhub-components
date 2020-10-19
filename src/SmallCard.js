import React from 'react';
import Block from './Block';
import Container from './Container';
import ThemeContext from './theme/ThemeContext';

const SmallCard = ({ children, minHeight, ...props }) => {
  const { colors, sizes } = React.useContext(ThemeContext);

  return (
    <Container maxWidth="sm" wrap>
      <Block
        shadow
        color={colors.milkyWhite}
        padding={sizes.padding}
        column
        style={{ minHeight }}
        {...props}
      >
        {children}
      </Block>
    </Container>
  );
};

SmallCard.defaultProps = {
  minHeight: 200,
};

export default SmallCard;

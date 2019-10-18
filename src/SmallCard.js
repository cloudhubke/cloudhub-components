import React from 'react';
import { colors, sizes } from 'theme';
import Block from './Block';

import Container from './Container';

const SmallCard = ({ children, minHeight, ...props }) => (
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

SmallCard.defaultProps = {
  minHeight: 200,
};

export default SmallCard;

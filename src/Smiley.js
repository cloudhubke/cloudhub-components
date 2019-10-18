import React from 'react';
import Text from './Text';

const Smiley = ({ children, size, ...props }) => (
  <Text style={{ fontSize: size }} {...props}>
    {children}
  </Text>
);

export default Smiley;

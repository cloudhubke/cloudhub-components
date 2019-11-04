import React from 'react';

const Button = ({ children, red, green, ...props }) => {
  const styles = {
    ...(red && { backgroundColor: 'red' }),
    ...(green && { backgroundColor: 'green' }),
  };

  return <button style={styles}>{children}</button>;
};

export default Button;

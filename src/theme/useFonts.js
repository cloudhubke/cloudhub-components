import React from 'react';

import ThemeContext from './ThemeContext';

const useFonts = () => {
  const { fonts } = React.useContext(ThemeContext);

  return {
    fonts,
  };
};

export default useFonts;

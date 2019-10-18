import React, { useState } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ fonts, children, ...props }) => {
  return (
    <ThemeContext.Provider value={{ fonts, ...props }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.defaultProps = {
  fonts: {
    normalFontFamily: 'clanpro-book',
    thinFontFamily: 'clanpro-book',
    boldFontFamily: 'clanpro-book',
    semiBoldFontFamily: 'clanpro-book',
  },
};

export default ThemeProvider;

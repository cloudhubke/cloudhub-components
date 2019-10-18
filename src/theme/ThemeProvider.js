import React from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ values, children, ...props }) => (
  <ThemeContext.Provider
    value={{
      fonts: { ...props.fonts, ...(values.fonts || {}) },
      CONFIG: values.CONFIG || {},
    }}
  >
    {children}
  </ThemeContext.Provider>
);

ThemeProvider.defaultProps = {
  fonts: {
    normalFontFamily: 'clanpro-book',
    thinFontFamily: 'clanpro-book',
    boldFontFamily: 'clanpro-book',
    semiBoldFontFamily: 'clanpro-book',
  },
};

export default ThemeProvider;

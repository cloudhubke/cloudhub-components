import React from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import ThemeContext from './ThemeContext';
import sizes from './Sizes';
import colors from './Colors';
import fonts from './Fonts';

const ThemeProvider = ({ children, ...props }) => {
  const fonts = { ...props.fonts };
  const colors = { ...props.colors };
  const sizes = { ...props.sizes };

  const theme = createMuiTheme({
    palette: {
      primary: fonts.primary,
      secondary: fonts.secondary,
      error: fonts.danger,
    },
    typography: {
      // Use the system font instead of the default Roboto font.
      useNextVariants: true,
      fontSize: 16,
      htmlFontSize: 16,
      fontFamily: [
        fonts.normal.fontFamily,
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      zIndex: {
        mobileStepper: 1000,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1800,
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider
        value={{
          fonts,
          colors,
          sizes,
          CONFIG: props.CONFIG || {},
          ...props,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

ThemeProvider.defaultProps = {
  fonts,
  colors,
  sizes,
};

export default ThemeProvider;

import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';

import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import ThemeContext from './ThemeContext';
import localsizes from './Sizes';
import localcolors from './Colors';
import localfonts from './Fonts';
import toast, { ToastContainer } from '../toastr';

const engine = new Styletron();

const ThemeProvider = ({ children, fonts, colors, sizes, ...props }) => {
  const newfonts = { ...localfonts, ...fonts };
  const newcolors = { ...localcolors, ...colors };
  const newsizes = { ...localsizes, ...sizes };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: newcolors.primary,
      },
      secondary: {
        main: newcolors.secondary,
      },

      error: {
        main: newcolors.danger,
      },
    },
    typography: {
      // Use the system font instead of the default Roboto font.
      useNextVariants: true,
      fontSize: 16,
      htmlFontSize: 16,
      fontFamily: [
        newfonts.body.fontFamily,
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
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <ThemeContext.Provider
            value={{
              fonts: newfonts,
              colors: newcolors,
              sizes: newsizes,
              CONFIG: props.CONFIG || {},
              ...props,
            }}
          >
            {children}
            <ToastContainer />
          </ThemeContext.Provider>
        </BaseProvider>
      </StyletronProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

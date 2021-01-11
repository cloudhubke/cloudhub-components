import React from 'react';
import { LightTheme, BaseProvider } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Server as Styletron } from 'styletron-engine-atomic';

import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import ThemeContext from './ThemeContext';
import localsizes from './Sizes';
import localcolors from './Colors';
import localfonts from './Fonts';
import { ToastContainer } from '../toastr';

const engine = new Styletron();

const ServerThemeProvider = ({ children, fonts, colors, sizes, ...props }) => {
  const newfonts = { ...localfonts, ...fonts };
  const newcolors = { ...localcolors, ...colors };
  const newsizes = { ...localsizes, ...sizes };

  const createTheme = React.useCallback(
    () =>
      createMuiTheme({
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
        sizes: { ...newsizes },
        colors: { ...newcolors },
        fonts: { ...newfonts },
      }),
    []
  );

  return (
    <MuiThemeProvider theme={createTheme()}>
      <StyletronProvider value={engine}>
        <BaseProvider
          overrides={{
            AppContainer: {
              style: {
                height: '100%',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',

                backgroundColor: newcolors.background || '#FFFFCC',
              },
            },
          }}
          theme={LightTheme}
        >
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
            <div style={{ flex: 0 }}>
              <ToastContainer />
            </div>
          </ThemeContext.Provider>
        </BaseProvider>
      </StyletronProvider>
    </MuiThemeProvider>
  );
};

export const styles = engine.getStylesheetsHtml();

export default ServerThemeProvider;

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

const ServerThemeProvider = ({
  children,
  fonts,
  colors,
  sizes,
  theme,
  ...props
}) => {
  const newfonts = { ...localfonts, ...fonts };
  const newcolors = { ...localcolors, ...colors };
  const newsizes = { ...localsizes, ...sizes };

  const mainFontFamily = newfonts.body.fontFamily;

  const {
    primaryColors,
    secondaryColors,
    tertiaryColors,
    textColors,
    backgroundColors,
  } = newcolors;

  const createTheme = React.useCallback(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: newcolors.primary,
            ...(primaryColors || {}),
          },
          secondary: {
            main: newcolors.secondary,
            ...(secondaryColors || {}),
          },
          tertiary: {
            main: newcolors.tertiary,
            ...(tertiaryColors || {}),
          },
          text: {
            main: newcolors.text,
            ...(textColors || {}),
          },
          background: {
            main: newcolors.background,
            ...(backgroundColors || {}),
          },
        },
        layout: {
          contentWidth: 1236,
        },
        typography: {
          fontFamily: [`${mainFontFamily}`, 'Arial', 'sans-serif'].join(','),
        },
        zIndex: {
          mobileStepper: 1000,
          appBar: 1100,
          drawer: 1200,
          modal: 1300,
          snackbar: 1400,
          tooltip: 1800,
        },
        sizes: { ...newsizes },
        colors: { ...newcolors },
        fonts: { ...newfonts },
      }),
    []
  );

  return (
    <MuiThemeProvider theme={theme || createTheme()}>
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

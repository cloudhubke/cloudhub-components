import React from 'react';
import { LightTheme, BaseProvider } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';

import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { getLightColors, getDarkColors } from './palette';

import ThemeContext from './ThemeContext';
import localsizes from './Sizes';
import localcolors from './Colors';
import localfonts from './Fonts';
import { ToastContainer } from '../toastr';

import customeBaseuiTheme from './basetheme/BaseWebTheme';

import 'react-perfect-scrollbar/dist/css/styles.css';

const engine = new Styletron({
  hydrate: document.getElementsByClassName('_styletron_hydrate_'),
});

const ThemeProvider = ({
  children,
  fonts,
  colors,
  sizes,
  theme,
  baseuiTheme,
  ...props
}) => {
  const newfonts = { ...localfonts, ...fonts };
  const newcolors = { ...localcolors, ...colors };
  const newsizes = { ...localsizes, ...sizes };
  const { primitives, overrides } = baseuiTheme || {};
  const mainFontFamily = newfonts.body.fontFamily;

  const themeMode = 'light';

  const isLight = themeMode === 'light';

  const createTheme = React.useCallback(
    () =>
      createMuiTheme({
        palette: isLight ? getLightColors(newcolors) : getDarkColors(newcolors),
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
    // Apply theme for designs (Premium themes)
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
          theme={
            primitives || overrides
              ? customeBaseuiTheme({ baseuiTheme, colors, sizes })
              : LightTheme
          }
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
            <div style={{ flex: 0, zIndex: 9999 }}>
              <ToastContainer />
            </div>
          </ThemeContext.Provider>
        </BaseProvider>
      </StyletronProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

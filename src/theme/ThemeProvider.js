import React from 'react';
import Loadable from '@react-loadable/revised';
import Box from '@material-ui/core/Box';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { getLightColors, getDarkColors } from './palette';

import Loading from '../Loading';

import ThemeContext from './ThemeContext';
import localsizes from './Sizes';
import localcolors from './Colors';
import localfonts from './Fonts';
import { ToastContainer } from '../toastr';

const BaseTheme = Loadable({
  loader: () =>
    import(/* webpackChunkName: "BaseTheme" */ '../baseweb/theme/BaseTheme'),
  loading: () => (
    <Box justifyContent="center" alignItems="center">
      <Loading />
    </Box>
  ),
});

const ThemeProvider = ({
  children,
  fonts,
  colors,
  sizes,
  theme,
  addBaseWeb,
  ...props
}) => {
  const newfonts = { ...localfonts, ...fonts };
  const newcolors = { ...localcolors, ...colors };
  const newsizes = { ...localsizes, ...sizes };
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
      {addBaseWeb ? (
        <BaseTheme fonts={newfonts} colors={newcolors} sizes={newsizes}>
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
        </BaseTheme>
      ) : (
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
      )}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

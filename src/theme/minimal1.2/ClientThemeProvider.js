import React from 'react';
import Loadable from '@react-loadable/revised';
import Box from '@material-ui/core/Box';

import MuiThemeProvider from './core';

import ThemeContext from '../ThemeContext';

import Loading from '../../Loading';

import localsizes from '../Sizes';
import localcolors from '../Colors';
import localfonts from '../Fonts';
import { ToastContainer } from '../../toastr';

const BaseTheme = Loadable({
  loader: () =>
    import(/* webpackChunkName: "BaseTheme" */ '../../baseweb/theme/BaseTheme'),
  loading: () => (
    <Box justifyContent="center" alignItems="center">
      <Loading />
    </Box>
  ),
});

const ThemeProvider = ({
  children,
  fonts = {},
  colors = {},
  sizes = {},
  theme,
  addBaseWeb = true,
  ...props
}) => {
  const newfonts = { ...localfonts, ...fonts };
  const newcolors = { ...localcolors, ...colors };
  const newsizes = { ...localsizes, ...sizes };

  return (
    // Apply theme for designs (Premium themes)
    <MuiThemeProvider fonts={newfonts} colors={newcolors} sizes={newsizes}>
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

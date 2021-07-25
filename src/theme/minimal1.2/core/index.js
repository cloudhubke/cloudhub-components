// import rtl from 'jss-rtl';
import { create } from 'jss';
import { getLightColors, getDarkColors } from './palette';
import shadows from './shadows';
import PropTypes from 'prop-types';
import typography from './typography';
import breakpoints from './breakpoints';
import createCache from '@emotion/cache';
// import rtlPlugin from 'stylis-plugin-rtl';
import GlobalStyles from './globalStyles';
import borderRadius from './borderRadius';
import componentsOverride from './overrides';
import { CacheProvider } from '@emotion/react';
import useSettings from '../hooks/useSettings';
import React, { useMemo } from 'react';

import {
  jssPreset,
  createMuiTheme,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';

import { CssBaseline } from '@material-ui/core';

// ----------------------------------------------------------------------

RTLProvider.propTypes = {
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  children: PropTypes.node,
};

function RTLProvider({ direction, children }) {
  // const isRTL = direction === 'rtl';
  // const jss = create({
  //   plugins: [...jssPreset().plugins, rtl()]
  // });

  // const cache = createCache({
  //   key: isRTL ? 'rtl' : 'css',
  //   prepend: true,
  //   stylisPlugins: isRTL ? [rtlPlugin] : []
  // });

  // cache.compat = true;

  // useEffect(() => {
  //   document.dir = direction;
  // }, [direction]);

  const cache = createCache({
    key: 'css',
    prepend: true,
  });

  // cache.compat = true;
  const jss = create({
    plugins: [...jssPreset().plugins],
  });

  return (
    <CacheProvider value={cache}>
      <StylesProvider jss={jss}>{children}</StylesProvider>
    </CacheProvider>
  );
}

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

function ThemeConfig({ children, fonts, sizes, colors }) {
  const { themeMode, themeDirection } = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions = useMemo(
    () => ({
      palette: isLight ? getLightColors(colors) : getDarkColors(colors),
      shadows: shadows[isLight ? 'light' : 'dark'],
      typography: typography(fonts),
      shape: borderRadius,
      breakpoints,
      direction: themeDirection,
      components: componentsOverride({
        theme: {
          palette: isLight ? getLightColors(colors) : getDarkColors(colors),
          shadows: shadows[isLight ? 'light' : 'dark'],
          typography: typography(fonts),
          shape: borderRadius,
          direction: themeDirection,
          colors: { ...colors },
          sizes: { ...sizes },
          fonts: { ...fonts },
        },
      }),
      colors: { ...colors },
      sizes: { ...sizes },
      fonts: { ...fonts },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLight, themeDirection]
  );

  const theme = createMuiTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      <RTLProvider direction={themeDirection}>{children}</RTLProvider>
    </ThemeProvider>
  );
}

export default ThemeConfig;

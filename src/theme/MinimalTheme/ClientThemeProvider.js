import React from 'react';
import { BaseProvider } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import MuiThemeProvider from './core';

import ThemeContext from '../ThemeContext';
import localsizes from '../Sizes';
import localcolors from '../Colors';
import localfonts from '../Fonts';
import { ToastContainer } from '../../toastr';

import customBaseuiTheme from '../basetheme/BaseWebTheme';

const engine = new Styletron({
  hydrate: document.getElementsByClassName('_styletron_hydrate_'),
});

const ThemeProvider = ({
  children,
  fonts = {},
  colors = {},
  sizes = {},
  theme,
  baseuiTheme,
  ...props
}) => {
  const newfonts = { ...localfonts, ...fonts };
  const newcolors = { ...localcolors, ...colors };
  const newsizes = { ...localsizes, ...sizes };

  return (
    // Apply theme for designs (Premium themes)
    <MuiThemeProvider fonts={newfonts} colors={newcolors} sizes={newsizes}>
      <StyletronProvider value={engine}>
        <BaseProvider
          overrides={{
            AppContainer: {
              style: {
                height: '100%',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              },
            },
          }}
          theme={customBaseuiTheme({
            baseuiTheme,
            colors: newcolors,
            fonts: newfonts,
            sizes: newsizes,
          })}
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

import React from 'react';
import { useCallback } from 'react';

// ----------------------------------------------------------------------

function useSettings() {
  const [themeDirection, setThemediretion] = React.useState('ltr');
  const [themeMode, setThemeMode] = React.useState('light');
  const isLight = themeMode === 'light';

  const handleToggleTheme = useCallback(
    () => setThemeMode(isLight ? 'dark' : 'light'),
    [isLight]
  );

  const handleChangeDirection = useCallback(
    (event) => setThemediretion(event.target.value),
    []
  );

  return {
    // Mode
    themeMode: themeMode,
    toggleMode: handleToggleTheme,
    selectMode: handleToggleTheme,
    // Direction
    themeDirection: themeDirection,
    selectDirection: handleChangeDirection
  };
}

export default useSettings;

// ----------------------------------------------------------------------

export default function Tooltip({ theme }) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        // v26
        tooltip: {
          backgroundColor: theme.palette.grey[isLight ? '800' : '700']
        },
        // v26
        arrow: {
          color: theme.palette.grey[isLight ? '800' : '700']
        }
      }
    }
  };
}

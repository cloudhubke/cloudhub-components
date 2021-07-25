// ----------------------------------------------------------------------

export default function Grid({ theme }) {
  const isRTL = theme.direction === 'rtl';

  return {
    MuiGrid: {
      styleOverrides: {
        container: {
          marginLeft: isRTL && 0
        }
      }
    }
  };
}

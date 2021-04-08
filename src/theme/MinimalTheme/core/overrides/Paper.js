// ----------------------------------------------------------------------

export default function Paper({ theme }) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },

      styleOverrides: {
        root: {
          // v26
          '&.MuiAutocomplete-paper': {
            boxShadow: theme.shadows['25'].z20
          }
        }
      }
    }
  };
}

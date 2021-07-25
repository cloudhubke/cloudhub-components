// ----------------------------------------------------------------------

export default function Autocomplete({ theme }) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        // v26
        paper: {
          boxShadow: theme.shadows['25'].z20
        }
      }
    }
  };
}

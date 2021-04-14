// ----------------------------------------------------------------------

export default function Popover({ theme }) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows['25'].z24
        }
      }
    }
  };
}

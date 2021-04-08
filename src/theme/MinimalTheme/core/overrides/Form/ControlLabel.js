// ----------------------------------------------------------------------

export default function ControlLabel({ theme }) {
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          ...theme.typography.body2
        }
      }
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 8
        }
      }
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.disabled
        }
      }
    }
  };
}

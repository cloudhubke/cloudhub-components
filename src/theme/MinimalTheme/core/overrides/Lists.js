// ----------------------------------------------------------------------

export default function Lists({ theme }) {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: 16
        }
      }
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: 16
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0
        },
        multiline: {
          marginTop: 0,
          marginBottom: 0
        }
      }
    }
  };
}

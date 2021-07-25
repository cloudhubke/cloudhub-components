// ----------------------------------------------------------------------

export default function Radio({ theme }) {
  return {
    MuiRadio: {
      defaultProps: {
        color: 'primary'
      },

      styleOverrides: {
        root: {
          padding: 8
        }
      }
    }
  };
}

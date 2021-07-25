// ----------------------------------------------------------------------

export default function Typography({ theme }) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: { marginBottom: 16 },
        gutterBottom: { marginBottom: 8 }
      }
    }
  };
}

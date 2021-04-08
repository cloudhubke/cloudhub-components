// ----------------------------------------------------------------------

export default function Slider({ theme }) {
  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.MuiSlider-root.Mui-disabled': {
            color: theme.palette.action.disabled
          }
        },
        markLabel: {
          fontSize: 13,
          color: theme.palette.text.disabled
        }
      }
    }
  };
}

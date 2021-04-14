import { alpha } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function Backdrop({ theme }) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        // root: {
        //   backgroundColor: alpha(theme.palette.grey['900'], 0.72)
        // },
        // invisible: {
        //   backgroundColor: alpha(theme.palette.grey['900'], 0)
        // }
      }
    }
  };
}

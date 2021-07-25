import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

// ----------------------------------------------------------------------

export default function Select({ theme }) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreRoundedIcon
      },

      styleOverrides: {
        root: {}
      }
    }
  };
}

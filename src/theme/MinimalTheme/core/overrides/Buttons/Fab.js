// ----------------------------------------------------------------------

export default function Fab({ theme }) {
  const isRTL = theme.direction === 'rtl';

  return {
    MuiFab: {
      defaultProps: {
        color: 'primary'
      },

      styleOverrides: {
        root: {
          boxShadow: theme.shadows['25'].z8,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.grey['400']
          }
        },
        primary: {
          boxShadow: theme.shadows['25'].primary,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark
          }
        },
        extended: {
          '& svg': {
            marginRight: !isRTL && 8,
            marginLeft: isRTL && 8
          }
        }
      }
    }
  };
}

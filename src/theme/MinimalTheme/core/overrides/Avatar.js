// ----------------------------------------------------------------------

export default function Avatar({ theme }) {
  return {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.grey['400']
        }
      }
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          '& .MuiAvatar-root:last-child': {
            marginLeft: -8
          }
        },
        avatar: {
          fontSize: 14,
          color: theme.palette.primary.main,
          fontWeight: theme.typography.fontWeightMedium,
          backgroundColor: theme.palette.primary.lighter
        }
      }
    }
  };
}

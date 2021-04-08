// ----------------------------------------------------------------------

export default function Table({ theme }) {
  const isRTL = theme.direction === 'rtl';
  const thLeft = {
    paddingLeft: 24,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    boxShadow: `inset 8px 0 0 ${theme.palette.background.paper}`
  };
  const thRight = {
    paddingRight: 24,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    boxShadow: `inset -8px 0 0 ${theme.palette.background.paper}`
  };

  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            }
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none'
        },
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
          '&:first-of-type': isRTL ? thRight : thLeft,
          '&:last-of-type': isRTL ? thLeft : thRight
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`
        },
        body: {
          '&:first-of-type': {
            paddingLeft: !isRTL && 24,
            paddingRight: isRTL && 24
          },
          '&:last-of-type': {
            paddingRight: !isRTL && 24,
            paddingLeft: isRTL && 24
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`
        },
        toolbar: {
          height: 64
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius
          }
        },
        selectIcon: {
          width: 20,
          height: 20,
          marginTop: 2
        }
      }
    }
  };
}

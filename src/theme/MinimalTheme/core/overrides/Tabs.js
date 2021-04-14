// ----------------------------------------------------------------------

export default function Tabs({ theme }) {
  const isRTL = theme.direction === 'rtl';

  return {
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          fontWeight: theme.typography.fontWeightMedium,
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
          '&.Mui-selected': {
            color: theme.palette.text.primary
          },
          '&:not(:last-child)': {
            marginLeft: isRTL && 40,
            marginRight: isRTL ? 0 : 40
          },
          '@media (min-width: 600px)': {
            minWidth: 48
          }
        },
        labelIcon: {
          minHeight: 48,
          paddingTop: 0,
          '& > .MuiTab-wrapper > *:first-of-type': {
            marginBottom: 0,
            marginRight: !isRTL && 8,
            marginLeft: isRTL && 8
          }
        },
        wrapper: {
          flexDirection: 'row',
          whiteSpace: 'nowrap'
        },
        textColorInherit: {
          opacity: 1,
          color: theme.palette.text.secondary
        }
      }
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiTabScrollButton: {
      styleOverrides: {
        root: {
          width: 48,
          borderRadius: '50%'
        }
      }
    }
  };
}

// ----------------------------------------------------------------------

export default function Dialog({ theme }) {
  const isRTL = theme.direction === 'rtl';

  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows['25'].z24,
          '&.MuiPaper-rounded': {
            borderRadius: theme.shape.borderRadiusMd
          },
          '&.MuiDialog-paperFullScreen': {
            borderRadius: 0
          },
          '&.MuiDialog-paper .MuiDialogActions-root': {
            padding: 24
          },
          '@media (max-width: 600px)': {
            margin: 16
          },
          '@media (max-width: 663.95px)': {
            '&.MuiDialog-paperWidthSm.MuiDialog-paperScrollBody': {
              maxWidth: '100%'
            }
          }
        },
        paperFullWidth: {
          width: '100%'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 24,
          paddingBottom: 0
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 24,
          borderTop: 0,
          borderBottom: 0
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          '& > :not(:first-of-type)': {
            marginLeft: !isRTL && 12,
            marginRight: isRTL && 12
          }
        }
      }
    }
  };
}

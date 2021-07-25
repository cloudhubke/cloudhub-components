import { alpha } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function Pickers({ theme }) {
  return {
    MuiPicker: {
      defaultProps: {
        orientation: 'portrait'
      }
    },

    // Paper
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows['25'].z24,
          borderRadius: theme.shape.borderRadiusMd
        }
      }
    },

    // Dialog Actions
    MuiDialog: {
      styleOverrides: {
        paper: {
          '& .MuiDialogActions-root': {
            padding: '16px 24px'
          }
        }
      }
    },

    // Days
    MuiPickersDay: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '&.Mui-disabled': {
            backgroundColor: 'transparent'
          }
        },
        today: {
          '&:not(.Mui-selected)': {
            border: `solid 1px ${theme.palette.divider}`,
            backgroundColor: theme.palette.action.selected
          }
        }
      }
    },

    // Toolbar
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.main,
          '& .MuiTypography-root': {
            color: alpha(theme.palette.common.white, 0.72),
            '&.Mui-selected': {
              color: theme.palette.common.white
            },
            '&.MuiDatePickerToolbar-dateTitleLandscape': {
              color: theme.palette.common.white
            }
          }
        }
      }
    },

    // Tab
    MuiDateTimePickerTabs: {
      styleOverrides: {
        tabs: {
          backgroundColor: theme.palette.primary.main,
          '& .MuiTab-root': {
            opacity: 0.48,
            margin: 0,
            color: theme.palette.common.white,
            '&.Mui-selected': { opacity: 1 }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.dark
          }
        }
      }
    },

    // Static
    MuiPickersStaticWrapper: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows['25'].z24,
          borderRadius: theme.shape.borderRadiusMd,
          '& .MuiDateRangePickerViewDesktop-rangeCalendarContainer:not(:last-child)': {
            borderRightWidth: 1
          }
        }
      }
    },

    // Clock
    MuiTimePickerToolbar: {
      styleOverrides: {
        hourMinuteLabelLandscape: {
          margin: 'auto'
        }
      }
    },

    MuiClock: {
      styleOverrides: {
        root: {
          margin: '40px 24px',
          position: 'relative'
        },
        clock: {
          backgroundColor: theme.palette.grey['500_24']
        },
        amButton: {
          left: -8,
          bottom: -24,
          backgroundColor: theme.palette.grey['500_24']
        },
        pmButton: {
          right: -8,
          bottom: -24,
          backgroundColor: theme.palette.grey['500_24']
        }
      }
    }
  };
}

// ----------------------------------------------------------------------

export default function Accordion({ theme }) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.Mui-expanded': {
            boxShadow: theme.shadows['25'].z8,
            borderRadius: theme.shape.borderRadius
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 8,
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit'
            }
          }
        },
        expandIconWrapper: {
          color: 'inherit'
        }
      }
    }
  };
}

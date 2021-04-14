import { alpha } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function ButtonGroup({ theme }) {
  const isRTL = theme.direction === 'rtl';

  return {
    MuiButtonGroup: {
      variants: [
        {
          props: { variant: 'contained', color: 'inherit' },
          style: { boxShadow: theme.shadows['25'].z8 }
        },
        {
          props: { variant: 'contained', color: 'primary' },
          style: { boxShadow: theme.shadows['25'].primary }
        },
        {
          props: { disabled: true },
          style: {
            boxShadow: 'none !important',
            '& .MuiButtonGroup-grouped.Mui-disabled': {
              color: `${theme.palette.action.disabled} !important`,
              borderColor: `${theme.palette.action.disabledBackground} !important`,
              '&.MuiButton-contained': {
                backgroundColor: theme.palette.action.disabledBackground,
                borderRight: isRTL && 0
              }
            }
          }
        }
      ],

      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none'
          }
        },
        grouped: {
          borderColor: `${theme.palette.grey['500_32']} !important`
        },
        groupedContained: {
          color: theme.palette.grey['800']
        },
        groupedContainedPrimary: {
          color: theme.palette.primary.contrastText,
          borderColor: `${theme.palette.primary.dark} !important`
        },
        groupedOutlinedPrimary: {
          borderColor: `${alpha(theme.palette.primary.main, 0.48)} !important`
        },
        groupedTextPrimary: {
          borderColor: `${theme.palette.primary.main} !important`
        },
        groupedHorizontal: isRTL && {
          '&:not(:last-of-type)': {
            borderStyle: 'solid',
            borderLeftWidth: 1,
            borderRightWidth: 0
          },
          '&:first-of-type': {
            borderRadius: 0,
            borderTopRightRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
            '&.MuiButtonGroup-groupedOutlined': {
              borderRightWidth: 1
            }
          },
          '&:last-of-type': {
            borderRadius: 0,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius
          }
        }
      }
    }
  };
}

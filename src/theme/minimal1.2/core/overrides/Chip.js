import React from 'react';
import { Icon } from '@iconify/react';
import closeCircleFill from '@iconify-icons/eva/close-circle-fill';

// ----------------------------------------------------------------------

export default function Chip({ theme }) {
  const isRTL = theme.direction === 'rtl';

  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: <Icon icon={closeCircleFill} />
      },

      styleOverrides: {
        label: {
          marginTop: -4
        },
        colorDefault: {
          '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
            color: theme.palette.text.secondary
          }
        },
        outlined: {
          borderColor: theme.palette.grey['500_32'],
          '&.MuiChip-colorPrimary': {
            borderColor: theme.palette.primary.main
          }
        },
        sizeMedium: isRTL && {
          '& .MuiChip-avatarMedium, .MuiChip-iconMedium': {
            marginLeft: -6,
            marginRight: 4
          },
          '& .MuiChip-deleteIconMedium': {
            marginLeft: 5,
            marginRight: -6
          }
        },
        sizeSmall: isRTL && {
          '& .MuiChip-avatarSmall, .MuiChip-iconSmall': {
            marginLeft: -4,
            marginRight: 4
          },
          '& .MuiChip-deleteIconSmall': {
            marginLeft: 4,
            marginRight: -4
          }
        }
      }
    }
  };
}

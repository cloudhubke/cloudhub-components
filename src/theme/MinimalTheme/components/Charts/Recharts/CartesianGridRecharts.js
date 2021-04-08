import React from 'react';
import { CartesianGrid } from 'recharts';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

function CartesianGridRecharts({ ...other }) {
  const theme = useTheme();

  return (
    <CartesianGrid
      vertical={false}
      stroke={theme.palette.divider}
      strokeDasharray="3 3"
      {...other}
    />
  );
}

export default CartesianGridRecharts;

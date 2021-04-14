import React from 'react';
import { Tooltip } from 'recharts';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

function TooltipRecharts({ ...other }) {
  const theme = useTheme();

  const itemStyle = {
    fontSize: 13,
    padding: '2px 0',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary
  };
  const contentStyle = {
    border: 0,
    padding: 12,
    borderRadius: 8,
    boxShadow: theme.shadows['25'].z12,
    backgroundColor: theme.palette.background.paper
  };
  const labelStyle = {
    marginBottom: 4,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium
  };
  const cursorStyle = { stroke: theme.palette.divider };

  return (
    <Tooltip
      cursor={cursorStyle}
      itemStyle={itemStyle}
      contentStyle={contentStyle}
      labelStyle={labelStyle}
      {...other}
    />
  );
}

export default TooltipRecharts;

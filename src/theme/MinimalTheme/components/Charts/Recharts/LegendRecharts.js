import React from 'react';
import { Legend } from 'recharts';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  '@global': {
    '.recharts-legend-wrapper': {
      '& .recharts-legend-item': {
        marginRight: '24px !important',
        '&:last-child': {
          flip: false, // disabled RTL
          marginRight: '0 !important'
        },
        '& .recharts-surface': {
          marginTop: -2,
          marginRight: '8px !important'
        }
      },
      '& .recharts-legend-item-text': {
        height: 32,
        fontSize: 12,
        lineHeight: '32px',
        textTransform: 'capitalize'
      }
    }
  }
}));

// ----------------------------------------------------------------------

LegendRecharts.propTypes = {
  align: PropTypes.string,
  verticalAlign: PropTypes.string
};

function LegendRecharts({ align = 'right', verticalAlign = 'top', ...other }) {
  useStyles();

  return (
    <Legend
      align={align}
      verticalAlign={verticalAlign}
      iconType="circle"
      iconSize={12}
      {...other}
    />
  );
}

export default LegendRecharts;

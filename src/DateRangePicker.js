import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AntRangePicker from './ant/DateFilter';

import Block from './Block';
import Text from './Text';
import ThemeProvider from './theme/ThemeProvider';

const getStyles = ({ fonts, sizes }) => {
  const useStyles = makeStyles({
    datePicker: {
      fontSize: '9px',
      '& .ant-input': {
        ...fonts.default,
        height: sizes.inputHeight,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      '& .ant-calendar-range-picker-separator': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      },
    },
  });

  return {
    useStyles,
  };
};

const DateRangePicker = ({ meta, ...props }) => {
  const { fonts, sizes } = React.useContext(ThemeProvider);
  const classes = getStyles({ fonts, sizes }).useStyles();
  return (
    <Block style={{ marginRight: sizes.margin }}>
      <AntRangePicker
        dateFormat="DD MMM, YYYY"
        {...props}
        className={classes.datePicker}
      />
      <Text small error style={{ height: 10 }}>
        {meta.touched && meta.error && meta.error}
      </Text>
    </Block>
  );
};

DateRangePicker.defaultProps = {
  meta: {},
};

export default DateRangePicker;

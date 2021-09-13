import React from 'react';
import { makeStyles } from '@mui/styles';
import AntRangePicker from './AntDateFilter';

import Block from '../Block';
import Text from '../Text';
import ThemeContext from '../theme/ThemeContext';

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
  const { fonts, sizes } = React.useContext(ThemeContext);
  const classes = getStyles({ fonts, sizes }).useStyles();
  return (
    <Block>
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

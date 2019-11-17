import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AntDatePicker from './ant/DatePicker';

import Block from './Block';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';

const getStyles = ({ fonts, sizes }) => {
  const useStyles = makeStyles({
    datePicker: {
      ...fonts.default,
      '& .ant-input': {
        ...fonts.default,
        height: sizes.inputHeight
      }
    }
  });

  return {
    useStyles
  };
};

const DatePicker = ({ meta, ...props }) => {
  const { fonts, sizes, colors } = React.useContext(ThemeContext);
  const classes = getStyles({ fonts, sizes, colors }).useStyles();
  return (
    <Block style={{ marginRight: sizes.margin }}>
      <AntDatePicker
        className={classes.datePicker}
        dateFormat="DD MMM, YYYY"
        {...props}
      />
      <Text small error style={{ height: 10 }}>
        {meta.touched && meta.error && meta.error}
      </Text>
    </Block>
  );
};

DatePicker.defaultProps = {
  meta: {}
};

export default DatePicker;

import React from 'react';
import AntDatePicker from 'cloudhub-react-components/dist/ant/DatePicker';
import { makeStyles } from '@material-ui/core/styles';
import { sizes, fonts } from 'theme';
import Block from './Block';
import Text from './Text';

const getStyles = () => {
  const useStyles = makeStyles({
    datePicker: {
      ...fonts.default,
      '& .ant-input': {
        ...fonts.default,
        height: sizes.inputHeight,
      },
    },
  });

  return {
    useStyles,
  };
};

const DatePicker = ({ meta, ...props }) => {
  const classes = getStyles().useStyles();
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
  meta: {},
};

export default DatePicker;

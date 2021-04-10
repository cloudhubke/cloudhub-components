import React from 'react';
import AntDatePicker from './AntDatePicker';
import Block from '../Block';
import Text from '../Text';

const DatePicker = ({ meta, ...props }) => (
  <Block>
    <AntDatePicker dateFormat="DD MMM, YYYY" {...props} />
    <Text small error style={{ height: 10 }}>
      {meta.touched && meta.error && meta.error}
    </Text>
  </Block>
);

DatePicker.defaultProps = {
  meta: {},
};

export default DatePicker;

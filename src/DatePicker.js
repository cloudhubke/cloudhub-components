import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AntDatePicker from './ant/DatePicker';

import Block from './Block';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';

const DatePicker = ({ meta, ...props }) => {
  const { fonts, sizes, colors } = React.useContext(ThemeContext);
  return (
    <Block style={{ marginRight: sizes.margin }}>
      <AntDatePicker dateFormat="DD MMM, YYYY" {...props} />
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

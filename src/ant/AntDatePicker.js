import React from 'react';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';

import 'antd/lib/input/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import './datepicker.css';
import { makeStyles } from '@material-ui/core/styles';
import ThemeContext from '../theme/ThemeContext';

const useStyles = ({ fonts, colors, sizes }) =>
  makeStyles({
    datePicker: {
      ...fonts.default,
      '& .ant-input': {
        ...fonts.default,
        height: sizes.inputHeight,
        width: '100%',
        minWidth: 280,
      },
    },
    dropdown: {
      ...fonts.default,
      '& div.ant-calendar-input-wrap': {
        height: sizes.inputHeight,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
  });

const AntDatePicker = ({
  timestamp,
  input,
  value,
  onChange,
  showTime,
  dateFormat,
  ...rest
}) => {
  const { fonts, sizes, colors } = React.useContext(ThemeContext);
  const classes = useStyles({ fonts, sizes, colors })();

  const onDateChanged = (date) => {
    if (date) {
      if (timestamp) {
        input.onChange(date.valueOf());
        input.onBlur();
        onChange(date.valueOf());
      } else {
        input.onChange(date.format(dateFormat));
        onChange(date.format(dateFormat));
        input.onBlur();
      }
    } else {
      input.onChange('');
      onChange('');
    }
  };

  const val = input.value || value;

  return (
    <DatePicker
      className={classes.datePicker}
      dropdownClassName={classes.dropdown}
      value={val ? moment(val) : null}
      format={dateFormat}
      onChange={onDateChanged}
      showTime={showTime}
      getCalendarContainer={(trigger) => trigger.parentNode}
      {...rest}
    />
  );
};

AntDatePicker.defaultProps = {
  dateFormat: 'DD MMM, YYYY hh:mm a',
  showTime: false,
  timestamp: true,
  onChange: () => {},
  value: null,
  input: {
    onBlur: () => {},
    onChange: () => {},
    value: null,
  },
  style: {},
};

export default AntDatePicker;

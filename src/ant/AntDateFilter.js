import React, { Component } from 'react';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';

import 'antd/lib/input/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import './datepicker.css';

const { RangePicker } = DatePicker;

const dateFormat = 'DD-MM-YYYY hh:mm a';

class DateFilter extends Component {
  static defaultProps = {
    defaultValue: [moment().startOf('day'), moment().endOf('day')],
    onChange: () => {},
    input: {
      onChange: () => {},
      onBlur: () => {},
    },
    meta: {},
  };

  componentDidMount() {}

  onDateChanged = (date) => {
    if (date) {
      const dd = date.map((dd) => dd.valueOf());
      this.props.input.onChange(dd);
      this.props.input.onBlur();
      this.props.onChange(dd);
    } else {
      this.props.input.onChange([]);
      this.props.input.onBlur();
      this.props.onChange([]);
    }
  };

  render() {
    const {
      timestamp,
      defaultValue,
      input,
      value,
      onChange,
      showTime,
      dateFormat,
      style,
      ...rest
    } = this.props;

    return (
      <RangePicker
        showTime={{ format: 'hh:mm a' }}
        defaultValue={defaultValue || []}
        format={dateFormat}
        placeholder={['Start Time', 'End Time']}
        onChange={this.onDateChanged}
        getCalendarContainer={(trigger) => trigger.parentNode}
        {...rest}
      />
    );
  }
}

export default DateFilter;

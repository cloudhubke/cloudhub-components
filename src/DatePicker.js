import React, { Component } from 'react';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';

import 'antd/lib/input/style/index.css';
import './datepicker.css';

class AntDatePicker extends Component {
  static defaultProps = {
    dateFormat: 'DD MMM, YYYY hh:mm a',
    showTime: false,
    timestamp: true,
    onChange: () => {},
    value: null,
    input: {
      onBlur: () => {},
      onChange: () => {},
      value: null
    }
  };

  componentDidMount() {}

  onDateChanged = date => {
    const { timestamp, dateFormat } = this.props;
    if (date) {
      if (timestamp) {
        this.props.input.onChange(date.valueOf());
        this.props.input.onBlur();
        this.props.onChange(date.valueOf());
      } else {
        this.props.input.onChange(date.format(dateFormat));
        this.props.onChange(date.format(dateFormat));
        this.props.input.onBlur();
      }
    } else {
      this.props.input.onChange('');
      this.props.onChange('');
    }
  };

  render() {
    const {
      timestamp,
      input,
      value,
      onChange,
      showTime,
      dateFormat,
      style,
      ...rest
    } = this.props;

    const val = input.value || value;

    return (
      <DatePicker
        style={{ ...style, width: '100%' }}
        value={val ? moment(val) : null}
        format={dateFormat}
        onChange={this.onDateChanged}
        showTime={showTime}
        getCalendarContainer={trigger => trigger.parentNode}
        {...rest}
      />
    );
  }
}

export default AntDatePicker;

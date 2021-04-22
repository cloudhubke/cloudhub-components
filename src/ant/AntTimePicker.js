import React from 'react';
import AntTimePicker from 'antd/lib/time-picker';
import moment from 'moment';

import 'antd/lib/input/style/index.css';
import 'antd/lib/time-picker/style/index.css';

import './time-picker.css';

const TimePicker = ({ input, ...props }) => (
  <AntTimePicker
    onChange={this}
    getPopupContainer={(trigger) => trigger.parentNode}
    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
    {...input}
    {...props}
  />
);

TimePicker.defaultProps = {};

export default TimePicker;

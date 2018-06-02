import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'antd/lib/date-picker/style/index.css';
import './datepicker.css';

const styles = () => ({});

class AntDatePicker extends Component {
  static defaultProps = {
    defaultValue: '',
    dateFormat: 'DD MMM, YYYY hh:mm',
    showTime: false
  };
  componentDidMount() {}
  onDateChanged = date => {
    if (date) {
      this.props.input.onChange(date.format());
    } else {
      this.props.input.onChange('');
    }
  };

  render() {
    const { value } = this.props.input;
    const { meta, classes, dateFormat } = this.props;

    return (
      <div>
        <DatePicker
          style={{ width: '100%' }}
          defaultValue={value ? moment(value) : null}
          format={dateFormat}
          onChange={this.onDateChanged}
          showTime={this.props.showTime}
        />
        {meta.touched &&
          meta.error && <div className="error">{meta.error}</div>}
      </div>
    );
  }
}

export default withStyles(styles)(AntDatePicker);

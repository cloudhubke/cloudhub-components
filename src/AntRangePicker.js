import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'DD-MM-YYYY hh:mm a';

const styles = () => ({});

class AntRangePicker extends Component {
  static defaultProps = {
    defaultValue: [moment().startOf('day'), moment().endOf('day')],
    onChange: () => {},
    input: {
      onChange: () => {}
    },
    meta: {}
  };
  componentDidMount() {}
  onDateChanged = date => {
    if (date) {
      const dd = date.map(dd => dd.valueOf());
      this.props.input.onChange(dd);
      this.props.onChange(dd);
    } else {
      this.props.input.onChange([]);
      this.props.onChange([]);
    }
  };

  render() {
    const { meta, defaultValue } = this.props;
    return (
      <div>
        <RangePicker
          showTime={{ format: 'hh:mm a' }}
          defaultValue={defaultValue || []}
          format={dateFormat}
          placeholder={['Start Time', 'End Time']}
          onChange={this.onDateChanged}
        />
        {/* <DatePicker
          style={{ width: '100%' }}
          defaultValue={value ? moment(value) : null}
          format={dateFormat}
          onChange={this.onDateChanged}
        /> */}
        {meta.touched &&
          meta.error && <div className="error">{meta.error}</div>}
      </div>
    );
  }
}

export default withStyles(styles)(AntRangePicker);

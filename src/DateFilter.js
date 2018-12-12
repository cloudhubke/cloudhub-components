import React, { Component } from 'react';
import Input from 'antd/lib/input';
import moment from 'moment';
import AntRangePicker from './AntRangePicker';

const styles = {
  fieldItem: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
};

class DateFilter extends Component {
  static defaultProps = {
    meta: {},
    Range: [moment().startOf('day'), moment().endOf('day')],
    onChange: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { meta, classes } = this.props;
    return (
      <div>
        <div style={styles.fieldItem}>
          <label>Date Filter</label>
          <AntRangePicker
            defaultValue={this.props.Range}
            onChange={this.props.onChange}
          />
        </div>

        {meta.touched &&
          meta.error && <span className="error">{meta.error}</span>}
      </div>
    );
  }
}

export default DateFilter;

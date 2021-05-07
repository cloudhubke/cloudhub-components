import * as React from 'react';
import { TimePicker } from 'baseui/timepicker';
import moment from 'moment';

const BaseWebTimePicker = ({ input, onChange, ...props }) => {
  const val = input.value || value;
  const [value, setValue] = React.useState(
    new Date(
      moment(
        typeof val === 'string' && val.length === 8
          ? `${moment().format('YYYY-MM-DD')}T${val}`
          : val || Date.now()
      ).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    )
  );

  React.useEffect(() => {
    const newvalue = moment(value).format('HH:mm:ss');
    if (newvalue !== val) {
      input.onChange(newvalue);
      onChange(newvalue);
    }
  }, [value]);
  return (
    <TimePicker
      value={value}
      onChange={(date) => setValue(date)}
      minTime={
        new Date(moment().startOf('D').format('YYYY-MM-DDTHH:mm:ss.SSSZ'))
      }
      {...props}
    />
  );
};
BaseWebTimePicker.defaultProps = {
  input: {
    onChange: () => {},
  },
  onChange: () => {},
};
export default BaseWebTimePicker;

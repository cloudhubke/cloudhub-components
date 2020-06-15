import * as React from 'react';
import { StatefulCalendar } from 'baseui/datepicker';

const BaseWebCalendar = ({ value, input, onChange }) => {
  const val = value || input.value || new Date().getTime();

  const [date, setDate] = React.useState([new Date(val)]);

  const onChangeDate = ({ date }) => {
    if (typeof onChange === 'function') {
      onChange(date.getTime());
    }
    if (typeof input.onChange === 'function') {
      input.onChange(date.getTime());
    }
    setDate(Array.isArray(date) ? date : [date]);
  };

  return (
    <StatefulCalendar
      // use the 'onChange' prop to pull data from the component into your application state
      value={date}
      onChange={onChangeDate}
    />
  );
};
BaseWebCalendar.defaultProps = {
  onClose: () => null,
  onChange: () => null,
  input: {
    onChange: () => null,
  },
};

export default BaseWebCalendar;

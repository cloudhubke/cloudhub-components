import * as React from 'react';
import { TimePicker } from 'baseui/timepicker';
import moment from 'moment';
import ThemeContext from '../theme/ThemeContext';
import Block from '../Block';

const BaseWebTimePicker = ({ input, onChange, ...props }) => {
  const { sizes } = React.useContext(ThemeContext);
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
    <Block
      flex={false}
      style={{
        height: sizes.inputHeight,
        position: 'relative',
        marginBottom: sizes.base,
      }}
    >
      <TimePicker
        value={value}
        onChange={(date) => setValue(date)}
        minTime={
          new Date(moment().startOf('D').format('YYYY-MM-DDTHH:mm:ss.SSSZ'))
        }
        {...props}
      />
    </Block>
  );
};
BaseWebTimePicker.defaultProps = {
  input: {
    onChange: () => {},
  },
  onChange: () => {},
};
export default BaseWebTimePicker;

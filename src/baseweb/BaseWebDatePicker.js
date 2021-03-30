import React from 'react';
import { DatePicker } from 'baseui/datepicker';
import { LayersManager } from 'baseui/layer';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Block from '../Block';
import Text from '../Text';
import ThemeContext from '../theme/ThemeContext';

const useStyles = ({ sizes }) =>
  makeStyles({
    pickerContainer: {
      // zIndex: 1,
      marginBottom: sizes.baseMargin,
    },
  });

const BaseWebDatePicker = ({
  input,
  value,
  onChange,
  overrides,
  meta,
  showError,
  showTime,
  dateFormat,
  formatString,
  excludeDates,
  disabledDate,
  filterDate,
  step,
  timeSelectStart,
  timeSelectEnd,
  ...rest
}) => {
  const val = value || input.value || new Date().getTime();
  const [initialValue, setinitialValue] = React.useState([new Date(val)]);
  const { sizes, colors } = React.useContext(ThemeContext);
  const classes = useStyles({ sizes, colors, active: meta.active })();
  const containerRef = React.useRef();

  return (
    <Block ref={containerRef} className={classes.pickerContainer}>
      <LayersManager zIndex={1301}>
        <DatePicker
          value={initialValue}
          onChange={({ date }) => {
            const msTstamp = moment(date).valueOf();
            if (typeof onChange === 'function') {
              onChange(msTstamp);
            }
            if (input && typeof input.onChange === 'function') {
              input.onChange(msTstamp);
            }
            setinitialValue(Array.isArray(date) ? date : [date]);
          }}
          overrides={{
            Input: {
              props: {
                onChange: () => {},
              },
            },
            TimeSelect: {
              props: {
                step: step || 900,
              },
            },
            ...overrides,
          }}
          formatString={formatString || dateFormat}
          timeSelectEnd={Boolean(timeSelectEnd || showTime)}
          timeSelectStart={Boolean(timeSelectStart || showTime)}
          filterDate={(val) => {
            if (typeof disabledDate === 'function') {
              const isDisabled = disabledDate(val);
              return !isDisabled;
            }
            if (typeof filterDate === 'function') {
              return filterDate(val);
            }
            return true;
          }}
          {...rest}
        />
      </LayersManager>
      <Text small error style={{ height: 10 }}>
        {meta.touched && meta.error && meta.error}
      </Text>
    </Block>
  );
};
BaseWebDatePicker.defaultProps = {
  showTime: false,
  dateFormat: 'yyyy/MM/dd',
  clearable: true,
  filterDate: () => true,
  meta: {},
};
export default BaseWebDatePicker;

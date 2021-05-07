import React from 'react';
import { Datepicker } from 'baseui/datepicker';
import en from 'date-fns/locale/en-US';
import Block from '../Block';
import Text from '../Text';
import ThemeContext from '../theme/ThemeContext';

const BaseWebDatePicker = ({
  input = {},
  value,
  onChange,
  overrides,
  meta,
  showError,
  showTime,
  dateFormat = 'dd/MM/yyyy',
  formatString,
  excludeDates,
  disabledDate,
  filterDate,
  step,
  timeSelectStart,
  timeSelectEnd,
  borderWidth,
  ...rest
}) => {
  const val = input.value || value;
  const [date, setDate] = React.useState(val);
  const { sizes } = React.useContext(ThemeContext);

  const containerRef = React.useRef();

  React.useEffect(() => {
    if (val !== date) {
      setDate(val);
    }
  }, [val]);

  React.useEffect(() => {
    if (date !== val) {
      if (typeof onChange === 'function') {
        onChange(date);
      }
      if (input && typeof input.onChange === 'function') {
        input.onChange(date);
      }
    }
  }, [date]);

  const format = `${dateFormat}`
    .replace(/D/g, 'd')
    .replace(/Y/g, 'y')
    .replace(/M/g, 'L');

  return (
    <Block>
      <Block
        flex={false}
        style={{ height: sizes.inputHeight, position: 'relative' }}
        ref={containerRef}
      >
        <Datepicker
          trapTabbing={false}
          autoFocusCalendar={false}
          mountNode={containerRef.current}
          locale={en}
          value={
            date
              ? [
                  ...(Array.isArray(date)
                    ? date.map((d) => new Date(d))
                    : [new Date(date)]),
                ]
              : // empty array preferred for falsy value to avoid onClear error
                []
          }
          onChange={({ date }) => {
            if (!date) {
              return setDate(null);
            }
            // date is a single element array when showTime/timeSelect props are true.
            if (Array.isArray(date) && date.length === 1) {
              return setDate(date[0].getTime());
            }
            if (Array.isArray(date)) {
              return setDate(
                // only parse unparsed datetime strings and return numbers as is. Helps avoid parse errors when selecting daterange with start/end time
                date.map((d) => (typeof d === 'number' ? d : d.getTime()))
              );
            }
            return setDate(date.getTime());
          }}
          formatString={format}
          mask={null}
          overrides={{
            Input: {
              props: {
                overrides: {
                  Input: {
                    style: ({ $disabled }) => ({
                      height: sizes.inputHeight,
                      borderRadius: `${sizes.borderRadius}px`,
                      // borderWidth: '0.5px',
                      borderTopWidth: '0.5px',
                      borderRightWidth: '0.5px',
                      borderBottomWidth: '0.5px',
                      borderLeftWidth: '0.5px',

                      ...($disabled
                        ? {
                            borderTopStyle: 'solid',
                            borderRightStyle: 'solid',
                            borderBottomStyle: 'solid',
                            borderLeftStyle: 'solid',
                            borderColor: '#CCC',
                          }
                        : {}),
                    }),
                  },

                  InputContainer: {
                    style: {
                      height: sizes.inputHeight,
                      borderTopWidth: '0.5px',
                      borderRightWidth: '0.5px',
                      borderBottomWidth: '0.5px',
                      borderLeftWidth: '0.5px',
                    },
                  },
                },
              },
            },
            TimeSelect: {
              props: {
                step: step || 900,
              },
            },
            ...overrides,
          }}
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
          }}
          placeholder="DD/MM/YYYY"
          {...rest}
        />
      </Block>
      <Text small error style={{ height: 10 }}>
        {meta.touched && meta.error && meta.error}
      </Text>
    </Block>
  );
};
BaseWebDatePicker.defaultProps = {
  showTime: false,
  clearable: true,
  filterDate: () => true,
  meta: {},
};
export default BaseWebDatePicker;

import React from 'react';
import { Datepicker } from 'baseui/datepicker';
import en from 'date-fns/locale/en-US';
import { makeStyles } from '@material-ui/core/styles';
import Block from '../Block';
import Text from '../Text';
import ThemeContext from '../theme/ThemeContext';
import LayersManager from './LayersManager';

const useStyles = ({ sizes }) =>
  makeStyles({
    pickerContainer: {
      marginBottom: sizes.baseMargin,
    },
  });

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
    <LayersManager zIndex={1310}>
      <Block>
        <Block
          flex={false}
          style={{ height: sizes.inputHeight, position: 'relative', zIndex: 1 }}
          ref={containerRef}
        >
          <Datepicker
            autoFocusCalendar={false}
            mountNode={containerRef.current}
            locale={en}
            value={[date ? new Date(date) : null]}
            onChange={({ date }) => {
              if (!date) {
                return setDate(null);
              }
              if (Array.isArray(date)) {
                return setDate(date.map((d) => d.getTime()));
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
                MonthYearSelectPopover: {
                  props: {
                    mountNode: containerRef.current,
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
              return true;
            }}
            {...rest}
          />
        </Block>
        <Text small error style={{ height: 10 }}>
          {meta.touched && meta.error && meta.error}
        </Text>
      </Block>
    </LayersManager>
  );
};
BaseWebDatePicker.defaultProps = {
  showTime: false,
  clearable: true,
  filterDate: () => true,
  meta: {},
};
export default BaseWebDatePicker;

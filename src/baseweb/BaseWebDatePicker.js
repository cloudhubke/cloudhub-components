import React from 'react';
import isEqual from 'lodash/isEqual';
import { Datepicker } from 'baseui/datepicker';
import { Layer } from 'baseui/layer';
import en from 'date-fns/locale/en-US';
import { makeStyles } from '@material-ui/core/styles';
import Block from '../Block';
import Text from '../Text';
import ThemeContext from '../theme/ThemeContext';

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
  dateFormat = 'dd/MM/yyyy',
  ...rest
}) => {
  const val = input.value || value;
  const [date, setDate] = React.useState(val);
  const { sizes, colors } = React.useContext(ThemeContext);
  const classes = useStyles({ sizes, colors, active: meta.active })();
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
        style={{ height: sizes.inputHeight, position: 'relative', zIndex: 1 }}
        ref={containerRef}
      >
        <Layer
          index={1}
          host={containerRef.current}
          mountNode={containerRef.current}
        >
          <Datepicker
            mountNode={containerRef.current}
            locale={en}
            value={[date ? new Date(date) : null]}
            onChange={({ date }) => {
              setDate(date ? date.getTime() : null);
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
              ...overrides,
            }}
            clearable
            {...rest}
          />
        </Layer>
      </Block>
      <Text small error style={{ height: 10 }}>
        {meta.touched && meta.error && meta.error}
      </Text>
    </Block>
  );
};

export default BaseWebDatePicker;

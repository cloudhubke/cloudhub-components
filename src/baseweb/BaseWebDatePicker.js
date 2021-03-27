import React from 'react';
import { StatefulDatepicker } from 'baseui/datepicker';
import { LayersManager } from 'baseui/layer';
import en from 'date-fns/locale/en-US';
import { makeStyles } from '@material-ui/core/styles';
import Block from '../Block';
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
  dateFormat = 'dd/MM/yyyy',
  ...rest
}) => {
  const val = value || input.value || new Date().getTime();
  const [initialValue, setinitialValue] = React.useState(val);
  const { sizes, colors } = React.useContext(ThemeContext);
  const classes = useStyles({ sizes, colors, active: meta.active })();
  const containerRef = React.useRef();

  React.useEffect(() => {
    if (initialValue !== val) {
      if (typeof onChange === 'function') {
        onChange(initialValue);
      }
      if (input && typeof input.onChange === 'function') {
        input.onChange(initialValue);
      }
    }
  }, [initialValue]);

  const format = `${dateFormat}`
    .replace(/D/g, 'd')
    .replace(/Y/g, 'y')
    .replace(/M/g, 'L');

  return (
    <Block ref={containerRef} className={classes.pickerContainer}>
      <LayersManager zIndex={1301}>
        <StatefulDatepicker
          locale={en}
          value={initialValue ? [new Date(initialValue)] : null}
          onChange={({ date }) => {
            setinitialValue(date ? date.getTime() : null);
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
                      borderWidth: '0.5px',
                      borderTopWidth: '0.5px',
                      borderRightWidth: '0.5px',
                      borderBottomWidth: '0.5px',
                      borderLeftWidth: '0.5px',

                      ...($disabled
                        ? {
                            borderStyle: 'solid',
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
      </LayersManager>
    </Block>
  );
};

export default BaseWebDatePicker;

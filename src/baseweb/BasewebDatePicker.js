import React from 'react';
import { DatePicker } from 'baseui/datepicker';
import { LayersManager } from 'baseui/layer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import moment from 'moment';
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

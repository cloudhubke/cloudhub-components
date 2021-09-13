import React, { useEffect, useState } from 'react';
import { Form, FormSpy } from 'react-final-form';
import WatchLaterOutlined from '@mui/icons-material/WatchLaterOutlined';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

import Popper from '../dialog/Popper';
import IconButton from '../IconButton';
import Chips from '../Chips';
import Block from '../Block';
import FieldBlock from '../FieldBlock';
import Button from '../Button';
import Field from '../form/Field';
import Text from '../Text';
import TimePicker from './AntTimePicker';
import ThemeContext from '../theme/ThemeContext';

const TimeDurationPicker = ({
  spy,
  onChange,
  input,
  value,
  meta,
  ...props
}) => {
  let values = input.value || value;
  if (!Array.isArray(values)) {
    values = [];
  }

  const [durations, setDurations] = useState(values);
  const [popperopen, setPopperOpen] = useState(false);
  const id = popperopen ? 'time-duration-popover' : null;
  const { colors, sizes } = React.useContext(ThemeContext);

  const styles = {
    input: {
      height: sizes.inputHeight,
      border: `0.5px solid ${colors.gray}`,
      borderRadius: 5,
    },
  };

  const onInputChange = (values) => {
    if (values.Start && values.End) {
      setDurations([...durations, values]);
    }
  };

  useEffect(() => {
    if (!isEqual(values, durations)) {
      input.onChange(durations);
      input.onBlur();
      onChange(durations);
    }
  }, [durations, values, input, onChange]);

  const format = (tt) => moment(tt, 'HHmmss').format('hh:mm a');

  return (
    <Block row middle style={styles.input} padding={[0, sizes.padding]}>
      <Block style={{ maxHeight: sizes.inputHeight, overflow: 'auto' }}>
        <Chips
          data={durations}
          extractLabel={(data) => `${format(data.Start)} - ${format(data.End)}`}
          extractKey={(d, i) => i}
        />
      </Block>
      <Block flex={false}>
        <Popper
          arrow={false}
          open={popperopen}
          onClose={() => setPopperOpen(false)}
          paperStyle={{ overflow: 'visible' }}
          disableClickAwayClose
          anchorComponent={
            <IconButton
              aria-describedby={id}
              onClick={() => setPopperOpen(true)}
            >
              <WatchLaterOutlined
                style={{ fontSize: 32, color: colors.gray }}
              />
            </IconButton>
          }
        >
          <Block style={{ width: 400 }}>
            <Form
              onSubmit={onInputChange}
              render={({ submitting, pristine, handleSubmit, values }) => (
                <Block>
                  <FieldBlock row>
                    <Field
                      label="Start"
                      type="text"
                      name="Start"
                      component={TimePicker}
                      required
                      style={{
                        minWidth: 160,
                        width: 200,
                      }}
                    />
                    <Field
                      label="End"
                      type="text"
                      name="End"
                      component={TimePicker}
                      required
                      style={{
                        minWidth: 160,
                        width: 200,
                      }}
                    />
                  </FieldBlock>
                  <Block right>
                    <Button
                      color="primary"
                      rounded
                      onClick={() => {
                        handleSubmit();
                        setPopperOpen(false);
                      }}
                    >
                      <Text white>Ok</Text>
                    </Button>
                  </Block>

                  {spy && (
                    <FormSpy onChange={({ values }) => onInputChange(values)} />
                  )}
                </Block>
              )}
            />
          </Block>
        </Popper>
      </Block>
    </Block>
  );
};

TimeDurationPicker.defaultProps = {
  onChange: () => {},
  input: {
    value: [],
    onChange: () => {},
    onBlur: () => {},
  },
  spy: true,
};

export default TimeDurationPicker;

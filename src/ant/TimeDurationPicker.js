import React, { useRef, useEffect, useState } from 'react';
import { Form, FormSpy } from 'react-final-form';
import WatchLaterOutlined from '@mui/icons-material/WatchLaterOutlined';
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

let styles;

const TimeDurationPicker = ({ spy, onChange, input, meta, ...props }) => {
  const { colors, sizes } = React.useContext(ThemeContext);
  if (!styles) {
    styles = createStyles({ sizes, colors });
  }
  const savedPopper = useRef();
  const [popperopen, setPopperOpen] = useState(false);

  const id = popperopen ? 'time-duration-popover' : null;

  const onInputChange = (values) => {
    input.onChange(values);
    onChange(values);
  };

  useEffect(() => {
    savedPopper.current = popperopen;
  }, [popperopen]);

  const data = [
    { id: 0, label: 'Angular' },
    { id: 1, label: 'jQuery' },
    { id: 2, label: 'Polymer' },
    { id: 3, label: 'React' },
    { id: 4, label: 'Vue.js' },
  ];

  return (
    <Block row middle style={styles.input} padding={[0, sizes.padding]}>
      <Block style={{ maxHeight: sizes.inputHeight, overflow: 'auto' }}>
        <Chips
          data={data}
          getLabel={(data) => data.label}
          extractKey={(data) => data.id}
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
                    <Button color="primary" rounded onClick={handleSubmit}>
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

const createStyles = ({ sizes, colors }) => ({
  input: {
    height: sizes.inputHeight,
    border: `0.5px solid ${colors.gray}`,
    borderRadius: 5,
  },
});

TimeDurationPicker.defaultProps = {
  onChange: () => {},
  input: {
    value: [],
    onChange: () => {},
  },
  spy: true,
};

export default TimeDurationPicker;

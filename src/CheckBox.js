import React, { Component } from 'react';
import green from '@material-ui/core/colors/green';
import MuiCheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import Text from './Text';
import Block from './Block';
import Button from './Button';
import { sizes, colors } from './theme';

const checkBoxStyles = {
  checkBox: {
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    color: colors.dark
  }
};

const CheckBox = ({
  value,
  onChange,
  input,
  label,
  tag,
  height,
  meta,
  disabled
}) => {
  const val = input.value || value;

  const [checkvalue, setCheckValue] = React.useState(Boolean(val));

  const onCheck = () => {
    input.onChange(!checkvalue);
    input.onBlur();

    onChange(!checkvalue);
  };

  React.useEffect(() => {
    setCheckValue(Boolean(val));
  }, [val]);

  return (
    <Block>
      <Block row style={{ marginRight: sizes.margin }}>
        <Button
          fullWidth
          onClick={onCheck}
          style={checkBoxStyles.checkBox}
          padding={[0, sizes.padding, 0, 0]}
          disabled={disabled}
        >
          {checkvalue ? (
            <MuiCheckBox
              style={{
                height,
                width: height,
                color: green[500],
                marginRight: sizes.margin
              }}
            />
          ) : (
            <CheckBoxOutlineBlank
              style={{
                height,
                width: height,
                marginRight: sizes.margin
              }}
            />
          )}
          <Text>{label || tag}</Text>
        </Button>
        <Text small error style={{ height: 10 }}>
          {meta.touched && meta.error && meta.error}
        </Text>
      </Block>
    </Block>
  );
};

CheckBox.defaultProps = {
  input: {
    value: null,
    onChange: () => {},
    onBlur: () => {}
  },
  meta: {},
  value: null,
  onChange: () => {},
  height: sizes.inputHeight
};

export default CheckBox;

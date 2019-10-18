import React, { Component } from 'react';
import green from '@material-ui/core/colors/green';
import MuiCheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import Text from './Text';
import Block from './Block';
import Button from './Button';
import { sizes, colors } from '../theme';

const checkBoxStyles = {
  checkBox: {
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    color: colors.dark,
  },
};

class checkbox extends Component {
  static defaultProps = {
    input: {
      value: null,
      onChange: () => {},
      onBlur: () => {},
    },
    meta: {},
    value: null,
    onChange: () => {},
    height: sizes.inputHeight,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkvalue: false,
    };
  }

  onCheck = () => {
    this.setState(({ checkvalue }) => {
      this.props.input.onChange(!checkvalue);
      this.props.onChange(!checkvalue);
      this.props.input.onBlur();
      return {
        checkvalue: !checkvalue,
      };
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const checkvalue = nextProps.input.value || nextProps.value;
    return {
      ...prevState,
      checkvalue,
    };
  }

  render() {
    const { label, height, meta, disabled } = this.props;
    const { checkvalue } = this.state;
    return (
      <Block style={{ marginRight: sizes.margin }}>
        <Button
          fullWidth
          onClick={this.onCheck}
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
                marginRight: sizes.margin,
              }}
            />
          ) : (
            <CheckBoxOutlineBlank
              style={{
                height,
                width: height,
                marginRight: sizes.margin,
              }}
            />
          )}
          <Text>{label}</Text>
        </Button>
        <Text small error style={{ height: 10 }}>
          {meta.touched && meta.error && meta.error}
        </Text>
      </Block>
    );
  }
}

export default checkbox;

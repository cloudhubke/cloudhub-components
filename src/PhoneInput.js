import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneNumber from 'awesome-phonenumber';
import { sizes, colors } from './theme';

import PickCountry from './countrypicker/PickCountry';

import Block from './Block';
import Text from './Text';

class PhoneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cca2: props.cca2 || 'KE',
      callingCode: props.callingCode || '254',
      placeholder: 'Enter your mobile number',
      phone: '',
      text: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let phone = nextProps.input.value || nextProps.value;

    function getPhone() {
      if (phone) {
        const pn = new PhoneNumber(phone);

        if (pn.isValid()) {
          phone = pn.getNumber();
          return { phone, cca2: pn.getRegionCode() };
        }
      }
      return {};
    }

    function getPlaceHolder() {
      if (!nextProps.placeholder) {
        const placeholder = PhoneNumber.getExample(
          prevState.cca2 || 'KE',
          'mobile'
        ).getNumber('national');
        return { placeholder };
      }

      return {};
    }

    const newstate = {
      ...prevState,
      ...getPhone(),
      ...getPlaceHolder(),
    };
    return newstate;
  }

  onCallingCodeChanged = ({ cca2, callingCode }) => {
    const placeholder = PhoneNumber.getExample(
      cca2 || 'KE',
      'mobile'
    ).getNumber('national');

    this.setState({
      callingCode: callingCode || '254',
      cca2: cca2 || 'KE',
      placeholder,
    });
    this._mobilenumberInput.focus();
  };

  onPhoneChange = phone => {
    if (phone) {
      const pn = new PhoneNumber(phone, this.state.cca2);

      if (pn.isValid()) {
        this.props.onPhoneChanged({ text: phone, phone: pn.getNumber() });
        this.props.input.onChange(pn.getNumber());
        this.props.input.onBlur();
      } else {
        this.props.onPhoneChanged({ text: phone, phone: '' });
        this.props.input.onChange('');
        this.props.input.onBlur();
      }
    }
    this.setState({ phone });
  };

  render() {
    const {
      classes,
      meta,
      readOnly,
      marginRight,
      showCode,
      disabled,
      style,
    } = this.props;
    const { phone, placeholder } = this.state;

    const inputStyles = {
      backgroundColor: colors.white,
      height: sizes.inputHeight,
      marginRight: marginRight || 0,
      ...style,
    };

    return (
      <Block>
        <TextField
          id="adornment-password"
          type="tel"
          variant="outlined"
          placeholder={placeholder}
          className={classes.margin}
          inputRef={this._mobilenumberInput}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            readOnly,
            classes: {
              input: classes.input,
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            startAdornment: (
              <InputAdornment position="start">
                <PickCountry
                  onCallingCodeChanged={this.onCallingCodeChanged}
                  callingCode={this.state.callingCode}
                  cca2={this.state.cca2}
                  size={24}
                  showCode={showCode}
                />
              </InputAdornment>
            ),
          }}
          style={inputStyles}
          error={Boolean(meta.touched && meta.error)}
          disabled={disabled}
          value={phone}
          onChange={e => {
            e.preventDefault();
            this.onPhoneChange(e.target.value);
          }}
        />
        <Text small error style={{ height: 10 }}>
          {meta.touched && meta.error && meta.error}
        </Text>
      </Block>
    );
  }
}

const styles = () => ({
  margin: {
    marginTop: 0,
    marginBottom: 0,
  },
  input: {
    paddingTop: 0,
    paddingBottom: 0,
    height: sizes.inputHeight,
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: colors.primary,
    },
    height: sizes.inputHeight,
  },
  notchedOutline: {
    margin: 0,
  },
  cssFocused: {},
  cssLabel: {},
});

PhoneInput.defaultProps = {
  meta: {},
  input: {
    onChange: () => {},
    value: '',
  },
  onPhoneChanged: () => {},
  marginRight: sizes.margin,
  showCode: false,
};

export default withStyles(styles)(PhoneInput);

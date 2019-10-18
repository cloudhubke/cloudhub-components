import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { sizes, colors } from 'theme';
import PhoneNumber from 'awesome-phonenumber';

import PickCountry from './countrypicker/PickCountry';

import Block from './Block';
import Text from './Text';

class PhoneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cca2: 'KE',
      callingCode: '254',
      placeholder: 'Enter your mobile number',
      phone: '',
    };

    this._mobilenumberInput = React.createRef();
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { value } = nextProps.input;
    let phone = '';
    if (value) {
      const pn = new PhoneNumber(value);
      if (pn.isValid()) {
        phone = pn.getNumber('national');
        return { ...prevState, phone, cca2: pn.getRegionCode() };
      }
    }
    return { ...prevState };
  };
  onPhoneChanged = phone => {
    const pn = new PhoneNumber(phone, this.state.cca2);
    if (pn.isValid()) {
      this.props.input.onChange(pn.getNumber());
    } else {
      this.props.input.onChange('');
    }
    this.setState({ phone });
  };

  onCallingCodeChanged = ({ callingCode, cca2 }) => {
    try {
      const placeholder = PhoneNumber.getExample(
        cca2 || 'KE',
        'mobile'
      ).getNumber('national');

      this.setState({
        callingCode: callingCode || '254',
        cca2: cca2 || 'KE',
        placeholder: placeholder || '0712123456',
      });
      this._mobilenumberInput.current.focus();
    } catch (error) {
      // error
    }
  };

  handleShowCountries = () => {};
  render() {
    const { classes, input, meta, readOnly, marginRight, ...rest } = this.props;
    const { phone, placeholder } = this.state;

    const inputStyles = {
      ...{},
      backgroundColor: colors.white,
      height: sizes.inputHeight,
      marginRight: marginRight || 0,
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
                  showCode
                />
              </InputAdornment>
            ),
          }}
          style={inputStyles}
          {...input}
          onChange={e => this.onPhoneChanged(e.target.value)}
          value={phone}
          error={Boolean(meta.touched && meta.error)}
          {...rest}
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
      borderColor: 'red',
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
  marginRight: sizes.margin,
};

export default withStyles(styles)(PhoneInput);

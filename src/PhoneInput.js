import React, { Component, Fragment } from 'react';
import IntlTelInput from 'react-intl-tel-input';
import PhoneNumber from 'awesome-phonenumber';
import 'react-intl-tel-input/dist/main.css';
import './phoneinput.css';

const styles = {
  input: {
    background: 'red',
    height: 33,
    padding: 2,
  },
};

class PhoneInput extends Component {
  static defaultProps = {
    preferredCountries: ['ke'],
    defaultCountry: 'ke',
    onChange: () => {},
    value: '',
    fieldId: '',
    input: {
      value: '',
      onChange: () => {},
    },
    inputClassName: 'phone-input',
    meta: {},
  };

  state = {
    touched: false,
    value: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const value = nextProps.input.value || nextProps.value;

    const pn = new PhoneNumber(value);
    if (pn.isValid()) {
      return {
        ...prevState,
        value,
      };
    }
    return { ...prevState };
  }

  validate = (isValid, phone, country) => {
    const {
      input: { onChange },
    } = this.props;

    this.setState({ touched: true, value: phone });

    if (country.iso2) {
      const pn = new PhoneNumber(phone, country.iso2.toUpperCase());

      if (pn.isValid()) {
        onChange(pn.getNumber());
      } else {
        onChange(null);
      }
    }
  };

  render() {
    const { meta } = this.props;
    return (
      <div>
        <IntlTelInput
          preferredCountries={this.props.preferredCountries}
          defaultCountry={this.props.defaultCountry}
          value={this.state.value.toString()}
          inputClassName={this.props.inputClassName}
          fieldId={this.props.fieldId}
          onPhoneNumberChange={this.validate}
        />

        {meta.touched && meta.error && (
          <div className="error">ERROR: {meta.error}</div>
        )}
      </div>
    );
  }
}

export default PhoneInput;

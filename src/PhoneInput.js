import React, { Component } from 'react';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/libphonenumber';

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
  };

  state = {
    touched: false,
    value: '',
  };

  componentDidMount() {
    this.setState({ value: this.props.input.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input.value !== null && nextProps.input.value !== '') {
      this.setState({ value: nextProps.input.value });
    }
  }

  validate = (isValid, phone, country) => {
    const { input: { onChange } } = this.props;

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
      <div style={{ width: '100%', flex: 1 }}>
        <IntlTelInput
          preferredCountries={this.props.preferredCountries}
          defaultCountry={this.props.defaultCountry}
          css={['intl-tel-input']}
          value={this.state.value.toString()}
          onPhoneNumberChange={this.validate}
        />
        {meta.touched &&
          meta.error && <div className="error">{meta.error}</div>}
      </div>
    );
  }
}

export default PhoneInput;

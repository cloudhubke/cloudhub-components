import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PhoneNumber from 'awesome-phonenumber';

import PickCountry from './countrypicker/PickCountry';

import Block from './Block';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';

const useStyles = ({ sizes, colors }) =>
  makeStyles({
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

const PhoneInput = ({
  input,
  value,
  onPhoneChanged,
  meta,
  readOnly,
  marginRight,
  showCode,
  disabled,
  style,
  ...props
}) => {
  const _mobilenumberInput = React.useRef();
  const { sizes, colors } = React.useContext(ThemeContext);

  const classes = useStyles({ sizes, colors })();

  const [cca2, setCca2] = React.useState(props.cca2 || 'KE');
  const [callingCode, setCallingCode] = React.useState(
    props.callingCode || '254'
  );
  const [text, setText] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [placeholder, setPlaceholder] = React.useState('');

  React.useEffect(() => {
    let phone = input.value || value;

    function getPhone() {
      if (phone) {
        const pn = new PhoneNumber(phone);

        if (pn.isValid()) {
          phone = pn.getNumber();
          setPhone(phone);
          setCca2(pn.getRegionCode());
        }
      }
    }

    function getPlaceHolder() {
      if (!props.placeholder) {
        const placeholder = PhoneNumber.getExample(
          cca2 || 'KE',
          'mobile'
        ).getNumber('national');

        return setPlaceholder(placeholder);
      }
      return true;
    }

    getPhone();
    getPlaceHolder();
  }, [input.value, value]);

  const onCallingCodeChanged = ({ cca2, callingCode }) => {
    const placeholder = PhoneNumber.getExample(
      cca2 || 'KE',
      'mobile'
    ).getNumber('national');

    setCallingCode(callingCode || '254');
    setCca2(cca2 || 'KE');
    setPlaceholder(placeholder);

    _mobilenumberInput.current.focus();
  };

  const onPhoneChange = (phone) => {
    if (phone) {
      const pn = new PhoneNumber(phone, cca2);

      if (pn.isValid()) {
        onPhoneChanged({ text: phone, phone: pn.getNumber() });
        input.onChange(pn.getNumber());
        input.onBlur();
      } else {
        onPhoneChanged({ text: phone, phone: '' });
        input.onChange('');
        input.onBlur();
      }
    }
    setPhone(phone);
  };

  return (
    <ThemeContext.Consumer>
      {({ sizes, colors }) => {
        const inputStyles = {
          backgroundColor: colors.white,
          height: sizes.inputHeight,
          ...style,
        };
        return (
          <Block>
            <TextField
              type="tel"
              variant="outlined"
              placeholder={placeholder}
              className={classes.margin}
              inputRef={_mobilenumberInput}
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
                      onCallingCodeChanged={onCallingCodeChanged}
                      callingCode={callingCode}
                      cca2={cca2}
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
              onChange={(e) => {
                e.preventDefault();
                onPhoneChange(e.target.value);
              }}
            />
            <Text small error style={{ height: 10 }}>
              {meta.touched && meta.error && meta.error}
            </Text>
          </Block>
        );
      }}
    </ThemeContext.Consumer>
  );
};

PhoneInput.defaultProps = {
  meta: {},
  input: {
    onChange: () => {},
    value: '',
  },
  onPhoneChanged: () => {},
  showCode: false,
};

export default PhoneInput;

import React from 'react';
import TextField from '@mui/material/TextField';

import { makeStyles } from '@mui/styles';

import Block from './Block';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';

// const required = value => (value ? undefined : 'Required');

const useStyles = ({ sizes, colors }) =>
  makeStyles({
    container: {
      '&.MuiFormControl-root.MuiTextField-root': {
        marginTop: 0,
        marginBottom: 0,
      },
    },
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

const Input = ({
  label,
  input,
  meta,
  readOnly,
  marginRight,
  style,
  required,
  onKeyEnter,
  startAdornment,
  endAdornment,
  showError,
  ...rest
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);

  const classes = useStyles({ sizes, colors })();
  const inputRef = React.useRef();

  const keyEnter = (event) => {
    if (event.keyCode === 13) {
      onKeyEnter();
    }
  };

  const focus = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    inputRef.current.focus();
  };

  const inputStyles = {
    height: sizes.inputHeight,
    margin: 0,
    // backgroundColor: '#FFF',
    ...style,
  };

  return (
    <Block className={classes.container}>
      <TextField
        label={label}
        className={classes.margin}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            input: classes.input,
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },

          readOnly,
          startAdornment,
          endAdornment,
        }}
        onKeyPress={(e) => keyEnter(e)}
        style={inputStyles}
        error={Boolean(meta.touched && meta.error)}
        inputRef={inputRef}
        margin="normal"
        {...input}
        {...rest}
      />

      {showError && (
        <Text small error style={{ height: 10 }}>
          {meta.touched && meta.error && meta.error}
        </Text>
      )}
    </Block>
  );
};

Input.defaultProps = {
  input: {},
  meta: {},
  onKeyEnter: () => null,
  showError: true,
  variant: 'outlined',
};

export default Input;

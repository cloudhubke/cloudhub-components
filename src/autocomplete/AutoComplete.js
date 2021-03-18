import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ThemeContext from '../theme/ThemeContext';
import Block from '../Block';
import Text from '../Text';

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
      marginTop: -sizes.padding,
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
const AutoComplete = ({
  options,
  input,
  value,
  onChange,
  size,
  showError = true,
  meta,
  readOnly,
  onInputChange,
  ...rest
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);

  const classes = useStyles({ sizes, colors })();
  return (
    <Block>
      <Autocomplete
        options={options}
        id="auto-complete"
        size={size || 'medium'}
        onChange={(event, val) => {
          if (typeof input.onChange === 'function') {
            input.onChange(val);
          }
          if (typeof onChange === 'function') {
            onChange(val);
          }
        }}
        inputValue={input.value || value || ''}
        value={input.value || value || ''}
        onInputChange={(event, val) => {
          if (typeof input.onChange === 'function') {
            input.onChange(val);
          }
          if (typeof onChange === 'function') {
            onChange(val);
          }
          onInputChange(val);
        }}
        renderInput={(params) => (
          <TextField
            margin="none"
            size="medium"
            variant="outlined"
            {...params}
            inputProps={{
              autoComplete: 'new-password',
              ...(params.inputProps || {}),
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              ...(params.InputProps || {}),
              classes: {
                input: classes.input,
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
        )}
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
AutoComplete.defaultProps = {
  options: [],
  input: {
    onChange: () => {},
  },
  onChange: () => {},
  onInputChange: () => {},
  getOptionLabel: (option) => (option && option.id ? option.id : `${option}`),
};
export default AutoComplete;

import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const AutoComplete = ({ options, input, value, onChange, ...rest }) => (
  <Autocomplete
    fullWidth
    options={options}
    onChange={(val) => {
      if (typeof input.onChange === 'function') {
        input.onChange(val);
      }
      if (typeof onChange === 'function') {
        onChange(val);
      }
    }}
    renderInput={(params) => (
      <TextField
        //   margin="normal"
        variant="outlined"
        {...params}
      />
    )}
    {...rest}
  />
);
AutoComplete.defaultProps = {
  options: [],
  input: {
    onChange: () => {},
  },
  onChange: () => {},
};
export default AutoComplete;

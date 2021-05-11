import React from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Radio,
} from '@material-ui/core';

const RadioInput = ({
  input,
  value,
  onChange,
  options,
  name,
  Row,
  valueKey,
  labelKey,
  meta,
  showError,
}) => (
  <FormControl component="fieldset">
    <RadioGroup
      aria-label="radio-group"
      name={input.name || name || 'radio-group'}
      row={Boolean(Row)}
      onChange={(e) => {
        onChange(e.target.value);
        input.onChange(e.target.value);
      }}
      value={input.value || value}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option[valueKey || 'value'] || option}
          value={option[valueKey || 'value'] || option}
          control={<Radio />}
          label={option[labelKey || 'label'] || option}
        />
      ))}
    </RadioGroup>
    {showError && (
      <FormHelperText id="component-helper-text">{meta.error}</FormHelperText>
    )}
  </FormControl>
);
RadioInput.defaultProps = {
  onChange: () => {},
  input: {
    onChange: () => {},
    name: '',
    value: '',
  },
  value: '',
  options: [],
  showError: true,
};
export default RadioInput;

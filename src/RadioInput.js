import React from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
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
};
export default RadioInput;

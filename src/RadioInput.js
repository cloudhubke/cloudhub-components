import React from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  // FormHelperText,
  Radio,
} from '@mui/material';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';

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
}) => {
  const { colors } = React.useContext(ThemeContext);
  return (
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
      {showError && meta.touched && meta.error && (
        <Text small color={colors.error} id="component-helper-text">
          {meta.error}
        </Text>
      )}
    </FormControl>
  );
};
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

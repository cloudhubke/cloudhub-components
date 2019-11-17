import React from 'react';
import { Field as FinalFormField } from 'react-final-form';

import FieldBlock from '../FieldBlock';
import Input from '../Input';

const requiredField = value => (value ? undefined : 'Required');

const mustBeNumber = value => {
  const n = Number(value);
  if (n === 0) {
    return undefined;
  }
  const isValid = Boolean(n);
  return !isValid ? 'Must be a number' : undefined;
};

const minFieldValue = min => value => {
  if (Number(value) < Number(min)) {
    return `Min is ${min}`;
  }
  return undefined;
};

const maxFieldValue = max => value => {
  if (Number(value) > Number(max)) {
    return `Max is ${max}`;
  }
  return undefined;
};

const minFieldLength = min => value => {
  if (`${value}`.length < Number(min) || !value) {
    return `Should be more than ${min} characters`;
  }
  return undefined;
};
const maxFieldLength = max => value => {
  if (`${value}`.length > Number(max) || !value) {
    return `Should be less than ${max} characters`;
  }
  return undefined;
};

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const FormField = ({
  required,
  number,
  minValue,
  maxValue,
  minLength,
  maxLength,
  label,
  row,
  flex,
  component,
  style,
  ...props
}) => {
  let validators = [];
  const fieldprops = {};

  if (required) {
    validators = [...validators, requiredField];
  }
  if (number) {
    validators = [...validators, mustBeNumber];
    fieldprops.type = 'number';
  }
  if (minValue || minValue === 0) {
    validators = [...validators, minFieldValue(minValue)];
  }
  if (maxValue || maxValue === 0) {
    validators = [...validators, maxFieldValue(maxValue)];
  }

  if (minLength) {
    validators = [...validators, minFieldLength(minLength)];
  }
  if (maxLength) {
    validators = [...validators, maxFieldLength(maxLength)];
  }

  return (
    <FieldBlock row={row} style={style} flex={flex}>
      {row ? (
        <FieldBlock>
          {`${required && label ? '*' : ''}${label || ''}`}
        </FieldBlock>
      ) : (
        <label>{`${required && label ? '*' : ''}${label || ''}`}</label>
      )}
      <FinalFormField
        validate={composeValidators(...validators)}
        component={component}
        {...fieldprops}
        {...props}
      />
    </FieldBlock>
  );
};

export default FormField;

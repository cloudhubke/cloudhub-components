import React from 'react';
import { Field as FinalFormField } from 'react-final-form';
import isNaN from 'lodash/isNaN';
import FieldBlock from '../FieldBlock';

const requiredField = value => (value ? undefined : 'Required');
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);

const minFieldValue = min => value => {
  if (Number(value) > Number(min) || isNaN(value)) {
    return `Should be greater than ${min}`;
  }
  return undefined;
};

const maxFieldValue = max => value => {
  if (Number(value) > Number(max) || isNaN(value)) {
    return `Should be less than ${max}`;
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
  if (`${value}`.length < Number(max) || !value) {
    return `Should be less than ${max} characters`;
  }
  return undefined;
};

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const Field = ({
  required,
  number,
  minValue,
  maxValue,
  minLength,
  maxLength,
  label,
  row,
  flex,
  style,
  ...props
}) => {
  let validators = [];

  if (required) {
    validators = [...validators, requiredField];
  }
  if (number) {
    validators = [...validators, mustBeNumber];
  }
  if (minValue) {
    validators = [...validators, minFieldValue(minValue)];
  }
  if (maxValue) {
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
      {row ? <FieldBlock>{label}</FieldBlock> : <label>{label}</label>}
      <FinalFormField validate={composeValidators(...validators)} {...props} />
    </FieldBlock>
  );
};

export default Field;

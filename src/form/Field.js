import React from 'react';
import { Field as FinalFormField } from 'react-final-form';
import isEmpty from 'lodash/isEmpty';

import FieldBlock from '../FieldBlock';
import Input from '../Input';

const notEmptyField = value => (isEmpty(value) ? undefined : 'Required');
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

const validateEmail = value => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = re.test(value);
  if (value && !valid) {
    return `Should be a valid email address`;
  }
  return undefined;
};

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

//Component
const FormField = ({
  required,
  notEmpty,
  number,
  email,
  min,
  max,
  minValue,
  maxValue,
  minLength,
  maxLength,
  label,
  row,
  flex = false,
  component,
  wrap = true,
  style,
  ...props
}) => {
  let validators = [];
  const fieldprops = {};

  if (notEmpty) {
    validators = [...validators, notEmptyField];
  }
  if (required) {
    validators = [...validators, requiredField];
  }
  if (email) {
    validators = [...validators, validateEmail];
    fieldprops.type = 'email';
  }

  if (number) {
    validators = [...validators, mustBeNumber];
    fieldprops.type = 'number';
  }

  if (min || min === 0) {
    validators = [...validators, minFieldValue(min)];
  }
  if (max || max === 0) {
    validators = [...validators, maxFieldValue(max)];
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

  // const renderComponent = fldprops => {
  //   return <Component {...fldprops} {...props} />;
  // };

  return wrap ? (
    <FieldBlock row={row} style={{ ...style }} flex={flex}>
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
        label={null}
        {...fieldprops}
        {...props}
      />
    </FieldBlock>
  ) : (
    <FinalFormField
      validate={composeValidators(...validators)}
      component={component}
      label={null}
      {...fieldprops}
      {...props}
    />
  );
};

export default FormField;

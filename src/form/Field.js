import React from 'react';
import { Field as FinalFormField } from 'react-final-form';
import isEmpty from 'lodash/isEmpty';

import Block from '../Block';

const notEmptyField = (value) => (isEmpty(value) ? undefined : 'Required');
const requiredField = (value) => (`${value}` ? undefined : 'Required');

function mustBeAlphabet(value) {
  const letters = /^[A-Za-z]+$/;
  if (`${value}`.match(letters)) {
    return undefined;
  }
  return 'Alphabets only';
}

const mustBeNumber = (value) => {
  const n = Number(value);
  if (n === 0) {
    return undefined;
  }
  const isValid = Boolean(n);
  return !isValid ? 'Must be a number' : undefined;
};

const minFieldValue = (min) => (value) => {
  if (Number(value) < Number(min)) {
    return `Min is ${min}`;
  }
  return undefined;
};

const maxFieldValue = (max) => (value) => {
  if (Number(value) > Number(max)) {
    return `Max is ${max}`;
  }
  return undefined;
};

const minFieldLength = (min) => (value) => {
  if (`${value}`.length < Number(min) || !value) {
    return `Should be more than ${min} characters`;
  }
  return undefined;
};
const maxFieldLength = (max) => (value) => {
  if (`${value}`.length > Number(max) || !value) {
    return `Should be less than ${max} characters`;
  }
  return undefined;
};

const validateEmail = (value) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = re.test(value);
  if (value && !valid) {
    return 'Should be a valid email address';
  }
  return undefined;
};

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

// Component
const FormField = ({
  required,
  notEmpty,
  alphabets,
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
  containerStyle,
  props,
  ...rest
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

  if (alphabets) {
    validators = [...validators, mustBeAlphabet];
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

  // Duplicate
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

  const LabelComponent = () => {
    if (typeof label === 'function') {
      return label();
    }

    return (
      <Block row middle wrap>
        {`${label && required ? '*' : ''}`}
        {label}
      </Block>
    );
  };

  const parseFn = (value) => {
    if (number && value) {
      return Number(value);
    }

    if (email) {
      return `${value || ''}`.toLocaleLowerCase().trim();
    }

    return value;
  };

  return wrap ? (
    <Block
      row={row}
      style={{
        alignItems: 'stretch',
        ...containerStyle,
      }}
      flex={flex}
    >
      <LabelComponent />
      <Block>
        <FinalFormField
          validate={composeValidators(...validators)}
          component={component}
          label={null}
          {...fieldprops}
          required={required}
          parse={parseFn}
          {...props}
          {...rest}
        />
      </Block>
    </Block>
  ) : (
    <FinalFormField
      validate={composeValidators(...validators)}
      component={component}
      label={null}
      parse={parseFn}
      {...fieldprops}
      {...props}
      {...rest}
    />
  );
};

export default FormField;

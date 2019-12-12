import React, { Component } from 'react';
import isPlainObject from 'lodash/isPlainObject';
import CloudhubSelector from './Select';
import { sizes } from '../theme';
import Block from '../Block';
import Text from '../Text';
import getCustomStyles from './getCustomStyles';

const StaticListSelector = props => {
  const {
    options,
    input,
    value,
    meta,
    isMulti,
    displayField,
    returnkeys,
    ...rest
  } = props;

  const error = meta.error && meta.touched;
  const customStyles = getCustomStyles({ error, isMulti });

  const val = input.value || value;

  let labelExtractor = item => item;
  let valueExtractor = item => item;

  if (displayField) {
    labelExtractor = item => item[displayField];
  }

  if (returnkeys) {
    if (Array.isArray(returnkeys)) {
      valueExtractor = item => {
        const obj = {};
        returnkeys.forEach(k => {
          obj[k] = item[k];
        });
        return obj;
      };
    }
  }

  return (
    <Block style={{ marginRight: sizes.margin }}>
      <CloudhubSelector
        options={options || []}
        value={val}
        onChange={val => {
          input.onChange(val);
          input.onBlur();
        }}
        isMulti={isMulti}
        styles={customStyles}
        labelExtractor={labelExtractor}
        valueExtractor={valueExtractor}
        {...rest}
      />
      <Text small error style={{ height: 10 }}>
        {meta.touched && meta.error && meta.error}
      </Text>
    </Block>
  );
};

StaticListSelector.defaultProps = {
  input: {
    value: null,
    onChange: () => {},
    onBlur: () => {}
  },
  meta: {},
  options: [],
  returnkeys: [],
  menuPlacement: 'auto',
  labelExtractor: item => item,
  keyExtractor: item => (isPlainObject(item) ? item.id : item),
  valueExtractor: item => item
};

export default StaticListSelector;

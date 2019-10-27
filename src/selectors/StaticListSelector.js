import React, { Component } from 'react';
import isPlainObject from 'lodash/isPlainObject';
import CloudhubSelector from './Select';
import { sizes } from '../theme';
import Block from '../Block';
import Text from '../Text';
import getCustomStyles from './getCustomStyles';

const StaticListSelector = props => {
  const { options, input, meta, isMulti, ...rest } = props;

  const error = meta.error && meta.touched;
  const customStyles = getCustomStyles({ error, isMulti });

  return (
    <Block style={{ marginRight: sizes.margin }}>
      <CloudhubSelector
        options={options || []}
        value={input.value}
        onChange={val => {
          console.log('====================================');
          console.log('CHAN', val);
          console.log('====================================');
          input.onChange(val);
          input.onBlur();
        }}
        isMulti={isMulti}
        styles={customStyles}
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
    onBlur: () => {},
  },
  meta: {},
  options: [],
  returnkeys: [],
  menuPlacement: 'auto',
  labelExtractor: item => item,
  keyExtractor: item => item,
  valueExtractor: item => item,
};

export default StaticListSelector;

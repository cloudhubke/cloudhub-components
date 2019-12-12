import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import Block from '../Block';
import Text from '../Text';
import { sizes } from '../theme';
import CloudhubRemoteSelector from './Selector';
import getCustomStyles from './getCustomStyles';

const RemoteSelector = ({
  input,
  onChange,
  meta,
  isMulti,
  displayField,
  returnkeys,
  ...rest
}) => {
  const error = meta.error && meta.touched;
  const customStyles = getCustomStyles({ error, isMulti });

  let labelExtractor = item => item.id;
  let valueExtractor = item => item.id;

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
      <CloudhubRemoteSelector
        value={input.value}
        onChange={val => {
          input.onChange(val);
          input.onBlur();
        }}
        meta={meta}
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

RemoteSelector.defaultProps = {
  input: {
    value: null,
    onChange: () => {},
    onBlur: () => {}
  },
  onChange: () => {},
  onSelectChange: () => {},
  meta: {},
  keyExtractor: item => (isPlainObject(item) ? item.id : item)
};

export default RemoteSelector;

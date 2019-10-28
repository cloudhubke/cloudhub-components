import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import Block from '../Block';
import Text from '../Text';
import { sizes } from '../theme';
import CloudhubRemoteSelector from './Selector';
import getCustomStyles from './getCustomStyles';

const RemoteSelector = ({ input, onChange, meta, isMulti, ...rest }) => {
  const error = meta.error && meta.touched;
  const customStyles = getCustomStyles({ error, isMulti });

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
        keyExtractor={item => item.id}
        labelExtractor={item => item.id}
        valueExtractor={item => ({ ...item })}
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
    onBlur: () => {},
  },
  onChange: () => {},
  onSelectChange: () => {},
  meta: {},
};

export default RemoteSelector;

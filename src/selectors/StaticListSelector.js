import React, { Component } from 'react';
import isPlainObject from 'lodash/isPlainObject';
import CloudhubSelector from './Select';
import { sizes } from '../theme';
import Block from '../Block';
import Text from '../Text';
import getCustomStyles from './getCustomStyles';

class StaticListSelector extends Component {
  static defaultProps = {
    input: {
      value: null,
      onChange: () => {},
      onBlur: () => {},
    },
    value: null,
    onChange: () => {},
    meta: {},
    options: [],
    displayField: '',
    returnkeys: [],
    menuPlacement: 'auto',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      options,
      value,
      input,
      meta,
      onChange,
      onSelectChange,
      menuPlacement,
      isMulti,
      ...rest
    } = this.props;

    const error = meta.error && meta.touched;
    const customStyles = getCustomStyles({ error, isMulti });

    return (
      <Block style={{ marginRight: sizes.margin }}>
        <CloudhubSelector
          options={options || []}
          value={input.value || value}
          onChange={val => {
            if (isPlainObject(val)) {
              const { simple, full } = val;
              input.onChange(simple);
              onChange(simple);
              if (onSelectChange) {
                onSelectChange(full);
              }
              input.onBlur();
            } else {
              input.onChange(val);
              onChange(val);
              if (onSelectChange) {
                onSelectChange(val);
              }
              input.onBlur();
            }
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
  }
}

export default StaticListSelector;

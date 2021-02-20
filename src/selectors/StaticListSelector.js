import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import CloudhubSelector from './Select';
import Block from '../Block';
import Text from '../Text';
import getCustomStyles from './getCustomStyles';
import ThemeContext from '../theme/ThemeContext';

const StaticListSelector = (props) => {
  const {
    options,
    input,
    value,
    meta,
    isMulti,
    displayField,
    returnkeys,
    showError = true,
    style,
    ...rest
  } = props;

  const error = meta.error && meta.touched;
  const { sizes, colors } = React.useContext(ThemeContext);

  const customStyles = getCustomStyles({
    error,
    isMulti,
    sizes,
    colors,
    style,
  });

  const val = input.value || value;

  let labelExtractor = rest.labelExtractor || null;
  let valueExtractor = rest.valueExtractor || null;

  if (returnkeys) {
    if (Array.isArray(returnkeys)) {
      valueExtractor = (item) => {
        const obj = {};
        returnkeys.forEach((k) => {
          obj[k] = item[k];
        });
        return obj;
      };
    }
  }

  if (displayField) {
    labelExtractor = (item) =>
      isPlainObject(item) ? item[displayField] : item;
  }

  return (
    <Block>
      <CloudhubSelector
        options={options || []}
        value={val}
        onChange={(val) => {
          input.onChange(val);
          input.onBlur();
        }}
        isMulti={isMulti}
        styles={customStyles}
        {...rest}
        labelExtractor={labelExtractor}
        valueExtractor={valueExtractor}
      />
      {showError && (
        <Text small error style={{ height: 10 }}>
          {meta.touched && meta.error && meta.error}
        </Text>
      )}
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
  menuPlacement: 'auto',
  valueExtractor: (item) => item,
  labelExtractor: (item, index) =>
    isPlainObject(item) ? item.id || `option-${index}` : `${item}`,
  keyExtractor: (item, index) =>
    isPlainObject(item) ? item.id || `option-${index}` : `option-${index}`,
};

export default StaticListSelector;

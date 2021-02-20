import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import Block from '../Block';
import Text from '../Text';
import CloudhubRemoteSelector from './Selector';
import getCustomStyles from './getCustomStyles';
import ThemeContext from '../theme/ThemeContext';

const RemoteSelector = React.forwardRef(
  (
    { input, onChange, meta, isMulti, displayField, returnkeys, ...rest },
    ref
  ) => {
    const error = meta.error && meta.touched;
    const { sizes, colors } = React.useContext(ThemeContext);
    const customStyles = getCustomStyles({
      error,
      isMulti,
      sizes,
      colors,
    });

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
        <CloudhubRemoteSelector
          ref={ref}
          value={input.value}
          onChange={(val) => {
            input.onChange(val);
            input.onBlur();
          }}
          meta={meta}
          isMulti={isMulti}
          styles={customStyles}
          {...rest}
          labelExtractor={labelExtractor}
          valueExtractor={valueExtractor}
        />
        <Text small error style={{ height: 10 }}>
          {meta.touched && meta.error && meta.error}
        </Text>
      </Block>
    );
  }
);

RemoteSelector.defaultProps = {
  input: {
    value: null,
    onChange: () => {},
    onBlur: () => {},
  },
  onChange: () => {},
  onSelectChange: () => {},
  meta: {},
  valueExtractor: (item) => item,
  labelExtractor: (item, index) =>
    isPlainObject(item) ? item.id || `option-${index}` : `${item}`,
  keyExtractor: (item, index) =>
    isPlainObject(item) ? item.id || `option-${index}` : `option-${index}`,
};

export default RemoteSelector;

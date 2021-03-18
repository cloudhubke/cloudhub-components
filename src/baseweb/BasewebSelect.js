import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import { Select, TYPE } from 'baseui/select';
import { LayersManager } from 'baseui/layer';
import Block from '../Block';
import Text from '../Text';

const BaseWebSelect = (props) => {
  const {
    options,
    input,
    value,
    onChange,
    meta,
    multi,
    returnkeys,
    showError = true,
    search,
    select,
    onSelectChange,
    getOptionLabel,
    getValueLabel,
    ...rest
  } = props;

  const val = input.value || value || [];
  const [initalValue, setValue] = React.useState(
    Array.isArray(val) ? val : [val]
  );
  const [itemOptions, setitemOptions] = React.useState(options);

  const containerRef = React.useRef();

  if (returnkeys) {
    if (Array.isArray(returnkeys)) {
      rest.valueExtractor = (item) => {
        const obj = {};
        returnkeys.forEach((k) => {
          obj[k] = item[k];
        });
        return obj;
      };
    }
  }
  if (
    Array.isArray(options) &&
    (typeof options[0] === 'string' ||
      typeof options[0] === 'number' ||
      typeof options[0] === 'boolean')
  ) {
    rest.valueExtractor = (item) => (item && item.id ? item.id : item);
  }
  React.useEffect(() => {
    if (
      Array.isArray(options) &&
      (typeof options[0] === 'string' ||
        typeof options[0] === 'number' ||
        typeof options[0] === 'boolean')
    ) {
      setitemOptions(
        options.map((item) =>
          typeof options[0] === 'string' ||
          typeof options[0] === 'number' ||
          typeof options[0] === 'boolean'
            ? { id: item }
            : item || { id: item }
        )
      );
    } else {
      setitemOptions(options);
    }
  }, [JSON.stringify(options)]);

  return (
    <Block ref={containerRef}>
      <LayersManager zIndex={1301}>
        <Select
          options={itemOptions || []}
          value={initalValue}
          onChange={(params) => {
            const val = multi
              ? params.value.map((item) => rest.valueExtractor(item))
              : rest.valueExtractor(params.value[0] || null);

            if (typeof onChange === 'function') {
              onChange(val);
            }
            onSelectChange(val);
            input.onChange(val);
            input.onBlur();
            setValue(params.value);
          }}
          multi={Boolean(multi)}
          type={search ? TYPE.search : TYPE.select}
          overrides={{
            Popover: {
              props: {
                mountNode: containerRef.current,
              },
            },
          }}
          getOptionLabel={getOptionLabel}
          getValueLabel={getValueLabel || getOptionLabel}
          {...rest}
        />
      </LayersManager>
      {showError && (
        <Text small error style={{ height: 10 }}>
          {meta.touched && meta.error && meta.error}
        </Text>
      )}
    </Block>
  );
};

BaseWebSelect.defaultProps = {
  input: {
    value: null,
    onChange: () => {},
    onBlur: () => {},
  },
  multi: false,
  meta: {},
  options: [],
  valueExtractor: (item) => item,
  getOptionLabel: ({ option, index }) =>
    isPlainObject(option) ? option.id || `option-${index}` : `${option}`,
  // getValueLabel: ({ option, index }) =>
  //   isPlainObject(option) ? option.id || `option-${index}` : `option-${index}`,
  onSelectChange: () => {},
};

export default BaseWebSelect;

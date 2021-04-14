import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import isEqual from 'lodash/isEqual';
import { Select, TYPE } from 'baseui/select';
import LayersManager from './LayersManager';
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
    isMulti,
    returnkeys,
    showError = true,
    search,
    select,
    labelExtractor,
    onSelectChange,
    getOptionLabel,
    getValueLabel,
    placeholder,
    labelKey,
    valueKey,
    labelField,
    valueField,
    filterOptions,
    ...rest
  } = props;

  const val = input.value || value || [];
  const [initialValue, setValue] = React.useState(
    Array.isArray(val) ? val : [val]
  );
  const [searchTerm, setsearchTerm] = React.useState('');

  // Effect clears displayed value on form reinitialize
  React.useEffect(() => {
    const initVal = Array.isArray(val) ? val : [val];
    if (!isEqual(initVal, initialValue)) {
      setValue(initVal);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(val)]);
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

  const optionLabelExtractor = ({ option, index }) => {
    if (labelExtractor) {
      return labelExtractor(option);
    }
    return getOptionLabel({ option, index });
  };

  const valueLabelExtractor = ({ option, index }) => {
    if (typeof getValueLabel === 'function') {
      return getValueLabel({ option, index });
    }
    if (labelExtractor) {
      const valLabel = labelExtractor(option);
      return <div>{valLabel}</div>;
    }
    const valLabel = getOptionLabel({ option, index });
    return <div>{valLabel}</div>;
  };

  const customFilter = (opts) => {
    if (Array.isArray(opts) && searchTerm) {
      return opts
        .map((option) =>
          JSON.stringify(option || {})
            .toLowerCase()
            .includes((searchTerm || '').toLowerCase())
            ? option
            : null
        )
        .filter(Boolean);
    }
    return opts;
  };
  const handleInputChange = (event) => {
    const { target } = event;
    setsearchTerm((target || {}).value || '');
  };

  return (
    <Block ref={containerRef}>
      <Select
        options={itemOptions || []}
        value={initialValue}
        onChange={(params) => {
          const val =
            multi || isMulti
              ? params.value.map((item) => rest.valueExtractor(item))
              : rest.valueExtractor(params.value[0] || null);

          if (typeof onChange === 'function') {
            onChange(val);
          }
          onSelectChange(
            multi || isMulti ? params.value : (params.value || [])[0]
          );
          input.onChange(val);
          input.onBlur();
          setValue(params.value);
        }}
        multi={Boolean(multi || isMulti)}
        type={search ? TYPE.search : TYPE.select}
        overrides={{
          Popover: {
            props: {
              mountNode: containerRef.current,
            },
          },
        }}
        getOptionLabel={optionLabelExtractor}
        getValueLabel={valueLabelExtractor}
        labelKey={labelKey || labelField}
        valueKey={valueKey || valueField}
        filterOptions={
          filterOptions ||
          ((options || [])[0] &&
            typeof (options || [])[0] === 'object' &&
            !labelKey &&
            !valueKey &&
            !labelField &&
            !valueField)
            ? customFilter
            : undefined
        }
        onInputChange={rest.onInputChange || handleInputChange}
        {...rest}
      />

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

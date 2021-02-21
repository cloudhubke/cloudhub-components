import React, { useState, useEffect } from 'react';
import Dropdown from 'react-select';
import CreatableSelect from 'react-select/creatable';
import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';

const Select = React.forwardRef(
  (
    {
      input,
      options,
      value,
      onChange,
      onSelectChange,
      axiosinstance,
      returnkeys,
      menuPlacement,
      disabled,
      placeholder,
      url,
      params,
      keyExtractor,
      valueExtractor,
      labelExtractor,
      isMulti,
      creatable,
      ...props
    },
    ref
  ) => {
    const [opts, setOpts] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const selectRef = React.useRef();

    useEffect(() => {
      if (Array.isArray(options)) {
        setOpts(
          [...options].map((item, index) => ({
            value: keyExtractor(item, index),
            label: labelExtractor(item, index),
            item,
          }))
        );
      }
    }, [options]);

    useEffect(() => {
      if (!value) {
        setSelectedValue(null);
        return;
      }
      if (isMulti) {
        if (Array.isArray(value)) {
          setSelectedValue(
            [...value].map((item, index) => ({
              value: keyExtractor(item, index),
              label: labelExtractor(item, index),
              item,
            }))
          );
        } else {
          setSelectedValue(
            [value].map((item, index) => ({
              value: keyExtractor(item, index),
              label: labelExtractor(item, index),
              item,
            }))
          );
        }
      } else {
        setSelectedValue({
          value: keyExtractor(value, 0),
          label: labelExtractor(value, 0),
          item: value,
        });
      }
    }, [value, isMulti]);

    const logChange = (val) => {
      setSelectedValue(val);

      if (!val || isEmpty(val)) {
        onSelectChange(val);
        return onChange(val);
      }
      if (isMulti) {
        if (val && Array.isArray(val)) {
          const options = val.map((item, index) => {
            if (!isPlainObject(item.item)) {
              return item.item;
            }
            const objValue = { ...item.item };
            return valueExtractor(objValue, index);
          });
          onChange(options);
          onSelectChange(val || []);
          return true;
        }
        onChange(val || []);
        onSelectChange(val || []);
        return true;
      }
      if (val && val.value) {
        if (!isPlainObject(val.item)) {
          onSelectChange(val.item);
          return onChange(val.item);
        }
        const objValue = { ...val.item };

        onChange(valueExtractor(objValue));
        onSelectChange(objValue);
        return true;
      }
    };

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        if (selectRef && selectRef.current) {
          if (typeof selectRef.current.focus === 'function') {
            selectRef.current.focus();
          }
        }
      },
    }));

    return (
      <React.Fragment>
        {creatable ? (
          <CreatableSelect
            openOnFocus
            isClearable
            options={opts}
            value={selectedValue}
            defaultOptions={options}
            onChange={logChange}
            placeholder={placeholder}
            isDisabled={disabled}
            menuPlacement={menuPlacement || 'auto'}
            isMulti={isMulti}
            ref={selectRef}
            {...props}
          />
        ) : (
          <Dropdown
            openOnFocus
            isClearable
            options={opts}
            value={selectedValue}
            defaultOptions={options}
            onChange={logChange}
            placeholder={placeholder}
            isDisabled={disabled}
            menuPlacement={menuPlacement || 'auto'}
            isMulti={isMulti}
            ref={selectRef}
            {...props}
          />
        )}
      </React.Fragment>
    );
  }
);

Select.defaultProps = {
  isMulti: false,
  params: {},
  value: null,
  options: [],
  onChange: () => {},
  onSelectChange: () => {},
  returnkeys: [],
  url: '',
  placeholder: 'Select...',
  selectUp: false,
  disabled: false,
  menuPlacement: 'auto',
  valueExtractor: (item) => item,
  labelExtractor: (item, index) =>
    isPlainObject(item) ? item.id || `option-${index}` : `${item}`,
  keyExtractor: (item, index) =>
    isPlainObject(item) ? item.id || `option-${index}` : `option-${index}`,
};

export default Select;

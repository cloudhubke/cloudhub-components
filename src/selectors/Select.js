import React, { useState, useEffect } from 'react';
import Dropdown from 'react-select';
import CreatableSelect from 'react-select/creatable';
import isObject from 'lodash/isObject';
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
          [...options].map((item) => ({
            value: isObject(item) ? keyExtractor(item) : item || '',
            label: isObject(item) ? labelExtractor(item) : item || '',
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
            [...value].map((item) => ({
              value: isObject(item) ? keyExtractor(item) : item || '',
              label: isObject(item) ? labelExtractor(item) : item || '',
              item,
            }))
          );
        } else {
          setSelectedValue(
            [value].map((item) => ({
              value: isObject(item) ? keyExtractor(item) : item || '',
              label: isObject(item) ? labelExtractor(item) : item || '',
              item,
            }))
          );
        }
      } else if (value) {
        setSelectedValue({
          value: isObject(value) ? keyExtractor(value) : value || '',
          label: isObject(value) ? labelExtractor(value) : value || '',
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
          const options = val.map((item) => {
            if (!isObject(item.item)) {
              return item.item;
            }
            const objValue = { ...item.item };
            return valueExtractor(objValue);
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
        if (!isObject(val.item)) {
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
  labelExtractor: (item) => item,
  valueExtractor: (item) => item,
  keyExtractor: (item) => item,
};

export default Select;

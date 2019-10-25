import React, { useState, useEffect, useRef } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import debounce from 'lodash/debounce';
import axios from 'axios';

const RemoteSelector = ({
  input,
  value,
  onChange,
  axiosinstance,
  returnkeys,
  valueField,
  menuPlacement,
  disabled,
  placeholder,
  url,
  params,
  displayField,
  isMulti,
  creatable,
  otheroptions,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [firstoptions, setFirstOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      if (options.length === 0 && value.length > 0) {
        setOptions([...value]);
      }
    }
    return () => null;
  }, [options, value]);

  useEffect(() => {
    if (!searchText) {
      setOptions([...firstoptions]);
    }
    return () => null;
  }, [searchText, firstoptions]);

  useEffect(() => {
    if (!value) {
      setSelectedValue(null);
      return;
    }
    if (isMulti) {
      if (Array.isArray(value)) {
        setSelectedValue(
          [...value].map(item => {
            if (isObject(item)) {
              return {
                label: item[displayField],
                value: item[valueField] || item[displayField],
                item,
              };
            }
            return {
              label: item,
              value: item,
              item,
            };
          })
        );
      } else {
        setSelectedValue(
          [value].map(item => {
            if (isObject(item)) {
              return {
                label: item[displayField],
                value: item[valueField] || item[displayField],
                item,
              };
            }
            return {
              label: item,
              value: item,
              item,
            };
          })
        );
      }
    } else if (value) {
      if (isObject(value)) {
        setSelectedValue({
          label: value[displayField],
          value: value[valueField],
          item: value,
        });
      } else {
        setSelectedValue({
          label: value,
          value,
          item: value,
        });
      }
    }
  }, [value, isMulti, valueField, displayField]);

  const logChange = val => {
    const keys = isString(returnkeys) ? [returnkeys] : returnkeys;

    setSelectedValue(val);
    if (!val || isEmpty(val)) {
      return onChange(val);
    }
    if (isMulti) {
      if (val && Array.isArray(val)) {
        const options = val.map(item => {
          if (!isObject(item.item)) {
            return item.item;
          }
          const objValue = { ...item.item };

          if (keys.length > 1) {
            const obj = {};
            keys.forEach(key => {
              obj[key] = objValue[key];
            });
            return { ...obj };
          }
          return { objValue };
        });
        return onChange(options);
      }
      return onChange(val || []);
    }
    if (val && val.value) {
      if (!isObject(val.item)) {
        return onChange(val.item);
      }
      const objValue = { ...val.item };

      if (keys.length > 1) {
        const obj = {};
        keys.forEach(key => {
          obj[key] = objValue[key];
        });
        return onChange({
          simple: isString(returnkeys) ? obj[returnkeys] : obj,
          full: objValue,
        });
      }
      return onChange(objValue);
    }
  };

  const onMenuOpen = () => {
    if (!loaded) {
      axiosinstance()
        .get(url, { params: { ...params, filter: '' } })
        .then(({ data }) => {
          const array = data ? data.items || data : [];

          const options = [...array, ...otheroptions].map(item => ({
            label: item[displayField],
            value:
              item[valueField]
              || item[displayField]
              || item[valueField]
              || item[displayField],
            item,
          }));

          setFirstOptions(options);
          setOptions(options);
          setLoaded(true);
        });
    }
  };

  const fetchOptions = (inputValue, callback) => {
    axiosinstance()
      .get(url, { params: { ...params, filter: inputValue.trim() } })
      .then(({ data }) => {
        const array = data ? data.items || data : [];

        const options = [...array, ...otheroptions].map(item => ({
          label: item[displayField],
          value: item[valueField] || item[displayField],
          item,
        }));

        if (firstoptions.length === 0) {
          setFirstOptions(options);
          setOptions(options);
        } else {
          setOptions(options);
        }
        callback(options);
      });
  };

  const debouncedFetch = useRef(debounce(fetchOptions, 500)).current;

  const handleInputChange = searchText => {
    setSearchText(searchText);
  };

  return (
    <>
      {creatable ? (
        <AsyncCreatableSelect
          cacheOptions
          isClearable
          value={selectedValue}
          defaultOptions={options}
          loadOptions={debouncedFetch}
          onChange={logChange}
          placeholder={placeholder}
          disabled={disabled}
          onInputChange={handleInputChange}
          onMenuOpen={onMenuOpen}
          menuPlacement={menuPlacement || 'auto'}
          getOptionValue={option => option.value}
          isMulti={isMulti}
          {...props}
        />
      ) : (
        <AsyncSelect
          cacheOptions
          isClearable
          value={selectedValue}
          defaultOptions={options}
          loadOptions={debouncedFetch}
          onChange={logChange}
          placeholder={placeholder}
          disabled={disabled}
          onInputChange={handleInputChange}
          onMenuOpen={onMenuOpen}
          menuPlacement={menuPlacement || 'auto'}
          getOptionValue={option => option.value}
          isMulti={isMulti}
          {...props}
        />
      )}
    </>
  );
};

RemoteSelector.defaultProps = {
  isMulti: false,
  params: {},
  axiosinstance: () => axios.create({}),
  value: null,
  options: [],
  otheroptions: [],
  onChange: () => {},
  displayField: '',
  returnkeys: [],
  url: '',
  placeholder: 'Select...',
  selectUp: false,
  disabled: false,
  menuPlacement: 'auto',
  valueField: ['id', '_id'],
};

export default RemoteSelector;

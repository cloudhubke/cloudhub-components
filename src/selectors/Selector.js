import React, { useState, useEffect, useRef } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import debounce from 'lodash/debounce';
import axios from 'axios';

const RemoteSelector = ({
  value,
  onChange,
  onSelectChange,
  axiosinstance,
  returnkeys,
  valueField,
  displayField,
  labelExtractor,
  keyExtractor,
  valueExtractor,
  menuPlacement,
  disabled,
  placeholder,
  url,
  params,
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
          [...value].map(item => ({
            value: isObject(item) ? keyExtractor(item) : item || '',
            label: isObject(item) ? keyExtractor(item) : item || '',
            item,
          }))
        );
      } else {
        setSelectedValue(
          [value].map(item => ({
            value: isObject(item) ? keyExtractor(item) : item || '',
            label: isObject(item) ? keyExtractor(item) : item || '',
            item,
          }))
        );
      }
    } else if (value) {
      setSelectedValue({
        value: isObject(value) ? keyExtractor(value) : value || '',
        label: isObject(value) ? keyExtractor(value) : value || '',
        item: value,
      });
    }
  }, [value, isMulti]);

  const logChange = val => {
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
        return onChange(val.item);
      }
      const objValue = { ...val.item };

      onChange(valueExtractor(objValue));
      onSelectChange(objValue);
      return true;
    }
  };

  const onMenuOpen = () => {
    if (!loaded) {
      axiosinstance()
        .get(url, { params: { ...params, filter: '' } })
        .then(({ data }) => {
          const array = data ? data.items || data : [];

          const options = [...array, ...otheroptions].map(item => ({
            value: isObject(item) ? keyExtractor(item) : item || '',
            label: isObject(item) ? keyExtractor(item) : item || '',
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
          value: isObject(item) ? keyExtractor(item) : item || '',
          label: isObject(item) ? keyExtractor(item) : item || '',
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
    <React.Fragment>
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
    </React.Fragment>
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
  onSelectChange: () => {},
  returnkeys: [],
  url: '',
  placeholder: 'Select...',
  selectUp: false,
  disabled: false,
  menuPlacement: 'auto',
  valueExtractor: item => item,
  labelExtractor: item => item,
  keyExtractor: item => item,
};

export default RemoteSelector;

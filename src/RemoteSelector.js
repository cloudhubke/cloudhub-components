import React, { Fragment, useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
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
  }, []);

  useEffect(() => {
    if (!searchText) {
      setOptions([...firstoptions]);
    }
  }, [searchText]);

  useEffect(() => {
    if (!value) {
      setSelectedValue(null);
      return;
    }
    if (isMulti) {
      if (Array.isArray(value)) {
        setSelectedValue([...value].map(item => {
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
        }));
      } else {
        setSelectedValue([value].map(item => {
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
        }));
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
  }, [value]);

  const logChange = val => {
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

          if (returnkeys.length > 1) {
            const obj = {};
            returnkeys.forEach(key => {
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

      if (returnkeys.length > 1) {
        const obj = {};
        returnkeys.forEach(key => {
          obj[key] = objValue[key];
        });
        return onChange({ simple: obj, full: objValue });
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
          const options = array.map(item => ({
            label: item[displayField],
            value:
              item[valueField] ||
              item[displayField] ||
              item[valueField] ||
              item[displayField],
            item,
          }));

          setFirstOptions(array);
          setOptions(options);
          setLoaded(true);
        });
    }
  };

  const loadOptions = (inputValue, callback) => {
    axiosinstance()
      .get(url, { params: { ...params, filter: inputValue.trim() } })
      .then(({ data }) => {
        const array = data ? data.items || data : [];

        const options = array.map(item => ({
          label: item[displayField],
          value: item[valueField] || item[displayField],
          item,
        }));

        if (firstoptions.length === 0) {
          setFirstOptions(array);
          setOptions(options);
        } else {
          setOptions(options);
        }
        callback(options);
      });
  };

  const handleInputChange = searchText => {
    setSearchText(searchText);
  };

  return (
    <Fragment>
      {creatable ? (
        <AsyncSelect
          cacheOptions
          isClearable
          value={selectedValue}
          defaultOptions={options}
          loadOptions={loadOptions}
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
        <AsyncCreatableSelect
          cacheOptions
          isClearable
          value={selectedValue}
          defaultOptions={options}
          loadOptions={loadOptions}
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
    </Fragment>
  );
};

RemoteSelector.defaultProps = {
  isMulti: false,
  params: {},
  axiosinstance: () => axios.create({}),
  value: null,
  options: [],
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

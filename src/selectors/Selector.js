import React, { useState, useEffect, useRef } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import axios from 'axios';

const RemoteSelector = React.forwardRef(
  (
    {
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
      filterKey = 'filter',
      menuPlacement,
      disabled,
      placeholder,
      url,
      params,
      isMulti,
      creatable,
      debounceTime = 1000,
      otheroptions,
      ...props
    },
    ref
  ) => {
    const [loaded, setLoaded] = useState(false);
    const [options, setOptions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [firstoptions, setFirstOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const selectRef = React.useRef();

    useEffect(() => {
      if (Array.isArray(value)) {
        if (options.length === 0 && value.length > 0) {
          setOptions([...value]);
        }
      }
      return () => null;
    }, [JSON.stringify(options), JSON.stringify(value)]);

    useEffect(() => {
      if (!searchText) {
        setOptions([...firstoptions]);
      }
      return () => null;
    }, [searchText, JSON.stringify(firstoptions)]);

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
      } else if (value) {
        setSelectedValue({
          value: keyExtractor(value, 0),
          label: labelExtractor(value, 0),
          item: value,
        });
      }
    }, [JSON.stringify(value), isMulti]);

    const logChange = (val) => {
      if (!val || isEmpty(val)) {
        onSelectChange(val);
        return onChange(val);
      }
      if (isMulti) {
        if (val && Array.isArray(val)) {
          const options = val.map((item) => {
            if (!isPlainObject(item.item)) {
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

    const onMenuOpen = () => {
      if (!loaded) {
        setLoaded(true);
        axiosinstance()
          .get(url, { params: { ...params, [filterKey]: '' } })
          .then(({ data }) => {
            const array = data ? data.items || data : [];

            const options = [...array, ...otheroptions].map((item, index) => ({
              value: keyExtractor(item, index),
              label: labelExtractor(item, index),
              item,
            }));

            setFirstOptions(options);
            setOptions(options);
          });
      }
    };

    const fetchOptions = (inputValue, callback) => {
      axiosinstance()
        .get(url, { params: { ...params, [filterKey]: inputValue.trim() } })
        .then(({ data }) => {
          const array = data ? data.items || data : [];

          const options = [...array, ...otheroptions].map((item, index) => ({
            value: keyExtractor(item, index),
            label: labelExtractor(item, index),
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

    const debouncedFetch = useRef(debounce(fetchOptions, debounceTime)).current;

    const handleInputChange = (searchText) => {
      setSearchText(searchText);
    };

    React.useImperativeHandle(ref, () => ({
      reload: () => {
        fetchOptions(searchText, () => null);
      },
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
          <AsyncCreatableSelect
            cacheOptions
            isClearable
            value={selectedValue}
            defaultOptions={options}
            loadOptions={debouncedFetch}
            onChange={logChange}
            placeholder={placeholder}
            isDisabled={disabled}
            onInputChange={handleInputChange}
            onMenuOpen={onMenuOpen}
            menuPlacement={menuPlacement || 'auto'}
            getOptionValue={(option) => option.value}
            isMulti={isMulti}
            ref={selectRef}
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
            isDisabled={disabled}
            onInputChange={handleInputChange}
            onMenuOpen={onMenuOpen}
            menuPlacement={menuPlacement || 'auto'}
            getOptionValue={(option) => option.value}
            isMulti={isMulti}
            ref={selectRef}
            {...props}
          />
        )}
      </React.Fragment>
    );
  }
);

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
  valueExtractor: (item) => item,
  labelExtractor: (item, index) =>
    isPlainObject(item) ? item.id || `option-${index}` : `${item}`,
  keyExtractor: (item, index) =>
    isPlainObject(item) ? item.id || `option-${index}` : `option-${index}`,
};

export default RemoteSelector;

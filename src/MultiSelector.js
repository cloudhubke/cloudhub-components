import React, { Component, Fragment } from 'react';
import Dropdown from 'react-select';
import CreatableSelect from 'react-select/creatable';

import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

class Select extends Component {
  static defaultProps = {
    options: [],
    placeholder: 'Select...',
    onChange: () => {},
    displayField: '',
    returnkeys: [],
    url: '',
    disabled: false,
    menuPlacement: 'auto'
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      opts: [],
      options: [],
      selectedValue: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, displayField, options } = nextProps;

    if (!isEqual(value, prevState.value) || !isEqual(prevState.opts, options)) {
      const state = {};

      const val = Array.isArray(value) ? value : [];

      const selectedoptions = val.map(item =>
        (isObject(item)
          ? {
            item,
            value: item.id,
            label: item.label || item[displayField]
          }
          : {
            item,
            label: item,
            value: item
          }));

      const getOptions = () =>
        options.map(item => {
          if (!isObject(item)) {
            return {
              item,
              value: item,
              label: item
            };
          }

          return {
            item,
            value: item.id,
            label: item[displayField]
          };
        });

      if (!value || isEmpty(value)) {
        return {
          ...prevState,
          options: getOptions(),
          selectedValue: selectedoptions
        };
      }

      if (options.length === 0) {
        return {
          ...prevState,
          options: [option],
          selectedValue: selectedoptions,
          opts: options,
          value
        };
      }
      return {
        ...prevState,
        options: getOptions(),
        selectedValue: selectedoptions,
        opts: options,
        value
      };
    }

    return { ...prevState };
  }

  logChange = val => {
    const { onChange, returnkeys } = this.props;

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
  };

  render() {
    const {
      name,
      options,

      placeholder,
      disabled,
      creatable,
      onCreate,
      menuPlacement,
      styles,

      // unsused
      onChange,
      value,
      type,
      displayField,
      render,
      returnkeys,
      children,
      ...rest
    } = this.props;

    return (
      <Fragment>
        {creatable ? (
          <CreatableSelect
            placeholder={placeholder}
            name={name}
            value={this.state.selectedValue}
            options={this.state.options}
            onChange={this.logChange}
            isMulti
            openOnFocus
            isClearable
            onBlurResetsInput={false}
            disabled={disabled}
            menuPlacement={menuPlacement || 'auto'}
            styles={styles}
            {...rest}
          />
        ) : (
          <Dropdown
            placeholder={placeholder}
            name={name}
            value={this.state.selectedValue}
            options={this.state.options}
            onChange={this.logChange}
            isMulti
            openOnFocus
            isClearable
            onBlurResetsInput={false}
            disabled={disabled}
            menuPlacement={menuPlacement || 'auto'}
            styles={styles}
            {...rest}
          />
        )}
      </Fragment>
    );
  }
}

export default Select;

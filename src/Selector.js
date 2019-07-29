import React, { Component, Fragment } from 'react';
import Dropdown from 'react-select';
import CreatableSelect from 'react-select/creatable';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isString from 'lodash/isString';

class Selector extends Component {
  static defaultProps = {
    options: [],
    placeholder: 'Select...',
    displayField: '',
    returnkeys: [],
    disabled: false,
    menuPlacement: 'auto',
    creatable: false
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      opts: [],
      options: [],
      selectedValue: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, displayField, options } = nextProps;

    if (!isEqual(value, prevState.value) || !isEqual(prevState.opts, options)) {
      const getOptions = () =>
        options.map(item => {
          if (isString(item)) {
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
          selectedValue: null
        };
      }

      const option = isObject(value)
        ? {
          item: value,
          value: value.id,
          label: value[displayField]
        }
        : {
          item: value,
          label: value,
          value
        };

      if (options.length === 0) {
        return {
          ...prevState,
          options: [option],
          selectedValue: option,
          opts: options,
          value
        };
      }
      return {
        ...prevState,
        options: getOptions(),
        selectedValue: option,
        opts: options,
        value
      };
    }
    return { ...prevState };
  }

  logChange = val => {
    const { onChange, returnkeys } = this.props;
    if (val) {
      if (!isObject(val.item)) {
        return onChange(val.item);
      }
      const objValue = { ...val.item };

      if (typeof returnkeys === 'string') {
        return onChange({ simple: objValue[returnkeys], full: objValue });
      }

      if (returnkeys.length > 0) {
        const obj = {};
        returnkeys.forEach(key => {
          obj[key] = objValue[key];
        });
        return onChange({ simple: obj, full: objValue });
      }
      return onChange({ simple: objValue, full: objValue });
    }
    return onChange(val);
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

export default Selector;

import React, { Component } from 'react';
import Dropdown from 'react-select';
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
    disabled: false
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
      let state = {};

      const getOptions = () => {
        return options.map(item => {
          if (!isObject(item)) {
            return {
              item,
              value: item,
              label: item
            };
          }

          return {
            item,
            value: item._id || item.id,
            label: item[displayField]
          };
        });
      };

      if (!value || isEmpty(value)) {
        return {
          ...prevState,
          options: getOptions()
        };
      }

      const option = isObject(value)
        ? {
            item: value,
            value: value._id || value.id,
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
      } else {
        return {
          ...prevState,
          options: getOptions(),
          selectedValue: option,
          opts: options,
          value
        };
      }
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

      if (returnkeys.length > 1) {
        const obj = {};
        returnkeys.forEach(key => {
          obj[key] = objValue[key];
        });
        return onChange({ simple: obj, full: objValue });
      }
      return onChange({ simple: objValue, full: objValue });
    } else {
      return onChange(val);
    }
  };

  render() {
    const { meta, name, placeholder, disabled } = this.props;

    return (
      <div className="field">
        <Dropdown
          style={{ height: 31 }}
          placeholder={placeholder}
          name={name}
          value={this.state.selectedValue}
          options={this.state.options}
          onChange={this.logChange}
          openOnFocus
          isClearable
          onBlurResetsInput={false}
          disabled={disabled}
        />
        {meta.touched && meta.error && (
          <span className="error">{meta.error}</span>
        )}
      </div>
    );
  }
}

export default Select;

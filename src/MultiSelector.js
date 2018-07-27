import React, { Component } from 'react';
import Dropdown from 'react-select';
import 'react-select/dist/react-select.css';
import _ from 'lodash';

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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value === null || nextProps.value === '') {
      return { selectedValue: [] };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      options: [],
      opts: [],
      selectedValue: []
    };
  }

  componentDidUpdate(prevProps) {
    if (nextProps.options !== this.props.options) {
      this.setOptions(nextProps);
    }
  }

  setOptions = props => {
    const { options, displayField, value } = props;
    if (Array.isArray(options)) {
      const opts = options.map((item, index) => {
        if (!_.isObject(item)) {
          return { key: item, value: item, label: item };
        }
        return {
          ...item,
          key: item._id || item.id,
          value: index,
          label: item[displayField]
        };
      });

      const values = Array.isArray(value) ? [...value] : [];

      const vals = values.map(item => {
        if (!_.isObject(item)) {
          return { key: item, value: item, label: item };
        }
        return {
          ...item,
          key: item._id || item.id,
          value: opts.findIndex(item2 => item2.key === (item._id || item.id)),
          label: item[displayField]
        };
      });
      this.setState({ opts, options, selectedValue: vals });
    }
  };

  logChange = val => {
    const { onChange, returnkeys } = this.props;

    if (val) {
      this.setState({ selectedValue: val });
    } else {
      this.setState({ selectedValue: [] });
    }

    if (val) {
      if (!_.isObject(this.state.options[0])) {
        return onChange(val.map(item => item.value));
      }

      const retval = val.map(item => {
        const objValue = { ...item };
        const obj = {};
        delete objValue.key;
        delete objValue.value;
        delete objValue.label;

        if (returnkeys.length > 1) {
          returnkeys.forEach(key => {
            obj[key] = objValue[key];
          });
        }
        return onChange({ simple: obj, full: objValue });
      });
      return onChange(retval);
    }
    return onChange(val);
  };

  render() {
    const { meta, name, placeholder, disabled } = this.props;

    return (
      <div className="field">
        <Dropdown
          style={{ height: 33 }}
          placeholder={placeholder}
          name={name}
          value={this.state.selectedValue}
          options={this.state.opts}
          onChange={this.logChange}
          openOnFocus
          multi
          onBlurResetsInput={false}
          disabled={disabled}
        />
        {meta.touched &&
          meta.error && <span className="error">{meta.error}</span>}
      </div>
    );
  }
}

export default Select;

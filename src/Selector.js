import React, { Component } from 'react';
import Dropdown from 'react-select';
import 'react-select/dist/react-select.css';
import _ from 'lodash';

export class Select extends Component {
  static defaultProps = {
    options: [],
    placeholder: 'Select...',
    onChange: () => {},
    displayField: '',
    returnkeys: [],
    url: '',
    multi: false
  };

  constructor(props) {
    super(props);

    this.state = {
      options: [],
      opts: [],
      selectedValue: ''
    };
  }

  componentDidMount() {
    this.setOptions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === null || nextProps.value === '') {
      this.setState({ selectedValue: '' });
    }
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
      let selectedValue;
      if (value) {
        if (!_.isObject(value)) {
          selectedValue = value;
        } else {
          selectedValue = opts.findIndex(
            item => item.key === (value._id || value.id)
          );
        }
      }
      this.setState({ opts, options, selectedValue });
    }
  };

  logChange = val => {
    const { onChange, returnkeys } = this.props;
    if (val) {
      this.setState({ selectedValue: val.value });
    } else {
      this.setState({ selectedValue: '' });
    }

    if (val) {
      if (!_.isObject(this.state.options[0])) {
        return onChange(val.value);
      }
      const objValue = { ...val };
      delete objValue.key;
      delete objValue.value;
      delete objValue.label;

      if (returnkeys.length > 1) {
        const obj = {};
        returnkeys.forEach(key => {
          obj[key] = objValue[key];
        });
        return onChange({ simple: obj, full: objValue });
      }

      return onChange(objValue);
    }
    return onChange(val);
  };

  render() {
    const { meta, name, placeholder, multi } = this.props;

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
          multi={multi}
          onBlurResetsInput={false}
        />
        {meta.touched &&
          meta.error && <span className="error">{meta.error}</span>}
      </div>
    );
  }
}

export default Select;

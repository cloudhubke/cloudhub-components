import React, { Component } from 'react';
import Dropdown from 'react-select';
import _ from 'lodash';
import axios from 'axios';

export class RemoteSelector extends Component {
  static defaultProps = {
    axiosinstance: () => axios.create({}),
    options: [],
    onChange: () => {},
    displayField: '',
    returnkeys: [],
    url: '',
  };

  constructor(props) {
    super(props);

    this.handleInputChange = _.debounce(this.handleInputChange, 500);

    this.state = {
      options: [],
      value: '',
      opts: [],
      selectedValue: '',
      isLoading: false,
      searchText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      if (nextProps.value) {
        if (!nextProps.value) this.setState({ selectedValue: undefined });
        if (!this.state.opts.length) {
          this.handleInputChange('');
        }
      }
    }
  }

  loadOptions = options => {
    const { displayField, value } = this.props;
    if (!options) return;

    const opts = options.map((item, index) => {
      if (!_.isObject(item)) {
        return { key: item, value: item, label: item };
      }
      return {
        ...item,
        key: item._id,
        value: index,
        label: item[displayField],
      };
    });
    let selectedValue;
    if (value) {
      if (!_.isObject(value)) {
        selectedValue = value;
      } else {
        selectedValue = opts.findIndex(item => item.key === value._id);
      }
    }
    this.setState({ opts, options, selectedValue, isLoading: false });
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
        let obj = {};
        returnkeys.forEach(key => {
          obj[key] = objValue[key];
        });
        return onChange({ simple: obj, full: objValue });
      }

      return onChange(objValue);
    }
    return onChange(val);
  };

  handleInputChange = text => {
    const { axiosinstance, url } = this.props;

    this.setState({ isFetching: true, searchText: text });
    axiosinstance()
      .get(url, { params: { filter: text } })
      .then(({ data }) => {
        this.setState({ isFetching: false });
        this.loadOptions(data.items);
      });
  };

  render() {
    const { meta, name, disabled } = this.props;

    return (
      <div className="field">
        <Dropdown
          style={{ height: 28 }}
          name={name}
          value={this.state.selectedValue}
          options={this.state.opts}
          onChange={this.logChange}
          openOnFocus
          onBlurResetsInput={false}
          onInputChange={this.handleInputChange}
          onOpen={() => this.handleInputChange('')}
          isLoading={this.state.isFetching}
          disabled={disabled}
        />
        {meta.touched &&
          meta.error && <span className="error">{meta.error}</span>}
      </div>
    );
  }
}

export default RemoteSelector;

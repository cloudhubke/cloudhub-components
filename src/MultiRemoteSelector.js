import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import axios from 'axios';
import './react-select.css';

class MultiRemoteSelector extends Component {
  static defaultProps = {
    params: {},
    axiosinstance: () => axios.create({}),
    value: [],
    options: [],
    onChange: () => {},
    displayField: '',
    returnkeys: [],
    url: '',
    placeholder: 'Select...',
    selectUp: false,
    disabled: false,
    menuPlacement: 'auto'
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, displayField } = nextProps;
    const values = value || [];

    if (!values || isEmpty(values)) {
      return {
        ...prevState
      };
    } else {
      if (Array.isArray(values)) {
        const options = values.map(value => ({
          item: value,
          value: value._id || value.id,
          label: value[displayField]
        }));
        return {
          ...prevState,
          options
        };
      }
      return { ...prevState };
    }
  }

  constructor(props) {
    super(props);

    // this.loadOptions = debounce(this.loadOptions, 500);

    this.state = {
      options: [],
      selectedValues: null,
      firstoptions: [],
      searchText: '',
      canLoad: false,
      refKey: new Date().getTime(),
      defaultOptions: []
    };
    this.loadOptions = debounce(this.loadOptions, 400);
  }

  onMenuOpen = () => {
    const { displayField, value, axiosinstance, url, params } = this.props;
    if (!this.state.canLoad) {
      axiosinstance()
        .get(url, { params: { ...params, filter: '' } })
        .then(({ data }) => {
          const options = (data.items || []).map(item => ({
            label: item[displayField],
            value: item._id || item.id,
            item
          }));
          this.setState({
            canLoad: true,
            options,
            firstoptions: data.items,
            defaultOptions: options
          });
        });
    }
  };

  loadOptions = (inputValue, callback) => {
    const { displayField, value, axiosinstance, url, params } = this.props;
    this.setState({ searchText: inputValue });
    axiosinstance()
      .get(url, { params: { ...params, filter: inputValue.trim() } })
      .then(({ data }) => {
        const options = (data.items || []).map(item => ({
          label: item[displayField],
          value: item._id || item.id,
          item
        }));

        if (this.state.firstoptions.length === 0) {
          this.setState({
            options,
            firstoptions: data.items,
            selectOptions: {}
          });
        } else {
          this.setState({ options });
        }

        callback(options);
      });
  };

  logChange = selectedOptions => {
    const { onChange, returnkeys, axiosinstance, url, params } = this.props;
    const vals = selectedOptions;

    if (vals) {
      this.setState({ selectedValues: vals });
    } else {
      this.setState({ selectedValues: [], searchText: '' });
    }

    if (vals && Array.isArray(vals)) {
      const options = vals.map(item => {
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
        return { ...objValue };
      });
      return onChange([...options]);
    }

    return onChange([...vals]);
  };

  handleInputChange = searchText => {
    this.setState({ searchText });
  };
  getDefaultValue = () => {
    const value = this.props.value || [];
    const options = this.state.options.filter(i => {
      if (isObject) {
        const ids = Array.isArray(value) ? value.map(v => v._id || v.id) : [];
        return ids.includes(i.value);
      }
      return value.includes[i];
    });
    return options;
  };

  render() {
    const { meta, name, placeholder, disabled } = this.props;

    return (
      <div className={this.props.selectUp ? 'select-up' : {}}>
        <AsyncSelect
          style={{ height: 31 }}
          cacheOptions
          isClearable
          defaultOptions={this.state.defaultOptions}
          value={this.getDefaultValue()}
          loadOptions={this.loadOptions}
          onChange={this.logChange}
          placeholder={placeholder}
          disabled={disabled}
          onInputChange={this.handleInputChange}
          onMenuOpen={this.onMenuOpen}
          isMulti
          menuPlacement={this.props.menuPlacement || 'auto'}
        />
        {meta.touched && meta.error && (
          <span className="error">{meta.error}</span>
        )}
      </div>
    );
  }
}

export default MultiRemoteSelector;

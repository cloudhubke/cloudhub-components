import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import axios from 'axios';
import './react-select.css';

class RemoteSelector extends Component {
  static defaultProps = {
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
    menuPlacement: 'auto'
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, displayField } = nextProps;
    if (!value || isEmpty(value)) {
      return {
        ...prevState
      };
    }

    const option = {
      item: value,
      value: value.id,
      label: value[displayField]
    };

    const options = prevState.options || [];
    const ind = options.findIndex(i => i.value === option.value);
    if (ind === -1) {
      return {
        ...prevState,
        options: [option]
      };
    }
    return {
      ...prevState,
      options: [option]
    };
  }

  constructor(props) {
    super(props);

    // this.loadOptions = debounce(this.loadOptions, 500);

    this.state = {
      options: [],
      selectedValue: null,
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
          const array = data ? data.items || data : [];
          const options = array.map(item => ({
            label: item[displayField],
            value: item.id || item.id,
            item
          }));
          this.setState({
            canLoad: true,
            options,
            firstoptions: array,
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
        const array = data ? data.items || data : [];

        const options = array.map(item => ({
          label: item[displayField],
          value: item.id || item.id,
          item
        }));

        if (this.state.firstoptions.length === 0) {
          this.setState({
            options,
            firstoptions: array,
            selectOptions: {}
          });
        } else {
          this.setState({ options });
        }

        callback(options);
      });
  };

  logChange = selectedOption => {
    const { onChange, returnkeys, axiosinstance, url, params } = this.props;
    const val = selectedOption;

    if (val) {
      this.setState({ selectedValue: val.value });
      if (val.value) {
        if (!isObject(this.state.options[0])) {
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
    } else {
      this.setState({ selectedValue: null, searchText: '' });
    }

    return onChange(val);
  };

  handleInputChange = searchText => {
    this.setState({ searchText });
  };

  getDefaultValue = () => {
    const value = this.props.value || {};
    const ind = this.state.options.findIndex(i => {
      if (isObject) {
        return i.value === value.id;
      }
      return i === value;
    });
    return this.state.options[ind] || null;
  };

  render() {
    const {
      meta,
      placeholder,
      disabled,
      onChange,
      value,
      ...rest
    } = this.props;

    return (
      <AsyncSelect
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
        menuPlacement={this.props.menuPlacement || 'auto'}
        {...rest}
      />
    );
  }
}

export default RemoteSelector;

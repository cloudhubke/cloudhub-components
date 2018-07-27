import React, { Component } from 'react';
import Dropdown from 'react-select';
import _ from 'lodash';
import axios from 'axios';
import './react-select.css';

class RemoteSelector extends Component {
  static defaultProps = {
    params: {},
    axiosinstance: () => axios.create({}),
    options: [],
    onChange: () => {},
    displayField: '',
    returnkeys: [],
    url: '',
    placeholder: 'Select...',
    selectUp: false,
    disabled: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, displayField } = nextProps;
    if (!value || _.isEmpty(value)) {
      return {
        selectedValue: ''
      };
    } else {
      const opt = {
        ...value,
        key: value._id || value.id,
        value: 0,
        label: value[displayField]
      };

      const opts = prevState.opts || [];
      const ind = opts.findIndex(i => i.key === opt.key);
      if (ind === -1) {
        return {
          opts: [opt],
          selectedValue: 0
        };
      } else {
        return {
          selectedValue: ind
        };
      }
    }
  }

  constructor(props) {
    super(props);

    this.handleInputChange = _.debounce(this.handleInputChange, 500);

    this.state = {
      firstoptions: [],
      options: [],
      opts: [],
      selectedValue: '',
      isLoading: false,
      searchText: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      const { value, displayField } = this.props;
      if (!value || _.isEmpty(value)) {
        this.setState({
          selectedValue: ''
        });
      } else {
        const opt = {
          ...value,
          key: value._id || value.id,
          value: 0,
          label: value[displayField]
        };

        const ind = this.state.opts.findIndex(i => i.key === opt.key);
        if (ind === -1) {
          this.setState({
            opts: [opt],
            selectedValue: 0
          });
        } else {
          this.setState({
            selectedValue: ind
          });
        }
      }
    }
  }

  loadOptions = options => {
    const { displayField, value } = this.props;

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
      if (this.state.firstoptions.length === 0) {
        this.setState({ firstoptions: options });
      }
      this.setState({ opts, options, selectedValue, isLoading: false });
    }
  };

  logChange = val => {
    const { onChange, returnkeys, axiosinstance, url, params } = this.props;
    if (val) {
      this.setState({ selectedValue: val.value });
    } else {
      this.setState({ selectedValue: '', searchText: '' });
      this.loadOptions(this.state.firstoptions);
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

  handleInputChange = text => {
    const { axiosinstance, url, params } = this.props;
    if (text === '' && this.state.firstoptions.length === 0) {
      this.setState({ isFetching: true, searchText: text });
      return axiosinstance()
        .get(url, { params: { ...params, filter: text } })
        .then(({ data }) => {
          this.setState({ isFetching: false });
          this.loadOptions(data.items || data);
        });
    } else if (text !== '') {
      if (this.state.searchText !== text) {
        this.setState({ isFetching: true, searchText: text });
        axiosinstance()
          .get(url, { params: { ...params, filter: text } })
          .then(({ data }) => {
            this.setState({ isFetching: false });
            this.loadOptions(data.items || data);
          });
      }
    }
  };

  render() {
    const { meta, name, placeholder, disabled } = this.props;
    return (
      <div className={this.props.selectUp ? 'select-up' : {}}>
        <Dropdown
          style={{ height: 31 }}
          name={name}
          value={this.state.selectedValue}
          options={this.state.opts}
          onChange={this.logChange}
          openOnFocus
          onBlurResetsInput={false}
          onInputChange={this.handleInputChange}
          onOpen={() => this.handleInputChange('')}
          isLoading={this.state.isFetching}
          placeholder={placeholder}
          disabled={disabled}
        />
        {meta.touched &&
          meta.error && <span className="error">{meta.error}</span>}
      </div>
    );
  }
}

export default RemoteSelector;

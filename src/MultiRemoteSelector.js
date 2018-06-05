import React, { Component } from 'react';
import Dropdown from 'react-select';
import _ from 'lodash';
import axios from 'axios';

export class MultiRemoteSelector extends Component {
  static defaultProps = {
    axiosinstance: () => axios.create({}),
    options: [],
    onChange: () => {},
    displayField: '',
    returnkeys: [],
    url: '',
    placeholder: 'Select...',
    value: [],
    multi: false
  };

  static getDerivedStateFromProps(nextProps) {
    const { value, displayField } = nextProps;
    if (!value || _.isEmpty(value) || !Array.isArray(value)) {
      return {
        opts: [],
        selectedValue: []
      };
    } else {
      const opts = value.map((item, index) => ({
        ...item,
        key: item._id,
        value: index,
        label: item[displayField]
      }));

      return {
        opts,
        selectedValue: value.map(item => ({
          ...item,
          key: item._id,
          value: opts.findIndex(item => item.key === value._id),
          label: item[displayField]
        }))
      };
    }
  }

  constructor(props) {
    super(props);

    this.handleInputChange = _.debounce(this.handleInputChange, 500);

    this.state = {
      firstoptions: [],
      options: [],
      opts: [],
      selectedValue: [],
      isLoading: false,
      searchText: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      const { value, displayField } = this.props;
      if (!value || _.isEmpty(value)) {
        this.setState({
          selectedValue: []
        });
      }
    }
  }

  loadOptions = (options = []) => {
    const { displayField, value } = this.props;
    if (Array.isArray(options)) {
      const opts = options.map((item, index) => {
        if (!_.isObject(item)) {
          return { key: item, value: item, label: item };
        }
        return {
          ...item,
          key: item._id,
          value: index,
          label: item[displayField]
        };
      });
      const v = _.isArray(value) ? value : [];
      const vals = v.map(item => {
        if (!_.isObject(item)) {
          return { key: item, value: item, label: item };
        }
        return {
          ...item,
          key: item._id,
          value: opts.findIndex(item2 => item2.key === item._id),
          label: item[displayField]
        };
      });
      if (this.state.firstoptions.length === 0) {
        this.setState({ firstoptions: options });
      }
      this.setState({ opts, options, selectedValue: vals, isLoading: false });
    }
  };
  logChange = val => {
    const { onChange, returnkeys } = this.props;
    if (val) {
      this.setState({ selectedValue: val, searchText: '' });
    } else {
      this.setState({ selectedValue: [], searchText: '' });
      this.loadOptions(this.state.firstoptions);
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
          return obj;
        }
        return objValue;
      });
      return onChange(retval);
    }

    return onChange([]);
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
    const { meta, name, placeholder } = this.props;
    return (
      <div className={this.props.selectUp ? 'select-up' : {}}>
        <Dropdown
          style={{ height: 28 }}
          name={name}
          value={this.state.selectedValue}
          options={this.state.opts}
          onChange={this.logChange}
          openOnFocus
          multi
          onBlurResetsInput={false}
          onInputChange={this.handleInputChange}
          onOpen={() => this.handleInputChange('')}
          isLoading={this.state.isFetching}
          placeholder={placeholder}
          inputProps={{ value: this.state.searchText }}
        />
        {meta.touched &&
          meta.error && <span className="error">{meta.error}</span>}
      </div>
    );
  }
}

export default MultiRemoteSelector;

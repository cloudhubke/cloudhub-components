import React, { Component } from 'react';
import Dropdown from 'react-select';
import _ from 'lodash';
import axios from 'axios';

// import {
//   Clear as ClearIcon,
//   Autorenew as RefreshIcon,
// } from 'material-ui-icons';
// import { IconButton } from 'material-ui';

export class RemoteSelector extends Component {
  static defaultProps = {
    axiosinstance: () => axios.create({}),
    options: [],
    onChange: () => {},
    displayField: '',
    returnkeys: [],
    url: '',
    placeholder: 'Select...',
  };

  constructor(props) {
    super(props);

    this.handleInputChange = _.debounce(this.handleInputChange, 500);

    this.state = {
      options: [],
      opts: [],
      selectedValue: '',
      isLoading: false,
      searchText: '',
    };
  }

  componentWillMount() {
    const { value, displayField } = this.props;
    if (!value || _.isEmpty(value)) {
      this.setState({
        opts: [],
        selectedValue: '',
      });
    } else {
      const opt = {
        ...value,
        key: value._id,
        value: 0,
        label: value[displayField],
      };

      this.setState({
        opts: [opt],
        selectedValue: 0,
      });
    }
  }

  loadOptions = options => {
    const { displayField, value } = this.props;
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
    const { axiosinstance, url } = this.props;
    if (text === '' && this.state.opts.length <= 1) {
      this.setState({ isFetching: true, searchText: text });
      return axiosinstance()
        .get(url, { params: { filter: text } })
        .then(({ data }) => {
          this.setState({ isFetching: false });
          this.loadOptions(data.items || data);
        });
    } else if (text !== '') {
      if (this.state.searchText !== text) {
        this.setState({ isFetching: true, searchText: text });
        axiosinstance()
          .get(url, { params: { filter: text } })
          .then(({ data }) => {
            this.setState({ isFetching: false });
            this.loadOptions(data.items || data);
          });
      }
    }
  };

  render() {
    const { meta, name, placeholder } = this.props;

    // const renderClear = () => {
    //   if (this.state.selectedValue !== '') {
    //     return (
    //       <IconButton style={{ height: 20 }}>
    //         <ClearIcon style={{ height: 12, width: 12 }} />
    //       </IconButton>
    //     );
    //   }
    //   return (
    //     <IconButton onClick={this.refreShOptions} style={{ height: 20 }}>
    //       <RefreshIcon style={{ height: 12, width: 12 }} />
    //     </IconButton>
    //   );
    // };

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
          placeholder={placeholder}
        />
        {meta.touched &&
          meta.error && <span className="error">{meta.error}</span>}
      </div>
    );
  }
}

export default RemoteSelector;

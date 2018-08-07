import React, { Component } from 'react';
import Dropdown from 'react-select';
import _ from 'lodash';
import axios from 'axios';
import './react-select.css';

class PlacesAutoComplete extends Component {
  static defaultProps = {
    params: {},
    axiosinstance: () => axios.create({}),
    options: [],
    onChange: () => {},
    input: {
      value: {},
      onChange: () => {}
    },
    returnkeys: [],
    url: '',
    placeholder: 'Search...',
    selectUp: false,
    disabled: false,
    latitude: '-1.292066',
    longitude: '36.821946',
    mapskey: ''
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const value = nextProps.value || nextProps.input.value;

    if (!value || _.isEmpty(value)) {
      return {
        selectedValue: ''
      };
    } else {
      const opt = {
        ...value,
        key: value._id || value.id,
        value: 0,
        label: value['name']
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

  loadOptions = options => {
    const value = this.props.value || this.props.input.value;

    if (Array.isArray(options)) {
      const opts = options.map((item, index) => {
        return {
          ...item,
          key: item._id || item.id,
          value: index,
          label: item['name']
        };
      });
      let selectedValue;
      if (value) {
        selectedValue = opts.findIndex(
          item => item.key === (value._id || value.id)
        );
      }
      if (this.state.firstoptions.length === 0) {
        this.setState({ firstoptions: options });
      }
      this.setState({ opts, options, selectedValue, isLoading: false });
    }
  };

  logChange = val => {
    const { onChange, input, axiosinstance, mapskey } = this.props;

    if (val) {
      this.setState({ selectedValue: val.value });
    } else {
      this.setState({ selectedValue: '', searchText: '' });
    }

    if (val) {
      const objValue = { ...val };
      delete objValue.key;
      delete objValue.value;
      delete objValue.label;
      // get latitude & longitude

      const searchurl = `/mapsapi/maps/api/place/details/json?placeid=${
        objValue.place_id
      }&key=${mapskey}`;

      axiosinstance()
        .get(searchurl)
        .then(({ data }) => {
          const result = data.result || {};
          const geometry = result.geometry || {};
          const location = geometry.location || {};

          onChange({
            ...objValue,
            latitude: location.lat,
            longitude: location.lng
          });
          input.onChange({
            ...objValue,
            latitude: location.lat,
            longitude: location.lng
          });
        });
    } else {
      onChange(val);
      input.onChange(val);
    }
  };

  handleInputChange = text => {
    const { axiosinstance, latitude, longitude, mapskey } = this.props;
    const searchurl = `/mapsapi/maps/api/place/autocomplete/json?input=${text}&types=geocode&location=${latitude},${longitude}&radius=1000&key=${mapskey}`;
    if (text !== '') {
      if (this.state.searchText !== text) {
        this.setState({ isFetching: true, searchText: text });
        axiosinstance()
          .get(searchurl)
          .then(({ data }) => {
            const predictions = [...(data.predictions || [])].map(place => {
              return {
                name: place.description,
                id: place.id,
                place_id: place.place_id
              };
            });

            this.setState({ isFetching: false });
            this.loadOptions(predictions);
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

export default PlacesAutoComplete;

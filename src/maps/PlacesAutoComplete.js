// Imports
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import AsyncSelect from 'react-select/lib/Async';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import axios from 'axios';
import hexToRgba from 'hex-to-rgba';

// Import React Scrit Libraray to load Google object

class PlacesAutoComplete extends Component {
  static defaultProps = {
    axiosinstance: () => axios.create({}),
    latitude: '-1.292066',
    longitude: '36.821946',
    onChange: () => {},
    value: null,
    input: {
      value: null,
      onChange: () => {}
    },
    placeholder: 'Search location...',
    height: 31,
    region: null,
    API_KEY: ''
  };

  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      inputValue: '',
      value: null,
      defaultValue: null,
      options: []
    };

    this.loadOptions = debounce(this.loadOptions, 500);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const value = nextProps.input.value || nextProps.value;
    if (!isEqual(value, prevState.value) && Boolean(value)) {
      const defaultValue = {
        item: { name: value.name, id: value.id, place_id: value.place_id },
        value: value.place_id,
        label: value.name
      };

      if (prevState.options.length > 0) {
        return {
          ...prevState,
          value,
          defaultValue
        };
      }
      return {
        ...prevState,
        value,
        defaultValue,
        options: [defaultValue]
      };
    }
    return { ...prevState };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.region, this.props.region)) {
      this.nearBySearch(this.props.region);
    }
  }

  onChange = ({ value, item }) => {
    const { onChange, input, axiosinstance, mapskey } = this.props;

    const searchurl = `/mapsapi/maps/api/place/details/json?placeid=${value}&key=${
      this.props.API_KEY
    }`;

    axiosinstance()
      .get(searchurl)
      .then(({ data }) => {
        const result = data.result || {};
        const address = result.geometry || {};
        const location = address.location || {};

        const origin = {
          latitude:
            typeof location.lat === 'function' ? location.lat() : location.lat,
          longitude:
            typeof location.lng === 'function' ? location.lng() : location.lng,
          place: result
        };

        this.props.onChange({ ...item, ...origin });
        this.props.input.onChange({ ...item, ...origin });
      })
      .catch(e => {
        console.log(e);
      });
  };

  nearBySearch = region => {
    const { options } = this.state;
    if (!region) {
      return;
    }
    if (!region.lat || !region.lng) {
      return;
    }
    const params = {
      location: `${region.lat},${region.lng}`,
      type: ['road', 'building', 'hotel', 'store'],
      key: this.props.API_KEY,
      rankby: 'distance'
    };

    const searchurl = '/mapsapi/maps/api/place/nearbysearch/json';
    // eslint-disable-next-line consistent-return
    return axios.get(searchurl, { params }).then(({ data }) => {
      const result = data.results[0] || {};
      const address = result.geometry || {};
      const location = address.location || {};

      const item = {
        label: result.name,
        item: { name: result.name, id: result.id, place_id: result.place_id },
        value: result.place_id
      };

      this.setState({ options: [...options, item] });

      const origin = {
        latitude:
          typeof location.lat === 'function' ? location.lat() : location.lat,
        longitude:
          typeof location.lng === 'function' ? location.lng() : location.lng,
        place: result
      };

      this.props.onChange({ ...item.item, ...origin });
      this.props.input.onChange({ ...item, ...origin });
    });
  };

  loadOptions = (inputValue, callback) => {
    const { axiosinstance, latitude, longitude, mapskey } = this.props;
    const searchurl = `/mapsapi/maps/api/place/autocomplete/json?input=${inputValue}&types=geocode&location=${latitude},${longitude}&radius=1000&key=${
      this.props.API_KEY
    }`;

    if (inputValue) {
      // use axios to query places

      axiosinstance()
        .get(searchurl)
        .then(({ data }) => {
          const places = (data.predictions || []).map(p => ({
            label: p.description,
            item: { name: p.description, id: p.id, place_id: p.place_id },
            value: p.place_id
          }));

          this.setState({ options: places });
          return callback(places);
        })
        .catch(e => {
          callback([]);
        });
    }
  };

  render() {
    const {
      height,
      backgroundColor,
      borderColor,
      borderColorFocused
    } = this.props;
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        marginTop: -2,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: backgroundColor || '#FFF',
        border: `1.5px solid ${borderColorFocused || '#2684FF'}`,
        borderTopWidth: 0,
        boxShadow: `0 1px 0 1px ${hexToRgba(borderColor, 0.1)}`
      }),
      option: (provided, state) => ({
        ...provided,
        '&:hover': {
          borderRightWidth: 1.5
        }
      }),
      control: (provided, state) => {
        let style = {};
        if (state.isFocused) {
          style = {
            ...style,
            boxShadow: `0 1px 0 1px ${hexToRgba(borderColor, 0.1)}`,
            borderColor: borderColorFocused || '#2684FF',
            '&:hover': {
              borderColor: borderColorFocused || '#2684FF'
            }
          };
        }

        if (state.menuIsOpen) {
          style = {
            ...style,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            boxShadow: '0 1px 0 1px hsla(0, 0%, 0%, 0.1)',
            borderWidth: 1.5,
            borderColor: borderColorFocused || '#2684FF'
          };
        }

        return {
          ...provided,
          height,
          borderColor: borderColor || provided.borderColor,
          backgroundColor: backgroundColor || '#FFF',
          borderWidth: 1,
          '&:hover': {
            borderColor: borderColorFocused || '#333'
          },
          ...style
        };
      }
    };

    return (
      <AsyncSelect
        styles={customStyles}
        // cacheOptions
        options={this.state.options}
        loadOptions={this.loadOptions}
        value={this.state.defaultValue}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}

const styles = {};

export default withStyles(styles)(PlacesAutoComplete);

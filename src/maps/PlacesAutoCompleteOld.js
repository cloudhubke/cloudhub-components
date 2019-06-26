// Imports
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from 'antd/lib/input';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

// Import React Scrit Libraray to load Google object
import Script from 'react-load-script';

const SearchBar = inputProps => {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps
      }}
      {...other}
    />
  );
};

class PlacesAutoComplete extends Component {
  static defaultProps = {
    center: { lat: -1.292066, lng: 36.821946 },
    onChange: () => {},
    value: null,
    input: {
      value: null,
      onChange: () => {}
    },
    placeholder: 'Search location...',
    height: 31
  };

  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      inputValue: '',
      value: null,
      defaultOptions: [],
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
          defaultValue,
          defaultOptions: prevState.options
        };
      }
      return {
        ...prevState,
        value,
        defaultValue,
        defaultOptions: [defaultValue]
      };
    }
    return { ...prevState };
  }

  onChange = ({ value, item }) => {
    const request = {
      placeId: value
    };

    this.placesService.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const result = place || {};
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
      }
    });
  };

  handleScriptLoad = () => {
    const { center } = this.props;
    this.div = document.createElement('div');
    const map = new google.maps.Map(this.div, { center });
    this.mapservice = new google.maps.places.AutocompleteService();
    this.placesService = new google.maps.places.PlacesService(map);
  };

  loadOptions = (inputValue, callback) => {
    if (inputValue) {
      this.mapservice.getQueryPredictions(
        { input: inputValue },
        (predictions, status) => {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            return;
          }

          const places = predictions.map(p => ({
            label: p.description,
            item: { name: p.description, id: p.id, place_id: p.place_id },
            value: p.place_id
          }));

          this.setState({ options: places });
          return callback(places);
        }
      );
    } else {
      return callback([]);
    }
  };

  renderMap = () => {
    if (typeof google === 'object' && google.maps === 'object') {
      if (!this.mapservice) {
        this.handleScriptLoad();
      }
      return null;
    }
    return (
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${
            this.props.API_KEY
          }&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
    );
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
        border: `1px solid ${borderColorFocused || '#2684FF'}`,
        borderTopWidth: 0,
        boxShadow: '0 1px 0 1px hsla(0, 0%, 0%, 0.1)'
      }),
      option: (provided, state) => ({
        ...provided
      }),
      control: (provided, state) => {
        let style = {};
        if (state.isFocused) {
          style = {
            ...style,
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
            borderWidth: 1,
            borderColor: borderColorFocused || '#2684FF'
          };
        }

        return {
          ...provided,
          height,
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
      <div>
        <div
          ref={node => {
            this.mapRef = node;
          }}
        />
        {this.renderMap()}

        <AsyncSelect
          styles={customStyles}
          // cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions={this.state.defaultOptions}
          value={this.state.defaultValue}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

const styles = {};

export default withStyles(styles)(PlacesAutoComplete);

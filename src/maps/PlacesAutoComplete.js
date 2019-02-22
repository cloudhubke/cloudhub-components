// Imports
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from 'antd/lib/input';
import AsyncSelect from 'react-select/lib/Async';
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
    }
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
    if (!isEqual(value, prevState.value)) {
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
    var request = {
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

    const map = new google.maps.Map(this.mapRef, { center });

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

  render() {
    return (
      <div>
        <div
          ref={node => {
            this.mapRef = node;
          }}
        />
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${
            this.props.API_KEY
          }&libraries=places`}
          onLoad={this.handleScriptLoad}
        />

        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions={this.state.defaultOptions}
          value={this.state.defaultValue}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const styles = {};

export default withStyles(styles)(PlacesAutoComplete);

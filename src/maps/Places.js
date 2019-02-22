// Imports
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

// Import React Scrit Libraray to load Google object
import Script from 'react-load-script';

const SearchBar = inputProps => {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
};

class PlacesAutoComplete extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: ''
    };

    // Bind Functions
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  handleScriptLoad() {
    // Declare Options For Autocomplete
    const options = {
      types: ['(cities)']
    }; // To disable any eslint 'google not defined' errors

    // Initialize Google Autocomplete
    /* global google */ this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    console.log(addressObject);

    // Check if address is valid
    if (address) {
      // Set State
      this.setState({
        city: address[0].long_name,
        query: addressObject.formatted_address
      });
    }
  }

  render() {
    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${
            this.props.API_KEY
          }&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        <SearchBar
          id="autocomplete"
          placeholder=""
          hintText="Search Place"
          value={this.state.query}
          style={{
            margin: '0 auto',
            maxWidth: 800
          }}
        />
      </div>
    );
  }
}

export default PlacesAutoComplete;

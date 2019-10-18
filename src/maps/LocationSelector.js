import React, { Component } from 'react';
import { Block, Text } from 'components';
import { sizes, colors } from 'theme';
import PlacesAutoComplete from 'cloudhub-react-components/dist/maps/PlacesAutoComplete';
import { CONFIG } from 'store/store';
import isEqual from 'lodash/isEqual';
import GoogleMapsComponent from './GoogleMapsComponent';

class LocationSelector extends Component {
  static defaultProps = {
    meta: {},
    input: {
      value: null,
      onChange: () => {},
    },
    onChange: () => {},
    value: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const value = nextProps.input.value || nextProps.value;
    if (!isEqual(value, prevState.value)) {
      return {
        ...prevState,
        value,
      };
    }
    return { ...prevState };
  }

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      center: {
        lat: -1.0419262,
        lng: 37.058348,
      },
      region: null,
    };
  }

  onChange = value => {
    this.setState({
      value,
      center: { lat: value.latitude, lng: value.longitude },
    });

    this.props.input.onChange(value);
    this.props.onChange(value);
  };

  render() {
    const { value } = this.state;
    const { meta } = this.props;
    const hasError = meta.touched && meta.error;
    return (
      <Block>
        <Block>
          <GoogleMapsComponent
            center={this.state.center}
            onRegionChange={region => this.setState({ region })}
          />
        </Block>
        <Block
          flex={false}
          style={{ position: 'absolute', top: 10, left: 10, right: 65 }}
        >
          <PlacesAutoComplete
            placeholder="Search your location..."
            value={value}
            libraries={['places']}
            height={sizes.inputHeight}
            API_KEY={CONFIG.GOOGLE_APIKEY}
            borderColor={hasError ? colors.error : '#CCC'}
            borderColorFocused="#333"
            onChange={this.onChange}
            region={this.state.region}
          />
          <Text small error>
            {hasError && meta.error}
          </Text>
        </Block>
      </Block>
    );
  }
}
export default LocationSelector;

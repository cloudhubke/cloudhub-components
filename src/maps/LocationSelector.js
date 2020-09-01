import React from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import isEqual from 'lodash/isEqual';
import ThemeContext from '../theme/ThemeContext';
import Block from '../Block';
import FieldButton from '../FieldButton';
import Text from '../Text';

const libraries = ['places'];
const LocationSelector = ({
  input,
  value,
  onChange,
  ButtonColor,
  width,
  height,
  ...props
}) => {
  const currentSelection = input ? input.value : value;
  const [autocomplete, setautocomplete] = React.useState(null);
  const [marker, setmarker] = React.useState(
    currentSelection && currentSelection.lat && currentSelection.lng
      ? currentSelection
      : props.center || { lat: -1.0419262, lng: 37.058348 }
  );
  const [finalposition, setfinalposition] = React.useState();
  const [showmap, setshowmap] = React.useState(false);
  const { CONFIG, sizes, colors } = React.useContext(ThemeContext);

  const onLoad = (autocomplete) => {
    setautocomplete(autocomplete);
  };
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      setmarker({
        lat: autocomplete.getPlace().geometry.location.lat(),
        lng: autocomplete.getPlace().geometry.location.lng(),
      });
      setfinalposition({
        lat: autocomplete.getPlace().geometry.location.lat(),
        lng: autocomplete.getPlace().geometry.location.lng(),
      });
    }
  };
  const onRegionChange = (region) => {
    setfinalposition(region);
  };

  const selectLocation = () => {
    if (typeof input.onChange === 'function') {
      input.onChange(finalposition);
      setshowmap(false);
    }
    if (typeof onChange === 'function') {
      onChange(finalposition);
      setshowmap(false);
    }
  };
  return (
    <Block>
      {!showmap && (
        <FieldButton
          onClick={() => setshowmap(true)}
          style={{ border: '1px solid gray', minWidth: sizes.inputWidth }}
        >
          <Text>
            {currentSelection && currentSelection.lat
              ? `lat: ${currentSelection.lat}, lng: ${currentSelection.lng}`
              : 'Select Location'}
          </Text>
        </FieldButton>
      )}
      {showmap && (
        <Block style={{ height: height || 500, width: width || '100%' }}>
          <LoadScript
            id="script-loader"
            googleMapsApiKey={CONFIG.GOOGLE_APIKEY}
            libraries={libraries}
          >
            <GoogleMap
              mapContainerStyle={{
                height: '100%',
                width: '100%',
              }}
              zoom={props.zoom}
              center={marker || props.center}
              options={{
                mapTypeControl: false,
              }}
            >
              <Marker
                draggable
                position={marker}
                onDragEnd={(e) => {
                  const region = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  };
                  onRegionChange(region);
                }}
              />
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                  type="text"
                  placeholder="Search location..."
                  style={{
                    boxSizing: 'border-box',
                    border: '1px solid transparent',
                    minWidth: sizes.inputMinWidth,
                    width: '25%',
                    height: sizes.inputHeight,
                    padding: '0 12px',
                    borderRadius: '3px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                    fontSize: '14px',
                    outline: 'none',
                    textOverflow: 'ellipses',
                    position: 'absolute',
                    marginLeft: sizes.doubleBaseMargin,
                    marginTop: sizes.baseMargin,
                  }}
                />
              </Autocomplete>
            </GoogleMap>
          </LoadScript>
          <FieldButton
            color={props.ButtonColor || colors.success}
            onClick={selectLocation}
            disabled={
              !finalposition ||
              (finalposition &&
                (!finalposition.lat ||
                  isEqual(currentSelection, finalposition))) ||
              !marker
            }
          >
            <Text button milkyWhite>
              Save Location
            </Text>
          </FieldButton>
        </Block>
      )}
    </Block>
  );
};

LocationSelector.defaultProps = {
  center: {
    lat: -1.0419262,
    lng: 37.058348,
  },
  zoom: 10,
  onRegionChange: () => {},
  meta: {},
  input: {
    value: null,
    onChange: () => {},
  },
  onChange: () => {},
  value: null,
};

export default LocationSelector;

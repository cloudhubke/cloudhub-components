import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ThemeContext from '../theme/ThemeContext';

const GoogleMapsComponent = (props) => {
  const { CONFIG } = React.useContext(ThemeContext);
  console.log('COmponent', CONFIG);
  return (
    <LoadScript id="script-loader" googleMapsApiKey={CONFIG.GOOGLE_APIKEY}>
      <GoogleMap
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        zoom={props.zoom}
        center={props.center}
        options={{
          mapTypeControl: false,
        }}
      >
        <Marker
          onLoad={(marker) => {
            console.log('marker: ', marker.position.lat());
          }}
          draggable
          position={props.center}
          onDragEnd={(e) => {
            const region = {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            };
            props.onRegionChange(region);
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

GoogleMapsComponent.defaultProps = {
  center: {
    lat: -1.0419262,
    lng: 37.058348,
  },
  zoom: 10,
  onRegionChange: () => {},
};

export default GoogleMapsComponent;

import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import ThemeContext from '../theme/ThemeContext';

const Mapview = (props) => {
  const { CONFIG } = React.useContext(ThemeContext);
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
        {props.children}
      </GoogleMap>
    </LoadScript>
  );
};

Mapview.defaultProps = {
  center: {
    lat: -1.0419262,
    lng: 37.058348,
  },
  zoom: 10,
  onRegionChange: () => {},
};

export default Mapview;

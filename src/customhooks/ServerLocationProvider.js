import React from 'react';
import {
  Location,
  ServerLocation as ReachLocationProvider,
} from '@reach/router';

import LocationContext from './LocationContext';

const LocationProvider = ({ children, ...props }) => (
  <ReachLocationProvider {...props}>
    <Location>
      {({ location, navigate }) => (
        <LocationContext.Provider value={{ location, navigate }}>
          {children}
        </LocationContext.Provider>
      )}
    </Location>
  </ReachLocationProvider>
);

export default LocationProvider;

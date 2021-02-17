import React from 'react';
import {
  Location,
  LocationProvider as ReachLocationProvider,
} from '@reach/router';
import LocationContext from './LocationContext';
import ScrollToTop from './ScrollToTop';

const LocationProvider = ({ children, scrolltop, ...props }) => (
  <ReachLocationProvider {...props}>
    <Location>
      {({ location, navigate }) => (
        <LocationContext.Provider value={{ location, navigate }}>
          <ScrollToTop location={location}>{children}</ScrollToTop>
        </LocationContext.Provider>
      )}
    </Location>
  </ReachLocationProvider>
);

export default LocationProvider;

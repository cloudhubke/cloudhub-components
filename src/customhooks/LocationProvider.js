
import React from 'react';
import { Location } from '@reach/router';
import LocationContext from './LocationContext';


const LocationProvider = (props) => (
    <Location>
    {({ location, navigate }) => (
        <LocationContext.Provider value={{ location, navigate }}>
        {props.children}
        </LocationContext.Provider>
    )}
    </Location>
);

export default LocationProvider;

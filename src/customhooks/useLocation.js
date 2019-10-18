import React from 'react';
import LocationContext from './LocationContext';

const useLocation = () => {
  const { location, navigate } = React.useContext(LocationContext);


  return { location, navigate };
};

export default useLocation;

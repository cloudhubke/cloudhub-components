import React from 'react';
import { Autocomplete } from '@react-google-maps/api';

const PlacesAutoComplete = (props) => {
  const [autocomplete, setautocomplete] = React.useState(null);
  const onLoad = (autocomplete) => {
    setautocomplete(autocomplete);
  };
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      props.onChange(autocomplete.getPlace());
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };
  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        placeholder={props.placeholder}
        style={{
          boxSizing: 'border-box',
          border: '1px solid transparent',
          width: '240px',
          height: '32px',
          padding: '0 12px',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          outline: 'none',
          textOverflow: 'ellipses',
          position: 'absolute',
          left: '50%',
          marginLeft: '-120px',
        }}
      />
    </Autocomplete>
  );
};

export default PlacesAutoComplete;

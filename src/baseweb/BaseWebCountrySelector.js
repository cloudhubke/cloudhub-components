import React from 'react';
import BaseWebSelect from './BaseWebSelect';
import countries from '../countrypicker/countries';

const CountrySelector = ({ ...props }) => (
  <BaseWebSelect
    options={countries}
    getOptionLabel={({ option }) =>
      option && option.name ? option.name : `${option}`
    }
    valueExtractor={(item) => item.name}
    placeholder="Select Country"
    {...props}
  />
);

export default CountrySelector;

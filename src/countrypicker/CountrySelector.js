import React from 'react';
import { StaticListSelector } from '../selectors';
import countries from './countries';

const CountrySelector = ({ ...props }) => (
  <StaticListSelector
    options={countries}
    labelExtractor={(item) => item.name || item}
    keyExtractor={(item) => item.name || item}
    valueExtractor={(item) => item.name || item}
    placeholder="Select Country"
    {...props}
  />
);

export default CountrySelector;

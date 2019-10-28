import React from 'react';
import { StaticListSelector } from '../selectors';
import countries from './countries';

const CountrySelector = ({ ...props }) => (
  <StaticListSelector
    options={countries}
    labelExtractor={item => item.name}
    keyExtractor={item => item.name}
    valueExtractor={item => item.name}
    placeholder="Select Country"
    {...props}
  />
);

export default CountrySelector;

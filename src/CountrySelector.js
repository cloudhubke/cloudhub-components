import React from 'react';
import Select from './Selector';
import countries from './countries';

const CountrySelector = ({ input, meta, onSelectChange }) => (
  <Select
    options={countries}
    value={input.value}
    onChange={val => {
      if (val) {
        const { simple, full } = val;
        input.onChange(simple);
        if (onSelectChange) {
          onSelectChange(full);
        }
        input.onBlur();
      } else {
        input.onChange(val);
        if (onSelectChange) {
          onSelectChange(val);
        }
        input.onBlur();
      }
    }}
    meta={meta}
    displayField="name"
    returnkeys={['name', 'id']}
    placeholder="Select Country"
  />
);

export default CountrySelector;

import React from 'react';
import Select from './MultiSelector';

const StaticListSelector = ({ list, input, meta, onSelectChange }) => (
    <Select
      options={list}
      value={input.value}
      onChange={val => {
        if (val) {
          input.onChange(val);
          if (onSelectChange) {
            onSelectChange(val);
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
    />
);

export default StaticListSelector;

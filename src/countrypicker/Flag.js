import React from 'react';
import countries from './countries';

const Flag = ({ country, small, medium, large, width, height, ...props }) => {
  const flagWidth = () => {
    if (small) return 16;
    if (large) return 48;
    if (medium) return 28;
    return 28;
  };
  const flagHeight = () => {
    if (small) return 11;
    if (large) return 33;
    if (medium) return 19;
    return 19;
  };
  return countries && countries[country] && countries[country].flag ? (
    <img
      src={countries[country].flag}
      alt={country}
      width={width || flagWidth()}
      height={height || flagHeight()}
      {...props}
    />
  ) : null;
};
export default Flag;

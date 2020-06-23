import React from 'react';
import { Rating } from '@material-ui/lab';

const MuiRating = ({ input, value, onChange, ...props }) =>
  input && input.name ? (
    <Rating
      name={input.name}
      {...props}
      onChange={input.onChange}
      value={input.value}
    />
  ) : (
    <Rating {...props} value={value} onChange={onChange} />
  );
MuiRating.defaultProps = {
  input: {
    value: 0,
    onChange: () => {},
  },
};
export default MuiRating;

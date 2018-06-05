import React from 'react';
import { Checkbox, FormControlLabel, withStyles } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#eeeeee',
    marginLeft: 10,
    borderRadius: 3,
    marginRight: 0
  }
};

const checkbox = ({ input, label, classes }) => (
  <FormControlLabel
    classes={{ root: classes.root }}
    control={
      <Checkbox label={label} checked={input.value} onChange={input.onChange} />
    }
    label={label}
  />
);

checkbox.defaultProps = {
  label: ''
};

export const CheckBox = withStyles(styles)(checkbox);

export default CheckBox;

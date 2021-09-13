import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch from '@mui/material/Switch';
import { makeStyles } from '@mui/styles';
import Block from './Block';
import colors from './theme/Colors';

const useStyles = ({ color }) =>
  makeStyles({
    switchBase: {
      '&$checked': {
        color,
      },
      '&$checked + $track': {
        backgroundColor: color,
      },
    },
    checked: {},
    track: {},
  });

const Switch = ({
  color = colors.primary,
  value,
  input,
  onChange,
  labelPlacement = 'start',
  label,
  containerProps = {
    flex: false,
  },
  ...props
}) => {
  const val = input.value || value;

  const [checked, setChecked] = React.useState(val);

  const classes = useStyles({ color })();

  const handleChange = (event) => {
    const val = event.target.checked;

    if (typeof onChange === 'function') {
      onChange(val);
    }

    if (typeof input.onChange === 'function') {
      input.onChange(val);
    }
  };

  React.useEffect(() => {
    setChecked(val);
  }, [val]);

  //   const disabledProps = !checked ? {} : { classes };

  return (
    <Block {...containerProps}>
      <FormControlLabel
        control={
          <MuiSwitch
            checked={checked}
            classes={classes}
            {...props}
            onChange={handleChange}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
    </Block>
  );
};
Switch.defaultProps = {
  input: {
    value: false,
    onChange: () => null,
  },
  value: false,
  onChange: () => null,
};

export default Switch;

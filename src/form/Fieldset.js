import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = ({ color, bordercolor }) => {
  const styles = makeStyles({
    fieldsetBorder: {
      border: `1px solid ${bordercolor || '#ddd'} !important`,
      borderRadius: 5,
      margin: '0 0 1.5em 0 !important',
      boxShadow: '0px 0px 0px 0px #000',
      padding: 5,
    },
    legendBorder: {
      fontSize: '1.2em !important',
      ...(color && { color }),
    },
  });

  return styles();
};

const Fieldset = ({
  children,
  bordercolor,
  color,
  label = 'Fields',
  ...props
}) => {
  const classes = useStyles({ color, bordercolor });

  return (
    <fieldset className={classes.fieldsetBorder}>
      <legend className={classes.legendBorder}>{label}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;

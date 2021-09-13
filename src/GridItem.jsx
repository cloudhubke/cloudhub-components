import React from 'react';
import clsx from 'clsx';
// @material-ui/core components
import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

const style = {
  grid: {
    position: 'relative',
    width: '100%',
    minHeight: '1px',
    margin: 0,
    padding: 0,
    /* flexBasis: "auto" */
  },
};

function GridItem({ ...props }) {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={clsx(classes.grid, className)}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridItem);

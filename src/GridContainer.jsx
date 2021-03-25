import React from 'react';
import clsx from 'clsx'
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(({ sizes }) => ({
  grid: {
    width: '100%',
    margin: 0,
    padding: 0,
    paddingRight: 5,
    paddingLeft: 5,
  },
}));

function GridContainer({ children, className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justifyContent="space-between" {...rest} className={clsx(classes.grid, className)}>
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: '',
  children: null,
};

GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default GridContainer;

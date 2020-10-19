import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(({ sizes }) => ({
  grid: {
    paddingRight: sizes.base,
    paddingLeft: sizes.base,
    width: '100%',
    margin: 0,
    padding: 0,
  },
}));

function GridContainer({ children, className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid container {...rest} className={`${classes.grid} ${className}`}>
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: '',
  children: null,
};

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default GridContainer;

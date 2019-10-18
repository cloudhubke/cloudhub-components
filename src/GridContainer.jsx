import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

import { sizes } from 'theme';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const style = {
  grid: {
    paddingRight: sizes.base,
    paddingLeft: sizes.base,
    width: '100%'
  }
};

function GridContainer({ ...props }) {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={`${classes.grid} ${className}`}>
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: '',
  children: null
};

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};

export default withStyles(style)(GridContainer);

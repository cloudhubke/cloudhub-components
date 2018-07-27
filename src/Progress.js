import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import lightGreen from '@material-ui/core/colors/lightGreen';

const lgreen = lightGreen[500];

const styles = {
  root: {
    width: '100%',
    marginTop: 30
  },
  lgreen: {
    backgroundColor: lgreen,
    color: lgreen
  }
};

function Progress(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress classes={{ colorPrimary: classes.lgreen }} />
    </div>
  );
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Progress);

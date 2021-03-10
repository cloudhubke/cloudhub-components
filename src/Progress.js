import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import ThemeContext from './theme/ThemeContext';

function Progress() {
  const { colors } = React.useContext(ThemeContext);

  const classes = makeStyles({
    root: {
      width: '100%',
      marginTop: 30,
    },
    primary: {
      backgroundColor: colors.secondary,
      color: colors.primary,
    },
  })();

  return (
    <div className={classes.root}>
      <LinearProgress classes={{ colorPrimary: classes.primary }} />
    </div>
  );
}

export default Progress;

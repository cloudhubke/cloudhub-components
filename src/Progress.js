import React from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';
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

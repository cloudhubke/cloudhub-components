import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import ListSubheader from '@material-ui/core/ListSubheader';
import { sizes } from './theme';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    backgroundColor: 'transparent',
  },

  nested: {
    paddingLeft: sizes.padding,
  },
}));

const ListMenu = ({ children, header, ...rest }) => {
  const classes = useStyles();

  const subheader = header
    ? {
      subheader: (
          <ListSubheader component="div" id="nested-list-subheader">
            {header}
          </ListSubheader>
      ),
    }
    : {};

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      {...subheader}
      className={classes.root}
      {...rest}
    >
      {children}
    </List>
  );
};

export default ListMenu;

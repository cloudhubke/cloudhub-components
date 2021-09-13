import React from 'react';
import List from '@mui/material/List';
import { makeStyles } from '@mui/styles';

import ListSubheader from '@mui/material/ListSubheader';

const useStyles = makeStyles(({ sizes }) => ({
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

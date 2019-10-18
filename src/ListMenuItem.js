import React, { Fragment } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Text from './Text';

const ListMenuItem = ({
  icon,
  avatar,
  primary,
  secondary,
  action,
  children,
  ...rest
}) => (
  <ListItem {...rest} styles={{ display: 'flex' }}>
    {children || (
      <Fragment>
        {icon && (
          <ListItemIcon
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
        )}
        {avatar && <ListItemAvatar>{avatar}</ListItemAvatar>}
        <ListItemText primary={<Text>{primary}</Text>} secondary={secondary} />
        {action && <ListItemSecondaryAction>{action}</ListItemSecondaryAction>}
      </Fragment>
    )}
  </ListItem>
);

ListMenuItem.defaultProps = {
  icon: null,
  button: true,
};

export default ListMenuItem;

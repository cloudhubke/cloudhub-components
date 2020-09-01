import React, { Fragment } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Text from './Text';
import Block from './Block';

const ListMenuItem = ({
  icon,
  avatar,
  primary,
  secondary,
  action,
  children,
  style,
  divider,
  dividerColor,
  ...rest
}) => (
  <React.Fragment>
    <ListItem {...rest} styles={{ flex: 1, display: 'flex', ...style }}>
      {children || (
        <React.Fragment>
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

          <ListItemText primary={primary} secondary={secondary} />

          {action && (
            <ListItemSecondaryAction>{action}</ListItemSecondaryAction>
          )}
        </React.Fragment>
      )}
    </ListItem>
    {divider && !dividerColor && <Divider />}
    {divider && dividerColor && (
      <Divider style={{ backgroundColor: dividerColor }} />
    )}
  </React.Fragment>
);

ListMenuItem.defaultProps = {
  icon: null,
  button: true,
};

export default ListMenuItem;

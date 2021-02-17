import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';

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
  iconStyle,
  textProps,
  actionProps,
  ...rest
}) => (
  <React.Fragment>
    {children && (
      <ListItem {...rest} styles={{ flex: 1, display: 'flex', ...style }}>
        {children}
      </ListItem>
    )}
    {!children && (
      <ListItem {...rest} styles={{ flex: 1, display: 'flex', ...style }}>
        {icon && (
          <ListItemIcon
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ...iconStyle,
            }}
          >
            {icon}
          </ListItemIcon>
        )}
        {avatar && <ListItemAvatar>{avatar}</ListItemAvatar>}

        <ListItemText primary={primary} secondary={secondary} />

        {action && (
          <ListItemSecondaryAction {...actionProps}>
            {action}
          </ListItemSecondaryAction>
        )}
      </ListItem>
    )}
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

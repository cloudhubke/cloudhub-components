import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Divider from '@mui/material/Divider';

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

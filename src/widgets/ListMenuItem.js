import React from 'react';

import clsx from 'clsx';
import { makeStyles, alpha } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';

import { useLocation } from 'cloudhub-components/dist/customhooks';
import { Link } from 'cloudhub-components/dist/reach';

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    ...theme.typography.body2,
    height: 48,
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary
  },
  isActiveListItem: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      position: 'absolute',
      backgroundColor: theme.palette.primary.main
    }
  }
}));

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
  linkto,
  className,
  ...rest
}) => {
  const { location } = useLocation();
  const classes = useStyles();

  const isActive = location.pathname.includes(linkto);

  return (
    <React.Fragment>
      {children && (
        <ListItem
          styles={{ flex: 1, display: 'flex', ...style }}
          className={clsx(
            classes.listItem,
            {
              [classes.isActiveListItem]: isActive
            },
            className
          )}
          component={linkto ? Link : 'div'}
          to={linkto}
          {...rest}
        >
          {children}
        </ListItem>
      )}

      {!children && (
        <ListItem
          component={linkto ? Link : 'div'}
          to={linkto}
          className={clsx(
            classes.listItem,
            {
              [classes.isActiveListItem]: isActive
            },
            className
          )}
          styles={{ flex: 1, display: 'flex', ...style }}
          {...rest}
        >
          {icon && (
            <ListItemIcon
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...iconStyle
              }}
              className={classes.listItemIcon}
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
};

ListMenuItem.defaultProps = {
  icon: null,
  button: true
};

export default ListMenuItem;

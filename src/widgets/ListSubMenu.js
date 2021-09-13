import React, { Fragment, useState } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import Lens from '@mui/icons-material/Lens';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ThemeContext from 'cloudhub-components/dist/theme/ThemeContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    ...theme.typography.body2,
    height: 48,
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
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
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const ListSubMenu = ({
  children,
  headerIcon,
  header,
  expanded,
  expandedStyles = {},
  style = {},
  showHeaderIcon,
  dividerColor,
  divider = true,
  className,
  ...rest
}) => {
  const { colors } = React.useContext(ThemeContext);
  const [menuexpanded, setMenuExpand] = useState(expanded);
  const classes = useStyles();

  return (
    <Fragment>
      <ListItem
        button
        onClick={() => setMenuExpand(!menuexpanded)}
        style={{ ...(menuexpanded && expandedStyles), ...style }}
        className={clsx(
          classes.listItem,
          {
            [classes.isActiveListItem]: menuexpanded,
          },
          className
        )}
        {...rest}
      >
        {headerIcon && (
          <ListItemIcon style={{ color: colors.dark }}>
            {headerIcon}
          </ListItemIcon>
        )}
        <ListItemText primary={header} />
        {showHeaderIcon && menuexpanded && (
          <ExpandMore
            style={{
              fontSize: 24,
              color: style && style.color ? style.color : 'inherit',
            }}
          />
        )}

        {showHeaderIcon && !menuexpanded && (
          <ChevronRight
            style={{
              fontSize: 24,
              color: style && style.color ? style.color : 'inherit',
            }}
          />
        )}
      </ListItem>
      <Collapse in={menuexpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
      {divider && !dividerColor && <Divider />}
      {divider && dividerColor && (
        <Divider style={{ backgroundColor: dividerColor }} />
      )}
    </Fragment>
  );
};

ListSubMenu.defaultProps = {
  headerIcon: <Lens />,
  header: '',
  showHeaderIcon: true,
};

export default ListSubMenu;

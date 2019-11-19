import React, { Fragment, useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Lens from '@material-ui/icons/Lens';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { colors } from './theme';
import Text from './Text';

const ListSubMenu = ({
  children,
  headerIcon,
  header,
  expanded,
  expandedStyles = {},
  style = {},
  showHeaderIcon,
  ...rest
}) => {
  const [menuexpanded, setMenuExpand] = useState(expanded);
  return (
    <Fragment>
      <ListItem
        button
        onClick={() => setMenuExpand(!menuexpanded)}
        style={{ ...(menuexpanded && expandedStyles), style }}
        {...rest}
      >
        {headerIcon && (
          <ListItemIcon style={{ color: colors.dark }}>
            {headerIcon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={
            typeof header === 'string' ? (
              <Text body semibold dark>
                {header}
              </Text>
            ) : (
              header
            )
          }
        />
        {showHeaderIcon && menuexpanded && (
          <ExpandLess style={{ fontSize: 24 }} />
        )}

        {showHeaderIcon && !menuexpanded && (
          <ExpandMore style={{ fontSize: 24 }} />
        )}
      </ListItem>
      <Collapse in={menuexpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
      <Divider />
    </Fragment>
  );
};

ListSubMenu.defaultProps = {
  headerIcon: <Lens />,
  header: '',
  open: false,
  showHeaderIcon: true
};

export default ListSubMenu;

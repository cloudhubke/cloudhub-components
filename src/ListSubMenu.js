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
import ThemeContext from './theme/ThemeContext';

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
  ...rest
}) => {
  const { colors } = React.useContext(ThemeContext);
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
        <ListItemText primary={header} />
        {showHeaderIcon && menuexpanded && (
          <ExpandLess
            style={{
              fontSize: 24,
              color: style && style.color ? style.color : 'inherit',
            }}
          />
        )}

        {showHeaderIcon && !menuexpanded && (
          <ExpandMore
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

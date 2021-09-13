import React, { Fragment, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import Lens from '@mui/icons-material/Lens';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
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

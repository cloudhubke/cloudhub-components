import React from 'react';
import TableCell from '@material-ui/core/TableCell';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ViewList from '@material-ui/icons/ViewList';

import IconButton from '../IconButton';
import Block from '../Block';
import ThemeContext from '../theme/ThemeContext';

const RowActions = ({ row, column, permissions, ...props }) => {
  const { colors } = React.useContext(ThemeContext);

  delete row.counter;

  return (
    <TableCell>
      <Block
        row
        style={{
          height: '100%',
          width: '100%',
          minWidth: 150,
        }}
      >
        {props.actionsMenu ? (
          props.actionsMenu({
            row,
            column,
            ...permissions,
          })
        ) : (
          <IconButton
            padding={2}
            onClick={() => props.onView(row)}
            title="View row"
          >
            <ViewList style={{ fontSize: 24, color: colors.primary }} />
          </IconButton>
        )}
        <IconButton
          padding={2}
          onClick={() => props.onEdit(row)}
          title="Edit row"
          disabled={!permissions.allowedit}
        >
          <EditIcon style={{ fontSize: 24, color: colors.secondary }} />
        </IconButton>
        <IconButton
          padding={2}
          onClick={() => props.onDelete(row)}
          title="Delete row"
          disabled={!permissions.allowdelete}
        >
          <DeleteIcon style={{ fontSize: 24, color: colors.danger }} />
        </IconButton>
      </Block>
    </TableCell>
  );
};

export default RowActions;

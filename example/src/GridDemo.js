import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import SimpleDataGrid from 'cloudhub-react-components/dist/grid/SimpleDataGrid';

import { ProgressBarCell } from './templates/progress-bar-cell';
import { HighlightedCell } from './templates/highlighted-cell';

import users from './demodata/users.json';

const Cell = props => {
  if (props.column.name === 'discount') {
    return <ProgressBarCell {...props} />;
  }
  if (props.column.name === 'amount') {
    return <HighlightedCell {...props} />;
  }
  return <TableCell>Helo</TableCell>;
};
Cell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const columns = [
      { name: 'name', title: 'Name' },
      { name: 'username', title: 'Username' },
      { name: 'email', title: 'Email' },
    ];

    return <SimpleDataGrid columns={columns} rows={users} />;
  }
}

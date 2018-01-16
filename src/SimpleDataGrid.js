import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';
import TableCell from 'material-ui/Table/TableCell';

export class SimpleDataGrid extends React.PureComponent {
  static defaultProps = {
    templates: ({ row, column }) => (
      <TableCell>{row[column.name] || ''}</TableCell>
    )
  };
  render() {
    const { rows, columns } = this.props;

    return (
      <Grid rows={rows} columns={columns || []}>
        <Table cellComponent={this.props.templates} />
        <TableHeaderRow />
      </Grid>
    );
  }
}

export default SimpleDataGrid;

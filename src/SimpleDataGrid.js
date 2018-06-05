import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  columnExtensions,
  DragDropProvider,
  TableColumnReordering
} from '@devexpress/dx-react-grid-material-ui';
import TableCell from '@material-ui/core/TableCell';

export class SimpleDataGrid extends React.PureComponent {
  static defaultProps = {
    templates: ({ row, column }) => (
      <TableCell>{`${row[column.name]}`}</TableCell>
    ),
    columnExtensions: []
  };
  render() {
    const { rows, columns, columnExtensions } = this.props;

    return (
      <Grid rows={rows} columns={columns || []}>
        <DragDropProvider />
        <Table
          cellComponent={this.props.templates}
          columnExtensions={columnExtensions}
        />
        <TableColumnReordering defaultOrder={columns.map(i => i.name)} />
        <TableHeaderRow />
      </Grid>
    );
  }
}

export default SimpleDataGrid;

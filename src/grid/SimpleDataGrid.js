import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  DragDropProvider,
  TableColumnReordering
} from '@devexpress/dx-react-grid-material-ui';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    '& th': {
      overflow: 'hidden',
      paddingLeft: '10px',
      paddingRight: '10px'
    },
    '& .td': {
      overflow: 'hidden',
      paddingLeft: '10px',
      paddingRight: '10px'
    }
  }
});

export class SimpleDataGrid extends React.PureComponent {
  static defaultProps = {
    cellComponent: ({ row, column }) => (
      <TableCell>{`${row[column.name]}`}</TableCell>
    ),
    columnExtensions: [],
    columns: [],
    rows: []
  };

  render() {
    const { rows, columns, columnExtensions, cellComponent } = this.props;

    const classes = useStyles();
    return (
      <Block className={classes.root}>
        <Grid rows={rows} columns={columns || []}>
          <DragDropProvider />
          <Table
            cellComponent={cellComponent}
            columnExtensions={columnExtensions}
          />
          <TableColumnReordering defaultOrder={columns.map(i => i.name)} />
          <TableHeaderRow />
        </Grid>
      </Block>
    );
  }
}

export default SimpleDataGrid;

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { TableCell } from 'material-ui/Table';
import { FullDataGrid } from 'cloudhub-react-components';

import { ProgressBarCell } from './templates/progress-bar-cell';
import { HighlightedCell } from './templates/highlighted-cell';

import { generateRows, globalSalesValues } from './demodata/generator';

const Cell = props => {
  if (props.column.name === 'discount') {
    return <ProgressBarCell {...props} />;
  }
  if (props.column.name === 'amount') {
    return <HighlightedCell {...props} />;
  }
  return <TableCell>{props.row[props.column.name] || ''}</TableCell>;
};
Cell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'amount', title: 'Sale Amount' },
        { name: 'discount', title: 'Discount' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' }
      ],
      tableColumnExtensions: [{ columnName: 'amount', align: 'right' }],
      rows: generateRows({ columnValues: globalSalesValues, length: 1000 }),
      pageSizes: [5, 10, 15]
    };
  }
  render() {
    const { rows, columns, tableColumnExtensions, pageSizes } = this.state;

    return (
      <Paper>
        <FullDataGrid
          title="Banks"
          columns={columns}
          allowColumnResizing={false}
          onQueryChange={this.getRecords}
          data={rows}
          templates={Cell}
          onAdd={() => {}}
          onRefresh={() => {}}
          onDelete={this.confirmDelete}
          onDeleteRows={this.deleteRows}
          onCancelDelete={this.cancelDelete}
          onEdit={this.editRow}
        />
      </Paper>
    );
  }
}

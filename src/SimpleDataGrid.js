import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

export class SimpleDataGrid extends React.PureComponent {
  static defaultProps = {
    templates: () => undefined
  };
  render() {
    const { rows, columns } = this.props;

    return (
      <Grid rows={rows} columns={columns || []}>
        <Table tableCellTemplate={this.props.templates} />
        <TableHeaderRow />
      </Grid>
    );
  }
}

export default SimpleDataGrid;

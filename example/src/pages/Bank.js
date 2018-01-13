import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, TableCell } from 'material-ui';
import { RemoteDataGrid } from 'cloudhub-react-components';

import BankForm from '../containers/BankForm';
import {
  getBanks,
  editBankRow,
  addToDeleteBanks,
  deleteBanks
} from '../store/actions';

const styles = () => ({});

class Bank extends Component {
  state = {
    params: {}
  };

  getRecords = params => {
    this.setState({ params });
    this.props.getBanks(params);
  };
  confirmDelete = row => {
    this.props.addToDeleteBanks([row]);
  };

  deleteRows = () => {
    const ids = this.props.deletingRows.map(item => item._id || item.id);
    this.props.deleteBanks(ids);
  };
  cancelDelete = () => {
    this.props.addToDeleteBanks([]);
  };
  cancelEdit = () => {
    this.props.editBankRow(null);
  };

  editRow = row => {
    this.props.editBankRow(row);
  };

  renderTemplates = ({ column }) => {
    //row, column, style
    if (column.name === 'discount') {
      return <TableCell>{''}</TableCell>;
    }
    return undefined;
  };
  render() {
    const {
      editingRow,
      banks,
      totalCount,
      editBankRow,
      deletingRows,
      editTitle
    } = this.props;
    const cols = [
      { name: 'BankCode', title: 'Bank Code' },
      { name: 'BankName', title: 'Bank Name' }
    ];

    const columnWidths = { BankName: 120, BankCode: 150 };

    return (
      <div>
        <RemoteDataGrid
          title="Banks"
          columns={cols}
          columnWidths={columnWidths}
          allowColumnResizing={false}
          onQueryChange={this.getRecords}
          data={{ items: banks.toArray(), totalCount }}
          templates={this.renderTemplates}
          onAdd={() => editBankRow({})}
          onRefresh={() => this.props.getBanks(this.state.params)}
          deletingRows={deletingRows}
          onDelete={this.confirmDelete}
          onDeleteRows={this.deleteRows}
          onCancelDelete={this.cancelDelete}
          onEdit={this.editRow}
        />
        <BankForm
          editTitle={editTitle}
          editingRow={editingRow}
          onCancelEdit={this.cancelEdit}
          initialValues={editingRow}
          enableReinitialize
          keepDirtyOnReinitialize
        />
      </div>
    );
  }
}

const mapStateToProps = ({ bank }) => ({
  editTitle: bank.editTitle,
  editingRow: bank.editingRow,
  deletingRows: bank.deletingRows,
  banks: bank.banks,
  totalCount: bank.totalCount
});
export default connect(mapStateToProps, {
  getBanks,
  editBankRow,
  deleteBanks,
  addToDeleteBanks
})(withStyles(styles)(Bank));

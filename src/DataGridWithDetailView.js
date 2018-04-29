import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState,
  SelectionState,
  FilteringState,
  PagingState,
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSelection,
  RowDetailState
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  TableSelection,
  PagingPanel,
  TableGroupRow,
  GroupingPanel,
  DragDropProvider,
  Toolbar,
  TableColumnVisibility,
  TableFilterRow
} from '@devexpress/dx-react-grid-material-ui';
import {
  TableCell,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui';
import { red } from 'material-ui/colors';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import ViewList from 'material-ui-icons/ViewList';

import { withStyles } from 'material-ui/styles';
import TableHeaderBar from './TableHeaderBar';

const styleSheet = theme => ({
  commandButton: {
    minWidth: '40px'
  },
  lookupEditCell: {
    verticalAlign: 'middle',
    paddingRight: theme.spacing.unit,
    '& ~ $lookupEditCell': {
      paddingLeft: theme.spacing.unit
    }
  },
  dialog: {
    width: 'calc(100% - 16px)'
  },
  editDialog: {
    minWidth: '800px',
    height: '600px'
  }
});

const staticColumns = [{ name: 'actions', title: 'Actions' }];

class DataGridWithDetailView extends React.PureComponent {
  static defaultProps = {
    title: 'Table title',
    editTitle: 'Edit Record',
    columns: [],
    columnWidths: [],
    hiddencolumns: [],
    data: [],
    detailTemplate: ({ row, column }) => (
      <TableCell>{row[column.name] || ''}</TableCell>
    ),
    rowComponent: ({ row, ...restProps }) => <Table.Row {...restProps} />,
    onEdit: () => {},
    onDelete: () => {},
    onDeleteRows: () => {},
    onCancelDelete: () => {},
    onSaveRow: () => {},
    onCancelEdit: () => {},
    onChangeSelection: () => {},
    onView: () => {},
    onAdd: () => {},
    onRefresh: () => {},
    onPrint: () => {},
    deletingRows: [],
    editingRow: null,
    permissions: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      columns: [...this.props.columns, ...staticColumns],
      defaultColumnWidths: [
        { columnName: 'counter', width: 70 },
        { columnName: 'actions', width: 50 },
        ...this.props.columnWidths
      ],
      sorting: [],
      addedRows: [],
      changedRows: {},
      currentPage: 0,
      pageSize: 0,
      allowedPageSizes: [5, 10, 0],
      grouping: [],
      selection: [],
      filters: []
    };

    this.changeExpandedDetails = expandedRows =>
      this.setState({ expandedRows });

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeFilters = filters => this.setState({ filters });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.changeGrouping = grouping => this.setState({ grouping });
    this.changeSelection = selection => {
      this.setState({ selection });
      props.onChangeSelection(selection);
    };
    this.changeFilters = filters => this.setState({ filters });

    this.commitChanges = ({ added, changed, deleted }) => {
      let rows = this.state.rows;
      if (added) {
        const startingAddedId =
          rows.length - 1 > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row
          }))
        ];
      }
      if (changed) {
        rows = rows.map(
          row => (changed[row.id] ? { ...row, ...changed[row.id] } : row)
        );
      }
      this.setState({ rows, deletingRows: deleted || this.state.deletingRows });
    };
    this.tableCellTemplate = ({ row, column, style }) => {
      const permissions = {
        allowadd: props.permissions.allowadd || false,
        allowedit: props.permissions.allowedit || false,
        allowdelete: props.permissions.allowdelete || false,
        allowprint: props.permissions.allowprint || false
      };
      if (column.name === 'actions') {
        return (
          <TableCell>
            <div
              style={{
                height: '100%',
                width: '100%',
                minWidth: 150
              }}
            >
              <IconButton
                onClick={() => this.props.onView(row)}
                color="primary"
                title="View row"
              >
                <ViewList />
              </IconButton>
              <IconButton
                onClick={() => this.props.onEdit(row)}
                color="secondary"
                title="Edit row"
                disabled={!permissions.allowedit}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="primary"
                style={{ color: red[500] }}
                onClick={() => this.props.onDelete(row)}
                title="Delete row"
                disabled={!permissions.allowdelete}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </TableCell>
        );
      } else {
        return this.props.templates({ row, column, style });
      }
    };
  }

  renderHeader = () => {
    const permissions = {
      allowadd: this.props.permissions.allowadd || false,
      allowedit: this.props.permissions.allowedit || false,
      allowdelete: this.props.permissions.allowdelete || false,
      allowprint: this.props.permissions.allowprint || false
    };
    if (this.props.header) {
      return this.props.header({
        ...this.state,
        ...permissions,
        ...this.props
      });
    } else {
      return (
        <TableHeaderBar
          title={this.props.title}
          onAdd={this.props.onAdd}
          onRefresh={this.props.onReresh}
          onPrint={this.props.onPrint}
          {...permissions}
        />
      );
    }
  };

  render() {
    const {
      data,
      classes,
      deletingRows,
      hiddencolumns,
      rowComponent
    } = this.props;
    const {
      columns,
      selection,
      sorting,
      currentPage,
      pageSize,
      allowedPageSizes
    } = this.state;

    return (
      <div>
        {this.renderHeader()}
        <div className="grid-container">
          <Grid
            rows={data}
            columns={columns}
            getRowId={row => row._id || row.id}
          >
            <SelectionState
              selection={selection}
              onSelectionChange={this.changeSelection}
            />
            <SortingState
              sorting={sorting}
              onSortingChange={this.changeSorting}
            />

            <GroupingState
              grouping={this.state.grouping}
              onGroupingChange={this.changeGrouping}
            />

            <FilteringState
              filters={this.state.filters}
              onFiltersChange={this.changeFilters}
            />

            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={this.changeCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={this.changePageSize}
            />

            <IntegratedGrouping />
            <IntegratedFiltering />
            <IntegratedSorting />
            <IntegratedPaging />
            <IntegratedSelection />

            <DragDropProvider />

            <Table
              rowComponent={rowComponent}
              tableCellTemplate={this.tableCellTemplate}
              allowColumnReordering
            />

            <TableHeaderRow allowSorting allowDragging />

            <RowDetailState />
            <TableRowDetail contentComponent={this.props.detailTemplate} />

            <TableFilterRow
              filterCellTemplate={({ column, setFilter }) => {
                if (column.name === 'actions') {
                  return <TableCell />;
                }
                return <TableCell />;
              }}
            />
            <TableSelection showSelectAll />
            <TableGroupRow />
            <TableColumnVisibility defaultHiddenColumnNames={hiddencolumns} />
            <Toolbar />
            <GroupingPanel allowDragging />
            <PagingPanel pageSizes={allowedPageSizes} />
          </Grid>
        </div>
        <Dialog
          open={!!deletingRows.length}
          onClose={this.cancelDelete}
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle>Delete Row</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete the following row?
            </DialogContentText>
            <Grid rows={this.props.deletingRows} columns={this.props.columns}>
              <TableView cellComponent={this.tableCellTemplate} />
              <TableHeaderRow />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onCancelDelete} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.props.onDeleteRows(this.props.deleting);
              }}
              style={{ color: red }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DataGridWithDetailView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(DataGridWithDetailView);

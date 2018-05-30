import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SelectionState,
  PagingState,
  SortingState,
  GroupingState,
  FilteringState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSelection
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
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

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import ViewList from 'material-ui-icons/ViewList';

import { withStyles } from 'material-ui/styles';
import TableHeaderBar from './TableHeaderBar';
import { red } from 'material-ui/colors';
import './grid.css';

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
  },

  // ===================================================== Header ========================

  headerBar: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 20px 10px 20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  headerInputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexBasis: '50%',
    marginLeft: 10
  },
  headerButton: {
    fontWeight: 500,
    textTransform: 'capitalize',
    fontSize: 12
  },
  filterBar: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  filterField: { width: 200, marginLeft: 10 }
});

const staticColumns = [{ name: 'actions', title: 'Actions', width: 200 }];

class FullDataGrid extends Component {
  static defaultProps = {
    title: 'Table title',
    editTitle: 'Edit Record',
    columns: [],
    columnWidths: {},
    hiddencolumns: [],
    data: [],
    onEdit: () => {},
    onDelete: () => {},
    onDeleteRows: () => {},
    onCancelDelete: () => {},
    onChangeSelection: () => {},
    rowComponent: ({ row, ...restProps }) => <Table.Row {...restProps} />,
    onSaveRow: () => {},
    onCancelEdit: () => {},
    onView: () => {},
    onAdd: () => {},
    onRefresh: () => {},
    onPrint: () => {},
    deletingRows: [],
    editingRow: null,
    header: null,
    permissions: {
      allowadd: true,
      allowedit: true,
      allowdelete: true,
      allowprint: true
    },
    rowmenu: null
  };

  constructor(props) {
    super(props);

    this.state = {
      columns: [...this.props.columns, ...staticColumns],
      sorting: [],
      addedRows: [],
      changedRows: {},
      currentPage: 0,
      pageSize: 20,
      allowedPageSizes: [5, 10, 20],
      grouping: [],
      selection: [],
      filters: []
    };

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
              {props.rowmenu ? (
                props.rowmenu({
                  row,
                  column,
                  classes: props.classes,
                  ...permissions
                })
              ) : (
                <IconButton
                  classes={{ root: props.classes.iconButton }}
                  onClick={() => this.props.onView(row)}
                  title="View row"
                  color="primary"
                >
                  <ViewList className={props.classes.icon} />
                </IconButton>
              )}
              <IconButton
                onClick={() => this.props.onEdit(row)}
                title="Edit row"
                color="secondary"
                disabled={!permissions.allowedit}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => this.props.onDelete(row)}
                title="Delete row"
                color="primary"
                style={{ color: red[500] }}
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
          {...permissions}
          title={this.props.title}
          onAdd={this.props.onAdd}
          onRefresh={this.props.onReresh}
          onPrint={this.props.onPrint}
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
          <Grid rows={data} columns={columns}>
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
              cellComponent={this.tableCellTemplate}
              allowColumnReordering
            />

            <TableHeaderRow allowSorting allowDragging />

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
            <TableColumnVisibility defaultHiddenColumns={hiddencolumns} />
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
              <Table tableCellTemplate={this.tableCellTemplate} />
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

FullDataGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(FullDataGrid);

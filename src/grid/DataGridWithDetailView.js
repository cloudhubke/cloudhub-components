import React, { Fragment } from 'react';
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
  ColumnChooser,
  TableFilterRow
} from '@devexpress/dx-react-grid-material-ui';

import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { red } from '@material-ui/core/colors';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ViewList from '@material-ui/icons/ViewList';

import { withStyles } from '@material-ui/core/styles';
import TableHeaderBar from './TableHeaderBar';
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
    fontSize: 12,
    marginLeft: 5
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
      defaultColumnWidths: [
        { columnName: 'counter', width: 70 },
        { columnName: 'actions', width: 150 },
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
        rows = rows.map(row =>
          changed[row.id] ? { ...row, ...changed[row.id] } : row
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
      return (
        <div>
          {this.props.header({
            ...this.state,
            ...permissions,
            ...this.props
          })}
        </div>
      );
    }
    return (
      <TableHeaderBar
        title={this.props.title}
        onAdd={this.props.onAdd}
        onRefresh={this.props.onReresh}
        onPrint={this.props.onPrint}
        {...permissions}
      />
    );
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
      <Paper className="grid-container">
        {this.renderHeader()}
        <Grid rows={data} columns={columns} getRowId={row =>  row.id}>
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

          <Toolbar />
          <GroupingPanel allowDragging />
          <PagingPanel pageSizes={allowedPageSizes} />

          {hiddencolumns.length > 0 && (
            <TableColumnVisibility defaultHiddenColumnNames={hiddencolumns} />
          )}
          {hiddencolumns.length > 0 && <ColumnChooser />}
        </Grid>
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
      </Paper>
    );
  }
}

DataGridWithDetailView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(DataGridWithDetailView);

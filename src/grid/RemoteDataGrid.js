import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  SelectionState,
  PagingState,
  SortingState,
  GroupingState,
  FilteringState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedSorting,
  IntegratedSelection,
  CustomPaging
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
  TableFilterRow,
  TableColumnResizing,
  TableColumnReordering,
  Toolbar,
  TableColumnVisibility,
  ColumnChooser
} from '@devexpress/dx-react-grid-material-ui';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ViewList from '@material-ui/icons/ViewList';

import { withStyles } from '@material-ui/core/styles';
import TableHeaderBar from './TableHeaderBar';
import { red } from '@material-ui/core/colors';
import GridLoading from './GridLoading';
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
  noDataCell: {
    textAlign: 'center',
    padding: '40px 0'
  },
  iconButton: {
    border: 0,
    height: 'auto',
    width: 'auto',
    padding: '2px'
  },
  icon: {
    margin: 0
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

const counterColumn = [{ name: 'counter', title: '#', width: 70 }];

const staticColumns = [
  { name: 'actions', title: 'Actions', width: 140, align: 'right' }
];

const NoDataCellBase = ({ loading, colSpan, classes }) => (
  <TableCell className={classes.noDataCell} colSpan={colSpan}>
    <big>{loading ? '' : 'No data'}</big>
  </TableCell>
);

NoDataCellBase.propTypes = {
  loading: PropTypes.bool.isRequired,
  colSpan: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
};

// const NoDataCell = withStyles(styleSheet, { name: 'RemoteDataDemo' })(NoDataCellBase);

class RemoteDataGrid extends React.PureComponent {
  static defaultProps = {
    title: 'Table title',
    editTitle: 'Edit Record',
    columns: [],
    hiddencolumns: [],
    columnWidths: [],
    data: {
      items: [],
      totalCount: 0
    },
    allowColumnResizing: true,
    detailTemplate: () => <div />,
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
    url: '/',
    onQueryChange: () => {},
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
      columns: [...counterColumn, ...this.props.columns, ...staticColumns],
      defaultColumnWidths: [
        { columnName: 'counter', width: 70 },
        { columnName: 'actions', width: 150 },
        ...this.props.columnWidths
      ],
      sorting: [],
      addedRows: [],
      changedRows: {},
      currentPage: 0,
      pageSize: 20,
      allowedPageSizes: [20, 50, 200, 500],
      loading: false,
      grouping: [],
      selection: [],
      filters: [],
      searchTerm: ''
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
                classes={{ root: props.classes.iconButton }}
                color="secondary"
                onClick={() => this.props.onEdit(row)}
                title="Edit row"
                disabled={!permissions.allowedit}
              >
                <EditIcon className={props.classes.icon} />
              </IconButton>
              <IconButton
                classes={{ root: props.classes.iconButton }}
                color="primary"
                style={{ color: red[500] }}
                onClick={() => this.props.onDelete(row)}
                title="Delete row"
                disabled={!permissions.allowdelete}
              >
                <DeleteIcon className={props.classes.icon} />
              </IconButton>
            </div>
          </TableCell>
        );
      } else if (column.name === 'counter') {
        let ind =
          1 + this.props.data.items.findIndex(item => item._id === row._id);
        return (
          <TableCell>
            {this.state.currentPage === 0
              ? ind
              : this.state.currentPage * this.state.pageSize + ind}
          </TableCell>
        );
      } else {
        return this.props.templates({ row, column, style });
        // return <TableCell>col</TableCell>;
      }
    };

    this.loadData = _.debounce(this.loadData, 500);
  }

  componentDidMount() {
    this.loadData();
    this.setState({
      loading: true
    });
  }

  componentDidUpdate() {
    this.loadData();
  }

  changeSorting(sorting) {
    this.setState({
      loading: true,
      sorting
    });
  }

  changeCurrentPage(currentPage) {
    this.setState({
      loading: true,
      currentPage
    });
  }
  changePageSize(pageSize) {
    const { data } = this.props;
    const totalPages = Math.ceil(data.totalCount / pageSize);
    const currentPage = Math.min(this.state.currentPage, totalPages - 1);

    this.setState({
      loading: true,
      pageSize,
      currentPage
    });
  }

  searchChange = text => {
    this.setState({ searchTerm: text });
    this.loadData();
  };

  queryString() {
    const { sorting, pageSize, currentPage } = this.state;

    let queryString = {
      limit: pageSize,
      skip: pageSize * currentPage
    };

    const columnSorting = sorting[0];
    if (columnSorting) {
      const sortingDirectionString =
        columnSorting.direction === 'desc' ? -1 : 1;
      queryString.sort = { [columnSorting.columnName]: sortingDirectionString };
    }

    if (this.state.searchTerm !== '') {
      queryString.filter = this.state.searchTerm;
    }

    return queryString;
  }

  loadData() {
    const { onQueryChange } = this.props;
    const queryString = this.queryString();

    if (_.isEqual(queryString, this.lastQuery)) {
      this.setState({ loading: false });
      return;
    }
    this.setState({ loading: true });
    onQueryChange(queryString);

    this.lastQuery = queryString;
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
            ...this.props,
            ...this.state,
            ...permissions,
            queryString: this.queryString(),
            onSearch: this.searchChange
          })}
        </div>
      );
    }
    return (
      <TableHeaderBar
        {...permissions}
        title={this.props.title}
        onSearchChange={this.searchChange}
        onAdd={this.props.onAdd}
        onRefresh={this.props.onRefresh}
        onPrint={this.props.onPrint}
      />
    );
  };

  render() {
    const {
      data,
      classes,
      deletingRows,
      allowColumnResizing,
      hiddencolumns,
      rowComponent
    } = this.props;
    const {
      columns,
      selection,
      sorting,
      currentPage,
      pageSize,
      allowedPageSizes,
      defaultColumnWidths,
      loading
    } = this.state;

    return (
      <Paper className="grid-container">
        {this.renderHeader()}
        <Grid rows={data.items} columns={columns}>
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
          <CustomPaging totalCount={data.totalCount} />

          <IntegratedGrouping />
          <IntegratedFiltering />
          <IntegratedSorting />

          <IntegratedSelection />

          <DragDropProvider />

          <Table
            rowComponent={rowComponent}
            cellComponent={this.tableCellTemplate}
            allowColumnReordering
          />

          {allowColumnResizing && (
            <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
          )}

          <TableColumnReordering
            defaultOrder={columns.map(column => column.name)}
          />
          <TableHeaderRow
            showSortingControls
            allowDragging
            allowResizing={allowColumnResizing}
          />

          <TableFilterRow
            cellComponent={props => {
              if (
                props.column.name === 'actions' ||
                props.column.name === 'counter'
              ) {
                return <TableCell />;
              }
              return <TableFilterRow.Cell {...props} />;
            }}
          />
          <TableSelection showSelectAll />
          <TableGroupRow />

          <Toolbar />

          {hiddencolumns.length > 0 && (
            <TableColumnVisibility defaultHiddenColumnNames={hiddencolumns} />
          )}
          {hiddencolumns.length > 0 && <ColumnChooser />}

          <GroupingPanel allowDragging />
          <PagingPanel pageSizes={allowedPageSizes} />
        </Grid>

        {loading && <GridLoading />}

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
              <Table cellComponent={this.tableCellTemplate} />
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
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

RemoteDataGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(RemoteDataGrid);

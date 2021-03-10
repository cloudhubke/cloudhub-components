import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';

import {
  SelectionState,
  PagingState,
  SortingState,
  GroupingState,
  FilteringState,
  RowDetailState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedSorting,
  IntegratedSelection,
  CustomPaging,
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
  ColumnChooser,
  TableRowDetail,
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
import { red } from '@material-ui/core/colors';

import { withStyles } from '@material-ui/core/styles';
import sizes from '../theme/Sizes';

import TableHeaderBar from './TableHeaderBar';
import Block from '../Block';
import GridLoading from './GridLoading';
import './grid.css';

const styleSheet = () => ({
  commandButton: {
    minWidth: '40px',
  },
  lookupEditCell: {
    verticalAlign: 'middle',
    paddingRight: sizes.padding,
    '& ~ $lookupEditCell': {
      paddingLeft: sizes.padding,
    },
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  editDialog: {
    minWidth: '800px',
    height: '600px',
  },
  noDataCell: {
    textAlign: 'center',
    padding: '40px 0',
  },
  iconButton: {
    border: 0,
    height: 'auto',
    width: 'auto',
    opacity: 0.4,
    padding: '2px',
    '&:hover': {
      opacity: 0.8,
    },
  },
  icon: {
    margin: 0,
  },

  // ===================================================== Header ========================

  headerBar: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 20px 10px 20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  headerInputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexBasis: '50%',
    marginLeft: 10,
  },
  headerButton: {
    fontWeight: 500,
    textTransform: 'capitalize',
    fontSize: 12,
    marginLeft: 5,
  },
  filterBar: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  filterField: { width: 200, marginLeft: 10 },
});
const counterColumn = [{ name: 'counter', title: '#' }];
const staticColumns = [{ name: 'actions', title: '', align: 'left' }];
const NoDataCellBase = ({ loading, colSpan, classes }) => (
  <TableCell className={classes.noDataCell} colSpan={colSpan}>
    <strong>{loading ? '' : 'No data'}</strong>
  </TableCell>
);

NoDataCellBase.propTypes = {
  loading: PropTypes.bool.isRequired,
  colSpan: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

// const NoDataCell = withStyles(styleSheet, { name: 'RemoteDataDemo' })(NoDataCellBase);

class RemoteDataGridWithDetailView extends React.PureComponent {
  static defaultProps = {
    title: 'Table title',
    editTitle: 'Edit Record',
    columns: [],
    columnWidths: [],
    hiddencolumns: [],
    data: {
      items: [],
      totalCount: 0,
    },
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
    url: '/',
    onQueryChange: () => {},
    permissions: {
      allowadd: true,
      allowedit: true,
      allowdelete: true,
      allowprint: true,
    },
    rowmenu: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      columns: [...counterColumn, ...this.props.columns, ...staticColumns],
      defaultColumnWidths: [
        { columnName: 'counter', width: 70 },
        { columnName: 'actions', width: 150 },
        ...this.props.columnWidths,
      ],
      sorting: [],
      addedRows: [],
      changedRows: {},
      currentPage: 0,
      pageSize: 20,
      allowColumnResizing: false,
      allowedPageSizes: [20, 50, 200, 500],
      loading: false,
      grouping: [],
      selection: [],
      filters: [],
      searchTerm: '',
      data: {
        items: [],
        totalCount: 0,
      },
    };

    this.changeExpandedDetails = (expandedRows) =>
      this.setState({ expandedRows });

    this.changeSorting = (sorting) => this.setState({ sorting });
    this.changeFilters = (filters) => this.setState({ filters });
    this.changeCurrentPage = (currentPage) => this.setState({ currentPage });
    this.changePageSize = (pageSize) => this.setState({ pageSize });
    this.changeGrouping = (grouping) => this.setState({ grouping });
    this.changeSelection = (selection) => {
      this.setState({ selection });
      props.onChangeSelection(selection);
    };
    this.changeFilters = (filters) => this.setState({ filters });

    this.commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.state;
      if (added) {
        const startingAddedId =
          rows.length - 1 > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map((row) =>
          changed[row.id] ? { ...row, ...changed[row.id] } : row
        );
      }
      this.setState({ rows, deletingRows: deleted || this.state.deletingRows });
    };
    this.cellComponent = ({ row, column, style }) => {
      const permissions = {
        allowadd: props.permissions.allowadd || false,
        allowedit: props.permissions.allowedit || false,
        allowdelete: props.permissions.allowdelete || false,
        allowprint: props.permissions.allowprint || false,
      };
      if (column.name === 'actions') {
        return (
          <TableCell>
            <div
              style={{
                height: '100%',
                width: '100%',
                minWidth: 150,
              }}
            >
              {props.rowmenu ? (
                props.rowmenu({
                  row,
                  column,
                  classes: props.classes,
                  ...permissions,
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
      }
      if (column.name === 'counter') {
        const ind =
          1 + this.props.data.items.findIndex((item) => item.id === row.id);
        return (
          <TableCell>
            {this.state.currentPage === 0
              ? ind
              : this.state.currentPage * this.state.pageSize + ind}
          </TableCell>
        );
      }
      return this.props.cellComponent({ row, column, style });
    };

    this.loadData = debounce(this.loadData, 500);
  }

  componentDidMount() {
    this.loadData();
    this.setState({
      loading: true,
    });
  }

  componentDidUpdate() {
    this.loadData();
  }

  changeSorting(sorting) {
    this.setState({
      loading: true,
      sorting,
    });
  }

  changeCurrentPage(currentPage) {
    this.setState({
      loading: true,
      currentPage,
    });
  }

  changePageSize(pageSize) {
    const { totalCount, data } = this.props;
    const count = totalCount || data.length;
    const totalPages = Math.ceil(count / pageSize);
    const currentPage = Math.min(1, totalPages - 1);

    this.setState({
      loading: true,
      pageSize,
      currentPage,
    });
  }

  searchChange = (text) => {
    this.setState({ searchTerm: text });
    this.loadData();
  };

  queryString() {
    const { sorting, pageSize, currentPage } = this.state;

    const queryString = {
      limit: pageSize,
      skip: pageSize * currentPage,
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

    if (isEqual(queryString, this.lastQuery)) {
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
      allowprint: this.props.permissions.allowprint || false,
    };
    if (this.props.header) {
      return (
        <Block>
          {this.props.header({
            ...this.props,
            ...this.state,
            ...permissions,
            queryString: this.queryString(),
            onSearch: this.searchChange,
          })}
        </Block>
      );
    }
    return (
      <TableHeaderBar
        {...permissions}
        title={this.props.title}
        onSearchChange={this.searchChange}
        onAdd={this.props.onAdd}
        onRefresh={this.props.onReresh}
        onPrint={this.props.onPrint}
      />
    );
  };

  render() {
    const {
      data,
      classes,
      deletingRows,
      hiddencolumns,
      allowColumnResizing,
      rowComponent,
    } = this.props;

    const {
      columns,
      selection,
      sorting,
      currentPage,
      pageSize,
      allowedPageSizes,
      defaultColumnWidths,
      loading,
    } = this.state;

    return (
      <Block style={{ position: 'relative' }}>
        <Block flex={false}>{this.renderHeader()}</Block>
        <Block className={classes.gridContainer}>
          <Block
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
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
                cellComponent={this.cellComponent}
                allowColumnReordering
              />

              {allowColumnResizing && (
                <TableColumnResizing
                  defaultColumnWidths={defaultColumnWidths}
                />
              )}
              <Toolbar />

              <TableColumnReordering
                defaultOrder={columns.map((column) => column.name)}
              />
              <TableHeaderRow
                showSortingControls
                allowDragging
                allowResizing={allowColumnResizing}
              />

              <RowDetailState />
              <TableRowDetail contentComponent={this.props.detailTemplate} />

              <TableFilterRow
                cellComponent={(props) => {
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

              <GroupingPanel allowDragging />
              <PagingPanel pageSizes={allowedPageSizes} />
              {hiddencolumns.length > 0 && (
                <TableColumnVisibility
                  defaultHiddenColumnNames={hiddencolumns}
                />
              )}
              {hiddencolumns.length > 0 && <ColumnChooser />}
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
                <Grid
                  rows={this.props.deletingRows}
                  columns={this.props.columns.filter(
                    (c) => c.name.toLowerCase() !== 'actions'
                  )}
                >
                  <Table cellComponent={this.cellComponent} />
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
          </Block>
        </Block>
      </Block>
    );
  }
}
RemoteDataGridWithDetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(RemoteDataGridWithDetailView);

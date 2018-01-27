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
  IntegratedPaging,
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
import {
  TableCell,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper
} from 'material-ui';

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
  }
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
    columnWidths: {},
    data: {
      items: [],
      totalCount: 0
    },
    allowColumnResizing: true,
    detailTemplate: () => <div />,
    onEdit: () => {},
    onDelete: () => {},
    onDeleteRows: () => {},
    onCancelDelete: () => {},
    onSaveRow: () => {},
    onCancelEdit: () => {},
    onView: () => {},
    onAdd: () => {},
    onRefresh: () => {},
    onPrint: () => {},
    deletingRows: [],
    editingRow: null,
    url: '/',
    onQueryChange: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      columns: [...counterColumn, ...this.props.columns, ...staticColumns],
      defaultColumnWidths: {
        counter: 70,
        actions: 150,
        ...this.props.columnWidths
      },
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
    this.changeSelection = selection => this.setState({ selection });
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
      if (column.name === 'actions') {
        return (
          <TableCell style={{ display: 'flex', flexDirection: 'row' }}>
            <IconButton
              classes={{ root: props.classes.iconButton }}
              onClick={() => this.props.onView(row)}
              title="View row"
            >
              <ViewList className={props.classes.icon} />
            </IconButton>
            <IconButton
              classes={{ root: props.classes.iconButton }}
              color="primary"
              onClick={() => this.props.onEdit(row)}
              title="Edit row"
            >
              <EditIcon className={props.classes.icon} />
            </IconButton>
            <IconButton
              classes={{ root: props.classes.iconButton }}
              color="secondary"
              onClick={() => this.props.onDelete(row)}
              title="Delete row"
            >
              <DeleteIcon className={props.classes.icon} />
            </IconButton>
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
      return;
    } else {
      onQueryChange(queryString);
    }

    this.lastQuery = queryString;
  }

  renderHeader = () => {
    if (this.props.header) {
      return this.props.header(this.props);
    } else {
      return (
        <TableHeaderBar
          title={this.props.title}
          onSearchChange={this.searchChange}
          onAdd={this.props.onAdd}
          onRefresh={this.props.onRefresh}
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
      allowColumnResizing,
      hiddencolumns
    } = this.props;
    const {
      columns,
      selection,
      sorting,
      currentPage,
      pageSize,
      allowedPageSizes,
      defaultColumnWidths
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

          <Table cellComponent={this.tableCellTemplate} allowColumnReordering />

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
            filterCellTemplate={({ column, setFilter }) => {
              if (column.name === 'actions' || column.name === 'counter') {
                return <TableCell />;
              }
              return <TableCell />;
            }}
          />
          <TableSelection />
          <TableGroupRow />
          <TableColumnVisibility defaultHiddenColumns={hiddencolumns} />
          <Toolbar />
          <GroupingPanel allowDragging />
          <PagingPanel pageSizes={allowedPageSizes} />
          <ColumnChooser />
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

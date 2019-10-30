import React from 'react';
import includes from 'lodash/includes';
import axios from 'axios';

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
  CustomPaging,
  RowDetailState,
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from '@material-ui/core/styles';
import Block from '../Block';
import GridLoading from './GridLoading';
import './grid.css';
import RowActions from './RowActions';
import CounterComponent from './CounterComponent';
import Header from './Header';

const styleSheet = () => ({
  gridContainer: {
    '& th': {
      overflow: 'hidden',
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    '& td': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    '& div::-webkit-scrollbar': {
      width: '16px',
    },
    '& div::-webkit-scrollbar-track': {
      background: 'grey',
      borderTop: '7px solid white',
      borderBottom: '7px solid white',
    },
    '& div::-webkit-scrollbar-thumb': {
      background: 'grey',
      borderTop: '4px solid white',
      borderBottom: '4px solid white',
    },
    '& div::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#aaa',
    },
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

const counterColumn = [{ name: 'counter', title: '#', width: 70 }];

const staticColumns = [
  { name: 'actions', title: 'Actions', width: 140, align: 'right' },
];

const RemoteDataGridWithDetailView = React.forwardRef(
  (
    { permissions, keyExtractor, dataExtractor, countExtractor, ...props },
    ref
  ) => {
    const [columns] = React.useState([
      ...counterColumn,
      ...props.columns,
      ...staticColumns,
    ]);
    const [defaultColumnWidths] = React.useState([
      { columnName: 'counter', width: 70 },
      { columnName: 'actions', width: 150 },
      ...props.columnWidths,
    ]);
    const [data, setData] = React.useState([]);
    const [totalCount, setTotalCount] = React.useState(0);

    const [sorting, setSorting] = React.useState([]);

    const [currentPage, setCurrrentPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(20);
    const [allowedPageSizes] = React.useState([20, 50, 200, 500]);
    const [loading, setLoading] = React.useState(false);
    const [grouping, setGrouping] = React.useState([]);
    const [selection, setSelection] = React.useState([]);
    const [filters, setFilters] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    const [lastQuery, setLastQuery] = React.useState({});

    const [rows, setRows] = React.useState([]);
    const [deletingRows, setDeletingRows] = React.useState([]);

    const changeSelection = selection => {
      setSelection(selection);
      props.onChangeSelection(selection);
    };

    const getQueryParams = () => {
      const queryparams = {
        limit: pageSize,
        skip: pageSize * currentPage,
      };

      const columnSorting = sorting[0];
      if (columnSorting) {
        const sortingDirectionString =
          columnSorting.direction === 'desc' ? -1 : 1;
        queryparams.sort = {
          [columnSorting.columnName]: sortingDirectionString,
        };
      }

      if (searchTerm !== '') {
        queryparams.filter = searchTerm;
      }
      return queryparams;
    };

    const loadData = async () => {
      const queryparams = getQueryParams();

      try {
        setLoading(true);
        const { data } = await props.axiosinstance().get(`${props.url}`, {
          params: { ...queryparams },
        });

        setData(dataExtractor(data));
        setTotalCount(countExtractor(data));
        setLoading(false);
      } catch (error) {
        console.log('error', error);
      }
    };

    React.useEffect(() => {
      loadData();
    }, [sorting, currentPage, searchTerm]);

    const changePageSize = pageSize => {
      const totalPages = Math.ceil(data.totalCount / pageSize);
      const currentPage = Math.min(currentPage, totalPages - 1);
      setPageSize(pageSize);
      setCurrrentPage(currentPage);
    };

    React.useImperativeHandle(ref, () => ({
      onSave: row => {
        const ind = data.findIndex(d => keyExtractor(d) === keyExtractor(row));
        if (ind === -1) {
          setData([row, ...data]);
        } else {
          setData(
            [...data].map(r => {
              if (keyExtractor(r) === keyExtractor(row)) {
                return row;
              }
              return r;
            })
          );
        }
      },
      reload: () => {
        loadData();
      },
      onDeleteSuccess: deletedRows => {
        const deleted = [...deletedRows].map(r => keyExtractor(r));
        setData(data.filter(r => !includes(deleted, keyExtractor(r))));
      },
    }));

    const cellComponent = ({ row, column, style }) => {
      if (column.name === 'actions' && !props.actions) {
        return (
          props.actionsComponent({ row, column }) || (
            <RowActions
              permissions={permissions}
              row={row}
              column={column}
              onDelete={row => setDeletingRows([row])}
              onView={props.onView}
              onEdit={props.onEdit}
            />
          )
        );
      }
      if (column.name === 'counter') {
        return (
          <CounterComponent
            data={data}
            totalCount={totalCount}
            row={row}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        );
      }
      return props.cellComponent({ row, column, style });
      // return <TableCell>col</TableCell>;
    };

    const { classes, allowColumnResizing, hiddencolumns, rowComponent } = props;

    return (
      <Block style={{ position: 'relative' }}>
        <Header
          permissions={permissions}
          queryString={getQueryParams()}
          onSearch={text => setSearchTerm(text)}
          onRefresh={() => loadData()}
          {...props}
        />
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
            <Grid rows={data} columns={columns}>
              <SelectionState
                selection={selection}
                onSelectionChange={changeSelection}
              />
              <SortingState
                sorting={sorting}
                onSortingChange={sorting => setSorting(sorting)}
              />

              <GroupingState
                grouping={grouping}
                onGroupingChange={grouping => setGrouping(grouping)}
              />

              <FilteringState
                filters={filters}
                onFiltersChange={filters => setFilters(filters)}
              />

              <PagingState
                currentPage={currentPage}
                onCurrentPageChange={page => setCurrrentPage(page)}
                pageSize={pageSize}
                onPageSizeChange={changePageSize}
              />
              <CustomPaging totalCount={totalCount} />

              <IntegratedGrouping />
              <IntegratedFiltering />
              <IntegratedSorting />

              <IntegratedSelection />

              <DragDropProvider />

              <Table
                rowComponent={rowComponent}
                cellComponent={cellComponent}
                allowColumnReordering
              />

              {allowColumnResizing && (
                <TableColumnResizing
                  defaultColumnWidths={defaultColumnWidths}
                />
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

              <RowDetailState />
              <TableRowDetail contentComponent={this.props.detailTemplate} />

              <TableSelection showSelectAll />
              <TableGroupRow />

              <Toolbar />

              {hiddencolumns.length > 0 && (
                <TableColumnVisibility
                  defaultHiddenColumnNames={hiddencolumns}
                />
              )}
              {hiddencolumns.length > 0 && <ColumnChooser />}

              <GroupingPanel allowDragging />
              <PagingPanel pageSizes={allowedPageSizes} />
            </Grid>

            {loading && <GridLoading />}

            <Dialog
              open={!!deletingRows.length}
              onClose={() => setDeletingRows([])}
              classes={{ paper: classes.dialog }}
            >
              <DialogTitle>Delete Row</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure to delete the following row?
                </DialogContentText>
                <Grid
                  rows={deletingRows}
                  columns={props.columns.filter(
                    c => c.name.toLowerCase() !== 'actions'
                  )}
                >
                  <Table cellComponent={cellComponent} />
                  <TableHeaderRow />
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeletingRows([])} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    props.onDeleteRows([...deletingRows]);
                    setDeletingRows([]);
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
);

RemoteDataGridWithDetailView.defaultProps = {
  title: 'Table title',
  editTitle: 'Edit Record',
  columns: [],
  hiddencolumns: [],
  columnWidths: [],
  allowColumnResizing: true,
  detailTemplate: () => <div />,
  rowComponent: ({ row, ...restProps }) => <Table.Row {...restProps} />,
  cellComponent: () => null,
  actionsComponent: () => null,
  onEdit: () => {},
  onDeleteRows: () => {},
  onCancelEdit: () => {},
  onChangeSelection: () => {},
  onView: () => {},
  onAdd: () => {},
  onPrint: () => {},
  url: '/',
  axiosinstance: () => axios.create({}),
  keyExtractor: row => row.id,
  dataExtractor: data => data.items,
  countExtractor: data => data.totalCount,
  permissions: {
    allowadd: true,
    allowedit: true,
    allowdelete: true,
    allowprint: true,
  },
  actionsMenu: null,
};

export default withStyles(styleSheet)(RemoteDataGridWithDetailView);

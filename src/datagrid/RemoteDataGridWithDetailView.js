import React from 'react';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import difference from 'lodash/difference';

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
import Header from './Header';
import PagingComponent from './PagingComponent';
import useGridStore from './store/useGridStore';

const styleSheet = () => ({
  gridContainer: {
    '& th': {
      overflow: 'hidden',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
    '& td': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingLeft: '5px',
      paddingRight: '5px',
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
    {
      permissions,
      keyExtractor,
      dataExtractor,
      countExtractor,
      pagingComponent = PagingComponent,
      stickyHeader = false,
      ...props
    },
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

    const dispatch = useGridStore((state) => state.dispatch);
    const { data, selection, params, totalCount, loading } = useGridStore(
      (state) =>
        state[props.url] || {
          data: [],
          params: {},
          selection: {},
          totalCount: 0,
          loading: false,
        }
    );

    const [sorting, setSorting] = React.useState([]);

    const [currentPage, setCurrrentPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(20);
    const [allowedPageSizes] = React.useState([20, 50, 200, 500]);
    const [grouping, setGrouping] = React.useState([]);
    const [filters, setFilters] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedIndexes, setSelectedIndexes] = React.useState([]);
    const [deletingRows, setDeletingRows] = React.useState([]);

    const changeSelection = (indexes) => {
      const selectedDocs = { ...selection };
      const removedKeys = difference(selectedIndexes, indexes).map((i) =>
        keyExtractor(data[i])
      );

      for (const key of Object.keys(selection)) {
        if (removedKeys.includes(key)) {
          delete selectedDocs[key];
        }
      }

      for (const i of indexes) {
        selectedDocs[keyExtractor(data[i])] = data[i];
      }

      dispatch({
        url: props.url,
        type: 'update',
        payload: { selection: selectedDocs },
      });

      setSelectedIndexes(indexes);
    };

    React.useEffect(() => {
      props.onChangeSelection(
        Object.keys(selection).map((key) => selection[key])
      );
    }, [selectedIndexes.length]);

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

    const getSelectedIndexes = () => {
      const indexes = data
        .map((d, i) => {
          if (Object.keys(selection).includes(keyExtractor(d))) {
            return i;
          }
          return null;
        })
        .filter((i) => i !== null);

      setSelectedIndexes(indexes);
    };

    const loadData = async (reload) => {
      const queryparams = getQueryParams();
      if (isEqual(queryparams, params) && data.length > 0 && !reload) {
        getSelectedIndexes();
        return;
      }

      try {
        dispatch({
          url: props.url,
          type: 'update',
          payload: {
            params: queryparams,
            loading: false,
          },
        });
        const { data } = await props.axiosinstance().get(`${props.url}`, {
          params: { ...queryparams },
        });

        const dataArray = dataExtractor(data).map((d, i) => ({
          ...d,
          counter: currentPage * pageSize + (i + 1),
        }));

        // setData(dataArray);

        dispatch({
          url: props.url,
          type: 'update',
          payload: {
            data: dataArray,
            totalCount: countExtractor(data),
            loading: false,
          },
        });

        getSelectedIndexes();
      } catch (error) {
        dispatch({
          url: props.url,
          type: 'update',
          payload: { loading: false },
        });
      }
    };

    React.useEffect(() => {
      loadData();
    }, [sorting, currentPage, searchTerm]);

    const changePageSize = (pageSize) => {
      const count = data.totalCount || totalCount || 0;
      const totalPages = count === 0 ? 1 : Math.ceil(count / pageSize);
      const currentPage = Math.min(currentPage || 1, totalPages - 1);
      setPageSize(pageSize);
      setCurrrentPage(currentPage);
    };

    const reload = () => {
      loadData(true);
    };

    React.useImperativeHandle(ref, () => ({
      onSave: (row) => {
        const ind = data.findIndex(
          (d) => keyExtractor(d) === keyExtractor(row)
        );
        if (ind === -1) {
          dispatch({
            url: props.url,
            type: 'update',
            payload: {
              data: [row, ...data].map((d, i) => ({
                ...d,
                counter: currentPage * pageSize + (i + 1),
              })),
            },
          });
        } else {
          dispatch({
            url: props.url,
            type: 'update',
            payload: {
              data: [...data].map((r, i) => {
                if (keyExtractor(r) === keyExtractor(row)) {
                  return { ...row, counter: currentPage * pageSize + (i + 1) };
                }
                return r;
              }),
            },
          });
        }
      },
      reload,
      onDeleteSuccess: (deletedRows) => {
        const deleted = [...deletedRows].map((r) => keyExtractor(r));
        dispatch({
          url: props.url,
          type: 'update',
          payload: {
            data: data.filter((r) => !includes(deleted, keyExtractor(r))),
          },
        });
      },
      getData: () => ({
        data,
        totalCount,
        selection,
      }),
    }));

    const cellComponent = ({ row: r, column, style }) => {
      const row = { ...r };

      if (column.name === 'actions' && !props.actions) {
        delete row.counter;
        return (
          props.actionsComponent({ row, column }) || (
            <RowActions
              permissions={permissions}
              row={row}
              column={column}
              onDelete={(row) => setDeletingRows([row])}
              onView={props.onView}
              onEdit={props.onEdit}
            />
          )
        );
      }
      if (column.name === 'counter') {
        return <TableCell>{`${row.counter}`}</TableCell>;
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
          onSearch={(text) => setSearchTerm(text)}
          onRefresh={reload}
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
                selection={selectedIndexes}
                onSelectionChange={changeSelection}
              />
              <SortingState
                sorting={sorting}
                onSortingChange={(sorting) => setSorting(sorting)}
              />

              <GroupingState
                grouping={grouping}
                onGroupingChange={(grouping) => setGrouping(grouping)}
              />

              <FilteringState
                filters={filters}
                onFiltersChange={(filters) => setFilters(filters)}
              />

              <PagingState
                currentPage={currentPage}
                onCurrentPageChange={(page) => setCurrrentPage(page)}
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
                stickyHeader={stickyHeader}
                rowComponent={(props) => {
                  const isSelected = Object.keys(selection).includes(
                    keyExtractor(props.row)
                  );

                  return rowComponent({ selected: isSelected, ...props });
                }}
                cellComponent={cellComponent}
                allowColumnReordering
              />

              {allowColumnResizing && (
                <TableColumnResizing
                  defaultColumnWidths={defaultColumnWidths}
                />
              )}

              <TableColumnReordering
                defaultOrder={columns.map((column) => column.name)}
              />
              <TableHeaderRow
                showSortingControls
                allowDragging
                allowResizing={allowColumnResizing}
              />

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

              <RowDetailState />
              <TableRowDetail contentComponent={props.detailTemplate} />

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
              {pagingComponent ? (
                <PagingPanel
                  pageSizes={allowedPageSizes}
                  containerComponent={pagingComponent}
                />
              ) : (
                <PagingPanel pageSizes={allowedPageSizes} />
              )}
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
                    (c) => c.name.toLowerCase() !== 'actions'
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

const cellComponent = ({ row, column }) => (
  <TableCell>
    {`${typeof row[column.name] === 'undefined' ? '' : row[column.name]}`}
  </TableCell>
);

RemoteDataGridWithDetailView.defaultProps = {
  title: 'Table title',
  editTitle: 'Edit Record',
  columns: [],
  hiddencolumns: [],
  columnWidths: [],
  allowColumnResizing: true,
  detailTemplate: () => <div />,
  rowComponent: ({ selected, ...restProps }) => (
    <Table.Row selected={selected} hover {...restProps} />
  ),
  cellComponent,
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
  keyExtractor: (row) => row.id,
  dataExtractor: (data) => data.items || data,
  countExtractor: (data) => data.totalCount,
  permissions: {
    allowadd: true,
    allowedit: true,
    allowdelete: true,
    allowprint: true,
  },
  actionsMenu: null,
};

export default withStyles(styleSheet)(RemoteDataGridWithDetailView);

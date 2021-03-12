import React from 'react';
import { Box, TablePagination } from '@material-ui/core';

const PagingComponent = ({
  pageSize,
  currentPage,
  onCurrentPageChange = () => null,
  onPageSizeChange = () => null,
  totalCount,
  pageSizes,
  ...otherprops
}) => {
  const [] = React.useState(0);

  const handlePageSizeChange = (e) => {
    onPageSizeChange(e.target.value);
  };
  const handlePageChange = (e, page) => {
    onCurrentPageChange(page);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <TablePagination
        rowsPerPageOptions={pageSizes || [5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={pageSize}
        page={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
      />
      <Box
        sx={{
          px: 3,
          py: 1.5,
          top: 0,
          position: { md: 'absolute' },
        }}
      >
        {''}
      </Box>
    </Box>
  );
};

export default PagingComponent;

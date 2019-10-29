import React from 'react';
import TableCell from '@material-ui/core/TableCell';

const CounterComponent = ({ data, row, currentPage, pageSize }) => {
  const ind = 1 + data.findIndex(item => item.id === row.id);
  return (
    <TableCell>
      {currentPage === 0 ? ind : currentPage * pageSize + ind}
    </TableCell>
  );
};

export default CounterComponent;

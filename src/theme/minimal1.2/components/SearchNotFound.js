import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
  className: PropTypes.string
};

function SearchNotFound({ searchQuery = '', className, ...other }) {
  return (
    <Box className={className} {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or
        using complete words.
      </Typography>
    </Box>
  );
}

export default SearchNotFound;

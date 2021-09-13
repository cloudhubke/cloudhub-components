import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import './loading.css';

export const GridLoading = () => (
  <div className="loading-shading-mui">
    <CircularProgress className="loading-icon-mui" />
  </div>
);

export default GridLoading;

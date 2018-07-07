import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './loading.css';

export const GridLoading = () => (
  <div className="loading-shading-mui">
    <CircularProgress className="loading-icon-mui" />
  </div>
);

export default GridLoading;

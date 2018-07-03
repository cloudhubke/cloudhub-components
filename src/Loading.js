import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress color="secondary" size={50} />
        </div>
      );
    }
    return null;
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  }
  return null;
}

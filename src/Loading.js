import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Loading extends Component {
  static defaultProps = {
    size: 16
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.isLoading) {
      if (this.props.timedOut) {
        return <div>Loader timed out!</div>;
      }
      if (this.props.pastDelay) {
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
            <CircularProgress color="secondary" size={this.props.size} />
          </div>
        );
      }
      return null;
    }
    if (this.props.error) {
      return <div>Error!</div>;
    }
    return null;
  }
}

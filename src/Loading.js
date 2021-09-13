import React, { Component } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';

export default class Loading extends Component {
  static defaultProps = {
    size: 16,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { size } = this.props;
    return (
      <div
        style={{
          flex: 1,
          minHeight: '100%',
          maxHeight: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {
          // <CircularProgress color="secondary" size={this.props.size} />
        }
        <img
          alt="loading...."
          src="assets/images/spinner.gif"
          style={{ height: size * 2 }}
        />
      </div>
    );
  }
}

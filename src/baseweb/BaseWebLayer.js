import React from 'react';
import { Layer } from 'baseui/layer';
import Block from '../Block';

class BaseWebLayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Block
        ref={(el) => {
          this.el = el;
        }}
        style={{ position: 'relative' }}
        color="cyan"
      >
        {this.props.children}
      </Block>
    );
  }
}

export default BaseWebLayer;

import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export class SimpleQuill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      height: '200px',
      defaultValue: '',
    };
  }

  componentDidMount() {
    this.setState({ defaultValue: this.props.input.value });
    if (this.props.height) {
      this.setState({ height: this.props.height });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input.value !== this.props.input.value) {
      this.setState({ defaultValue: nextProps.input.value });
    }
  }

  handleChange = value => {
    this.props.input.onChange(value);
  };

  render() {
    const { meta } = this.props;
    return (
      <div>
        <ReactQuill
          style={{
            height: this.state.height,
            maxHeight: this.state.height,
            marginBottom: '40px',
          }}
          value={this.state.defaultValue}
          onChange={this.handleChange}
        />
        {meta.touched &&
          meta.error && <div className="error">{meta.error}</div>}
      </div>
    );
  }
}

export default SimpleQuill;

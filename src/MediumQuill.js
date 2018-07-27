import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'] // remove formatting button
  ]
};

class MediumQuill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      height: '200px',
      defaultValue: ''
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
            marginBottom: '40px'
          }}
          value={this.state.defaultValue}
          modules={modules}
          onChange={this.handleChange}
        />
        {meta.touched &&
          meta.error && <div className="error">{meta.error}</div>}
      </div>
    );
  }
}

export default MediumQuill;

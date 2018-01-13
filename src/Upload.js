import React, { Component } from 'react';
import 'antd/lib/upload/style/index.css';
import './Upload.css';
import { Upload, Icon, Modal } from 'antd';
import _ from 'lodash';

export class SingleImageUpload extends Component {
  static defaultProps = {
    preferredCountries: ['ke'],
    defaultCountry: 'ke',
    value: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  }

  componentDidMount() {
    // if (this.props.input.value) {
    //   this.setState({
    //     fileList: [
    //       {
    //         uid: 1,
    //         name: 'xxx.png',
    //         status: 'done',
    //         url: this.props.input.value,
    //       },
    //     ],
    //   });
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input.value !== this.props.input.value) {
      this.setState({
        fileList: [
          {
            uid: 1,
            name: 'xxx.png',
            status: 'done',
            url: nextProps.input.value,
          },
        ],
      });
    }
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = data => {
    const file = data.file;

    if (!_.isEmpty(file.response)) {
      const files = file.response.map((item, index) => ({
        uid: index,
        name: item.filename,
        status: 'done',
        url: item.fd,
      }));
      console.log('files..', files);
      this.props.input.onChange(files[0].url);
      this.props.input.onBlur();
    }
    this.setState({ fileList: data.fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { meta } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/fileapi/upload/imageupload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        {meta.touched &&
          meta.error && <div className="error">{meta.error}</div>}
      </div>
    );
  }
}

export default SingleImageUpload;

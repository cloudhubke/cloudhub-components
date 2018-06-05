import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  imagesList: {
    display: 'flex',
    '& .ant-upload-list': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    '& .ant-upload.ant-upload-select, .ant-upload-list-picture-card .ant-upload-list-item': {
      float: 'left',
      width: 150,
      height: 150,
      margin: '0 8px 8px 0'
    },

    '& .ant-upload-select-picture-card i': {
      fontSize: 28,
      color: '#999'
    },

    '& .ant-upload-select-picture-card .ant-upload-text': {
      marginTop: 8,
      fontSize: 12,
      color: '#666'
    }
  }
});
class ImagesUpload extends Component {
  static defaultProps = {
    preferredCountries: ['ke'],
    defaultCountry: 'ke',
    value: '',
    limit: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      isMounted: true,
      previewVisible: false,
      previewImage: '',
      fileList: []
    };
  }

  componentWillMount() {
    let images = [];
    if (this.props.input.value) {
      if (Array.isArray(this.props.input.value)) {
        images = this.props.input.value;
      } else {
        images = [this.props.input.value];
      }
      this.setState({
        fileList: images.map((item, index) => ({
          ...item,
          uid: item.uid || index,
          name: item.name || 'xxx.png',
          status: 'done',
          url: item.url || ''
        }))
      });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => {
    const files = fileList.map((item, index) => {
      if (item.response) {
        return { ...item.response[0], uid: index, status: 'done' };
      }
      return item;
    });

    this.setState({ fileList: files });
    if (this.props.limit === 1) {
      this.props.input.onChange(files[0]);
    } else {
      this.props.input.onChange(files);
    }
  };

  handleRemove = file => {
    const ind = this.state.fileList.findIndex(item => item.url === file.url);
    const filelist = [...this.state.fileList];
    filelist.splice(ind, 1);

    this.setState({ fileList: filelist });
    if (!filelist.length && this.props.limit === 1) {
      this.props.input.onChange({});
    } else {
      this.props.input.onChange(filelist);
    }
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { limit, classes } = this.props;

    const { meta } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className={classes.imagesList}>
        <Upload
          accept="image/*"
          action="/fileapi/upload/image"
          listType="picture-card"
          fileList={fileList}
          multiple={limit > 1}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {fileList.length >= limit ? null : uploadButton}
        </Upload>
        <Modal
          zIndex={10000}
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

export default withStyles(styles)(ImagesUpload);

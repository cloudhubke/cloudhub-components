import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import Progress from 'antd/lib/progress';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { resolve } from 'path';

const styles = () => ({
  imagesList: {
    display: 'flex',
    position: 'relative',
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
    limit: 1,
    input: {
      value: null,
      onChange: () => {}
    },
    value: null,
    onChange: () => {},
    sizelimit: 0,
    width: 0,
    height: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      isMounted: true,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      error: '',
      isuploading: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let images = [];
    const value = nextProps.input.value || nextProps.value || {};

    if (!isEmpty(value)) {
      if (Array.isArray(value)) {
        images = value;
      } else {
        images = [value];
      }
      return {
        ...prevState,
        fileList: images.map((item, index) => ({
          ...item,
          uid: item.uid || index,
          name: item.name || 'xxx.png',
          status: 'done',
          url: item.url || ''
        }))
      };
    } else {
      return {
        ...prevState,
        isMounted: true,
        previewVisible: false,
        previewImage: '',
        fileList: []
      };
    }
  }

  getFileList = () => {
    const { height, width } = this.props;
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const fl = this.uploader.state.fileList;

        const flist = fl.map(file => {
          let img = new Image();
          img.src = file.url || file.thumbUrl;
          img.onload = () => {
            const imageheight = img.height;
            const imagewidth = img.height;
            console.log(imagewidth, imageheight);
            if (imageheight !== height || height !== imageheight) {
              this.setState({
                error: `Your image dimensions are not correct. Expecting ${width} x ${height}`
              });
            }
          };
          return file;
        });
        const list = await Promise.all(flist);
      }, 1000);
    });
  };

  beforeUpload = (file, filelist) => {
    const { sizelimit, width, height } = this.props;
    const isImage = ['image/jpeg', 'image/png'].includes(file.type);

    //  this.getFileList();

    if (!isImage) {
      this.setState({ error: 'You can only upload JPG/PNG file!' });
    }

    let isSize = true;

    if (sizelimit) {
      isSize = file.size / 1024 / 1024 < sizelimit;
      if (!isSize) {
        this.setState(
          { error: `Image must be smaller than ${sizelimit}MB!` },
          () => {
            setTimeout(() => {
              this.removeFile(file);
            }, 2000);
          }
        );
      }
    }

    return isSize && isImage;
  };

  handleSize(image) {
    console.log(image.offsetWidth, image.offsetHeight);
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ file, fileList }) => {
    const files = [...(fileList || [])].map((item, index) => {
      if (item.response) {
        return { ...item.response[0], uid: index, status: 'done' };
      }
      return item;
    });

    this.setState(
      { fileList: files, isuploading: files.filter(f => !!f.uid).length > 0 },
      () => {
        if (this.props.limit === 1) {
          this.props.input.onChange(files[0]);
          this.props.onChange(files[0]);
        } else {
          this.props.input.onChange(files);
          this.props.onChange(files);
        }
      }
    );
  };

  removeFile = file => {
    const ind = this.state.fileList.findIndex(item => item.uid === file.uid);
    const filelist = [...this.state.fileList];
    filelist.splice(ind, 1);

    this.setState({ fileList: filelist });
    if (!filelist.length && this.props.limit === 1) {
      this.props.input.onChange({});
      this.props.onChange({});
    } else {
      this.props.input.onChange(filelist);
      this.props.onChange(filelist);
    }
  };

  handleRemove = file => {
    const ind = this.state.fileList.findIndex(item => item.url === file.url);
    const filelist = [...this.state.fileList];
    filelist.splice(ind, 1);

    this.setState({ fileList: filelist });
    if (!filelist.length && this.props.limit === 1) {
      this.props.input.onChange({});
      this.props.onChange({});
    } else {
      this.props.input.onChange(filelist);
      this.props.onChange(filelist);
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
      <Fragment>
        <div className={classes.imagesList}>
          <Upload
            accept="image/*"
            action="/fileapi/upload/image"
            listType="picture-card"
            fileList={fileList}
            multiple={limit > 1}
            beforeUpload={this.beforeUpload}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            onRemove={this.handleRemove}
            ref={node => {
              this.uploader = node;
            }}
          >
            {fileList.length >= limit ? null : uploadButton}
          </Upload>
          <Modal
            zIndex={10000}
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="preview" style={{ width: '100%' }} src={previewImage} />
          </Modal>

          {this.state.isuploading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,21,41, 0.3)'
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
        {meta.touched &&
          meta.error && <div className="error">{meta.error}</div>}
        {this.state.error && <div className="error">{this.state.error}</div>}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ImagesUpload);

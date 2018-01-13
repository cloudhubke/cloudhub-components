import React, { Component } from 'react';
import { Upload } from 'antd';
import { Button, withStyles } from 'material-ui';
import { ArrowUpward as UploadIcon } from 'material-ui-icons';

import 'antd/lib/upload/style/index.css';

const styles = () => ({
  fileList: {
    '& span': {
      display: 'flex',
      flexDirection: 'column',
    },
    '& .ant-upload-list': {
      display: 'flex',
      flexDirection: 'column',
    },
    '& .ant-upload-list-item': {
      border: '1px solid #DDDDDD',
      fontSize: 16,
      borderRadius: 3,
      height: 'auto',
    },
    '& .ant-upload-list-item-info span': {
      display: 'flex',
      flexDirection: 'row',
      padding: '5px 5px 5px 5px',
    },
    '& .anticon.anticon-paper-clip': {
      fontSize: 22,
      position: 'relative',
    },
    '& .ant-upload-list-item .anticon-cross': {
      display: 'flex',
      fontSize: 22,
      right: 4,
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      bottom: 0,
    },
  },
});

class FilesUpload extends Component {
  static defaultProps = {
    preferredCountries: ['ke'],
    defaultCountry: 'ke',
    value: '',
    limit: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      isMounted: true,
      fileList: [],
    };
  }

  componentWillMount() {
    if (this.props.input.value) {
      this.setState({
        fileList: this.props.input.value.map((item, index) => ({
          ...item,
          uid: item.uid || index,
          name: item.name || 'xxx.png',
          status: 'done',
          url: item.url || '',
        })),
      });
    }
  }

  handleChange = ({ fileList }) => {
    const files = fileList.map((item, index) => {
      if (item.response) {
        return { ...item.response[0], uid: index, status: 'done' };
      }
      return item;
    });

    this.setState({ fileList: files });
    this.props.input.onChange(files);
  };

  handleRemove = file => {
    const ind = this.state.fileList.findIndex(item => item.url === file.url);
    const filelist = [...this.state.fileList];
    filelist.splice(ind, 1);

    this.setState({ fileList: filelist });
    this.props.input.onChange(filelist);
  };

  render() {
    const { fileList } = this.state;
    const { limit, classes } = this.props;

    console.log('CLASSES', classes);

    const { meta } = this.props;
    const uploadButton = (
      <Button raised>
        <UploadIcon /> upload
      </Button>
    );
    return (
      <div className={classes.fileList}>
        <Upload
          action="/fileapi/upload/file"
          listType="text"
          fileList={fileList}
          multiple={limit > 1}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {fileList.length >= limit ? null : uploadButton}
        </Upload>
        {meta.touched &&
          meta.error && <div className="error">{meta.error}</div>}
      </div>
    );
  }
}

export default withStyles(styles)(FilesUpload);

import React, { Component } from 'react';
import Upload from 'antd/lib/upload';
import List from 'antd/lib/list';
import Icon from 'antd/lib/icon';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import { withStyles } from '@mui/styles';
import Button from '../Button';
import Input from '../Input';

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
  listItem: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 5,
  },
});

class FilesUpload extends Component {
  static defaultProps = {
    value: '',
    limit: 1,
    url: '/fileapi/upload/file',
    input: {
      value: {},
      onChange: () => {},
    },
    onChange: () => {},
    onRemove: () => {},
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isMounted: true,
      fileList: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.input.value) {
      if (Array.isArray(nextProps.input.value)) {
        return {
          ...prevState,
          fileList: nextProps.input.value.map((item, index) => ({
            ...item,
            uid: item.uid || index,
            name: item.name || 'xxx.png',
            status: 'done',
            url: item.url || '',
          })),
        };
      }
      return {
        ...prevState,
        fileList: [nextProps.input.value].map((item, index) => ({
          ...item,
          uid: item.uid || index,
          name: item.name || item.filename || 'xxx.png',
          status: 'done',
          url: item.url || item.fd || '',
        })),
      };
    }
    return { ...prevState };
  }

  removeUnUploadedFiles() {
    const { fileList } = this.state;
    const newfilelist = fileList.filter((i) => i.Location !== undefined);

    setTimeout(() => {
      this.setState({ fileList: newfilelist });
    }, 100);
  }

  handleChange = ({ file, fileList }) => {
    const files = fileList.map((item, index) => {
      if (item.response) {
        const fl = item.response[0] || {};
        return {
          ...fl,
          uid:
            (fl.fd || '').replace('files', '').replace(/\//g, '') ||
            new Date().getTime(),
          status: 'done',
        };
      }
      return item;
    });

    if (files.length > 0) {
      if (this.props.limit === 1) {
        this.setState({ fileList: [files[0]] }, () => {
          this.props.input.onChange(files[0]);
        });
      } else {
        this.setState({ fileList: [...files] }, () => {
          this.props.input.onChange(files);
        });
      }
    }
  };

  handleRemove = (file) => {
    const ind = this.state.fileList.findIndex((item) => item.url === file.url);
    const filelist = [...this.state.fileList];
    filelist.splice(ind, 1);

    this.setState({ fileList: filelist });
    this.props.input.onChange(filelist);
    this.props.onRemove(file);
  };

  changeItemName = ({ FileName, index }) => {
    const { fileList } = this.state;

    const newfilelist = fileList.map((item, i) => {
      if (index === i) {
        return { ...item, FileName };
      }
      return item;
    });
    this.props.input.onChange(newfilelist);
    this.setState({ fileList: newfilelist });
  };

  render() {
    const { fileList } = this.state;
    const { limit, classes, url } = this.props;

    const { meta } = this.props;
    const uploadButton = (
      <Button style={{ height: 65, marginBottom: 10 }}>
        <Icon type="upload" /> upload
      </Button>
    );

    return (
      <div className={classes.fileList}>
        <Upload
          action={url}
          listType="text"
          fileList={fileList}
          showUploadList={false}
          multiple={limit > 1}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          beforeUpload={(file, fileList) => {
            const fullfilelist = [...this.state.fileList, ...fileList];
            if (fullfilelist.length > limit) {
              this.setState({
                uploaderror: `Files could not be uploaded. Limit of ${limit} exceeded`,
              });
              this.removeUnUploadedFiles();
              return false;
            }
            return true;
          }}
          disabled={this.props.disabled}
        >
          {fileList.length >= limit ? null : uploadButton}
        </Upload>
        <List
          size="large"
          header={<p style={{ fontWeight: 'bold' }}>Files</p>}
          bordered
          dataSource={fileList}
          renderItem={(item, index) => (
            <List.Item>
              <div className={classes.listItem}>
                <Icon type="paper-clip" />
                <p style={{ fontWeight: 'bold', marginLeft: 20 }}>
                  {index + 1}.
                </p>
                <p style={{ fontWeight: 'bold', marginLeft: 20, flex: 1 }}>
                  <Input
                    defaultValue={item.FileName || item.name}
                    onChange={(e) =>
                      this.changeItemName({ FileName: e.target.value, index })
                    }
                  />
                </p>

                {item.percent ? (
                  <CircularProgress />
                ) : (
                  <IconButton
                    className={classes.iconButton}
                    onClick={() => this.handleRemove(item)}
                  >
                    <Close />
                  </IconButton>
                )}
              </div>
            </List.Item>
          )}
        />
        {meta.touched && meta.error && (
          <div className="error">{meta.error || this.state.uploaderror}</div>
        )}
        {this.state.uploaderror && (
          <div className="error">{this.state.uploaderror}</div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(FilesUpload);

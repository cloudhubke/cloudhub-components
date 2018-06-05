import React, { Component } from 'react';
import { Upload, List, Icon, Progress, Input } from 'antd';
import { Button, withStyles, IconButton } from '@material-ui/core';
import { ArrowUpward as UploadIcon, Close } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

const styles = () => ({
  fileList: {
    '& span': {
      display: 'flex',
      flexDirection: 'column'
    },
    '& .ant-upload-list': {
      display: 'flex',
      flexDirection: 'column'
    },
    '& .ant-upload-list-item': {
      border: '1px solid #DDDDDD',
      fontSize: 16,
      borderRadius: 3,
      height: 'auto'
    },
    '& .ant-upload-list-item-info span': {
      display: 'flex',
      flexDirection: 'row',
      padding: '5px 5px 5px 5px'
    },
    '& .anticon.anticon-paper-clip': {
      fontSize: 22,
      position: 'relative'
    },
    '& .ant-upload-list-item .anticon-cross': {
      display: 'flex',
      fontSize: 22,
      right: 4,
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      bottom: 0
    }
  },
  listItem: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconButton: {
    border: 0,
    height: 'auto',
    width: 'auto',
    padding: '2px'
  }
});

class FilesUpload extends Component {
  static defaultProps = {
    preferredCountries: ['ke'],
    defaultCountry: 'ke',
    value: '',
    limit: 1,
    url: '/fileapi/upload/file'
  };

  constructor(props) {
    super(props);
    this.state = {
      isMounted: true,
      fileList: []
    };
  }

  componentWillMount() {
    if (this.props.input.value) {
      if (Array.isArray(this.props.input.value)) {
        this.setState({
          fileList: this.props.input.value.map((item, index) => ({
            ...item,
            uid: item.uid || index,
            name: item.name || 'xxx.png',
            status: 'done',
            url: item.url || ''
          }))
        });
      } else {
        this.setState({
          fileList: [this.props.input.value].map((item, index) => ({
            ...item,
            uid: item.uid || index,
            name: item.name || item.filename || 'xxx.png',
            status: 'done',
            url: item.url || item.fd || ''
          }))
        });
      }
    }
  }

  componentWillReceiveProps = nextProps => {
    // console.log('NXT', nextProps.input.value);
  };

  removeUnUploadedFiles() {
    const { fileList } = this.state;
    const newfilelist = fileList.filter(i => i.Location !== undefined);

    setTimeout(() => {
      this.setState({ fileList: newfilelist });
    }, 100);
  }
  handleChange = ({ fileList }) => {
    const files = fileList.map((item, index) => {
      if (item.response) {
        return { ...item.response[0], uid: index, status: 'done' };
      }
      return item;
    });

    if (this.props.limit === 1) {
      this.setState({ fileList: [...files[0]] });
      this.props.input.onChange(files[0]);
    } else {
      this.setState({ fileList: [...files] });
      this.props.input.onChange(files);
    }
  };

  handleRemove = file => {
    const ind = this.state.fileList.findIndex(item => item.url === file.url);
    const filelist = [...this.state.fileList];
    filelist.splice(ind, 1);

    this.setState({ fileList: filelist });
    this.props.input.onChange(filelist);
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
      <Button variant="raised">
        <UploadIcon /> upload
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
                uploaderror:
                  'Files could not be uploaded. Limit of ' + limit + ' exceeded'
              });
              this.removeUnUploadedFiles();
              return false;
            }
            return true;
          }}
        >
          {fileList.length >= limit ? null : uploadButton}
        </Upload>
        <List
          size="large"
          header={<Typography variant="title">Files</Typography>}
          bordered
          dataSource={fileList}
          renderItem={(item, index) => (
            <List.Item>
              <div className={classes.listItem}>
                <Icon type="paper-clip" />
                <Typography variant="body1" style={{ marginLeft: 20 }}>
                  {index + 1}.
                </Typography>
                <Typography variant="body1" style={{ flex: 1, marginLeft: 5 }}>
                  <Input
                    defaultValue={item.FileName || item.name}
                    onChange={e =>
                      this.changeItemName({ FileName: e.target.value, index })
                    }
                  />
                </Typography>

                {item.percent && (
                  <Progress
                    type="circle"
                    percent={Number(item.percent)}
                    width={60}
                  />
                )}

                <IconButton
                  classes={{ root: classes.iconButton }}
                  onClick={() => this.handleRemove(item)}
                >
                  <Close />
                </IconButton>
              </div>
            </List.Item>
          )}
        />
        {meta.touched &&
          meta.error && (
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

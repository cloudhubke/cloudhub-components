import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import 'antd/lib/table/style/index.css';
import { Table } from 'antd';

import { IconButton } from 'material-ui';
import {
  CheckBox as YesIcon,
  CheckBoxOutlineBlank as NoIcon,
} from 'material-ui-icons';
import { grey, green } from 'material-ui/colors';

import permissions from './permissions.json';

// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const renderContent = (value, row, index) => {
  const obj = {
    children: `${value}`,
    props: {},
  };
  return obj;
};

const styles = theme => ({
  yesicon: {
    margin: theme.spacing.unit,
    color: green[500],
    width: 36,
    height: 36,
    '&:hover': {
      fill: green[700],
    },
  },
  noicon: {
    fill: grey[500],
    width: 36,
    height: 36,
    '&:hover': {
      fill: green[500],
    },
  },
});

const initialData = () => permissions.map(item => ({
  key: item.toLowerCase(),
  modulename: item,
  permissions: {
    R: false,
    RW: false,
    RWD: false,
  },
}));

export class UserRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initialData(),
      columns: [
        {
          title: 'Module Name',
          dataIndex: 'modulename',
          render: renderContent,
        },
        {
          title: 'Permissions',
          children: [
            {
              title: 'Read',
              dataIndex: 'permissions.R',
              render: (text, row, index) =>
                this.renderPermission({ text, row, index, permission: 'R' }),
              width: 150,
            },
            {
              title: 'Read Write',
              dataIndex: 'permissions.RW',
              render: (text, row, index) =>
                this.renderPermission({ text, row, index, permission: 'RW' }),
              width: 150,
            },
            {
              title: 'Read Write Delete',
              dataIndex: 'permissions.RWD',
              render: (text, row, index) =>
                this.renderPermission({ text, row, index, permission: 'RWD' }),
              width: 150,
            },
          ],
        },
      ],
    };
  }

  changeVal = ({ row, text, permission }) => {
    const ind = this.state.data.findIndex(item => item.key === row.key);
    const perms = this.state.data || [];
    if (ind !== -1) {
      perms[ind] = {
        ...row,
        permissions: { ...row.permissions, [permission]: text },
      };
      this.props.input.onChange(perms);
      this.setState({ data: perms });
    }
  };

  componentDidMount() {
    this.setPermissions();
  }
  //
  // componentWillReceiveProps(nextProps){
  //     if(nextProps.input.value!==this.props.input.value){
  //         this.setPermissions();
  //     }
  // }

  setPermissions = () => {
    const perms = this.props.input.value || [];
    const permissions = this.state.data.map(perm => {
      const ind = perms.findIndex(item => item.key === perm.key);
      if (ind !== -1) {
        const p = perms[ind].permissions || {};
        return { ...perm, permissions: { ...perm.permissions, ...p } };
      }
      return perm;
    });
    this.setState({ data: permissions });
  };

  renderPermission = ({ row, text, permission }) => {
    const { classes } = this.props;
    const renderIcon = () => {
      if (text === true) {
        return (
          <YesIcon
            classes={{
              root: classes.yesicon,
            }}
          />
        );
      }
      return (
        <NoIcon
          classes={{
            root: classes.noicon,
          }}
        />
      );
    };
    return {
      children: (
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <IconButton
            aria-label="Delete"
            color="primary"
            onClick={() => this.changeVal({ text: !text, row, permission })}
          >
            {renderIcon()}
          </IconButton>
        </div>
      ),
      props: {},
    };
  };

  render() {
    const { meta } = this.props;
    return (
      <div>
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          bordered
        />
        {meta.touched &&
          meta.error && <span className="error">{meta.error}</span>}
      </div>
    );
  }
}

export default withStyles(styles)(UserRoles);

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import AddIcon from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';
import RefreshIcon from '@material-ui/icons/Cached';
import Input from 'antd/lib/input';
import _ from 'lodash';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 20px 10px 20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexBasis: '50%',
    marginLeft: 10
  },
  buttonStyle: {
    fontWeight: 500,
    textTransform: 'capitalize',
    fontSize: 12
  }
};

class TableHeaderBar extends Component {
  static defaultProps = {
    title: '',
    onAdd: () => {},
    onRefresh: () => {},
    onSearchChange: () => {},
    onPrint: () => {},
    permissions: {
      allowadd: false,
      allowedit: false,
      allowdelete: false,
      allowprint: false
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.onSearch = _.debounce(this.onSearch, 500);
  }

  onSearch = text => {
    this.props.onSearchChange(text);
  };

  render() {
    const { classes, allowprint, allowadd } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="h6" gutterBottom>
          {this.props.title}
        </Typography>
        <div className={classes.inputs}>
          <Input
            style={{ flex: 1, minWidth: 200 }}
            icon="search"
            placeholder="Search..."
            onChange={e => this.onSearch(e.target.value)}
          />
          <Button
            onClick={this.props.onAdd}
            style={styles.buttonStyle}
            disabled={!allowadd}
          >
            <AddIcon /> Add
          </Button>
          <Button onClick={this.props.onRefresh} style={styles.buttonStyle}>
            <RefreshIcon /> Refresh
          </Button>
          <Button
            onClick={this.props.onPrint}
            style={styles.buttonStyle}
            disabled={!allowprint}
          >
            <PrintIcon /> Print
          </Button>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(TableHeaderBar);

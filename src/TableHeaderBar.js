import React, { Component } from 'react';
import { Paper, withStyles, Typography, Button } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import PrintIcon from 'material-ui-icons/Print';
import RefreshIcon from 'material-ui-icons/Cached';
import { Input } from 'antd';
import _ from 'lodash';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexBasis: '50%',
  },
};

class TableHeaderBar extends Component {
  static defaultProps = {
    title: '',
    onAdd: () => {},
    onRefresh: () => {},
    onSearchChange: () => {},
    onPrint: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };

    this.onSearch = _.debounce(this.onSearch, 500);
  }

  onSearch = text => {
    this.props.onSearchChange(text);
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <div>
          <Typography type="title" gutterBottom>
            {this.props.title}
          </Typography>
        </div>
        <div className={classes.inputs}>
          <Input
            style={{ flex: 1 }}
            icon="search"
            placeholder="Search..."
            onChange={e => this.onSearch(e.target.value)}
          />
          <Button onClick={this.props.onAdd}>
            <AddIcon /> Add{' '}
          </Button>
          <Button onClick={this.props.onRefresh}>
            <RefreshIcon /> Refresh{' '}
          </Button>
          <Button onClick={this.props.onPrint}>
            <PrintIcon /> Print{' '}
          </Button>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(TableHeaderBar);

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
    onPrint: () => {}
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
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography type="title" gutterBottom>
          {this.props.title}
        </Typography>
        <div className={classes.inputs}>
          <Input
            style={{ flex: 1, minWidth: 200 }}
            icon="search"
            placeholder="Search..."
            onChange={e => this.onSearch(e.target.value)}
          />
          <Button onClick={this.props.onAdd} style={styles.buttonStyle}>
            <AddIcon /> Add{' '}
          </Button>
          <Button onClick={this.props.onRefresh} style={styles.buttonStyle}>
            <RefreshIcon /> Refresh{' '}
          </Button>
          <Button onClick={this.props.onPrint} style={styles.buttonStyle}>
            <PrintIcon /> Print{' '}
          </Button>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(TableHeaderBar);

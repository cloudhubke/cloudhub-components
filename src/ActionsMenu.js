import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class MenuListComposition extends Component {
  static defaultProps = {
    anchorComponent: null,
  };
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div>
        <div
          ref={node => {
            this.anchorEl = node;
          }}
        >
          {this.props.anchorComponent || (
            <IconButton
              aria-label="Actions"
              aria-owns={open ? 'long-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          )}
        </div>

        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          placement="bottom"
          disablePortal={false}
          modifiers={{
            flip: {
              enabled: true,
            },
            preventOverflow: {
              enabled: false,
              boundariesElement: 'scrollParent',
            },
          }}
          className={classes.actionsMenu}
        >
          <Paper>
            <ClickAwayListener onClickAway={this.handleClose}>
              {this.props.children}
            </ClickAwayListener>
          </Paper>
        </Popper>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    position: 'relative',
    zIndex: 0,
    backgroundColor: 'yellow',
  },
  actionsMenu: {
    zIndex: 1,
  },
});

export default withStyles(styles)(MenuListComposition);

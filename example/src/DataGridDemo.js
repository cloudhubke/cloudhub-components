import React, { Component } from 'react';
import { withStyles } from 'material-ui';
const styles = () => ({
  root: {
    display: 'flex'
  },
  leftSide: {
    flexBasis: '50%'
  }
});
class ContactForm extends Component {
  onSendForm = () => {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.leftside} />
        <div className={classes.leftside}>Right</div>
      </div>
    );
  }
}
export default withStyles(styles)(ContactForm);

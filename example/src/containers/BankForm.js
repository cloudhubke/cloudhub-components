import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Input } from 'antd';
import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from 'material-ui';
import { addBank } from '../store/actions';

const styles = () => ({
  twoFields: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'stretch'
  },
  fieldItem: {
    flex: 1,
    marginTop: 5,
    paddingRight: 10
  },
  editDialog: {
    minWidth: '800px',
    height: '600px'
  },
  inputField: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
});

const TabContainer = props => props.children;

class BankForm extends Component {
  state = {
    value: 0
  };
  handleFormSubmit = values => this.props.addBank(values);

  renderField = field => {
    const { classes } = this.props;
    return (
      <div className={classes.inputField}>
        <Input {...field.input} type={field.type} />
        {field.meta.touched &&
          field.meta.error && <span className="error">{field.meta.error}</span>}
      </div>
    );
  };
  render() {
    const { classes, editingRow, handleSubmit } = this.props;
    return (
      <Dialog
        open={editingRow !== null}
        onClose={this.cancelDelete}
        classes={{ paper: classes.editDialog }}
      >
        <DialogTitle>{this.props.editTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div className={classes.fieldItem}>
              <label>Bank Code</label>
              <Field type="text" name="BankCode" component={this.renderField} />
            </div>
            <div className={classes.fieldItem}>
              <label>Bank Name</label>
              <Field type="text" name="BankName" component={this.renderField} />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button raised onClick={this.props.onCancelEdit} color="primary">
            Cancel
          </Button>
          <Button
            raised
            onClick={handleSubmit(this.handleFormSubmit)}
            color="accent"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.BankCode) {
    errors.BankCode = 'Required';
  }
  if (!values.BankName) {
    errors.BankName = 'Required';
  }
  return errors;
};

// const mapStateToProps = ({ bank }) => ({
//   banks: bank.banks,
// });

export default reduxForm({
  form: 'bankForm',
  validate
})(connect(null, { addBank })(withStyles(styles)(BankForm)));

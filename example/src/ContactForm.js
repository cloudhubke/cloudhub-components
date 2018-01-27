import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PhoneInput from 'cloudhub-react-components/dist/PhoneInput';
import CheckBox from 'cloudhub-react-components/dist/CheckBox';
import SimpleQuill from 'cloudhub-react-components/dist/SimpleQuill';

const ContactForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} style={{ width: 500, margin: 50 }}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <div>
        <label>Phone</label>
        <Field type="text" name="Phone" component={PhoneInput} />
      </div>
      <div>
        <label>Text Field</label>
        <Field type="text" name="Phone" component={SimpleQuill} />
      </div>
      <div>
        <label>Text Field</label>
        <Field type="text" name="Phone" component={CheckBox} />
      </div>
      <div>
        <label>Text Field</label>
        <Field type="text" name="Phone" component={SimpleQuill} />
      </div>
      <div>
        <label>Text Field</label>
        <Field type="text" name="Phone" component={SimpleQuill} />
      </div>
      <div>
        <label>Text Field</label>
        <Field type="text" name="Phone" component={SimpleQuill} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm);

import React from 'react';
import { Form } from 'react-final-form';

const createDecorator = (callback) => (form) => {
  const unsubscribe = form.subscribe(
    ({ values }) => {
      callback(values);
    },
    { values: true }
  );
  return unsubscribe;
};

const FormFields = ({ input, value, onChange, onSubmit, render }) => {
  const [values, setValues] = React.useState(input.value || value);
  const strValues = JSON.stringify(values);

  const listener = React.useRef(
    createDecorator((values) => {
      setValues(values);
    })
  );

  React.useEffect(() => {
    if (input.onChange && typeof input.onChange === 'function') {
      input.onChange(values);
      input.onBlur();
    }
    if (typeof onChange === 'function') {
      onChange(values);
    }
  }, [strValues]);

  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        decorators={[listener.current]}
        initialValues={input.value || value}
        render={render}
      />
    </React.Fragment>
  );
};

FormFields.defaultProps = {
  input: {
    onChange: () => {},
    onBlur: () => {},
    value: {},
  },
  onSubmit: () => {},
};

export default FormFields;

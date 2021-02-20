import React from 'react';
import { Form as FinalForm } from 'react-final-form';

const FormComponent = ({ handleSubmit, Render, ...props }) => {
  return (
    <form
      onSubmit={() => {
        console.log('====================================');
        console.log('ENTER');
        console.log('====================================');
        handleSubmit();
      }}
    >
      {Render({ ...props, handleSubmit })}
    </form>
  );
};

const Form = ({ render, ...props }) => {
  return <FinalForm component={FormComponent} Render={render} {...props} />;
};

export default Form;

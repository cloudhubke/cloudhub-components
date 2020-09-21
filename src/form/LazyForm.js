import React from 'react';
import { Form } from 'react-final-form';

const LazyForm = (props) => {
  const lazySubmit = (values) => {};
  return <Form onSubmit={lazySubmit}>{}</Form>;
};

export default LazyForm;

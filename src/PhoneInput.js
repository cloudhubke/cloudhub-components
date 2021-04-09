import React from 'react';
import Loadable from '@react-loadable/revised';

const PhoneInputComponent = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "PhoneInputComponent" */ './PhoneInputComponent'
    ),
  loading: () => <div>loading...</div>,
});

const PhoneInput = (props) => {
  return <PhoneInputComponent {...props} />;
};

export default PhoneInput;

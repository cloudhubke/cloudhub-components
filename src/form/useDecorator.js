import React from 'react';

const useDecorator = (createDecorator) => {
  const [values, setValues] = React.useState(values);

  const savedDecorator = React.useRef(createDecorator);

  React.useEffect(() => {
    savedDecorator.current = createDecorator();
  }, [createDecorator]);

  const savedHandler = React.useRef(() => (form) => {
    const unsubscribe = form.subscribe(
      ({ values }) => {
        setValues(values);
      },
      { values: true }
    );

    return unsubscribe;
  });

  return {
    decorator: savedDecorator.current(),
    values,
  };
};

export default useDecorator;

import React from 'react';
import { Card, CardHeader, Box, CardContent } from '@material-ui/core';
import DEditor from './deditor';
import Block from '../Block';

const Container = ({ children, container }) => {
  if (container === 'block') {
    return <Box>{children}</Box>;
  }

  return <Card style={{ overflow: 'visible' }}>{children}</Card>;
};

const DraftEditor = ({ label = '', input, container = 'card', ...props }) => {
  const [] = React.useState(0);

  return (
    <Container container={container}>
      {label && <CardHeader title={label} />}
      <CardContent>
        <DEditor {...input} {...props} />
      </CardContent>
    </Container>
  );
};

DraftEditor.defaultProps = {
  input: {
    onChange: () => null,
    value: '',
  },
};

export default DraftEditor;

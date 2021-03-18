import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import DEditor from './deditor';

const DraftEditor = ({ label = '', input, ...props }) => {
  const [] = React.useState(0);

  return (
    <Card style={{ overflow: 'visible' }}>
      {label && <CardHeader title={label} />}
      <CardContent>
        <DEditor {...input} {...props} />
      </CardContent>
    </Card>
  );
};

DraftEditor.defaultProps = {
  input: {
    onChange: () => null,
    value: '',
  },
};

export default DraftEditor;

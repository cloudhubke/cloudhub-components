import React from 'react';
import AntAlert from 'cloudhub-react-components/dist/ant/Alert';
import { sizes } from 'theme';
import Block from './Block';

const Alert = props => (
  <Block margin={sizes.margin}>
    <AntAlert {...props} />
  </Block>
);

export default Alert;

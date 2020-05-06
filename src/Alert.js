import React from 'react';
import AntAlert from './ant/Alert';
import { sizes } from './theme';
import Block from './Block';

const Alert = (props) => (
  <Block margin={sizes.margin} flex={props.flex}>
    <AntAlert {...props} />
  </Block>
);

export default Alert;

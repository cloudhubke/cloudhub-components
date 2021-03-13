import React from 'react';
import AntAlert from './AntAlert';
import Block from '../Block';
import ThemeContext from '../theme/ThemeContext';

const Alert = (props) => {
  const { sizes } = React.useContext(ThemeContext);

  return (
    <Block margin={sizes.margin} flex={props.flex}>
      <AntAlert {...props} />
    </Block>
  );
};

export default Alert;

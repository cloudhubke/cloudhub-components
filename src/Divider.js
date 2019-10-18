import React from 'react';
import { Block } from 'components';
import { sizes, colors } from 'theme';

const Divider = ({ children, height, ...props }) =>
  (children ? (
    <Block flex={false} row middle>
      <Block style={{ height, marginRight: sizes.margin }} {...props} />
      <Block flex={false}>{children}</Block>
      <Block style={{ height, marginLeft: sizes.margin }} {...props} />
    </Block>
  ) : (
    <Block flex={false} style={{ height }} {...props} />
  ));

Divider.defaultProps = {
  color: colors.gray,
  height: 1,
};

export default Divider;

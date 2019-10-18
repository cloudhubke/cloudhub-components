import React from 'react';
import Block from '../Block';

import { sizes } from '../theme';

const DialogContent = ({ children, dialog, style, ...props }) => {
  const dialogStyles = { ...style };

  return (
    <Block
      margin={[sizes.margin, sizes.margin, 0, sizes.margin]}
      style={{ postion: 'relative', ...dialogStyles }}
    >
      {dialog ? (
        <Block
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
          {...props}
        >
          <Block flex={false}>{children}</Block>
        </Block>
      ) : (
        <Block flex={false}>{children}</Block>
      )}
    </Block>
  );
};
DialogContent.defaultProps = {
  dialog: true,
};

export default DialogContent;

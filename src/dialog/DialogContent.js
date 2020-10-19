import React from 'react';
import Block from '../Block';

import ThemeContext from '../theme/ThemeContext';

const DialogContent = ({ children, dialog, style, ...props }) => {
  const { sizes } = React.useContext(ThemeContext);
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
          {children}
        </Block>
      ) : (
        { children }
      )}
    </Block>
  );
};
DialogContent.defaultProps = {
  dialog: true,
};

export default DialogContent;

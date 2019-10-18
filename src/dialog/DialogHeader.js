import React from 'react';
import { Block, IconButton } from 'components';
import Close from '@material-ui/icons/Close';

import { sizes } from 'theme';

const DialogHeader = ({
  children,
  height,
  showCancel,
  onClose,
  cancelButtonProps,
  iconProps,
  ...props
}) => (
  <Block
    middle
    flex={false}
    style={{ height }}
    padding={[0, sizes.margin]}
    row
    {...props}
  >
    <Block>{children}</Block>
    {showCancel && (
      <Block flex={false}>
        <IconButton
          style={{ marginRight: -sizes.margin }}
          onClick={onClose}
          {...cancelButtonProps}
        >
          <Close {...iconProps} />
        </IconButton>
      </Block>
    )}
  </Block>
);

DialogHeader.defaultProps = {
  height: 45,
  showCancel: true,
  onClose: () => {},
  cancelButtonProps: {},
  iconProps: {},
};

export default DialogHeader;

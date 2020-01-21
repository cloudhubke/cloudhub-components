import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Block from './Block';
import IconButton from './IconButton';

const ActionsMenu = ({
  children,
  placement = 'bottom',
  isOpen = false,
  onClose = () => null,
  onOpen = () => null,
  anchorComponent
}) => {
  const anchorEl = React.useRef();
  let anchorcomp;
  const [open, setOpen] = React.useState(isOpen);

  React.useEffect(() => {
    setTimeout(() => {
      setOpen(isOpen);
    });
  }, [isOpen]);

  React.useEffect(() => {
    if (!open) {
      onClose();
    } else {
      onOpen();
    }
  }, [open]);

  if (anchorComponent) {
    anchorcomp = React.cloneElement(anchorComponent, {
      ...anchorComponent.props,
      onClick: () => setOpen(!open)
    });
  }

  return (
    <Block flex={false} row>
      <div ref={anchorEl}>
        {anchorcomp || (
          <IconButton
            aria-label="Actions"
            aria-owns={open ? 'long-menu' : undefined}
            aria-haspopup="true"
            onClick={() => setOpen(true)}
          >
            <MoreVertIcon />
          </IconButton>
        )}
      </div>

      <Popper
        open={open}
        anchorEl={anchorEl.current}
        transition
        placement={placement}
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: true
          },
          preventOverflow: {
            enabled: false,
            boundariesElement: 'scrollParent'
          }
        }}
        style={{ zIndex: 99 }}
      >
        <Paper>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Block flex={false}>{children}</Block>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </Block>
  );
};

export default ActionsMenu;

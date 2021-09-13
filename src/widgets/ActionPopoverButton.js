import React, { useState } from 'react';
import clsx from 'clsx';
import { Popover, CardActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Scrollbars from '../Scrollbars';
import Text from '../Text';
import CardToolbar from './CardToolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTimelineItem-missingOppositeContent:before': {
      display: 'none',
    },
    margin: theme.sizes.margin,
  },
  actionsComponent: {
    padding: theme.sizes.padding,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  contentArea: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.sizes.padding,
  },
}));

const ActionPopoverButton = React.forwardRef(
  (
    {
      anchorComponent: AnchorComponent,
      actionsComponent,
      headerComponent,
      children,
      actionButtons = [],
      size = 'md',
      width = 'xl',
      className,
      ...props
    },
    ref
  ) => {
    const classes = useStyles();
    const anchorRef = React.useRef();
    const [anchorEl, setAnchorEl] = useState(null);

    //   function openUserMenu(event) {
    //     console.log('====================================');
    //     console.log(event);
    //     console.log('====================================');
    //     setAnchorEl(event.currentTarget);
    //   }
    function handleClose() {
      setAnchorEl(null);
    }

    const onMenuKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (handleClose) {
          handleClose(event, 'escapeKeyDown');
        }
      }
    };

    const Anchor = () => {
      if (!AnchorComponent) {
        return null;
      }
      if (typeof AnchorComponent === 'function') {
        return AnchorComponent();
      }

      return React.cloneElement(AnchorComponent, {
        ...AnchorComponent.props,
        onClick: () => {
          setAnchorEl(anchorRef.current);
        },
      });
    };

    React.useImperativeHandle(ref, () => ({
      close: () => setAnchorEl(null),
    }));

    return (
      <>
        <div ref={anchorRef}>
          <Anchor />
        </div>
        <Popover
          anchorEl={anchorEl}
          keepMounted
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          {...props}
        >
          <div className={`size-${width}`}>
            <CardToolbar>
              {typeof headerComponent === 'string' ? (
                <Text header>{headerComponent}</Text>
              ) : (
                headerComponent
              )}
            </CardToolbar>

            <Scrollbars
              className={clsx(`scroll-area-${size}`, classes.contentArea)}
            >
              {children}
            </Scrollbars>

            <div className={classes.actionsComponent}>{actionsComponent}</div>
          </div>
        </Popover>
      </>
    );
  }
);

export default ActionPopoverButton;

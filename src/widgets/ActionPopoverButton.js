import React, { useState } from 'react';
import clsx from 'clsx';
import { Popover, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Scrollbars from '../components/Scrollbars';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
    height: '100%',
    padding: theme.sizes.padding,
    flex: 1,
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
            <CardToolbar>{headerComponent}</CardToolbar>

            <div className={clsx(`scroll-area-${size}`)}>
              <PerfectScrollbar className={classes.contentArea}>
                {children}
              </PerfectScrollbar>
            </div>

            <div className={classes.actionsComponent}>{actionsComponent}</div>
          </div>
        </Popover>
      </>
    );
  }
);

export default ActionPopoverButton;

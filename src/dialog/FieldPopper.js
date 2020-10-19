import React, { useState } from 'react';

import MuiPopper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

import { ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRect } from '@reach/rect';
import Block from '../Block';
import TextInput from '../TextInput';
import colors from '../theme/Colors';

const getStyles = ({ color, rect = {}, popperStyle, style }) => {
  const useStyles = makeStyles({
    paper: {
      overflowY: 'hidden',
      marginTop: -rect.height || 0,
      maxWidth: rect.width,
      padding: 0,
      ...style,
    },

    popper: {
      zIndex: 1,
      ...popperStyle,
      '&[x-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: '-0.9em',
        width: '3em',
        height: '1em',
        '&::before': {
          borderWidth: '0 1em 1em 1em',
          borderColor: `transparent transparent ${color} transparent`,
        },
      },
      '&[x-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: '-0.9em',
        width: '3em',
        height: '1em',
        '&::before': {
          borderWidth: '1em 1em 0 1em',
          borderColor: `${color} transparent transparent transparent`,
        },
      },
      '&[x-placement*="right"] $arrow': {
        left: 0,
        marginLeft: '-0.9em',
        height: '3em',
        width: '1em',
        '&::before': {
          borderWidth: '1em 1em 1em 0',
          borderColor: `transparent ${color} transparent transparent`,
        },
      },
      '&[x-placement*="left"] $arrow': {
        right: 0,
        marginRight: '-0.9em',
        height: '3em',
        width: '1em',
        '&::before': {
          borderWidth: '1em 0 1em 1em',
          borderColor: `transparent transparent transparent ${color}`,
        },
      },
    },
    arrow: {
      position: 'absolute',
      fontSize: 7,
      width: '3em',
      height: '3em',
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      },
    },
  });
  return { useStyles };
};

const FieldPopper = ({
  arrow,
  placement,
  disableportal,
  flip,
  preventOverflow,
  open,
  color,
  children,
  anchorComponent,
  disableClickAwayClose,
  style,
  paperStyle,
  transitionComponent: TransitionComponent,
  searchInputComponent: TextInput,
  transitionDelay = 500,
  onOpen,
  onClose,
  ...rest
}) => {
  const anchorRef = React.useRef();
  const rect = useRect(anchorRef) || {};

  const [popperopen, setPopperOpen] = React.useState(open);

  const classes = getStyles({ color, rect: rect || {}, style }).useStyles();

  const closePopper = () => {
    setPopperOpen(false);
    onClose();
  };

  const openPopper = () => {
    setPopperOpen(true);
    onOpen();
  };

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({ closePopper });
    }

    return React.cloneElement(children, {
      closePopper,
      ...children.props,
    });
  };

  const paperstyles = {
    ...(color ? { backgroundColor: color } : {}),
    minWidth: rect.width || 0,
    minHeight: 200,
    overflowY: 'hidden',
    ...paperStyle,
  };

  const [arrowRef, setArrowRef] = useState(null);
  const id = open ? 'scroll-playground' : null;

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (popperopen) {
          closePopper();
        }
      }}
    >
      <Block>
        <span
          ref={anchorRef}
          {...rest}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <TextInput onFocus={openPopper} />
        </span>
        <MuiPopper
          id={id}
          open={popperopen}
          anchorEl={anchorRef.current}
          placement={placement}
          disablePortal
          className={classes.popper}
          modifiers={{
            flip: {
              enabled: flip,
            },
            arrow: {
              enabled: arrow,
              element: arrowRef,
            },

            preventOverflow: {
              enabled: preventOverflow !== 'disabled',
              boundariesElement:
                preventOverflow === 'disabled'
                  ? 'scrollParent'
                  : preventOverflow,
            },
            hide: {
              enabled: false,
            },
          }}
          transition
          elevation={5}
        >
          {({ TransitionProps }) => (
            <TransitionComponent {...TransitionProps} timeout={transitionDelay}>
              <div>
                {arrow ? (
                  <div
                    className={classes.arrow}
                    ref={(node) => setArrowRef(node)}
                  />
                ) : null}
                <Paper className={classes.paper} style={paperstyles}>
                  {renderChildren()}
                </Paper>
              </div>
            </TransitionComponent>
          )}
        </MuiPopper>
      </Block>
    </ClickAwayListener>
  );
};

FieldPopper.defaultProps = {
  arrow: false,
  open: false,
  placement: 'bottom',
  preventOverflow: 'disabled',
  paperstyles: {},
  onClose: () => {},
  anchorComponent: null,
  color: colors.white,
  disableClickAwayClose: false,
  paperStyle: {},
  transitionComponent: Collapse,
  searchInputComponent: TextInput,
  onOpen: () => null,
};
export default FieldPopper;

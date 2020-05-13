import React, { useState } from 'react';

import PropTypes from 'prop-types';

import MuiPopper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

import { ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Block from '../Block';
import { sizes, colors } from '../theme';

const getStyles = ({ color }) => {
  const useStyles = makeStyles({
    paper: {
      maxWidth: 400,
      overflow: 'auto',
      padding: sizes.padding,
    },

    popper: {
      zIndex: 1500,
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

const Popper = (props) => {
  const anchorRef = React.useRef(null);
  const {
    arrow,
    placement,
    disableportal,
    flip,
    preventOverflow,
    open,
    onClose,
    color,
    children,
    anchorComponent,
    disableClickAwayClose,
    overflow,
    paperStyle,
    transitionDelay = 1000,
    ...rest
  } = props;

  const classes = getStyles({ color, overflow }).useStyles();

  const closePopper = () => {
    if (!disableClickAwayClose) {
      onClose();
    }
  };

  const paperstyles = {
    ...(color ? { backgroundColor: color } : {}),
    ...paperStyle,
  };

  const [arrowRef, setArrowRef] = useState(null);

  const id = open ? 'scroll-playground' : null;

  return (
    <Block flex={false} row>
      <span ref={anchorRef} {...rest} style={{ width: 'auto' }}>
        {anchorComponent}
      </span>
      <MuiPopper
        id={id}
        open={open}
        anchorEl={anchorRef.current}
        placement={placement}
        disablePortal={disableportal}
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
              preventOverflow === 'disabled' ? 'scrollParent' : preventOverflow,
          },
        }}
        transition
        elevation={5}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={closePopper}>
            <Fade {...TransitionProps} timeout={transitionDelay}>
              <div>
                {arrow ? (
                  <div
                    className={classes.arrow}
                    ref={(node) => setArrowRef(node)}
                  />
                ) : null}
                <Paper className={classes.paper} style={paperstyles}>
                  {children}
                </Paper>
              </div>
            </Fade>
          </ClickAwayListener>
        )}
      </MuiPopper>
    </Block>
  );
};

Popper.propTypes = {
  arrow: PropTypes.bool,
  open: PropTypes.bool,
  placement: PropTypes.string,
  preventOverflow: PropTypes.string,
  paperstyles: PropTypes.object,
  onClose: PropTypes.func,
  anchorComponent: PropTypes.element,
  color: PropTypes.string,
  disableClickAwayClose: PropTypes.bool,
  paperStyle: PropTypes.object,
};

Popper.defaultProps = {
  arrow: true,
  open: true,
  placement: 'bottom',
  preventOverflow: 'scrollParent',
  paperstyles: {},
  onClose: () => {},
  anchorComponent: null,
  color: colors.white,
  disableClickAwayClose: false,
  paperStyle: {},
};
export default Popper;

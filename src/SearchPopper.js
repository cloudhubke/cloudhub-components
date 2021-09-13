import React from 'react';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Block from './Block';

const SearchPopper = ({
  classes,
  leftComponent,
  rightComponent,
  input,
  ...props
}) => {
  const [text, setText] = React.useState('');
  let isMobile = false;

  if (global.navigator) {
    isMobile = navigator.userAgent.match(
      /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
    );
  }

  const onSubmit = () => {
    props.onSubmit(text);
  };

  let rC;

  if (rightComponent) {
    rC = React.cloneElement(rightComponent, {
      ...rightComponent.props,
      onClick: () => {
        onSubmit();
      },
    });
  }

  return (
    <Block>
      <Paper className={classes.root} elevation={1}>
        {isMobile &&
          (leftComponent || (
            <IconButton
              className={classes.iconButton}
              aria-label="Menu"
              onClick={props.onMenuClick}
            >
              <MenuIcon />
            </IconButton>
          ))}
        <InputBase
          className={classes.input}
          placeholder={props.placeholder || 'Search for anything'}
          onFocus={props.onFocus}
          onBlur={props.onLostFocus}
          onChange={(e) => setText(e.target.value)}
          {...input}
          {...props}
        />
        {rC || (
          <IconButton
            className={classes.iconButton}
            aria-label="Search"
            onClick={onSubmit}
          >
            <SearchIcon />
          </IconButton>
        )}
      </Paper>
    </Block>
  );
};

const styles = () => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

SearchPopper.defaultProps = {
  onMenuClick: () => {},
  onFocus: () => {},
  onLostFocus: () => {},
  onSubmit: () => {},
};

export default withStyles(styles)(SearchPopper);

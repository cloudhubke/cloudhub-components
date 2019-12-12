import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Block from './Block';

const SearchInput = ({
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
      }
    });
  }

  return (
    <Block>
      <Paper className={classes.root} elevation={1}>
        {isMobile
          && (leftComponent || (
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
          onChange={e => setText(e.target.value)}
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
    width: '100%'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

SearchInput.defaultProps = {
  onMenuClick: () => {},
  onFocus: () => {},
  onLostFocus: () => {},
  onSubmit: () => {}
};

export default withStyles(styles)(SearchInput);

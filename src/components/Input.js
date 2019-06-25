import React from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { sizes } from './theme';
import Block from './Block';
import Text from './Text';

const Input = props => {
  const { classes, label, input, meta, ...rest } = props;

  const inputStyles = {
    ...{},
    height: sizes.inputHeight
  };

  return (
    <Block style={{ marginTop: 2.5 }}>
      <TextField
        label={label}
        className={classes.margin}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused
          }
        }}
        InputProps={{
          classes: {
            input: classes.input,
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline
          }
        }}
        style={inputStyles}
        error={Boolean(meta.touched && meta.error)}
        margin="normal"
        variant="outlined"
        {...input}
        {...rest}
      />

      <Text small error>
        {meta.touched && meta.error && meta.error}
      </Text>
    </Block>
  );
};

const styles = () => ({
  margin: {
    marginLeft: sizes.margin,
    marginRight: sizes.margin,
    marginTop: 0,
    marginBottom: 0
  },
  input: {
    paddingTop: 0,
    paddingBottom: 0,
    height: sizes.inputHeight
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: 'red'
    },
    height: sizes.inputHeight
  },
  notchedOutline: {
    margin: 0
  },
  cssFocused: {},
  cssLabel: {}
});

Input.defaultProps = {
  meta: {}
};

export default withStyles(styles)(Input);

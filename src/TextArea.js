import React from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { sizes, colors } from 'theme';
import Block from './Block';
import Text from './Text';

const TextArea = props => {
  const { classes, label, input, meta, rows, marginRight, ...rest } = props;

  const inputStyles = {
    ...{},
    marginRight: marginRight || 0,
    backgroundColor: colors.white,
  };

  return (
    <Block>
      <TextField
        label={label}
        className={classes.textField}
        style={inputStyles}
        error={Boolean(meta.touched && meta.error)}
        margin="normal"
        variant="outlined"
        multiline
        rows={rows}
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
  textField: {},
});

TextArea.defaultProps = {
  meta: {},
  marginRight: sizes.margin,
  rows: 3,
};

export default withStyles(styles)(TextArea);

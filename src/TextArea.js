import React from 'react';
import TextField from '@mui/material/TextField';
import { withStyles } from '@mui/styles';
import Block from './Block';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';

const TextArea = ({ classes, label, input, meta, rows, ...rest }) => {
  const { colors } = React.useContext(ThemeContext);

  const inputStyles = {
    ...{},
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
  rows: 3,
};

export default withStyles(styles)(TextArea);

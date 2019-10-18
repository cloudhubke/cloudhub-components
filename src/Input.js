import React, { createRef, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { sizes, colors } from './theme';
import Block from './Block';
import Text from './Text';

// const required = value => (value ? undefined : 'Required');

class Input extends Component {
  static defaultProps = {
    meta: {},
    marginRight: sizes.margin,
    onKeyEnter: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.inputRef = createRef();
  }

  keyEnter = event => {
    if (event.keyCode === 13) {
      this.props.onKeyEnter();
    }
  };

  focus = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.inputRef.current.focus();
  };

  render() {
    const {
      classes,
      label,
      input,
      meta,
      readOnly,
      marginRight,
      style,
      required,
      onKeyEnter,
      startAdornment,
      endAdornment,
      ...rest
    } = this.props;

    const inputStyles = {
      ...{},
      backgroundColor: colors.white,
      height: sizes.inputHeight,
      marginRight: marginRight || 0,
      ...style,
    };

    return (
      <Block>
        <TextField
          label={label}
          className={classes.margin}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              input: classes.input,
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },

            readOnly,
            startAdornment,
            endAdornment,
          }}
          onKeyPress={e => this.keyEnter(e)}
          style={inputStyles}
          error={Boolean(meta.touched && meta.error)}
          inputRef={this.inputRef}
          margin="normal"
          variant="outlined"
          {...input}
          {...rest}
        />

        <Text small error style={{ height: 10 }}>
          {meta.touched && meta.error && meta.error}
        </Text>
      </Block>
    );
  }
}

const styles = () => ({
  margin: {
    marginTop: 0,
    marginBottom: 0,
  },
  input: {
    paddingTop: 0,
    paddingBottom: 0,
    height: sizes.inputHeight,
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: colors.primary,
    },
    height: sizes.inputHeight,
  },
  notchedOutline: {
    margin: 0,
  },
  cssFocused: {},
  cssLabel: {},
});

export default withStyles(styles)(Input);

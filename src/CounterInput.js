/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { Add, Remove } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import IconButton from './IconButton';
import TextInput from './TextInput';
import Block from './Block';
import ThemeContext from './theme/ThemeContext';

const useStyles = () =>
  makeStyles({
    input: {
      textAlign: 'center',
      verticalAlign: 'center',
    },
  });

const CounterInput = ({ input, value, min, max, style, ...props }) => {
  const { sizes } = React.useContext(ThemeContext);
  const val = Number(input.value || 0);
  const classes = useStyles()();

  return (
    <TextInput
      name="Count"
      style={{ borderRadius: 0, maxHeight: sizes.inputHeight, ...style }}
      inputProps={{
        type: 'number',
        classes: {
          input: classes.input,
        },
        min: 0,
      }}
      divider={false}
      leftComponent={
        <Block style={{ padding: 0, margin: 0 }}>
          <IconButton
            onClick={() => {
              if (min || min === 0) {
                if (val > min) {
                  return input.onChange(val - 1);
                }
                return input.onChange(val);
              }
              return input.onChange(val - 1);
            }}
          >
            <Remove />
          </IconButton>
        </Block>
      }
      rightComponent={
        <Block style={{ padding: 0, margin: 0 }}>
          <IconButton
            onClick={() => {
              if (max || max === 0) {
                if (val < max) {
                  return input.onChange(val + 1);
                }
                return input.onChange(val);
              }
              return input.onChange(val + 1);
            }}
          >
            <Add />
          </IconButton>
        </Block>
      }
      {...input}
      {...props}
    />
  );
};

export default CounterInput;

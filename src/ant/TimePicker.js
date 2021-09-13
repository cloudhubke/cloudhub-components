import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import AntTimePicker from './AntTimePicker';
import Block from '../Block';
import Text from '../Text';
import ThemeContext from '../theme/ThemeContext';

const getStyles = ({ fonts, sizes }) => {
  const useStyles = makeStyles({
    timePicker: {
      ...fonts.default,
      width: 154,
      '& .ant-time-picker-input': {
        ...fonts.default,
        height: sizes.inputHeight,
        padding: `0px ${sizes.padding}px`,
      },
      '& .ant-time-picker': {
        width: 154,
      },
      '& .ant-time-picker-icon': {
        right: -sizes.padding,
        top: `calc(${sizes.inputHeight / 2}px - 2px)`,
      },
    },

    root: {
      '& .ant-time-picker-panel-input': {
        ...fonts.default,
        height: sizes.inputHeight,
      },
      '& .ant-time-picker-panel-input-wrap': {
        height: sizes.inputHeight + 4,
        padding: '0 7px 0 7px',
      },
      '& .ant-time-picker-panel-clear-btn': {
        top: 'calc(50%  - 8px)',
      },
    },
  });

  return {
    useStyles,
  };
};

const TimePicker = ({ meta, value, input, onChange, ...props }) => {
  const { fonts, sizes } = React.useContext(ThemeContext);
  const passedvalue = input.value || value;

  const [time, setTime] = useState(null);

  const classes = getStyles({ fonts, sizes }).useStyles();

  const onTimeChange = (time) => {
    setTime(time);
  };

  useEffect(() => {
    if (passedvalue) {
      setTime(moment(passedvalue, 'HHmmss'));
    }
  }, [passedvalue]);

  useEffect(() => {
    if (time && typeof time === 'object') {
      const tt = `${time.format('HHmmss')}`;
      input.onChange(tt);
      input.onBlur();
      onChange(tt);
    } else {
      input.onChange(null);
      input.onBlur();
      onChange(null);
    }
  }, [time, input, onChange]);

  return (
    <Block style={{ marginRight: sizes.margin }} className={classes.root}>
      <AntTimePicker
        className={classes.timePicker}
        use12Hours
        format="h:mm a"
        value={time}
        onChange={onTimeChange}
        {...props}
      />
      <Text small error style={{ height: 10 }}>
        {meta.touched && meta.error && meta.error}
      </Text>
    </Block>
  );
};

TimePicker.defaultProps = {
  meta: {},
  value: null,
  onChange: () => {},
  input: {
    value: null,
    onChange: () => {},
    onBlur: () => {},
  },
};

export default TimePicker;

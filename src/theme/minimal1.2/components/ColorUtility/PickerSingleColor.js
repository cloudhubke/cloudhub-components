import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Radio, RadioGroup } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  radio: {
    '&:hover': {
      opacity: 0.72
    }
  },
  radioIcon: {
    width: 20,
    height: 20,
    display: 'flex',
    borderRadius: '50%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'currentColor',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest
    })
  },
  isChecked: {
    transform: 'scale(1.4)',
    '& svg': {
      width: 12,
      height: 12,
      color: theme.palette.common.white
    },
    '&:before': {
      opacity: 0.32,
      width: '100%',
      content: "''",
      height: '100%',
      borderRadius: '50%',
      position: 'absolute',
      boxShadow: '4px 4px 8px 0 currentColor'
    }
  },
  whiteColor: {
    border: `solid 1px ${theme.palette.divider}`,
    '&$isChecked': {
      boxShadow: `4px 4px 8px 0 ${theme.palette.grey['500_24']}`,
      '& svg': {
        width: 12,
        height: 12,
        color: theme.palette.common.black
      }
    }
  }
}));

// ----------------------------------------------------------------------

function RadioIcon({ className, ...other }) {
  return (
    <div className={className} {...other}>
      <Icon icon={checkmarkFill} />
    </div>
  );
}

PickerSingleColor.propTypes = {
  colors: PropTypes.array.isRequired,
  className: PropTypes.string
};

function PickerSingleColor({ colors, className, ...other }) {
  const classes = useStyles();

  return (
    <RadioGroup row className={clsx(classes.root, className)} {...other}>
      {colors.map((color) => (
        <Radio
          key={color}
          value={color}
          color="default"
          style={{ color: color }}
          icon={
            <RadioIcon
              className={clsx(classes.radioIcon, {
                [classes.whiteColor]: color === '#FFFFFF' || color === 'white'
              })}
            />
          }
          checkedIcon={
            <RadioIcon
              className={clsx(classes.radioIcon, classes.isChecked, {
                [classes.whiteColor]: color === '#FFFFFF' || color === 'white'
              })}
            />
          }
          className={classes.radio}
        />
      ))}
    </RadioGroup>
  );
}

export default PickerSingleColor;

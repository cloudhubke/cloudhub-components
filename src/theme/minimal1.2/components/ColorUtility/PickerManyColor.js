import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  checkbox: {
    '&:hover': {
      opacity: 0.72
    }
  },
  checkboxIcon: {
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
      opacity: 0.48,
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

function CheckboxIcon({ className, ...other }) {
  return (
    <div className={className} {...other}>
      <Icon icon={checkmarkFill} />
    </div>
  );
}

PickerManyColor.propTypes = {
  colors: PropTypes.array.isRequired,
  onChecked: PropTypes.func,
  className: PropTypes.string
};

function PickerManyColor({ colors, onChecked, className, ...other }) {
  const classes = useStyles();

  return (
    <div className={(clsx(classes.root), className)}>
      {colors.map((color) => (
        <Checkbox
          key={color}
          size="small"
          value={color}
          color="default"
          style={{ color: color }}
          checked={onChecked(color)}
          icon={
            <CheckboxIcon
              className={clsx(classes.checkboxIcon, {
                [classes.whiteColor]: color === '#FFFFFF' || color === 'white'
              })}
            />
          }
          checkedIcon={
            <CheckboxIcon
              className={clsx(classes.checkboxIcon, classes.isChecked, {
                [classes.whiteColor]: color === '#FFFFFF' || color === 'white'
              })}
            />
          }
          className={classes.checkbox}
          {...other}
        />
      ))}
    </div>
  );
}

export default PickerManyColor;

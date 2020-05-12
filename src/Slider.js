import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Slider, Tooltip } from '@material-ui/core';

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles((color) => ({
  root: {
    color: color || '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
}))(Slider);

const PrettoSlider = withStyles((color) => ({
  root: {
    color: color || '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
}))(Slider);

const AirbnbSlider = withStyles((color) => ({
  root: {
    color: color || '#3a8589',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0px 2px 2px',
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0px 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
}))(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

const CustomizedSlider = ({
  color,
  ios,
  pretto,
  airbnb,
  min,
  max,
  marks,
  value,
  valueLabelDisplay,
  defaultValue,
  ThumbComponent,
  ValueLabelComponent,
}) => {
  if (ios) {
    return (
      <IOSSlider
        color={color}
        aria-label="ios slider"
        defaultValue={defaultValue || 60}
        min={min}
        max={max}
        marks={marks}
        value={value}
        valueLabelDisplay={valueLabelDisplay || 'auto'}
      />
    );
  }
  if (pretto) {
    return (
      <PrettoSlider
        color={color}
        defaultValue={defaultValue || 60}
        min={min}
        max={max}
        marks={marks}
        value={value}
        valueLabelDisplay={valueLabelDisplay || 'auto'}
        aria-label="pretto slider"
      />
    );
  }
  if (airbnb) {
    return (
      <AirbnbSlider
        color={color}
        ThumbComponent={AirbnbThumbComponent}
        defaultValue={defaultValue || 60}
        min={min}
        max={max}
        marks={marks}
        value={value}
        valueLabelDisplay={valueLabelDisplay || 'auto'}
      />
    );
  }
  return (
    <Slider
      color={color}
      aria-label="custom thumb label"
      defaultValue={defaultValue || 60}
      min={min}
      max={max}
      marks={marks}
      value={value}
      valueLabelDisplay={valueLabelDisplay || 'auto'}
    />
  );
};
export default CustomizedSlider;

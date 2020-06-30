import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Slider, Tooltip } from '@material-ui/core';
import Block from './Block';
import ThemeContext from './theme/ThemeContext';

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
  Min,
  Max,
  marks,
  value,
  input,
  onChange,
  title,
  valueLabelDisplay,
  defaultValue,
  ThumbComponent,
  ValueLabelComponent,
  name,
  onChangeCommitted,
  ...props
}) => {
  const { sizes } = React.useContext(ThemeContext);
  const changeValue = (event, val) => {
    if (input && typeof input.onChange === 'function') {
      input.onChange(val);
    }
    if (typeof onChange === 'function') {
      onChange(val);
    }
  };

  return (
    <Block
      middle
      style={{
        width: '100%',
        paddingTop: sizes.padding,
        zIndex: 0,
        minHeight: 100,
      }}
    >
      <Block>{title}</Block>
      <Block style={{ marginTop: sizes.doubleBaseMargin * 2 }}>
        {ios && (
          <IOSSlider
            name={input ? input.name : name}
            color={color}
            defaultValue={defaultValue || (input ? input.value : value)}
            aria-label="ios slider"
            getAriaLabel={() => 'ios slider'}
            min={Min || 0}
            max={Max || 100}
            marks={marks}
            value={value}
            valueLabelDisplay={valueLabelDisplay || 'auto'}
            onChange={changeValue}
            onChangeCommitted={onChangeCommitted}
            {...props}
          />
        )}
        {pretto && (
          <PrettoSlider
            name={input ? input.name : name}
            color={color}
            min={Min || 0}
            max={Max || 100}
            defaultValue={defaultValue || (input ? input.value : value)}
            marks={marks}
            value={value}
            valueLabelDisplay={valueLabelDisplay || 'auto'}
            aria-label="pretto slider"
            getAriaLabel={() => 'pretto slider'}
            onChange={changeValue}
            onChangeCommitted={onChangeCommitted}
            {...props}
          />
        )}
        {airbnb && (
          <AirbnbSlider
            name={input ? input.name : name}
            aria-label="airbnb slider"
            getAriaLabel={() => 'airbnb slider'}
            color={color}
            ThumbComponent={AirbnbThumbComponent}
            defaultValue={defaultValue || (input ? input.value : value)}
            min={Min || 0}
            max={Max || 100}
            marks={marks}
            value={value}
            valueLabelDisplay={valueLabelDisplay || 'auto'}
            onChange={changeValue}
            onChangeCommitted={onChangeCommitted}
            {...props}
          />
        )}
        {!airbnb && !pretto && !ios && (
          <Slider
            name={input ? input.name : name}
            color={color}
            aria-label="custom thumb label"
            getAriaLabel={() => 'custom thumb label'}
            min={Min || 0}
            max={Max || 100}
            marks={marks}
            defaultValue={defaultValue || (input ? input.value : value)}
            value={input ? input.value : value}
            valueLabelDisplay={valueLabelDisplay || 'auto'}
            onChange={changeValue}
            onChangeCommitted={onChangeCommitted}
            {...props}
          />
        )}
      </Block>
    </Block>
  );
};
Slider.defaultProps = {
  onChange: () => {},
  input: {
    value: null,
    onChange: () => {},
  },
  onChangeCommitted: () => {},
};
export default CustomizedSlider;

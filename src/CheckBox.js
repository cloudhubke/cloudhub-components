import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CheckBox from '@material-ui/icons/CheckBox';
import green from '@material-ui/core/colors/green';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

class checkbox extends Component {
  static defaultProps = {
    input: {
      value: null,
      onChange: () => {}
    },
    value: null,
    onChange: () => {},
    height: 32
  };

  constructor(props) {
    super(props);
    this.state = {
      checkvalue: false
    };
  }

  onCheck = () => {
    this.setState(({ checkvalue }) => {
      this.props.input.onChange(!checkvalue);
      this.props.onChange(!checkvalue);
      return {
        checkvalue: !checkvalue
      };
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const checkvalue = nextProps.input.value || nextProps.value;
    return {
      ...prevState,
      checkvalue
    };
  }

  render() {
    const { label, height } = this.props;
    const { checkvalue } = this.state;
    return (
      <Button
        onClick={this.onCheck}
        style={{
          width: '100%',
          textTransform: 'none',
          display: 'flex',
          justifyContent: 'flex-start',
          padding: 0
        }}
      >
        {checkvalue ? (
          <CheckBox
            style={{
              height,
              width: height,
              color: green[500],
              marginRight: 5
            }}
          />
        ) : (
          <CheckBoxOutlineBlank
            style={{ height, width: height, marginRight: 5 }}
          />
        )}
        {label}
      </Button>
    );
  }
}

export default checkbox;

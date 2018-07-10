import React, { Component } from 'react';
import Select from './Selector';

class StaticListSelector extends Component {
  static defaultProps = {
    input: {
      value: null,
      onChange: () => {},
      onBlur: () => {}
    },
    value: null,
    onChange: () => {},
    meta: {},
    list: [],
    displayField: '',
    returnkeys: []
  };
  constructor(props) {
    super(props);
    this.state = {
      val: null
    };
  }

  render() {
    const { list, value, input, meta, onChange, onSelectChange } = this.props;
    return (
      <Select
        options={list}
        value={value || input.value || this.state.val}
        onChange={val => {
          if (val) {
            this.setState({ val });
            input.onChange(val);
            onChange(val);
            if (onSelectChange) {
              onSelectChange(val);
            }
            input.onBlur();
          } else {
            this.setState({ val });
            input.onChange(val);
            onChange(val);
            if (onSelectChange) {
              onSelectChange(val);
            }
            input.onBlur();
          }
        }}
        displayField={this.props.displayField}
        returnkeys={this.props.returnkeys}
        meta={meta}
      />
    );
  }
}

export default StaticListSelector;

import React, { Component } from 'react';
import Select from './Selector';

class StaticListSelector extends Component {
  static defaultProps = {
    input: {
      value: null,
      onChange: () => {},
      onBlur: () => {}
    },
    onChange: () => {},
    meta: {},
    list: []
  };
  constructor(props) {
    super(props);
    this.state = {
      val: null
    };
  }

  render() {
    const { list, input, meta, onChange, onSelectChange } = this.props;
    return (
      <Select
        options={list}
        value={input.value || this.state.val}
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
        meta={meta}
      />
    );
  }
}

export default StaticListSelector;

import React, { Component } from 'react';
import Select from './MultiSelector';

class StaticListSelector extends Component {
  static defaultProps = {
    input: {
      value: null,
      onChange: () => {},
      onBlur: () => {}
    },
    value: [],
    onChange: () => {},
    meta: {},
    list: []
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      list,
      input,
      value,
      meta,
      onChange,
      onSelectChange,
      menuPlacement
    } = this.props;
    const selectedvalue = input.value || value;
    return (
      <Select
        options={list}
        value={selectedvalue}
        onChange={val => {
          if (val) {
            input.onChange(val);
            onChange(val);
            if (onSelectChange) {
              onSelectChange(val);
            }
            input.onBlur();
          } else {
            input.onChange(val);
            onChange(val);
            if (onSelectChange) {
              onSelectChange(val);
            }
            input.onBlur();
          }
        }}
        meta={meta}
        menuPlacement={menuPlacement}
      />
    );
  }
}

export default StaticListSelector;

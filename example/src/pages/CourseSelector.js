import React from 'react';
import { RemoteSelector } from 'cloudhub-react-components';
import { Component } from 'react';

class CourseSelector extends Component {
  static defaultProps = {
    input: {
      onChange: () => {},
      onBlur: () => {}
    },
    onChange: () => {},
    meta: {}
  };
  render() {
    const { input, meta, onChange, onSelectChange } = this.props;
    return (
      <RemoteSelector
        url="api/course/filtersearch"
        value={input.value}
        onChange={val => {
          if (val) {
            const { simple, full } = val;
            input.onChange(simple);
            if (onSelectChange) {
              onSelectChange(full);
            }
            input.onBlur();
          } else {
            input.onChange(val);
            if (onSelectChange) {
              onSelectChange(val);
            }
            input.onBlur();
          }
        }}
        meta={meta}
        displayField="CourseCode"
        returnkeys={['_id', 'CourseCode', 'CourseName']}
      />
    );
  }
}

export default CourseSelector;

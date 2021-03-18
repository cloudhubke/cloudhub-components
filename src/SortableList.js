import React, { Component } from 'react';
import Sortable from 'sortablejs';

export default class SortableList extends Component {
  static defaultProps = {
    style: {},
    input: {
      onChange: () => {},
      value: [],
    },
    onChange: () => {},
    options: [],
  };
  constructor(props) {
    super(props);
    this.el = null;
  }

  changerSort = ({ oldIndex, newIndex }) => {
    let options = [];
    if (this.props.input.value.length > 0) {
      options = [...this.props.input.value];
    } else {
      options = [...this.props.options];
    }

    const item = options[oldIndex];

    options.splice(oldIndex, 1);
    options.splice(newIndex, 0, item);

    this.props.onChange(options);
    this.props.input.onChange(options);
  };

  componentDidMount() {
    const changeSort = this.changerSort;

    var sortable = new Sortable(this.el, {
      onSort: ({ oldIndex, newIndex }) => {
        changeSort({ oldIndex, newIndex });
      },
    });
  }

  render() {
    const { meta } = this.props;

    return (
      <div
        ref={(el) => {
          this.el = el;
        }}
        style={{ width: '100%', height: '100%', ...this.props.style }}
      >
        {this.props.children}
      </div>
    );
  }
}

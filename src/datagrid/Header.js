import React from 'react';
import Block from '../Block';
import TableHeaderBar from './TableHeaderBar';

const Header = ({ header, permissions, onSearch, queryString, ...props }) => {
  if (props.header) {
    return (
      <Block>
        {props.header({
          ...props,
          ...permissions,
          queryString,
          onSearch,
        })}
      </Block>
    );
  }
  return (
    <Block flex={false}>
      <TableHeaderBar
        {...permissions}
        title={props.title}
        onSearchChange={onSearch}
        onAdd={props.onAdd}
        onRefresh={props.onRefresh}
        onPrint={props.onPrint}
      />
    </Block>
  );
};

export default Header;

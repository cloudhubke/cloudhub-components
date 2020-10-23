import React from 'react';
import Block from '../Block';
import { useDebounce } from '../customhooks';
import TableHeaderBar from './TableHeaderBar';

const Header = ({
  header,
  permissions,
  onSearch,
  onSetSearchText,
  queryString,
  ...props
}) => {
  const [text, setText] = React.useState('');
  const debouncedText = useDebounce(text, 500);

  React.useEffect(() => {
    onSearch(debouncedText);
  }, [debouncedText]);

  if (header) {
    return (
      <Block flex={false}>
        {header({
          ...props,
          ...permissions,
          queryString,
          searchText: debouncedText,
          onSearch: (text) => setText(text),
        })}
      </Block>
    );
  }
  return (
    <Block flex={false}>
      <TableHeaderBar
        permissions={permissions}
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

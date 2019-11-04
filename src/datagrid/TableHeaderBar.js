import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';
import RefreshIcon from '@material-ui/icons/Cached';

import Input from '../Input';
import Button from '../Button';
import { useDebounce } from '../customhooks';
import Block from '../Block';
import Text from '../Text';
import { sizes } from '../theme';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 20px 10px 20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexBasis: '50%',
    marginLeft: 10,
  },
  buttonStyle: {
    fontWeight: 500,
    textTransform: 'capitalize',
    fontSize: 12,
  },
};

const TableHeaderBar = ({
  permissions,
  title,
  onAdd,
  onRefresh,
  onSearchChange,
  onPrint,
  ...props
}) => {
  const [text, setText] = React.useState('');
  const debouncedText = useDebounce(text, 500);

  React.useEffect(() => {
    onSearchChange(debouncedText);
  }, [debouncedText]);

  const { allowprint, allowadd } = permissions;

  return (
    <Block row paper middle padding={sizes.padding} wrap>
      <Block>
        <Text h6>{title}</Text>
      </Block>
      <Block flex={false} row wrap>
        <Input
          style={{ flex: 1, minWidth: 200 }}
          icon="search"
          placeholder="Search..."
          onChange={e => setText(e.target.value)}
        />
        <Button onClick={onAdd} style={styles.buttonStyle} disabled={!allowadd}>
          <AddIcon /> Add
        </Button>
        <Button onClick={onRefresh} style={styles.buttonStyle}>
          <RefreshIcon /> Refresh
        </Button>
        <Button
          onClick={onPrint}
          style={styles.buttonStyle}
          disabled={!allowprint}
        >
          <PrintIcon /> Print
        </Button>
      </Block>
    </Block>
  );
};

TableHeaderBar.defaultProps = {
  title: '',
  onAdd: () => {},
  onRefresh: () => {},
  onSearchChange: () => {},
  onPrint: () => {},
  permissions: {
    allowadd: true,
    allowedit: true,
    allowdelete: true,
    allowprint: true,
  },
};

export default withStyles(styles)(TableHeaderBar);
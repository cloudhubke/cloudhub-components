import React from 'react';
import { withStyles, IconButton, Button, Paper } from 'material-ui';
import { red } from 'material-ui/colors';
import { Add as AddIcon, Remove as RemoveIcon } from 'material-ui-icons';

const styles = () => ({
  button: {
    borderRadius: 3,
    flex: 1,
    height: 42,
  },
  paperButton: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 500,
    cursor: 'pointer',
    background: red[500],
    '&:hover': {
      background: red[900],
    },
    height: 42,
  },
  paperCartButton: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFF',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 500,
    cursor: 'pointer',
    background: red[500],
    height: 42,
  },
  itemButton: {
    color: '#FFF',
  },
  addremoveButton: {
    color: '#FFF',
  },
});

const AddToCartButton = ({ classes, onAddItem, onRemoveItem, Qty }) => {
  if (!Qty) {
    return (
      <Button className={classes.paperButton} onClick={onAddItem}>
        Add to cart
      </Button>
    );
  }
  return (
    <Paper className={classes.paperCartButton}>
      <IconButton className={classes.addremoveButton} onClick={onRemoveItem}>
        <RemoveIcon />
      </IconButton>
      <Button className={classes.itemButton} onClick={onAddItem}>
        {Qty}
      </Button>
      <IconButton className={classes.addremoveButton} onClick={onAddItem}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
};

export default withStyles(styles)(AddToCartButton);

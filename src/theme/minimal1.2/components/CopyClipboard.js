import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import copyFill from '@iconify-icons/eva/copy-fill';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { makeStyles } from '@material-ui/core/styles';
import {
  Tooltip,
  TextField,
  IconButton,
  InputAdornment
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

CopyClipboard.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string
};

function CopyClipboard({ value, className }) {
  const classes = useStyles();
  const [state, setState] = useState({
    value: value,
    copied: false
  });

  const handleChange = (event) => {
    setState({ value: event.target.value, copied: false });
  };

  const onCopy = () => {
    setState({ ...state, copied: true });
    if (state.value) {
      // enqueueSnackbar('Copied', { variant: 'success' });
    }
  };

  return (
    <TextField
      fullWidth
      value={state.value}
      onChange={handleChange}
      className={clsx(classes.root, className)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CopyToClipboard text={state.value} onCopy={onCopy}>
              <Tooltip title="Copy">
                <IconButton>
                  <Icon icon={copyFill} width={24} height={24} />
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
          </InputAdornment>
        )
      }}
    />
  );
}

export default CopyClipboard;

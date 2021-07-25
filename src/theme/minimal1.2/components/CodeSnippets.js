import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Markdown from './Markdown';
import codeFill from '@iconify-icons/eva/code-fill';
import { DialogAnimate } from './Animate';
import { makeStyles } from '@material-ui/core/styles';
import {
  Tooltip,
  IconButton,
  DialogTitle,
  DialogContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

CodeSnippets.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string
};

function CodeSnippets({ source, title, className, ...other }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx(classes.root, className)}>
      <Tooltip title="View Code">
        <IconButton
          onClick={() => setOpen(true)}
          color={open ? 'primary' : 'default'}
          sx={{
            right: 8,
            bottom: 8,
            position: 'absolute'
          }}
        >
          <Icon icon={codeFill} width={20} height={20} />
        </IconButton>
      </Tooltip>

      <DialogAnimate
        fullWidth
        open={open}
        maxWidth="md"
        scroll="paper"
        onClose={() => setOpen(false)}
        {...other}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <Markdown source={source} />
        </DialogContent>
      </DialogAnimate>
    </div>
  );
}

export default CodeSnippets;

import clsx from 'clsx';
import PropTypes from 'prop-types';
import Markdown from '../components/Markdown';
import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    '& h1': {
      marginBottom: theme.spacing(5)
    },
    '& h2': {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(2)
    },
    '& h3, h4, h5, h6': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2)
    },
    '& img': { margin: theme.spacing(5, 0) },
    '& p': { marginBottom: theme.spacing(2) },
    '& ul': { margin: theme.spacing(2, 0) },
    '& pre': { margin: theme.spacing(3, 0) }
  }
}));

// ----------------------------------------------------------------------

ReadMdFile.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string
};

function ReadMdFile({ content, className }) {
  const classes = useStyles();
  const [file, setFile] = useState('');

  const getFile = useCallback(async () => {
    fetch(content)
      .then((response) => response.text())
      .then((text) => {
        setFile(text);
      });
  }, [content]);

  useEffect(() => {
    getFile();
  }, [getFile]);

  return <Markdown source={file} className={clsx(classes.root, className)} />;
}

export default ReadMdFile;

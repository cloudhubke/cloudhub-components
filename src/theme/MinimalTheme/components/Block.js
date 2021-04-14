import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const isLight = theme.palette.mode === 'light';

  return {
    root: {
      position: 'relative'
    },
    content: {
      minHeight: 160,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadiusSm,
      border: `solid 1px ${theme.palette.divider}`,
      backgroundColor: theme.palette.grey[isLight ? '100' : '800'],
      '& > *': {
        margin: `${theme.spacing(1)} !important`
      }
    }
  };
});

// ----------------------------------------------------------------------

Block.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};

function Block({ children, className, title, ...other }) {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...other}>
      {title && (
        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {title}
        </Typography>
      )}
      <div className={classes.content}>{children}</div>
    </Box>
  );
}

export default Block;

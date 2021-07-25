import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(8, 2)
  }
}));

// ----------------------------------------------------------------------

EmptyContent.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string
};

function EmptyContent({ title, description, img, className, ...other }) {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...other}>
      <Box
        component="img"
        alt="empty content"
        src={img ? img : '/static/illustrations/illustration_empty_content.svg'}
        sx={{ height: 240, mb: 3 }}
      />

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Box>
  );
}

export default EmptyContent;

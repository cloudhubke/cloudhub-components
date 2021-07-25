import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  color: {
    marginLeft: -4,
    borderRadius: '50%',
    width: theme.spacing(2),
    height: theme.spacing(2),
    border: `solid 2px ${theme.palette.background.paper}`,
    boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`
  }
}));

// ----------------------------------------------------------------------

PreviewColor.propTypes = {
  colors: PropTypes.array.isRequired,
  limit: PropTypes.number,
  className: PropTypes.string
};

function PreviewColor({ colors, limit = 3, className, ...other }) {
  const classes = useStyles();
  const showColor = colors.slice(0, limit);
  const moreColor = colors.length - limit;

  return (
    <Box component="span" className={clsx(classes.root, className)} {...other}>
      {showColor.map((color, index) => (
        <div
          key={color + index}
          className={classes.color}
          style={{ backgroundColor: color }}
        />
      ))}

      {colors.length > limit && (
        <Typography variant="subtitle2">{`+${moreColor}`}</Typography>
      )}
    </Box>
  );
}

export default PreviewColor;

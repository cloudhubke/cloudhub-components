import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowLeftFill from '@iconify-icons/eva/arrow-left-fill';
import arrowRightFill from '@iconify-icons/eva/arrow-right-fill';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { MIconButton } from '../../theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 9,
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey['900'], 0.48)
  },
  arrow: {
    padding: 6,
    opacity: 0.48,
    '&:hover': { opacity: 1 }
  }
}));

// ----------------------------------------------------------------------

CarouselArrowsIndex.propTypes = {
  index: PropTypes.number,
  total: PropTypes.number,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  className: PropTypes.string
};

function CarouselArrowsIndex({
  index,
  total,
  onNext,
  onPrevious,
  className,
  ...other
}) {
  const classes = useStyles();
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  return (
    <Box className={clsx(classes.root, className)} {...other}>
      <MIconButton
        size="small"
        color="white"
        onClick={onPrevious}
        className={classes.arrow}
      >
        <Icon
          width={20}
          height={20}
          icon={isRTL ? arrowRightFill : arrowLeftFill}
        />
      </MIconButton>

      <Typography variant="subtitle2">
        {index + 1}/{total}
      </Typography>

      <MIconButton
        size="small"
        color="white"
        onClick={onNext}
        className={classes.arrow}
      >
        <Icon
          width={20}
          height={20}
          icon={isRTL ? arrowLeftFill : arrowRightFill}
        />
      </MIconButton>
    </Box>
  );
}

export default CarouselArrowsIndex;

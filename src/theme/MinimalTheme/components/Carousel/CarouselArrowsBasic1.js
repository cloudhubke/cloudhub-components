import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowLeftFill from '@iconify-icons/eva/arrow-left-fill';
import arrowRightFill from '@iconify-icons/eva/arrow-right-fill';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { MIconButton } from '../../theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 9,
    display: 'flex',
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2)
  },
  arrow: {
    padding: 6,
    opacity: 0.48,
    '&:hover': { opacity: 1 }
  }
}));

// ----------------------------------------------------------------------

CarouselArrowsBasic1.propTypes = {
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  className: PropTypes.string
};

function CarouselArrowsBasic1({ onNext, onPrevious, className, ...other }) {
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

export default CarouselArrowsBasic1;

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

const SIZE = 40;

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    bottom: 0,
    zIndex: 9,
    height: SIZE,
    width: '100%',
    margin: 'auto',
    display: 'flex',
    position: 'absolute',
    padding: theme.spacing(0, 2),
    justifyContent: 'space-between'
  },
  arrow: {
    width: SIZE,
    height: SIZE,
    opacity: 0.48,
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.grey['900'],
    borderRadius: theme.shape.borderRadiusSm,
    '&:hover': {
      opacity: 1,
      background: theme.palette.grey['900']
    }
  }
}));

// ----------------------------------------------------------------------

CarouselArrowsBasic2.propTypes = {
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  className: PropTypes.string
};

function CarouselArrowsBasic2({ onNext, onPrevious, className, ...other }) {
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

export default CarouselArrowsBasic2;

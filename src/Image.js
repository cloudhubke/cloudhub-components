import React from 'react';
import { makeStyles } from '@mui/styles';
import hexToRgb from './theme/hexToRgb';
import colors from './theme/Colors';

const useStyles = makeStyles({
  imgFluid: {
    maxWidth: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imgRounded: {
    borderRadius: '6px !important',
  },
  imgRoundedCircle: {
    borderRadius: '50% !important',
  },
  imgRaised: {
    boxShadow: `0 5px 15px -8px rgba(${hexToRgb(
      colors.blackColor
    )}, 0.24), 0 8px 10px -5px rgba(${hexToRgb(colors.blackColor)}, 0.2)`,
  },
  imgGallery: {
    width: '100%',
    marginBottom: '2.142rem',
  },
  imgCardTop: {
    width: '100%',
    borderTopLeftRadius: 'calc(.25rem - 1px)',
    borderTopRightRadius: 'calc(.25rem - 1px)',
  },
  imgCardBottom: {
    width: '100%',
    borderBottomLeftRadius: 'calc(.25rem - 1px)',
    borderBottomRightRadius: 'calc(.25rem - 1px)',
  },
  imgCard: {
    width: '100%',
    borderRadius: 'calc(.25rem - 1px)',
  },
  imgCardOverlay: {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    padding: '1.25rem',
  },
});

const Image = ({
  image,
  defaultImage,
  width,
  square,
  xs,
  sm,
  md,
  lg,
  circle,
  raised,
  rounded,
  fluid,
  ...props
}) => {
  const classes = useStyles();
  let wdth = width;

  if (xs) {
    wdth = 65;
  }

  if (sm) {
    wdth = 150;
  }
  if (md) {
    wdth = 380;
  }
  if (lg) {
    wdth = 720;
  }

  let height = Math.ceil((wdth * 2) / 3);

  if (square) {
    height = wdth;
  }

  let classname = '';

  if (circle) {
    classname = `${classname} ${classes.imgRoundedCircle}`;
  }

  if (rounded) {
    classname = `${classname} ${classes.imgRounded}`;
  }

  if (raised) {
    classname = `${classname} ${classes.imgRaised}`;
  }

  if (fluid) {
    classname = `${classname} ${classes.imgFluid}`;
  }

  return (
    <div style={{ position: 'relative', width: wdth, height }}>
      <img
        src={image || defaultImage}
        alt="..."
        className={classname}
        {...props}
      />
    </div>
  );
};

Image.defaultProps = {
  width: 45,
  square: false,
  image: null,
  defaultImage: null,
  fluid: true,
};

export default Image;

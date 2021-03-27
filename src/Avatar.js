import React from 'react';
import { MAvatar } from './@material-extend';

const Avatar = ({ size = 32, ...props }) => {
  const sx = { width: size, height: size };
  return <MAvatar sx={sx} {...props} />;
};

export default Avatar;

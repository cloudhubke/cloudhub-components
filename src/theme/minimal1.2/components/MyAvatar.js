import React from 'react';
import PropTypes from 'prop-types';
import { MAvatar } from '../theme';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

MyAvatar.propTypes = {
  className: PropTypes.string
};

function MyAvatar({ className, user, ...other }) {
  return (
    <MAvatar
      src={user.photoURL}
      alt={user.displayName}
      color={user.photoURL ? 'default' : createAvatar(user.displayName).color}
      className={className}
      {...other}
    >
      {createAvatar(user.displayName).name}
    </MAvatar>
  );
}

export default MyAvatar;

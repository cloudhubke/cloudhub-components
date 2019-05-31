// @flow
import React from 'react';
import nodeEmoji from 'node-emoji';
import PropTypes from 'prop-types';

function Emoji({ name }) {
  const emoji = nodeEmoji.get(name);
  return <span>{emoji}</span>;
}

Emoji.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Emoji;

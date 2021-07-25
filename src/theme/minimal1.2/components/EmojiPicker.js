import 'emoji-mart/css/emoji-mart.css';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import smilingFaceFill from '@iconify-icons/eva/smiling-face-fill';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { IconButton, ClickAwayListener } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: { position: 'relative' },
  alignRight: { right: theme.spacing(-2), left: 'auto !important' },
  picker: {
    bottom: 40,
    overflow: 'hidden',
    position: 'absolute',
    left: theme.spacing(-2),
    boxShadow: theme.shadows['25'].z20,
    borderRadius: theme.shape.borderRadiusMd,
    '& .emoji-mart': {
      border: 'none',
      backgroundColor: theme.palette.background.paper
    },
    '& .emoji-mart-anchor': {
      color: theme.palette.text.disabled,
      '&:hover, &:focus, &.emoji-mart-anchor-selected': {
        color: theme.palette.text.primary
      }
    },
    '& .emoji-mart-bar': { borderColor: theme.palette.divider },
    '& .emoji-mart-search input': {
      backgroundColor: 'transparent',
      color: theme.palette.text.primary,
      borderColor: theme.palette.grey['500_32'],
      '&::placeholder': {
        ...theme.typography.body2,
        color: theme.palette.text.disabled
      }
    },
    '& .emoji-mart-search-icon svg': {
      opacity: 1,
      fill: theme.palette.text.disabled
    },
    '& .emoji-mart-category-label span': {
      ...theme.typography.subtitle2,
      backdropFilter: 'blur(8px)',
      color: theme.palette.text.primary,
      backgroundColor: alpha(theme.palette.background.paper, 0.8)
    },
    '& .emoji-mart-title-label': { color: theme.palette.text.primary },
    '& .emoji-mart-category .emoji-mart-emoji:hover:before': {
      backgroundColor: theme.palette.action.selected
    },
    '& .emoji-mart-emoji': { outline: 'none' },
    '& .emoji-mart-preview-name': {
      color: theme.palette.text.primary
    },
    '& .emoji-mart-preview-shortname, .emoji-mart-preview-emoticon': {
      color: theme.palette.text.secondary
    }
  }
}));

// ----------------------------------------------------------------------

EmojiPicker.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  setValue: PropTypes.func,
  alignRight: PropTypes.bool,
  className: PropTypes.string
};

function EmojiPicker({
  disabled,
  value,
  setValue,
  alignRight = false,
  className,
  ...other
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [emojiPickerState, SetEmojiPicker] = useState(false);

  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        color={theme.palette.primary.main}
        title="Pick your emoji…"
        emoji="point_up"
        onSelect={(emoji) => setValue(value + emoji.native)}
      />
    );
  }

  const triggerPicker = (e) => {
    e.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  };

  const handleClickAway = () => {
    SetEmojiPicker(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={clsx(classes.root, className)} {...other}>
        <div
          className={clsx(classes.picker, { [classes.alignRight]: alignRight })}
        >
          {emojiPicker}
        </div>
        <IconButton disabled={disabled} size="small" onClick={triggerPicker}>
          <Icon icon={smilingFaceFill} width={20} height={20} />
        </IconButton>
      </div>
    </ClickAwayListener>
  );
}

export default EmojiPicker;

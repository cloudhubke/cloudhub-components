/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import clsx from 'clsx';

// ----------------------------------------------------------------------

import inline_bold from './editoricons/inline_bold.svg';
import inline_italic from './editoricons/inline_italic.svg';
import inline_underline from './editoricons/inline_underline.svg';
import inline_strikethrough from './editoricons/inline_strikethrough.svg';
import list_unordered from './editoricons/list_unordered.svg';
import list_ordered from './editoricons/list_ordered.svg';
import list_indent from './editoricons/list_indent.svg';
import list_outdent from './editoricons/list_outdent.svg';
import align_left from './editoricons/align_left.svg';
import align_center from './editoricons/align_center.svg';
import align_right from './editoricons/align_right.svg';
import align_justify from './editoricons/align_justify.svg';
import link from './editoricons/link.svg';
import unlink from './editoricons/unlink.svg';
import monospace from './editoricons/monospace.svg';
import superscript from './editoricons/superscript.svg';
import subscript from './editoricons/subscript.svg';
import embedded from './editoricons/embedded.svg';
import colorpicker from './editoricons/colorpicker.svg';
import emoji from './editoricons/emoji.svg';
import image from './editoricons/image.svg';
import remove from './editoricons/remove.svg';
import history_undo from './editoricons/history_undo.svg';
import history_redo from './editoricons/history_redo.svg';

export const editorToolbar = {
  inline: {
    bold: { icon: inline_bold, className: 'toggle' },
    italic: { icon: inline_italic, className: 'toggle' },
    underline: { icon: inline_underline, className: 'toggle' },
    strikethrough: { icon: inline_strikethrough, className: 'toggle' },
    monospace: { icon: monospace, className: 'toggle' },
    superscript: { icon: superscript, className: 'toggle' },
    subscript: { icon: subscript, className: 'toggle' },
  },
  blockType: {
    className: 'dropdown',
    dropdownClassName: 'dropdown__option',
  },
  fontSize: {
    className: 'dropdown',
    dropdownClassName: 'dropdown__option',
  },
  list: {
    unordered: { icon: list_unordered, className: 'toggle' },
    ordered: { icon: list_ordered, className: 'toggle' },
    indent: { icon: list_indent, className: 'toggle' },
    outdent: { icon: list_outdent, className: 'toggle' },
  },
  textAlign: {
    left: { icon: align_left, className: 'toggle' },
    center: { icon: align_center, className: 'toggle' },
    right: { icon: align_right, className: 'toggle' },
    justify: { icon: align_justify, className: 'toggle' },
  },
  fontFamily: {
    className: 'dropdown',
    dropdownClassName: 'dropdown__option',
  },
  colorPicker: {
    icon: colorpicker,
    className: 'toggle',
    popupClassName: clsx('popup', 'popup__colorpicker'),
  },
  link: {
    popupClassName: clsx('popup', 'popup__link'),
    link: { icon: link, className: 'toggle' },
    unlink: { icon: unlink, className: 'toggle' },
  },
  emoji: {
    icon: emoji,
    className: 'toggle',
    popupClassName: clsx('popup', 'popup__emoji'),
  },
  embedded: {
    icon: embedded,
    className: 'toggle',
    popupClassName: clsx('popup', 'popup__embedded'),
  },
  image: {
    icon: image,
    className: 'toggle',
    popupClassName: clsx('popup', 'popup__image'),
    uploadCallback: uploadImageCallBack,
    alt: { present: true, mandatory: true },
  },
  remove: { icon: remove, className: 'toggle' },
  history: {
    undo: { icon: history_undo, className: 'toggle' },
    redo: { icon: history_redo, className: 'toggle' },
  },
};

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/image');
    xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
    const data = new FormData();
    data.append('image', file);
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

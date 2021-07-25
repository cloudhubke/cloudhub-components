import React from 'react';
import { Icon } from '@iconify/react';
import fileFill from '@iconify-icons/eva/file-fill';
import fileTypePdf from '@iconify-icons/vscode-icons/file-type-pdf';
import fileTypeAi2 from '@iconify-icons/vscode-icons/file-type-ai2';
import fileTypeWord from '@iconify-icons/vscode-icons/file-type-word';
import fileTypeExcel from '@iconify-icons/vscode-icons/file-type-excel';
import fileTypeVideo from '@iconify-icons/vscode-icons/file-type-video';
import fileTypePowerpoint from '@iconify-icons/vscode-icons/file-type-powerpoint';
import fileTypePhotoshop2 from '@iconify-icons/vscode-icons/file-type-photoshop2';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 28,
  height: 28
};

export function getFileType(fileUrl) {
  return fileUrl.split(/[#?]/)[0].split('.').pop().trim();
}

export function getFileName(fileUrl) {
  return fileUrl
    .substring(fileUrl.lastIndexOf('/') + 1)
    .replace(/\.[^/.]+$/, '');
}

export function getFileFullName(fileUrl) {
  return fileUrl.split('/').pop();
}

export function getFileFormat(fileUrl) {
  if (['jpg', 'jpeg', 'gif', 'bmp', 'png'].includes(getFileType(fileUrl)))
    return 'image';

  if (['m4v', 'avi', 'mpg', 'mp4', 'webm'].includes(getFileType(fileUrl)))
    return 'video';

  if (['doc', 'docx'].includes(getFileType(fileUrl))) return 'word';

  if ([' xls', 'xlsx'].includes(getFileType(fileUrl))) return 'excel';

  if (['ppt', 'pptx'].includes(getFileType(fileUrl))) return 'powerpoint';

  if (['pdf'].includes(getFileType(fileUrl))) return 'pdf';

  if (['psd'].includes(getFileType(fileUrl))) return 'photoshop';

  if (['ai', 'esp'].includes(getFileType(fileUrl))) return 'illustrator';

  return 'other';
}

export function getFileThumb(fileUrl) {
  let thumb;
  switch (getFileFormat(fileUrl)) {
    case 'image':
      thumb = <img src={fileUrl} alt={fileUrl} />;
      break;
    case 'video':
      thumb = <Icon icon={fileTypeVideo} {...ICON_SIZE} />;
      break;
    case 'word':
      thumb = <Icon icon={fileTypeWord} {...ICON_SIZE} />;
      break;
    case 'excel':
      thumb = <Icon icon={fileTypeExcel} {...ICON_SIZE} />;
      break;
    case 'powerpoint':
      thumb = <Icon icon={fileTypePowerpoint} {...ICON_SIZE} />;
      break;
    case 'pdf':
      thumb = <Icon icon={fileTypePdf} {...ICON_SIZE} />;
      break;
    case 'photoshop':
      thumb = <Icon icon={fileTypePhotoshop2} {...ICON_SIZE} />;
      break;
    case 'illustrator':
      thumb = <Icon icon={fileTypeAi2} {...ICON_SIZE} />;
      break;
    default:
      thumb = <Icon icon={fileFill} {...ICON_SIZE} />;
  }
  return thumb;
}

// ----------------------------------------------------------------------

export default function getColorName(hex) {
  if (hex === '#00AB55') {
    return 'Green';
  }
  if (hex === '#000000') {
    return 'Black';
  }
  if (hex === '#FFFFFF') {
    return 'White';
  }
  if (hex === '#FFC0CB') {
    return 'Pink';
  }
  if (hex === '#FF4842') {
    return 'Red';
  }
  if (hex === '#1890FF') {
    return 'Blue';
  }
  if (hex === '#94D82D') {
    return 'Greenyellow';
  }
  if (hex === '#FFC107') {
    return 'Orange';
  }
  return;
}

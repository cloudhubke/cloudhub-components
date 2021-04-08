// ----------------------------------------------------------------------

function maxLengthCheck(object) {
  if (object.target.value.length > object.target.maxLength) {
    return (object.target.value = object.target.value.slice(
      0,
      object.target.maxLength
    ));
  }
}

export default maxLengthCheck;

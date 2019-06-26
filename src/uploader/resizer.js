const resizer = (file, maxSize) => {
  /* Utility function to convert a canvas to a BLOB */
  const dataURLToBlob = dataURL => {
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      const parts = dataURL.split(',');
      const contentType = parts[0].split(':')[1];
      const raw = parts[1];

      return new Blob([raw], { type: contentType });
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { ...file, type: contentType });
  };
  /* End Utility function to convert a canvas to a BLOB      */

  // Ensure it's an image
  return new Promise(resolve => {
    if (file.type.match(/image.*/)) {
      // Load the image
      const reader = new FileReader();
      reader.onload = readerEvent => {
        const image = new Image();
        image.onload = imageEvent => {
          // Resize the image
          const canvas = document.createElement('canvas');
          let { width } = image;
          let { height } = image;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg');
          const resizedImage = dataURLToBlob(dataUrl);

          const newname = file.name.split('.')[0];

          resizedImage.lastModified = file.lastModified;
          resizedImage.lastModifiedDate = file.lastModifiedDate;
          resizedImage.name = `${newname}.jpg`;
          resizedImage.uid = file.uid;
          resizedImage.percent = 0;
          //       resizedImage.originFileObj = file;

          resolve(resizedImage);
        };
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      resolve(null);
    }
  });
};

export default resizer;

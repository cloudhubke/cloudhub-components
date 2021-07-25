// ----------------------------------------------------------------------

export const BASE_IMG =
  'https://res.cloudinary.com/trinhmai/image/upload/c_scale,f_auto,q_auto,';

export const getImgCover = (width, index) =>
  `${BASE_IMG}w_${width}/v1611411356/upload_minimal/covers/cover_${index}.jpg`;

export const getImgFeed = (width, index) =>
  `${BASE_IMG}w_${width}/v1611420989/upload_minimal/feeds/feed_${index}.jpg`;

export const getImgProduct = (width, index) =>
  `${BASE_IMG}w_${width}/v1611420989/upload_minimal/products/shose_${index}.jpg`;

export const getImgAvatar = (index) =>
  `/static/images/avatars/avatar_${index}.jpg`;

// Only Home Page
export const getImgComponent = (width, name, mode) =>
  `${BASE_IMG}w_${width}/v1611426110/upload_minimal/components/${name}_${mode}.jpg`;

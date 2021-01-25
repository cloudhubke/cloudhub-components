import React from 'react';
import PageSeo from './PageSeo';
import SeoContext from './SeoContext';

const SeoProvicder = ({ children, ...props }) => {
  if (!props.homeUrl || !props.siteName || !props.description) {
    throw new Error('Invalid SEO Params');
  }

  return (
    <SeoContext.Provider value={{ ...props }}>
      <PageSeo ogType="website" />
      {children}
    </SeoContext.Provider>
  );
};

SeoProvicder.defaultProps = {
  siteName: '',
  title: '',
  description: '',
  image: '',

  homeUrl: '%PUBLIC_URL%',
  tags: [],
  twitterHandle: '',
  fbId: '',
};

export default SeoProvicder;

import React from 'react';
import PageSeo from './PageSeo';
import SeoContext from './SeoContext';

const SeoProvicder = ({ children, ...props }) => (
  <SeoContext.Provider value={{ ...props }}>
    <PageSeo
      title={props.title}
      description={props.description}
      image={props.image}
      ogType="website"
    />
    {children}
  </SeoContext.Provider>
);

SeoProvicder.defaultProps = {
  title: '',
  description: '',
  image: '',

  homeUrl: '%PUBLIC_URL%',
  tags: [],
  twitterHandle: '',
  fbId: '',
};

export default SeoProvicder;

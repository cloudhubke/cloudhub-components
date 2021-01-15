import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import useLocation from '../customhooks/useLocation';
import SeoContext from './SeoContext';

const PageSeo = ({
  title,
  description,
  image,

  ogType,
  published,
  updated,
  tags,
}) => {
  const {
    homeUrl,
    siteName,
    twitterHandle,
    fbId,
    description: siteDescription,
    image: siteImage,
    title: defaultTitle,
    tags: keywords,
  } = React.useContext(SeoContext);

  const keywordsArray = [...(tags || []), ...(keywords || [])];

  const { location } = useLocation();

  let imageUrl;

  if (image) {
    const hasSlash =
      `${homeUrl}`.slice(`${homeUrl}`.length - 1) === '/' ||
      `${image}`.slice(0, 1) === '/';

    imageUrl = `${image}`.includes('http')
      ? image
      : `${homeUrl}${hasSlash ? '' : '/'}${image}`;
  } else {
    const hasSlash =
      `${homeUrl}`.slice(`${homeUrl}`.length - 1) === '/' ||
      `${siteImage}`.slice(0, 1) === '/';

    imageUrl = `${siteImage}`.includes('http')
      ? siteImage
      : `${homeUrl}${hasSlash ? '' : '/'}${siteImage}`;
  }

  const getMetaTags = () => {
    const metaTags = [
      { itemprop: 'name', content: title || defaultTitle },
      { itemprop: 'description', content: description || siteDescription },
      { itemprop: 'image', content: `${imageUrl}` },
      {
        name: 'description',
        property: 'description',
        content: description || siteDescription,
      },
      {
        name: 'keywords',
        property: 'keywords',
        content: keywordsArray.join(', '),
      },

      {
        name: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        property: 'twitter:site',
        content: `${twitterHandle}`,
      },
      {
        name: 'twitter:title',
        property: 'twitter:title',
        content: `${siteName}: ${title || defaultTitle}`,
      },
      {
        name: 'twitter:description',
        property: 'twitter:description',
        content: description || siteDescription,
      },
      {
        name: 'twitter:creator',
        property: 'twitter:creator',
        content: twitterHandle,
      },
      {
        name: 'twitter:image:src',
        property: 'twitter:image:src',
        content: `${imageUrl}`,
      },
      {
        name: 'og:title',
        property: 'og:title',
        content: `${siteName}: ${title || defaultTitle}`,
      },
      { name: 'og:type', property: 'og:type', content: ogType },
      {
        name: 'og:url',
        property: 'og:url',
        content: `${homeUrl}${location.pathname}`,
      },
      { name: 'og:image', property: 'og:image', content: `${imageUrl}` },
      {
        name: 'og:description',
        property: 'og:description',
        content: description || siteDescription,
      },

      { name: 'og:site_name', property: 'og:site_name', content: siteName },
      { name: 'fb:app_id', property: 'fb:app_id', content: fbId },
    ];

    return metaTags;
  };

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
      title={`${siteName}: ${title || defaultTitle}`}
      link={[{ rel: 'canonical', href: `${homeUrl}${location.pathname}` }]}
      meta={getMetaTags()}
    />
  );
};

PageSeo.defaultProps = {
  title: '',
  description: '',
  image: '',

  ogType: 'article',
  published: '',
  updated: '',
  tags: [],
};

PageSeo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,

  ogType: PropTypes.string,
  published: PropTypes.string,
  updated: PropTypes.string,
  tags: PropTypes.array,
};

export default PageSeo;

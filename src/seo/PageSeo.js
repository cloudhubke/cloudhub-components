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
  } = React.useContext(SeoContext);

  const { location } = useLocation();

  let imageUrl;

  if (image) {
    imageUrl = `${image}`.includes('http')
      ? image
      : `${homeUrl}${image}`.replace('//', '/');
  } else {
    imageUrl = `${siteImage}`.includes('http')
      ? siteImage
      : `${homeUrl}${siteImage}`.replace('//', '/');
  }

  const getMetaTags = () => {
    const metaTags = [
      { itemprop: 'name', content: title || defaultTitle },
      { itemprop: 'description', content: description || siteDescription },
      { itemprop: 'image', content: `${imageUrl}` },
      { name: 'description', content: description || siteDescription },
      { name: 'keywords', content: tags.join(', ') },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: `${twitterHandle}` },
      {
        name: 'twitter:title',
        content: `${siteName}: ${title || defaultTitle}`,
      },
      { name: 'twitter:description', content: description || siteDescription },
      { name: 'twitter:creator', content: twitterHandle },
      {
        name: 'twitter:image:src',
        content: `${imageUrl}`,
      },
      { name: 'og:title', content: `${siteName}: ${title || defaultTitle}` },
      { name: 'og:type', content: ogType },
      { name: 'og:url', content: `${homeUrl}${location.pathname}` },
      { name: 'og:image', content: `${imageUrl}` },
      { name: 'og:description', content: description || siteDescription },

      { name: 'og:site_name', content: siteName },
      { name: 'fb:app_id', content: fbId },
    ];

    if (published) {
      metaTags.push({ name: 'article:published_time', content: published });
    }
    if (updated) {
      metaTags.push({ name: 'article:modified_time', content: updated });
    }

    if (tags) metaTags.push({ name: 'article:tag', content: tags });

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

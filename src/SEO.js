import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import sample from 'lodash/sample';

const seoImages = {
  openGraph: [
    'manifested1.png',
    'manifested2.png',
    'manifested3.png',
    'manifested4.png'
  ],
  twitter: [
    'manifested1.png',
    'manifested2.png',
    'manifested3.png',
    'manifested4.png'
  ],
  google: [
    'manifested1.png',
    'manifested2.png',
    'manifested3.png',
    'manifested4.png'
  ]
};

const seoImageURL = file =>
  `http://manfiles.s3-website-us-west-2.amazonaws.com/images/${file}`;

const seoURL = path => `http://newsite.manifestedpublishers.com${path}`;

const getMetaTags = ({
  title,
  description,
  url,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter
}) => {
  const metaTags = [
    { itemprop: 'name', content: title },
    { itemprop: 'description', content: description },
    { itemprop: 'image', content: seoImageURL(sample(seoImages.google)) },
    { name: 'description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@ManifestedP' },
    { name: 'twitter:title', content: `${title}` },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: twitter },
    {
      name: 'twitter:image:src',
      content: seoImageURL(sample(seoImages.twitter))
    },
    { name: 'og:title', content: `${title}` },
    { name: 'og:type', content: contentType },
    { name: 'og:url', content: url },
    { name: 'og:image', content: seoImageURL(sample(seoImages.openGraph)) },
    { name: 'og:description', content: description },
    { name: 'og:site_name', content: title },
    { name: 'fb:app_id', content: '1668751170097512' }
  ];

  if (published) {
    metaTags.push({ name: 'article:published_time', content: published });
  }
  if (updated) {
    metaTags.push({ name: 'article:modified_time', content: updated });
  }
  if (category) metaTags.push({ name: 'article:section', content: category });
  if (tags) metaTags.push({ name: 'article:tag', content: tags });

  return metaTags;
};

const SEO = ({
  schema,
  title,
  description,
  path,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter
}) => (
  <Helmet
    htmlAttributes={{
      lang: 'en',
      itemscope: undefined,
      itemtype: `http://schema.org/${schema}`
    }}
    title={`Manifested Publishers: ${title}`}
    link={[{ rel: 'canonical', href: seoURL(path) }]}
    meta={getMetaTags({
      title,
      description,
      contentType,
      url: seoURL(path),
      published,
      updated,
      category,
      tags,
      twitter
    })}
  />
);

SEO.defaultProps = {
  schema: 'HomePage',
  title: 'ManifestedPublishers.com',
  description: `Manifested Publishers is the leading producer of academic books in East and Central Africa region,
     specialising in publishing of study materials for various accounting, business and management 
     courses like Certified Public Accountants (CPA),Certified Public Secretaries (CPS),Certified Credit Professionals (CCP), 
     Accounting Technicians Certificate (ATC), Certified Securities and 
     Investment Analysts (CSIA),Certified Information Communication Technologists (CICT), B.com and Kenya National Examination Council (KNEC) courses.`,
  path: '/',
  contentType: 'Product',
  published: '',
  updated: '',
  category: '',
  tags: [
    'CPA',
    'KASNEB',
    'KNEC',
    'Accounting',
    'Manifested Publishers',
    'CISA',
    'CIST',
    'Past',
    'Papers',
    'Past Papers',
    'Revision',
    'Online Lectures'
  ],
  twitter: 'ManifestedP'
};

SEO.propTypes = {
  schema: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  contentType: PropTypes.string,
  published: PropTypes.string,
  updated: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
  twitter: PropTypes.string
};

export default SEO;

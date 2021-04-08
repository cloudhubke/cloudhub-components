import React from 'react';
import { Helmet } from 'react-helmet';

function GoogleAnalytics({ config }) {
  return (
    <Helmet>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsConfig}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());
          gtag('config', '${config.googleAnalyticsConfig}');
        `}
      </script>
    </Helmet>
  );
}

export default GoogleAnalytics;

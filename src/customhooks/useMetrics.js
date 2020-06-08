import React, { useEffect, useLayoutEffect } from 'react';

const hasWindow = typeof window !== 'undefined';

const useMetrics = () => {
  const [width, setWidth] = React.useState(hasWindow && window.innerWidth);
  const [height, setHeight] = React.useState(hasWindow && window.innerHeight);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (global.navigator) {
      const isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      setIsMobile(isMobile);
    }
  }, []);

  React.useEffect(() => {
    const getMaxWidth = () => {
      if (width < 600 || isMobile) {
        return 'sm';
      }
      if (width < 960) {
        return 'md';
      }
      if (width < 1280) {
        return 'lg';
      }

      return 'lg';
    };

    setMaxWidth(getMaxWidth());
  }, [width]);

  useLayoutEffect(() => {
    const resize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return { height, width, maxWidth, isMobile };
};

export default useMetrics;

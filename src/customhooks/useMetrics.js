import React, { useEffect } from 'react';

const hasWindow = typeof window !== 'undefined';

const useMetrics = () => {
  const [width, setWidth] = React.useState(hasWindow && window.innerWidth);
  const [height, setHeight] = React.useState(hasWindow && window.innerHeight);

  useEffect(() => {
    const resize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  });

  return { height, width };
};

export default useMetrics;

import React from 'react';

const ScrollToTop = ({ children, location: { pathname } }) => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return children || null;
};

export default ScrollToTop;

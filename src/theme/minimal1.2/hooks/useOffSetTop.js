import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useOffSetTop(top) {
  const [offsetTop, setOffSetTop] = useState(false);
  const isTop = top ? top : 100;

  useEffect(() => {
    window.onscroll = function () {
      if (window.pageYOffset > isTop) {
        setOffSetTop(true);
      } else {
        setOffSetTop(false);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [isTop]);

  return offsetTop;
}

// Usage
// const offset = useOffSetTop(100);

// useWindowSize Hook
// This custom React hook provides a simple way to access the current window size in your components.
// It returns an object with properties `height` and `width` representing the window's inner dimensions.
// Usage: Call this hook within your components to access and react to changes in the window size.

import { useLayoutEffect, useState } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  });
  useLayoutEffect(() => {
    function updateSize() {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

import React from 'react';
import { debounce } from '../helpers/debounce';

export const useWindowResize = () => {
  const [size, setSize] = React.useState<number>(window.innerWidth);

  React.useEffect(() => {
    const debouncedFunc = debounce(() => {
      setSize(window.innerWidth);
    }, 300);

    window.addEventListener('resize', debouncedFunc);
    return () => {
      window.removeEventListener('resize', debouncedFunc);
    };
  }, []);

  return { size };
};

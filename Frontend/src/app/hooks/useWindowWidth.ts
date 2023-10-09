import { useEffect, useState } from 'react';

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}

// We have in this hook the value of width and setWidth because we are
// interested in changing the width of the window and we need to store it in the width,
// with the setWidth we change the values change so that we can do whatever we like
// with the specific width as it changes

// The useEffect is used for us to be able to watch and control the size of the width
// for us to execute some function in our case the handleResize;
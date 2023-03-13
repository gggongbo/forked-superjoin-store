import { useState, useEffect, RefObject } from 'react';

const useInClick = (refObject: RefObject<HTMLElement>) => {
  const [inClicked, setInClikced] = useState(false);

  useEffect(() => {
    const handleInsideClick = (event: Event) => {
      if (!event.target) return;

      if (!refObject.current?.contains(event.target as HTMLElement)) {
        setInClikced(false);
      }
    };
    document.addEventListener('click', handleInsideClick);
    document.addEventListener('touchstart', handleInsideClick);
    return () => {
      document.removeEventListener('click', handleInsideClick);
      document.removeEventListener('touchstart', handleInsideClick);
    };
  }, [refObject]);
  return { inClicked, setInClikced };
};

export { useInClick };

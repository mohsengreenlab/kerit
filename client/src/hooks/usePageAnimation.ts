import { useEffect, useState } from 'react';

export function usePageAnimation(pageName: string) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const visitKey = `visited_${pageName}`;
    const hasVisited = sessionStorage.getItem(visitKey);
    
    if (!hasVisited) {
      setShouldAnimate(true);
      sessionStorage.setItem(visitKey, 'true');
    }
  }, [pageName]);

  return shouldAnimate;
}
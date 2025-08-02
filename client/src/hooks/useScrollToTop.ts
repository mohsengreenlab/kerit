import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);
}
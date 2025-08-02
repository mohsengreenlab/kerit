import { useEffect, useState } from 'react';

export function usePageAnimation(pageName: string) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const visitKey = `visited_${pageName}`;
    const sessionId = sessionStorage.getItem('session_id') || `session_${Date.now()}_${Math.random()}`;
    
    // Store session ID if not exists
    if (!sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', sessionId);
    }
    
    const visitKeyWithSession = `${visitKey}_${sessionId}`;
    const hasVisited = sessionStorage.getItem(visitKeyWithSession);
    
    if (!hasVisited) {
      setShouldAnimate(true);
      sessionStorage.setItem(visitKeyWithSession, 'true');
    }
  }, [pageName]);

  return shouldAnimate;
}
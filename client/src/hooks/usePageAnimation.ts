import { useEffect, useState } from 'react';

export function usePageAnimation(pageName: string) {
  // Initialize with the correct value immediately to prevent flash
  const [shouldAnimate, setShouldAnimate] = useState(() => {
    try {
      const visitKey = `visited_${pageName}`;
      const sessionId = sessionStorage.getItem('session_id');
      if (!sessionId) return true; // First visit ever
      
      const visitKeyWithSession = `${visitKey}_${sessionId}`;
      const hasVisited = sessionStorage.getItem(visitKeyWithSession);
      return !hasVisited; // Only animate if not visited
    } catch {
      return true; // Default to animating if sessionStorage fails
    }
  });

  useEffect(() => {
    const visitKey = `visited_${pageName}`;
    let sessionId = sessionStorage.getItem('session_id');
    
    // Create session ID if not exists
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random()}`;
      sessionStorage.setItem('session_id', sessionId);
    }
    
    const visitKeyWithSession = `${visitKey}_${sessionId}`;
    const hasVisited = sessionStorage.getItem(visitKeyWithSession);
    
    if (!hasVisited) {
      setShouldAnimate(true);
      sessionStorage.setItem(visitKeyWithSession, 'true');
    } else {
      setShouldAnimate(false);
    }
  }, [pageName]);

  return shouldAnimate;
}
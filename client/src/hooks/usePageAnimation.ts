import { useEffect, useState } from 'react';

// Generate session ID once per browser session
const getOrCreateSessionId = () => {
  let sessionId = sessionStorage.getItem('page_animations_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random()}`;
    sessionStorage.setItem('page_animations_session_id', sessionId);
  }
  return sessionId;
};

export function usePageAnimation(pageName: string) {
  // Initialize with the correct value immediately to prevent flash
  const [shouldAnimate, setShouldAnimate] = useState(() => {
    try {
      const sessionId = getOrCreateSessionId();
      const visitKey = `page_visited_${pageName}_${sessionId}`;
      const hasVisited = sessionStorage.getItem(visitKey);
      return !hasVisited; // Only animate if not visited in this session
    } catch {
      return true; // Default to animating if sessionStorage fails
    }
  });

  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    const visitKey = `page_visited_${pageName}_${sessionId}`;
    const hasVisited = sessionStorage.getItem(visitKey);
    
    if (!hasVisited) {
      setShouldAnimate(true);
      sessionStorage.setItem(visitKey, 'true');
    } else {
      setShouldAnimate(false);
    }
  }, [pageName]);

  return shouldAnimate;
}
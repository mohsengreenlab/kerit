import { apiRequest } from './queryClient';

let sessionId: string | null = null;
let visitorId: string | null = null;

export async function initializeAnalytics() {
  // Check if user has accepted cookies
  const cookieConsent = localStorage.getItem('cookieConsent');
  if (cookieConsent !== 'accepted') {
    return;
  }

  try {
    sessionId = localStorage.getItem('sessionId') || generateSessionId();
    localStorage.setItem('sessionId', sessionId);
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
  }
}

export async function trackPageView(path: string, title?: string) {
  // Check if user has accepted cookies
  const cookieConsent = localStorage.getItem('cookieConsent');
  if (cookieConsent !== 'accepted') {
    return;
  }

  if (!sessionId) {
    await initializeAnalytics();
  }

  try {
    const response = await apiRequest('POST', '/api/analytics/track', {
      path,
      title,
    });

    const data = await response.json();
    if (data.sessionId) {
      sessionId = data.sessionId;
      localStorage.setItem('sessionId', sessionId);
    }
    if (data.visitorId) {
      visitorId = data.visitorId;
    }
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

function generateSessionId(): string {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Initialize analytics when the module loads
if (typeof window !== 'undefined') {
  initializeAnalytics();
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function sendEvent(visitId: string, eventType: string, payload: Record<string, unknown> = {}): Promise<void> {
  try {
    await fetch(`${API_URL}/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visit_id: visitId, event_type: eventType, payload }),
      keepalive: true,
    });
  } catch {
    // analytics are best-effort — never break the viewer
  }
}

export function trackVisit(visitId: string): () => void {
  const startTime = Date.now();

  sendEvent(visitId, 'visit_start');

  const interval = setInterval(() => {
    const seconds = Math.round((Date.now() - startTime) / 1000);
    sendEvent(visitId, 'visit_duration', { seconds });
  }, 30_000);

  const onUnload = () => {
    const seconds = Math.round((Date.now() - startTime) / 1000);
    sendEvent(visitId, 'visit_duration', { seconds, final: true });
    clearInterval(interval);
  };

  window.addEventListener('beforeunload', onUnload);

  return () => {
    clearInterval(interval);
    window.removeEventListener('beforeunload', onUnload);
  };
}

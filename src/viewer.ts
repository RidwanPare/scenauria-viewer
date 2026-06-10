export interface ViewerOptions {
  sceneUrl: string;
  posterUrl?: string | null;
  visitId?: string | null;
}

export function mountViewer(container: HTMLElement, opts: ViewerOptions): void {
  const params = new URLSearchParams();
  params.set('content', opts.sceneUrl);
  if (opts.posterUrl) params.set('poster', opts.posterUrl);

  const iframe = document.createElement('iframe');
  iframe.id = 'viewer-frame';
  iframe.src = `/supersplat?${params.toString()}`;
  iframe.allow = 'autoplay; fullscreen; xr-spatial-tracking';
  iframe.setAttribute('allowfullscreen', '');

  container.appendChild(iframe);
}

export async function initViewer(sceneUrl: string, visitId?: string): Promise<void> {
  const container = document.getElementById('viewer-container');
  if (!container) return;

  container.innerHTML = `
    <canvas id="viewer-canvas" style="width:100%;height:100%;display:block;"></canvas>
  `;

  console.log('Viewer initialisé', { sceneUrl, visitId });
  // Intégration SuperSplat Viewer à implémenter dans la phase suivante
}

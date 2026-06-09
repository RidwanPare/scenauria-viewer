import './style.css';

const params = new URLSearchParams(window.location.search);
const sceneUrl = params.get('scene');
const visitId = params.get('visitId');

if (!sceneUrl) {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div style="color: red; padding: 2rem;">
      Paramètre <code>scene</code> manquant dans l'URL.
    </div>
  `;
} else {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div id="viewer-container">
      <p>Chargement de la visite...</p>
    </div>
  `;
  import('./viewer').then(({ initViewer }) => {
    initViewer(sceneUrl, visitId ?? undefined);
  });
}

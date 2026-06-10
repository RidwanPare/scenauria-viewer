import './style.css';
import { mountViewer } from './viewer';
import { trackVisit } from './analytics';

const params = new URLSearchParams(window.location.search);
const sceneUrl = params.get('scene');
const visitId = params.get('visitId');
const posterUrl = params.get('poster');

const app = document.getElementById('app')!;

if (!sceneUrl) {
  app.innerHTML = `
    <div id="error-screen">
      Paramètre <strong>scene</strong> manquant dans l'URL.
      <code>?scene=https://cdn.example.com/scene.compressed.ply</code>
    </div>
  `;
} else {
  mountViewer(app, { sceneUrl, posterUrl, visitId });

  if (visitId) {
    trackVisit(visitId);
  }
}

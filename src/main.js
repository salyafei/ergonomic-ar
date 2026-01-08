/**
 * Main entry point for WebAR landing page
 * Handles device detection, feature checking, and navigation
 */

import './components/feature-detect.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('WebAR Landing Page initialized');

  initializeApp();
});

async function initializeApp() {
  // Get feature detection results
  const features = await window.FeatureDetect.checkAll();

  updateUI(features);
  setupEventListeners(features);
}

function updateUI(features) {
  const deviceInfo = document.getElementById('device-info');
  const browserInfo = document.getElementById('browser-info');
  const surfaceBtn = document.getElementById('start-surface-btn');
  const surfaceNote = document.getElementById('surface-note');

  // Update device info
  deviceInfo.textContent = `${features.platform.os} - ${features.platform.browser}`;
  browserInfo.textContent = features.platform.isMobile ? '📱 Mobile Device' : '🖥️ Desktop';

  // Update requirement checkmarks
  updateRequirement('req-https', features.https);
  updateRequirement('req-webgl', features.webgl);
  updateRequirement('req-camera', features.camera);
  updateRequirement('req-webxr', features.webxr);

  // Update Surface Detection button
  if (features.webxr && features.camera) {
    // Full WebXR support (Android Chrome)
    surfaceBtn.textContent = 'Start AR Experience';
    surfaceBtn.disabled = false;
    surfaceNote.textContent = '✅ Full WebXR support detected';
    surfaceNote.className = 'card-note success';
  } else if (features.webgl && features.isMobile) {
    // Fallback mode (iOS Safari)
    surfaceBtn.textContent = 'Start (Fallback Mode)';
    surfaceBtn.disabled = false;
    surfaceNote.textContent = '⚠️ Using simulated surface detection';
    surfaceNote.className = 'card-note warning';
  } else {
    // Desktop or unsupported
    surfaceBtn.textContent = '3D Viewer Only';
    surfaceBtn.disabled = false;
    surfaceNote.textContent = 'ℹ️ AR features not available on this device';
    surfaceNote.className = 'card-note info';
  }

  // Show device-specific warnings
  if (!features.https) {
    showWarning('HTTPS Required', 'Camera access requires a secure connection (HTTPS)');
  }

  if (features.platform.os === 'iOS' && !features.webxr) {
    console.warn('iOS detected without WebXR support - will use fallback mode');
  }
}

function updateRequirement(id, passed) {
  const element = document.getElementById(id);
  if (!element) return;

  const statusSpan = element.querySelector('.status');
  if (passed) {
    statusSpan.textContent = '✅';
    element.classList.add('passed');
  } else {
    statusSpan.textContent = '❌';
    element.classList.add('failed');
  }
}

function setupEventListeners(features) {
  // Surface Detection button
  const surfaceBtn = document.getElementById('start-surface-btn');
  surfaceBtn.addEventListener('click', () => {
    // Check camera permission before navigating
    if (features.camera || features.webgl) {
      showLoadingOverlay();
      // Navigate to AR scene (Vite builds flatten to root)
      window.location.href = './surface-detection.html';
    } else {
      showPermissionModal();
    }
  });

  // Modal close button
  const closeModalBtn = document.getElementById('close-modal-btn');
  closeModalBtn.addEventListener('click', hidePermissionModal);
}

function showWarning(title, message) {
  const deviceStatus = document.getElementById('device-status');
  deviceStatus.innerHTML = `
    <h3>⚠️ ${title}</h3>
    <p>${message}</p>
  `;
  deviceStatus.style.borderColor = '#f59e0b';
}

function showPermissionModal() {
  const modal = document.getElementById('permission-modal');
  modal.classList.remove('hidden');
}

function hidePermissionModal() {
  const modal = document.getElementById('permission-modal');
  modal.classList.add('hidden');
}

function showLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  overlay.classList.remove('hidden');
}

// Handle visibility change (pause/resume)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page hidden - pausing');
  } else {
    console.log('Page visible - resuming');
  }
});

// Error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

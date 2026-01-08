/**
 * A-Frame System: ui-hints
 * Manages overlay messages, toasts, and user guidance during AR experience
 */

/* global AFRAME */

AFRAME.registerSystem('ui-hints', {
  schema: {
    enabled: { type: 'boolean', default: true },
  },

  init() {
    this.currentToast = null;
    this.toastQueue = [];
    this.toastDuration = 3000;

    // Create UI overlay container
    this.createOverlay();

    console.log('UI hints system initialized');
  },

  createOverlay() {
    // Create overlay div
    const overlay = document.createElement('div');
    overlay.id = 'ar-ui-overlay';
    overlay.className = 'ar-ui-overlay';
    document.body.appendChild(overlay);

    // Create toast container
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    overlay.appendChild(toastContainer);

    // Create instruction panel
    const instructionPanel = document.createElement('div');
    instructionPanel.id = 'instruction-panel';
    instructionPanel.className = 'instruction-panel';
    instructionPanel.innerHTML = `
      <p class="instruction-text">Move your phone slowly to detect surfaces</p>
    `;
    overlay.appendChild(instructionPanel);

    // Create status indicator
    const statusIndicator = document.createElement('div');
    statusIndicator.id = 'status-indicator';
    statusIndicator.className = 'status-indicator';
    statusIndicator.innerHTML = `
      <span class="status-dot"></span>
      <span class="status-text">Initializing...</span>
    `;
    overlay.appendChild(statusIndicator);

    this.overlay = overlay;
    this.toastContainer = toastContainer;
    this.instructionPanel = instructionPanel;
    this.statusIndicator = statusIndicator;
  },

  /**
   * Show a toast message
   */
  showToast(message, type = 'info', duration = null) {
    if (!this.data.enabled) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = this.getIconForType(type);
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto-remove after duration
    const toastDuration = duration || this.toastDuration;
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, toastDuration);

    return toast;
  },

  getIconForType(type) {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      tip: '💡',
    };
    return icons[type] || icons.info;
  },

  /**
   * Update instruction text
   */
  updateInstruction(text) {
    if (!this.instructionPanel) return;
    const textEl = this.instructionPanel.querySelector('.instruction-text');
    if (textEl) {
      textEl.textContent = text;
    }
  },

  /**
   * Show instruction panel
   */
  showInstructions() {
    if (this.instructionPanel) {
      this.instructionPanel.classList.add('show');
    }
  },

  /**
   * Hide instruction panel
   */
  hideInstructions() {
    if (this.instructionPanel) {
      this.instructionPanel.classList.remove('show');
    }
  },

  /**
   * Update status indicator
   */
  updateStatus(text, type = 'active') {
    if (!this.statusIndicator) return;

    const statusDot = this.statusIndicator.querySelector('.status-dot');
    const statusText = this.statusIndicator.querySelector('.status-text');

    if (statusText) {
      statusText.textContent = text;
    }

    if (statusDot) {
      statusDot.className = `status-dot status-${type}`;
    }
  },

  /**
   * Show common hints based on events
   */
  showHint(hintType) {
    const hints = {
      lowLight: {
        message: 'Low light detected. Move to a brighter area for better tracking.',
        type: 'warning',
      },
      moveSlowly: {
        message: 'Move your phone slowly to help detect surfaces.',
        type: 'tip',
      },
      surfaceFound: {
        message: 'Surface detected! Tap to place object.',
        type: 'success',
      },
      surfaceLost: {
        message: 'Surface tracking lost. Move phone to re-detect.',
        type: 'warning',
      },
      objectPlaced: {
        message: 'Object placed successfully!',
        type: 'success',
      },
      cameraPermission: {
        message: 'Camera permission required to start AR experience.',
        type: 'error',
      },
      tooManyObjects: {
        message: 'Maximum objects reached. Oldest object removed.',
        type: 'info',
      },
    };

    const hint = hints[hintType];
    if (hint) {
      this.showToast(hint.message, hint.type);
    }
  },

  /**
   * Show permission prompt
   */
  showPermissionPrompt(type = 'camera') {
    const messages = {
      camera: 'This experience needs camera access. Please allow camera permission.',
      orientation: 'This experience needs device orientation access. Please allow.',
    };

    this.showToast(messages[type] || messages.camera, 'warning', 5000);
  },

  /**
   * Clear all toasts
   */
  clearToasts() {
    if (this.toastContainer) {
      this.toastContainer.innerHTML = '';
    }
  },
});

/**
 * A-Frame Component: ui-hint-trigger
 * Triggers UI hints based on events
 */
AFRAME.registerComponent('ui-hint-trigger', {
  schema: {
    event: { type: 'string', default: 'click' },
    hint: { type: 'string', default: 'info' },
    message: { type: 'string', default: '' },
    type: { type: 'string', default: 'info' },
  },

  init() {
    this.onEvent = this.onEvent.bind(this);
    this.el.addEventListener(this.data.event, this.onEvent);
  },

  onEvent() {
    const uiSystem = this.el.sceneEl.systems['ui-hints'];
    if (this.data.hint) {
      uiSystem.showHint(this.data.hint);
    } else if (this.data.message) {
      uiSystem.showToast(this.data.message, this.data.type);
    }
  },

  remove() {
    this.el.removeEventListener(this.data.event, this.onEvent);
  },
});

export default AFRAME.systems['ui-hints'];

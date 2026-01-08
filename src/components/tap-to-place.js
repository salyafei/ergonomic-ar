/**
 * A-Frame Component: tap-to-place
 * Handles placing objects on detected surfaces via WebXR hit-testing
 * Falls back to simulated raycasting when WebXR is not available
 */

/* global AFRAME, THREE */

AFRAME.registerComponent('tap-to-place', {
  schema: {
    enabled: { type: 'boolean', default: true },
    useWebXR: { type: 'boolean', default: true },
    placeDistance: { type: 'number', default: 1.5 }, // meters for fallback
    scaleAnimation: { type: 'boolean', default: true },
    rotateAnimation: { type: 'boolean', default: false },
  },

  init() {
    this.hitTestSource = null;
    this.hitTestSourceRequested = false;
    this.reticle = null;
    this.placedObjects = [];
    this.maxObjects = 10;

    // Bind methods
    this.onSelect = this.onSelect.bind(this);
    this.onXRFrame = this.onXRFrame.bind(this);

    // Determine if we should use WebXR or fallback
    this.shouldUseWebXR = this.data.useWebXR && navigator.xr;

    // Set up based on mode
    if (this.shouldUseWebXR) {
      this.setupWebXR();
    } else {
      this.setupFallback();
    }

    // Create placement reticle
    this.createReticle();

    console.log(
      `tap-to-place initialized in ${this.shouldUseWebXR ? 'WebXR' : 'Fallback'} mode`
    );
  },

  /**
   * Setup WebXR mode (Android Chrome)
   */
  setupWebXR() {
    const sceneEl = this.el.sceneEl;

    // Wait for WebXR session to start
    sceneEl.addEventListener('enter-vr', () => {
      const xrSession = sceneEl.renderer.xr.getSession();

      if (xrSession) {
        // Listen for select events (tap/click)
        xrSession.addEventListener('select', this.onSelect);

        // Request hit test source
        this.requestHitTestSource(xrSession);
      }
    });

    sceneEl.addEventListener('exit-vr', () => {
      this.hitTestSource = null;
      this.hitTestSourceRequested = false;
    });
  },

  /**
   * Request WebXR hit test source
   */
  async requestHitTestSource(xrSession) {
    try {
      const viewerSpace = await xrSession.requestReferenceSpace('viewer');
      this.hitTestSource = await xrSession.requestHitTestSource({ space: viewerSpace });
      this.hitTestSourceRequested = true;
      console.log('Hit test source created successfully');
    } catch (error) {
      console.error('Failed to create hit test source:', error);
      // Fall back to simulated mode
      this.shouldUseWebXR = false;
      this.setupFallback();
    }
  },

  /**
   * Setup fallback mode (iOS Safari, Desktop)
   */
  setupFallback() {
    // Use simple click/tap on canvas
    const canvas = this.el.sceneEl.canvas;

    canvas.addEventListener('click', (event) => {
      this.onSelectFallback(event);
    });

    console.log('Using fallback placement mode');
  },

  /**
   * Create visual reticle for placement indicator
   */
  createReticle() {
    const reticleEl = document.createElement('a-entity');

    // Create ring geometry for reticle
    reticleEl.setAttribute('geometry', {
      primitive: 'ring',
      radiusInner: 0.12,
      radiusOuter: 0.15,
    });

    reticleEl.setAttribute('material', {
      shader: 'flat',
      color: '#ffffff',
      opacity: 0.8,
      transparent: true,
    });

    reticleEl.setAttribute('rotation', '-90 0 0');
    reticleEl.setAttribute('visible', false);

    this.el.sceneEl.appendChild(reticleEl);
    this.reticle = reticleEl;
  },

  /**
   * Handle select event (WebXR mode)
   */
  onSelect(event) {
    if (!this.reticle || !this.reticle.object3D.visible) {
      console.warn('Cannot place object - no valid surface detected');
      return;
    }

    // Get reticle position
    const position = this.reticle.object3D.position.clone();
    const rotation = this.reticle.object3D.rotation.clone();

    this.placeObject(position, rotation);

    // Emit event
    this.el.emit('object-placed', { position, rotation });
  },

  /**
   * Handle select event (Fallback mode)
   */
  onSelectFallback(event) {
    // Get camera
    const camera = this.el.sceneEl.camera;
    if (!camera) return;

    // Calculate position in front of camera
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.quaternion);

    const position = camera.position.clone();
    position.addScaledVector(direction, this.data.placeDistance);

    // Keep object at ground level (y = 0)
    position.y = 0;

    const rotation = new THREE.Euler(0, 0, 0);

    this.placeObject(position, rotation);

    // Emit event
    this.el.emit('object-placed', { position, rotation, fallback: true });
  },

  /**
   * Place object at given position and rotation
   */
  placeObject(position, rotation) {
    // Clone the entity we're placing (typically the child of this component's element)
    const templateEl = this.el.querySelector('[data-template]');
    if (!templateEl) {
      console.error('No template element found with data-template attribute');
      return;
    }

    const newObject = templateEl.cloneNode(true);
    newObject.removeAttribute('data-template');
    newObject.setAttribute('visible', true);

    // Set position and rotation
    newObject.object3D.position.copy(position);
    newObject.object3D.rotation.copy(rotation);

    // Add to scene
    this.el.sceneEl.appendChild(newObject);

    // Add animations if enabled
    if (this.data.scaleAnimation) {
      this.animateScale(newObject);
    }

    if (this.data.rotateAnimation) {
      this.animateRotation(newObject);
    }

    // Track placed objects
    this.placedObjects.push(newObject);

    // Remove oldest object if we exceed max
    if (this.placedObjects.length > this.maxObjects) {
      const oldObject = this.placedObjects.shift();
      oldObject.parentNode.removeChild(oldObject);
    }

    console.log('Object placed at:', position);
  },

  /**
   * Animate object scaling on placement
   */
  animateScale(entity) {
    entity.object3D.scale.set(0.01, 0.01, 0.01);

    entity.setAttribute('animation', {
      property: 'scale',
      to: '1 1 1',
      dur: 400,
      easing: 'easeOutElastic',
    });
  },

  /**
   * Animate object rotation
   */
  animateRotation(entity) {
    entity.setAttribute('animation__rotate', {
      property: 'rotation',
      to: `0 ${entity.object3D.rotation.y + 360} 0`,
      loop: true,
      dur: 8000,
      easing: 'linear',
    });
  },

  /**
   * Update reticle position based on hit test (WebXR mode)
   */
  tick() {
    if (!this.shouldUseWebXR || !this.hitTestSource || !this.reticle) {
      // In fallback mode, reticle is not shown
      if (this.reticle) {
        this.reticle.setAttribute('visible', false);
      }
      return;
    }

    const sceneEl = this.el.sceneEl;
    const frame = sceneEl.frame;
    const renderer = sceneEl.renderer;

    if (!frame || !renderer.xr.isPresenting) return;

    const referenceSpace = renderer.xr.getReferenceSpace();
    const hitTestResults = frame.getHitTestResults(this.hitTestSource);

    if (hitTestResults.length > 0) {
      const hit = hitTestResults[0];
      const pose = hit.getPose(referenceSpace);

      if (pose) {
        // Show reticle
        this.reticle.setAttribute('visible', true);

        // Update reticle position
        const position = pose.transform.position;
        this.reticle.object3D.position.set(position.x, position.y, position.z);

        // Emit hit detected event
        if (!this.reticle.object3D.visible) {
          this.el.emit('surface-found');
        }
      }
    } else {
      // Hide reticle
      if (this.reticle.object3D.visible) {
        this.reticle.setAttribute('visible', false);
        this.el.emit('surface-lost');
      }
    }
  },

  /**
   * Clear all placed objects
   */
  clearAll() {
    this.placedObjects.forEach((obj) => {
      if (obj.parentNode) {
        obj.parentNode.removeChild(obj);
      }
    });
    this.placedObjects = [];
    console.log('All placed objects cleared');
  },

  remove() {
    // Clean up
    if (this.reticle && this.reticle.parentNode) {
      this.reticle.parentNode.removeChild(this.reticle);
    }

    this.clearAll();
  },
});

export default AFRAME.components['tap-to-place'];

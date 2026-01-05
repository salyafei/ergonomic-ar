// Desk Ergonomics AR - Surface Detection Implementation
// Using WebXR and Three.js for markerless AR

class ErgonomicsARSurface {
    constructor() {
        this.currentPage = 'landing';
        this.session = null;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.hitTestSource = null;
        this.hitTestSourceRequested = false;
        this.reticle = null;
        this.zonesPlaced = false;
        this.zones = [];

        this.init();
    }

    init() {
        console.log('Initializing Surface Detection AR...');
        this.setupEventListeners();
        this.checkARSupport();
    }

    setupEventListeners() {
        const startBtn = document.getElementById('start-ar-btn');
        const backBtn = document.getElementById('back-btn');
        const resetBtn = document.getElementById('reset-btn');

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startARExperience());
        }

        if (backBtn) {
            backBtn.addEventListener('click', () => this.stopAR());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetZones());
        }
    }

    async checkARSupport() {
        const startBtn = document.getElementById('start-ar-btn');

        if (!navigator.xr) {
            console.error('WebXR not available');
            if (startBtn) {
                startBtn.disabled = true;
                startBtn.textContent = 'WebXR Not Supported';
                startBtn.style.opacity = '0.5';
            }
            this.showCompatibilityWarning();
            return;
        }

        try {
            const supported = await navigator.xr.isSessionSupported('immersive-ar');
            console.log('WebXR AR supported:', supported);

            if (!supported) {
                console.warn('WebXR AR not supported on this device');
                if (startBtn) {
                    startBtn.disabled = true;
                    startBtn.textContent = 'AR Not Available';
                    startBtn.style.opacity = '0.5';
                }
                this.showCompatibilityWarning();
            }
        } catch (error) {
            console.error('Error checking AR support:', error);
        }
    }

    showCompatibilityWarning() {
        const infoBox = document.querySelector('.info-box');
        if (infoBox) {
            infoBox.style.borderColor = '#F44336';
            infoBox.innerHTML = `
                <h3>⚠️ Device Not Compatible</h3>
                <p><strong>WebXR is not supported on this device.</strong></p>
                <p class="small">Requirements:</p>
                <ul style="text-align: left; margin: 10px 0; padding-left: 20px;">
                    <li>iOS 15.4+ with Safari</li>
                    <li>Android 9+ with Chrome 87+</li>
                    <li>HTTPS connection required</li>
                </ul>
                <p class="small" style="margin-top: 10px;">Current: ${this.getDeviceInfo()}</p>
            `;
        }
    }

    getDeviceInfo() {
        const ua = navigator.userAgent;
        const isIOS = /iPad|iPhone|iPod/.test(ua);
        const isAndroid = /Android/.test(ua);
        const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
        const isChrome = /Chrome/.test(ua);

        let deviceInfo = 'Unknown device';

        if (isIOS) {
            const match = ua.match(/OS (\d+)_(\d+)/);
            if (match) {
                const version = `${match[1]}.${match[2]}`;
                deviceInfo = `iOS ${version} - ${isSafari ? 'Safari' : 'Other browser'}`;
            } else {
                deviceInfo = `iOS - ${isSafari ? 'Safari' : 'Other browser'}`;
            }
        } else if (isAndroid) {
            const match = ua.match(/Android (\d+)/);
            const version = match ? match[1] : 'Unknown';
            deviceInfo = `Android ${version} - ${isChrome ? 'Chrome' : 'Other browser'}`;
        }

        return deviceInfo;
    }

    async startARExperience() {
        console.log('Starting AR Experience...');

        this.switchPage('ar');
        this.showLoading('Requesting AR session...');

        try {
            // Check if WebXR is available
            if (!navigator.xr) {
                throw new Error('WebXR not supported on this device');
            }

            // Request AR session
            this.session = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['hit-test'],
                optionalFeatures: ['dom-overlay'],
                domOverlay: { root: document.getElementById('ar-page') }
            });

            console.log('AR session started');
            this.updateStatus('AR session active', true);

            await this.onSessionStarted();

        } catch (error) {
            console.error('AR Session Error:', error);
            this.showError(error.message);
            this.switchPage('landing');
        }
    }

    async onSessionStarted() {
        this.session.addEventListener('end', () => this.onSessionEnded());

        const canvas = document.getElementById('ar-canvas');

        // Initialize Three.js renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            preserveDrawingBuffer: true,
            antialias: true
        });
        this.renderer.autoClear = false;
        this.renderer.xr.enabled = true;
        this.renderer.xr.setSession(this.session);

        // Create scene
        this.scene = new THREE.Scene();

        // Create camera
        this.camera = new THREE.PerspectiveCamera();
        this.camera.matrixAutoUpdate = false;

        // Add lighting
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        light.position.set(0.5, 1, 0.25);
        this.scene.add(light);

        // Create reticle (placement indicator)
        this.reticle = this.createReticle();
        this.scene.add(this.reticle);

        // Handle canvas clicks
        canvas.addEventListener('click', (event) => this.onCanvasClick(event));

        // Start render loop
        this.renderer.setAnimationLoop((time, frame) => this.onXRFrame(time, frame));

        this.hideLoading();
        document.getElementById('ar-controls').style.display = 'flex';
        document.getElementById('tap-instruction').style.display = 'block';
    }

    createReticle() {
        const geometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        });
        const reticle = new THREE.Mesh(geometry, material);
        reticle.matrixAutoUpdate = false;
        reticle.visible = false;
        return reticle;
    }

    async onXRFrame(time, frame) {
        const session = frame.session;
        const referenceSpace = this.renderer.xr.getReferenceSpace();

        // Request hit test source on first frame
        if (!this.hitTestSourceRequested) {
            try {
                const viewerSpace = await session.requestReferenceSpace('viewer');
                this.hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
                this.hitTestSourceRequested = true;
                console.log('Hit test source created');
            } catch (error) {
                console.error('Hit test source error:', error);
            }
        }

        // Perform hit test
        if (this.hitTestSource) {
            const hitTestResults = frame.getHitTestResults(this.hitTestSource);

            if (hitTestResults.length > 0) {
                const hit = hitTestResults[0];
                const pose = hit.getPose(referenceSpace);

                if (pose) {
                    this.reticle.visible = true;
                    this.reticle.matrix.fromArray(pose.transform.matrix);

                    if (!this.zonesPlaced) {
                        this.updateStatus('Surface detected - Tap to place', true);
                    }
                }
            } else {
                this.reticle.visible = false;
                if (!this.zonesPlaced) {
                    this.updateStatus('Move camera to detect surface', false);
                }
            }
        }

        // Render scene
        const pose = frame.getViewerPose(referenceSpace);
        if (pose) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onCanvasClick(event) {
        if (this.reticle.visible && !this.zonesPlaced) {
            this.placeErgonomicZones();
        }
    }

    placeErgonomicZones() {
        console.log('Placing ergonomic zones...');

        const position = new THREE.Vector3();
        position.setFromMatrixPosition(this.reticle.matrix);

        // Create all zones at the reticle position
        this.createPrimaryZone(position);
        this.createSecondaryZone(position);
        this.createMonitorZone(position);
        this.createKeyboardZone(position);
        this.createMouseZone(position);
        this.createWarningZone(position);
        this.createLabels(position);

        this.reticle.visible = false;
        this.zonesPlaced = true;

        this.updateStatus('Zones placed!', true);
        document.getElementById('tap-instruction').style.display = 'none';
    }

    createPrimaryZone(basePosition) {
        const geometry = new THREE.BoxGeometry(0.8, 0.02, 0.6);
        const material = new THREE.MeshBasicMaterial({
            color: 0x4CAF50,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        const zone = new THREE.Mesh(geometry, material);
        zone.position.copy(basePosition);
        zone.position.y += 0.01;
        zone.position.z -= 0.2;
        this.scene.add(zone);
        this.zones.push(zone);
    }

    createSecondaryZone(basePosition) {
        const geometry = new THREE.RingGeometry(0.6, 1.0, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0xFFC107,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        const zone = new THREE.Mesh(geometry, material);
        zone.position.copy(basePosition);
        zone.position.y += 0.005;
        zone.position.z -= 0.2;
        zone.rotation.x = -Math.PI / 2;
        this.scene.add(zone);
        this.zones.push(zone);
    }

    createMonitorZone(basePosition) {
        const geometry = new THREE.BoxGeometry(0.6, 0.4, 0.05);
        const material = new THREE.MeshBasicMaterial({
            color: 0x2196F3,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        const zone = new THREE.Mesh(geometry, material);
        zone.position.copy(basePosition);
        zone.position.y += 0.2;
        zone.position.z -= 0.65;
        this.scene.add(zone);
        this.zones.push(zone);
    }

    createKeyboardZone(basePosition) {
        const geometry = new THREE.BoxGeometry(0.45, 0.02, 0.15);
        const material = new THREE.MeshBasicMaterial({
            color: 0x4CAF50,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });
        const zone = new THREE.Mesh(geometry, material);
        zone.position.copy(basePosition);
        zone.position.y += 0.01;
        zone.position.z += 0.05;
        this.scene.add(zone);
        this.zones.push(zone);
    }

    createMouseZone(basePosition) {
        const geometry = new THREE.BoxGeometry(0.15, 0.02, 0.12);
        const material = new THREE.MeshBasicMaterial({
            color: 0x4CAF50,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });
        const zone = new THREE.Mesh(geometry, material);
        zone.position.copy(basePosition);
        zone.position.x += 0.3;
        zone.position.y += 0.01;
        zone.position.z += 0.05;
        this.scene.add(zone);
        this.zones.push(zone);
    }

    createWarningZone(basePosition) {
        const geometry = new THREE.BoxGeometry(1.8, 0.02, 0.4);
        const material = new THREE.MeshBasicMaterial({
            color: 0xF44336,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const zone = new THREE.Mesh(geometry, material);
        zone.position.copy(basePosition);
        zone.position.y += 0.005;
        zone.position.z += 0.4;
        this.scene.add(zone);
        this.zones.push(zone);
    }

    createLabels(basePosition) {
        // Text rendering in WebXR is complex, so we'll skip for now
        // In production, you'd use canvas textures or sprite-text
        console.log('Labels would be rendered here');
    }

    resetZones() {
        // Remove all placed zones
        this.zones.forEach(zone => {
            this.scene.remove(zone);
            zone.geometry.dispose();
            zone.material.dispose();
        });
        this.zones = [];

        this.zonesPlaced = false;
        this.reticle.visible = true;

        this.updateStatus('Surface detected - Tap to place', true);
        document.getElementById('tap-instruction').style.display = 'block';

        console.log('Zones reset');
    }

    updateStatus(text, isActive) {
        const statusText = document.querySelector('#surface-status .status-text');
        const statusDot = document.querySelector('#surface-status .status-dot');
        const statusIndicator = document.getElementById('surface-status');

        if (statusText) {
            statusText.textContent = text;
        }

        if (statusIndicator) {
            if (isActive) {
                statusIndicator.classList.add('tracking');
            } else {
                statusIndicator.classList.remove('tracking');
            }
        }
    }

    stopAR() {
        if (this.session) {
            this.session.end();
        }
    }

    onSessionEnded() {
        this.session = null;
        this.hitTestSource = null;
        this.hitTestSourceRequested = false;
        this.zonesPlaced = false;

        // Clean up zones
        this.zones.forEach(zone => {
            this.scene.remove(zone);
        });
        this.zones = [];

        document.getElementById('ar-controls').style.display = 'none';
        document.getElementById('tap-instruction').style.display = 'none';

        this.switchPage('landing');
        console.log('AR session ended');
    }

    switchPage(pageName) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageName;
        }
    }

    showLoading(message = 'Initializing AR...') {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingText = document.getElementById('loading-text');

        if (loadingText) {
            loadingText.textContent = message;
        }

        if (loadingScreen) {
            loadingScreen.classList.add('active');
        }
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('active');
        }
    }

    showError(message) {
        const isHTTPS = location.protocol === 'https:';
        const deviceInfo = this.getDeviceInfo();

        let helpText = `⚠️ AR Error\n\n${message}\n\n`;

        if (!isHTTPS) {
            helpText += `🔒 CRITICAL: You must use HTTPS!\n`;
            helpText += `Current: ${location.protocol}\n`;
            helpText += `Try: https://${location.host}${location.pathname}\n\n`;
        }

        helpText += `Requirements:\n`;
        helpText += `• iOS 15.4+ with Safari browser\n`;
        helpText += `• Android 9+ with Chrome 87+\n`;
        helpText += `• HTTPS connection (required)\n`;
        helpText += `• Camera permission granted\n\n`;
        helpText += `Your device: ${deviceInfo}\n`;
        helpText += `Protocol: ${location.protocol}`;

        alert(helpText);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ergonomicsApp = new ErgonomicsARSurface();
    });
} else {
    window.ergonomicsApp = new ErgonomicsARSurface();
}

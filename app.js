// Desk Ergonomics AR Application
// Main JavaScript Controller

class ErgonomicsARApp {
    constructor() {
        this.currentPage = 'landing';
        this.markerVisible = false;
        this.zonesVisible = true;
        this.init();
    }

    init() {
        console.log('Initializing Desk Ergonomics AR App...');
        this.setupEventListeners();
        this.checkDeviceCompatibility();
    }

    setupEventListeners() {
        // Landing page buttons
        const startBtn = document.getElementById('start-ar-btn');
        const downloadMarkerBtn = document.getElementById('download-marker-btn');
        const backBtn = document.getElementById('back-btn');
        const toggleZonesBtn = document.getElementById('toggle-zones-btn');

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startARExperience());
        }

        if (downloadMarkerBtn) {
            downloadMarkerBtn.addEventListener('click', () => this.downloadMarker());
        }

        if (backBtn) {
            backBtn.addEventListener('click', () => this.goBack());
        }

        if (toggleZonesBtn) {
            toggleZonesBtn.addEventListener('click', () => this.toggleZones());
        }

        // AR.js marker events
        this.setupAREvents();
    }

    setupAREvents() {
        // Wait for AR.js to load
        window.addEventListener('load', () => {
            const marker = document.querySelector('#marker-hiro');
            const statusIndicator = document.getElementById('marker-status');
            const statusText = statusIndicator?.querySelector('.status-text');

            if (marker) {
                marker.addEventListener('markerFound', () => {
                    console.log('Marker detected!');
                    this.markerVisible = true;
                    if (statusIndicator) {
                        statusIndicator.classList.add('tracking');
                    }
                    if (statusText) {
                        statusText.textContent = 'Tracking desk surface';
                    }
                    this.hideLoading();
                });

                marker.addEventListener('markerLost', () => {
                    console.log('Marker lost');
                    this.markerVisible = false;
                    if (statusIndicator) {
                        statusIndicator.classList.remove('tracking');
                    }
                    if (statusText) {
                        statusText.textContent = 'Point camera at marker';
                    }
                });
            }
        });
    }

    checkDeviceCompatibility() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const hasCamera = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

        if (!isMobile) {
            console.warn('This application works best on mobile devices');
        }

        if (!hasCamera) {
            console.error('Camera access not available');
            this.showError('Camera access is required for AR functionality');
        }
    }

    async startARExperience() {
        console.log('Starting AR experience...');

        // Request camera permission
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            // Stop the stream as AR.js will handle it
            stream.getTracks().forEach(track => track.stop());

            // Switch to AR page
            this.switchPage('ar');
            this.showLoading();

            // Initialize AR scene
            setTimeout(() => {
                this.initializeARScene();
            }, 1000);

        } catch (error) {
            console.error('Camera access denied:', error);
            this.showError('Please allow camera access to use AR features');
        }
    }

    initializeARScene() {
        const scene = document.querySelector('a-scene');

        if (scene) {
            // Check if scene is loaded
            if (scene.hasLoaded) {
                console.log('AR Scene already loaded');
                setTimeout(() => this.hideLoading(), 2000);
            } else {
                scene.addEventListener('loaded', () => {
                    console.log('AR Scene loaded successfully');
                    setTimeout(() => this.hideLoading(), 2000);
                });
            }

            // Add render start event
            scene.addEventListener('renderstart', () => {
                console.log('AR rendering started');
            });
        }
    }

    downloadMarker() {
        console.log('Preparing marker download...');

        // Create a temporary link to download the Hiro marker
        const markerUrl = 'https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png';

        // Create download link
        const link = document.createElement('a');
        link.href = markerUrl;
        link.download = 'desk-marker.png';
        link.target = '_blank';

        // Show instructions
        const instructions = `
📄 Marker Download Instructions:

1. Right-click the marker image and save it
2. Print it on white paper (A4 or Letter size)
3. Place it flat on your desk
4. Make sure it's well-lit and visible
5. Return here and tap "Start AR Experience"

Tip: For best results, laminate the marker or place it in a clear sheet protector.
        `;

        if (confirm(instructions + '\n\nClick OK to open the marker in a new tab.')) {
            window.open(markerUrl, '_blank');
        }
    }

    toggleZones() {
        this.zonesVisible = !this.zonesVisible;

        const zones = [
            'primary-zone',
            'secondary-zone',
            'monitor-zone',
            'keyboard-zone',
            'mouse-zone',
            'warning-zone',
            'guidelines-panel'
        ];

        zones.forEach(zoneId => {
            const zone = document.getElementById(zoneId);
            if (zone) {
                zone.setAttribute('visible', this.zonesVisible);
            }
        });

        console.log(`Zones ${this.zonesVisible ? 'shown' : 'hidden'}`);
    }

    goBack() {
        // Stop AR scene
        const scene = document.querySelector('a-scene');
        if (scene && scene.renderer) {
            // Pause rendering
            scene.pause();
        }

        // Switch back to landing page
        this.switchPage('landing');
    }

    switchPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show requested page
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageName;
        }
    }

    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
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
        alert(`⚠️ Error\n\n${message}`);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ergonomicsApp = new ErgonomicsARApp();
    });
} else {
    window.ergonomicsApp = new ErgonomicsARApp();
}

// Service Worker Registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA features
        // navigator.serviceWorker.register('/service-worker.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    console.log('Orientation changed');
    // Reload AR scene if needed
    if (window.ergonomicsApp && window.ergonomicsApp.currentPage === 'ar') {
        setTimeout(() => {
            const scene = document.querySelector('a-scene');
            if (scene && scene.resize) {
                scene.resize();
            }
        }, 300);
    }
});

// Prevent screen sleep during AR session
let wakeLock = null;
async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Screen wake lock activated');
        } catch (err) {
            console.log('Wake lock error:', err);
        }
    }
}

// Request wake lock when AR starts
document.addEventListener('arSessionStarted', () => {
    requestWakeLock();
});

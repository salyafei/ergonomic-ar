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
            const marker = document.querySelector('#marker-adnoc');
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
        console.log('Opening AR marker...');

        // Show instructions for AR marker
        const instructions = `
📄 AR Marker Instructions:

You can use the marker in two ways:

1. DISPLAY ON SCREEN:
   - Open the marker on your computer/tablet
   - Point your phone camera at the screen
   - Great for quick testing

2. PRINT ON PAPER:
   - Print the marker on white paper
   - Place on your desk
   - Better for permanent setup

The marker can be anywhere - the app just needs
to see it through your phone's camera!

Click OK to view the AR marker.
        `;

        if (confirm(instructions)) {
            // Open the marker image directly
            window.open('adnoc-marker.png', '_blank');
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

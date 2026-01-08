/**
 * Feature Detection Module
 * Checks for camera, WebGL, WebXR, device capabilities, and browser support
 */

class FeatureDetector {
  constructor() {
    this.features = {
      https: false,
      webgl: false,
      camera: false,
      webxr: false,
      deviceOrientation: false,
      isMobile: false,
      platform: {
        os: 'Unknown',
        browser: 'Unknown',
        version: '',
      },
    };
  }

  async checkAll() {
    this.features.https = this.checkHTTPS();
    this.features.webgl = this.checkWebGL();
    this.features.platform = this.detectPlatform();
    this.features.isMobile = this.features.platform.isMobile;
    this.features.deviceOrientation = await this.checkDeviceOrientation();
    this.features.camera = await this.checkCamera();
    this.features.webxr = await this.checkWebXR();

    console.log('Feature detection results:', this.features);
    return this.features;
  }

  /**
   * Check if site is served over HTTPS
   */
  checkHTTPS() {
    return (
      window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );
  }

  /**
   * Check WebGL support
   */
  checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') ||
        canvas.getContext('webgl2') ||
        canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  /**
   * Detect platform, OS, and browser
   */
  detectPlatform() {
    const ua = navigator.userAgent;
    const platform = {
      os: 'Unknown',
      browser: 'Unknown',
      version: '',
      isMobile: false,
      isIOS: false,
      isAndroid: false,
    };

    // Detect OS
    if (/iPad|iPhone|iPod/.test(ua)) {
      platform.os = 'iOS';
      platform.isIOS = true;
      platform.isMobile = true;
      const match = ua.match(/OS (\d+)_(\d+)/);
      if (match) {
        platform.version = `${match[1]}.${match[2]}`;
      }
    } else if (/Android/.test(ua)) {
      platform.os = 'Android';
      platform.isAndroid = true;
      platform.isMobile = true;
      const match = ua.match(/Android (\d+)/);
      if (match) {
        platform.version = match[1];
      }
    } else if (/Windows/.test(ua)) {
      platform.os = 'Windows';
    } else if (/Mac/.test(ua)) {
      platform.os = 'macOS';
    } else if (/Linux/.test(ua)) {
      platform.os = 'Linux';
    }

    // Detect browser
    if (/Safari/.test(ua) && !/Chrome/.test(ua)) {
      platform.browser = 'Safari';
    } else if (/Chrome/.test(ua)) {
      platform.browser = 'Chrome';
      const match = ua.match(/Chrome\/(\d+)/);
      if (match && !platform.version) {
        platform.version = match[1];
      }
    } else if (/Firefox/.test(ua)) {
      platform.browser = 'Firefox';
    } else if (/Edge/.test(ua)) {
      platform.browser = 'Edge';
    }

    return platform;
  }

  /**
   * Check camera access
   * Note: This doesn't request permission, just checks if API is available
   */
  async checkCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return false;
    }

    // Check if camera is available without actually requesting permission
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.some((device) => device.kind === 'videoinput');
    } catch (error) {
      console.warn('Camera check failed:', error);
      return false;
    }
  }

  /**
   * Check WebXR support (AR mode)
   */
  async checkWebXR() {
    if (!navigator.xr) {
      return false;
    }

    try {
      const supported = await navigator.xr.isSessionSupported('immersive-ar');
      return supported;
    } catch (error) {
      console.warn('WebXR check failed:', error);
      return false;
    }
  }

  /**
   * Check device orientation API
   */
  async checkDeviceOrientation() {
    if (!window.DeviceOrientationEvent) {
      return false;
    }

    // iOS 13+ requires permission for device orientation
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        // Don't actually request permission here, just check if it's available
        return true;
      } catch (error) {
        return false;
      }
    }

    return true;
  }

  /**
   * Request camera permission (call this before starting AR)
   */
  async requestCameraPermission() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Camera API not available');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      // Stop the stream immediately, we just needed to get permission
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      console.error('Camera permission denied:', error);
      throw error;
    }
  }

  /**
   * Request device orientation permission (iOS 13+)
   */
  async requestOrientationPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.error('Device orientation permission denied:', error);
        return false;
      }
    }
    return true;
  }

  /**
   * Get recommendations based on detected features
   */
  getRecommendations() {
    const recommendations = [];

    if (!this.features.https) {
      recommendations.push({
        type: 'error',
        message: 'HTTPS required for camera access',
      });
    }

    if (!this.features.webgl) {
      recommendations.push({
        type: 'error',
        message: 'WebGL not supported on this device',
      });
    }

    if (!this.features.webxr && this.features.platform.isAndroid) {
      recommendations.push({
        type: 'warning',
        message: 'Update Chrome to version 87+ for WebXR support',
      });
    }

    if (!this.features.webxr && this.features.platform.isIOS) {
      recommendations.push({
        type: 'info',
        message: 'iOS Safari has limited WebXR support. Fallback mode will be used.',
      });
    }

    if (!this.features.isMobile) {
      recommendations.push({
        type: 'info',
        message: 'AR features work best on mobile devices',
      });
    }

    return recommendations;
  }
}

// Create global instance
window.FeatureDetect = new FeatureDetector();

export default FeatureDetector;

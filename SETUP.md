# 🚀 Setup Guide - Desk Ergonomics AR

Complete step-by-step guide to set up and deploy your Desk Ergonomics AR application.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Deployment Options](#deployment-options)
4. [Mobile Testing](#mobile-testing)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required
- **Modern Web Browser**: Chrome 67+, Safari 11+, or Firefox 60+
- **Git**: For version control
- **Text Editor**: VS Code, Sublime Text, or any code editor
- **Smartphone**: iOS 11+ or Android 7+ for AR testing

### Optional
- **Node.js**: For local server and package management
- **Python 3**: Alternative local server option
- **GitHub Account**: For free hosting via GitHub Pages

## Local Development

### Method 1: Python Simple Server (Easiest)

1. **Navigate to project directory**
   ```bash
   cd ergonomic-ar
   ```

2. **Start Python server**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Method 2: Node.js Serve

1. **Install serve globally** (one-time)
   ```bash
   npm install -g serve
   ```

2. **Start server**
   ```bash
   serve
   ```

3. **Access application**
   ```
   http://localhost:3000
   ```

### Method 3: VS Code Live Server

1. **Install Live Server extension** in VS Code

2. **Right-click** `index.html`

3. **Select** "Open with Live Server"

## Deployment Options

### Option 1: GitHub Pages (Recommended - Free)

#### Step 1: Create GitHub Repository

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Desk Ergonomics AR app"

# Create repository on GitHub (via web interface)
# Then connect local to remote
git remote add origin https://github.com/YOUR_USERNAME/ergonomic-ar.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 2: Enable GitHub Pages

1. Go to repository **Settings**
2. Scroll to **Pages** section
3. Under **Source**, select **main** branch
4. Click **Save**
5. Wait 1-2 minutes for deployment

#### Step 3: Access Your App

```
https://YOUR_USERNAME.github.io/ergonomic-ar/
```

#### Step 4: Generate QR Code

1. Visit: `https://YOUR_USERNAME.github.io/ergonomic-ar/qr-generator.html`
2. URL will auto-fill
3. Click "Generate QR Code"
4. Print the QR code

### Option 2: Netlify (Auto-Deploy)

#### Via Git Integration

1. **Sign up** at [netlify.com](https://netlify.com)

2. **Click** "New site from Git"

3. **Connect** your GitHub repository

4. **Configure build settings**:
   - Build command: (leave empty)
   - Publish directory: `.`

5. **Deploy**

Your site will be live at: `https://YOUR_SITE.netlify.app`

#### Via Drag & Drop

1. Visit [app.netlify.com/drop](https://app.netlify.com/drop)

2. **Drag** your project folder

3. **Done!** Site is live instantly

### Option 3: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

### Option 4: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

## Mobile Testing

### Testing on Local Network

#### Find Your Local IP

**macOS/Linux:**
```bash
ifconfig | grep "inet "
```

**Windows:**
```cmd
ipconfig
```

Look for IP like `192.168.1.xxx`

#### Access from Mobile

1. **Ensure** phone and computer on same WiFi

2. **Open** mobile browser

3. **Navigate** to:
   ```
   http://YOUR_LOCAL_IP:8000
   ```

### Using ngrok (Remote Testing)

```bash
# Install ngrok
npm install -g ngrok

# Start local server (port 8000)
python -m http.server 8000

# In another terminal, expose it
ngrok http 8000
```

You'll get a public URL like:
```
https://abc123.ngrok.io
```

**Note**: HTTPS is automatically provided!

## Setting Up the AR Marker

### Step 1: Download Hiro Marker

1. **Visit**: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

2. **Save image** as `desk-marker.png`

Or use the built-in download button in the app.

### Step 2: Print the Marker

**Printing Guidelines:**
- **Paper**: White A4 or Letter size
- **Quality**: High quality, 300 DPI minimum
- **Color**: Black and white (no grayscale)
- **Size**: Full page or at least 10cm × 10cm

### Step 3: Place on Desk

- **Position**: Center of your desk or main work area
- **Surface**: Flat, not curved or wrinkled
- **Lighting**: Well-lit, avoid shadows
- **Protection**: Laminate or use sheet protector

## Configuration

### Customizing Ergonomic Zones

Edit `index.html` to adjust zone sizes:

```html
<!-- Primary Zone -->
<a-box
    id="primary-zone"
    width="0.8"     <!-- Adjust width (meters) -->
    depth="0.6"     <!-- Adjust depth (meters) -->
    color="#4CAF50" <!-- Change color -->
    opacity="0.5">  <!-- Adjust transparency -->
</a-box>
```

### Changing Application Title

Edit `index.html`:

```html
<title>Your Custom Title</title>
<h1>🪑 Your Custom Title</h1>
```

### Modifying Ergonomic Guidelines

Edit the guidelines panel in `index.html`:

```html
<a-text
    value="YOUR\nCUSTOM\nGUIDELINES">
</a-text>
```

## Troubleshooting

### Camera Not Accessible

**Problem**: "Camera access denied" error

**Solutions**:
1. Check browser permissions
2. Use HTTPS (required for camera access)
3. Try different browser
4. Restart browser/device

### Marker Not Detected

**Problem**: AR zones not appearing

**Solutions**:
1. Improve lighting conditions
2. Ensure marker is flat and clear
3. Reprint marker at higher quality
4. Move camera closer/further from marker
5. Clean camera lens

### HTTPS Required Error

**Problem**: App works locally but not on deployment

**Solution**: Deploy to HTTPS-enabled host:
- GitHub Pages (auto HTTPS)
- Netlify (auto HTTPS)
- Vercel (auto HTTPS)

### Performance Issues

**Problem**: Laggy AR experience

**Solutions**:
1. Close other apps/tabs
2. Use newer device
3. Reduce zone complexity
4. Clear browser cache

### iOS-Specific Issues

**Problem**: Not working on iPhone

**Solutions**:
1. Use Safari (not Chrome on iOS)
2. Update to iOS 11 minimum
3. Allow camera and motion sensors
4. Disable Low Power Mode

### Android-Specific Issues

**Problem**: Not working on Android

**Solutions**:
1. Use Chrome browser
2. Update to Android 7.0 minimum
3. Enable camera permissions
4. Try Chrome Beta for latest features

## Performance Optimization

### Reduce Load Time

1. **Minimize external dependencies**
2. **Enable browser caching**
3. **Compress assets**
4. **Use CDN for libraries**

### Improve AR Tracking

1. **Use high-quality marker print**
2. **Ensure consistent lighting**
3. **Keep marker flat and visible**
4. **Minimize camera movement**

## Security Considerations

### HTTPS is Required

- Modern browsers require HTTPS for camera access
- All recommended hosting options provide free HTTPS
- Do NOT use HTTP in production

### Privacy

- No data is collected
- Camera feed stays on device
- No server communication after initial load
- No cookies or tracking

## Next Steps

1. ✅ Deploy your app
2. ✅ Generate and print QR code
3. ✅ Print AR marker
4. ✅ Test on mobile device
5. ✅ Share with colleagues
6. ✅ Customize zones for your needs

## Getting Help

- **Documentation**: See README.md
- **Issues**: GitHub Issues page
- **Community**: GitHub Discussions

## Additional Resources

- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [A-Frame Documentation](https://aframe.io/docs/)
- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [Ergonomics Guidelines](https://www.osha.gov/ergonomics)

---

**Happy AR Development! 🚀**

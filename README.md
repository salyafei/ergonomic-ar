# 🪑 Desk Ergonomics AR

A comprehensive augmented reality web application that visualizes safe ergonomic zones on your workplace desk using your smartphone camera. Works on both iOS and Android devices without requiring app installation.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey)

## 🌟 Features

- **🎯 Real-time AR Visualization**: See ergonomic zones overlaid on your actual desk
- **📱 Cross-Platform**: Works on iOS Safari and Android Chrome - no app installation required
- **🎨 Color-Coded Zones**: Intuitive color system for different ergonomic areas
- **📐 Professional Guidelines**: Based on OSHA and ergonomic best practices
- **🔄 Interactive Controls**: Toggle zones on/off, adjust visualization
- **📏 Accurate Measurements**: Proper desk layout recommendations
- **💡 Educational**: Learn proper desk setup while visualizing it

## 🎨 Ergonomic Zones

### 🟢 Primary Zone (Green)
- **Location**: Closest to you, arm's length forward
- **Purpose**: Place frequently used items (keyboard, mouse, phone)
- **Dimensions**: ~0.8m wide × 0.6m deep
- **Ergonomic Principle**: Minimize reaching and strain

### 🟡 Secondary Zone (Yellow)
- **Location**: Extended reach area around primary zone
- **Purpose**: Occasionally used items (documents, notepad, water bottle)
- **Ergonomic Principle**: Items within comfortable reach without excessive movement

### 🔵 Monitor Zone (Blue)
- **Location**: At arm's length directly ahead
- **Purpose**: Optimal monitor placement
- **Guidelines**:
  - Distance: 50-70cm (arm's length)
  - Height: Top of screen at or slightly below eye level
  - Angle: 10-20° below horizontal eye level

### 🟢 Keyboard & Mouse Zones (Green Outlined)
- **Keyboard**: Center-aligned with your body
- **Mouse**: Adjacent to keyboard, same height
- **Ergonomic Principle**: Elbows at 90-100° angle, wrists neutral

### 🔴 Warning Zone (Red)
- **Location**: Too close to desk edge or body
- **Purpose**: Avoid placing items here
- **Reason**: Items too close cause poor posture and neck strain

## 🚀 Quick Start

### For Users

1. **Visit the Web App**
   ```
   https://your-username.github.io/ergonomic-ar/
   ```

2. **Download and Print the ADNOC Marker**
   - Click "Download Desk Marker" button (opens ADNOC Marker Generator)
   - Follow instructions to generate custom ADNOC logo marker
   - Print the generated marker on white A4/Letter paper
   - Place marker flat on your desk
   - See [ADNOC-MARKER-SETUP.md](ADNOC-MARKER-SETUP.md) for detailed instructions

3. **Start AR Experience**
   - Click "Start AR Experience"
   - Allow camera access when prompted
   - Point camera at the marker on your desk
   - View ergonomic zones overlaid on your desk!

### For Developers

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ergonomic-ar.git
   cd ergonomic-ar
   ```

2. **Serve Locally**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx serve

   # Using PHP
   php -S localhost:8000
   ```

3. **Access on Mobile**
   - Find your computer's local IP address
   - Open `http://YOUR_IP:8000` on your mobile device
   - **Note**: HTTPS is required for camera access in production

## 📋 Requirements

### Device Requirements
- **iOS**: iPhone 6s or newer, iOS 11+, Safari browser
- **Android**: Android 7.0+, Chrome browser
- **Camera**: Rear-facing camera with AR support

### Browser Requirements
- iOS Safari 11+
- Android Chrome 67+
- Camera and accelerometer permissions

### Network Requirements
- HTTPS connection (required for camera access)
- Stable internet connection for initial load
- ~2MB download for AR libraries

## 🛠️ Technology Stack

- **AR Framework**: AR.js 3.x with A-Frame 1.4.2
- **Marker Detection**: Custom ADNOC logo pattern recognition
- **WebXR**: Native browser AR capabilities
- **Responsive Design**: Mobile-first CSS3
- **No Dependencies**: Pure vanilla JavaScript

## 📖 How It Works

1. **QR Code Entry Point**
   - User scans QR code posted on desk
   - QR contains URL to web application
   - Eliminates manual URL entry

2. **Camera Initialization**
   - Requests rear camera access
   - Optimizes for AR performance
   - Enables marker tracking

3. **Marker Detection**
   - Uses custom ADNOC logo marker pattern
   - Computer vision detects marker position
   - Establishes AR coordinate system
   - Branded AR experience

4. **Zone Rendering**
   - 3D zones rendered relative to marker
   - Real-time tracking maintains alignment
   - Transparent overlays show safe areas

## 🎯 Use Cases

### 🏢 Corporate Offices
- Onboard new employees with proper desk setup
- Reduce workplace injury claims
- Ensure ergonomic compliance

### 🏠 Remote Workers
- Set up home office correctly
- Visualize optimal equipment placement
- Prevent long-term health issues

### 🎓 Educational Institutions
- Teach ergonomics principles visually
- Interactive learning tool
- Health and safety training

### 💼 Facility Management
- Quick desk assessments
- Standardize workspace setup
- Document ergonomic compliance

## 📱 Deployment

### GitHub Pages (Free)

1. **Enable GitHub Pages**
   ```bash
   # Push to main branch
   git add .
   git commit -m "Deploy AR app"
   git push origin main
   ```

2. **Configure GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "main" branch as source
   - Save changes

3. **Access Your App**
   ```
   https://your-username.github.io/ergonomic-ar/
   ```

### Custom Domain with HTTPS

1. **Add Custom Domain**
   - Create `CNAME` file with your domain
   - Configure DNS with CNAME record

2. **Enable HTTPS**
   - GitHub automatically provisions SSL
   - Or use Cloudflare for additional features

### Alternative Hosting

- **Netlify**: Drag-and-drop deployment with auto HTTPS
- **Vercel**: Git integration with instant HTTPS
- **Firebase Hosting**: Google infrastructure with SSL
- **AWS S3 + CloudFront**: Scalable with custom SSL

## 🔧 Customization

### Adjust Zone Sizes

Edit `index.html` zone dimensions:

```javascript
// Example: Modify primary zone size
<a-box
    id="primary-zone"
    width="0.8"    // Change width
    depth="0.6"    // Change depth
    ...>
</a-box>
```

### Change Zone Colors

Update zone colors in `index.html`:

```javascript
<a-box
    color="#4CAF50"    // Change to any hex color
    opacity="0.5"       // Adjust transparency
    ...>
</a-box>
```

### Add Custom Guidelines

Modify the guidelines panel text:

```javascript
<a-text
    value="YOUR CUSTOM\nGUIDELINES\nHERE"
    ...>
</a-text>
```

## 🐛 Troubleshooting

### Camera Not Working
- **Issue**: Camera access denied
- **Solution**: Check browser permissions, use HTTPS

### Marker Not Detected
- **Issue**: AR not tracking marker
- **Solution**: Ensure good lighting, marker is flat and clear, print quality is high

### Zones Not Appearing
- **Issue**: 3D objects not visible
- **Solution**: Point directly at marker, ensure WebGL is enabled

### Performance Issues
- **Issue**: Laggy AR experience
- **Solution**: Close other apps, use newer device, reduce browser tabs

### iOS Specific Issues
- **Issue**: Not working in Chrome iOS
- **Solution**: Use Safari browser (iOS requires Safari for WebXR)

### HTTPS Required Error
- **Issue**: Camera blocked on HTTP
- **Solution**: Deploy with HTTPS (GitHub Pages, Netlify, etc.)

## 📚 Ergonomic Guidelines

### Monitor Position
- ✅ Distance: 50-70cm (arm's length)
- ✅ Height: Top at or slightly below eye level
- ✅ Angle: Tilt 10-20° upward
- ✅ Avoid: Too close, too high, or at an angle

### Keyboard & Mouse
- ✅ Position: Elbows at 90-100° angle
- ✅ Wrists: Neutral position, not bent
- ✅ Mouse: Same height as keyboard
- ✅ Avoid: Reaching forward or to the side

### Desk Organization
- ✅ Frequent items: Within primary zone
- ✅ Occasional items: In secondary zone
- ✅ Clear space: For writing and work
- ✅ Avoid: Clutter in primary workspace

### General Tips
- 🕐 Take breaks every 30-60 minutes
- 👁️ Follow 20-20-20 rule (every 20 min, look 20 feet away for 20 seconds)
- 🪑 Adjust chair height properly
- 💡 Ensure proper lighting

## 🔒 Privacy & Security

- **No Data Collection**: App runs entirely in browser
- **No Server Communication**: After initial load, works offline
- **Camera Privacy**: Video never leaves your device
- **No Tracking**: No analytics or user tracking
- **Open Source**: Code is fully transparent

## 📄 License

MIT License - feel free to use, modify, and distribute.

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/ergonomic-ar/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ergonomic-ar/discussions)
- **Email**: your-email@example.com

## 🙏 Acknowledgments

- **AR.js**: Amazing open-source AR library
- **A-Frame**: WebVR/WebXR framework
- **OSHA**: Ergonomic guidelines and standards
- **Community**: All contributors and users

## 🔜 Roadmap

- [ ] Multiple marker support for larger desks
- [ ] Custom zone creation tool
- [ ] Export desk layout as image
- [ ] Multi-language support
- [ ] Integration with ergonomic assessments
- [ ] Chair and posture guidance
- [ ] Standing desk height recommendations

## 📊 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Safari iOS | 11+ | ✅ Full |
| Chrome Android | 67+ | ✅ Full |
| Firefox Mobile | Latest | ⚠️ Limited |
| Samsung Internet | 9+ | ✅ Full |
| Edge Mobile | Latest | ⚠️ Limited |

## 🎓 Educational Resources

- [OSHA Ergonomics Guidelines](https://www.osha.gov/ergonomics)
- [CDC Workplace Health](https://www.cdc.gov/workplacehealthpromotion/)
- [Cornell Ergonomics](https://ergo.human.cornell.edu/)

---

**Made with ❤️ for healthier workspaces**

*Last Updated: 2026-01-03*

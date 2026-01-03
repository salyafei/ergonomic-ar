# Contributing to Desk Ergonomics AR

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the Desk Ergonomics AR project.

## 🌟 How to Contribute

There are many ways to contribute to this project:

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit bug fixes
- ✨ Add new features
- 🎨 Improve UI/UX
- 🧪 Write tests
- 🌍 Add translations

## 🐛 Reporting Bugs

Before creating a bug report:

1. **Search existing issues** to avoid duplicates
2. **Test on multiple devices** to confirm the issue
3. **Gather information** about your environment

When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Screenshots** or screen recordings
- **Device information**:
  - Device model
  - OS version
  - Browser and version
- **Console errors** (if any)

### Example Bug Report

```markdown
**Title**: AR zones not appearing on iPhone 12

**Description**:
The AR zones don't render when using Safari on iPhone 12 Pro.

**Steps to Reproduce**:
1. Open app on iPhone 12 Pro (iOS 15.1)
2. Grant camera permission
3. Point camera at Hiro marker
4. Marker is detected but zones don't appear

**Expected**: Zones should overlay on the desk
**Actual**: Only marker detection indicator shows

**Environment**:
- Device: iPhone 12 Pro
- OS: iOS 15.1
- Browser: Safari 15.1

**Console Errors**:
```
WebGL warning: ...
```
```

## 💡 Suggesting Features

Feature suggestions are welcome! Please:

1. **Check existing issues** for similar suggestions
2. **Describe the use case** clearly
3. **Explain the benefit** to users
4. **Consider implementation** complexity

### Example Feature Request

```markdown
**Title**: Add standing desk height recommendations

**Description**:
Add AR visualization for optimal standing desk heights.

**Use Case**:
Many users have adjustable standing desks and need guidance
on proper height settings for different postures.

**Proposed Solution**:
- Add vertical markers showing recommended heights
- Include measurements in cm and inches
- Show both sitting and standing configurations

**Benefits**:
- Helps users with standing desks
- Promotes better ergonomics
- Extends app functionality
```

## 🔧 Development Setup

### Prerequisites

- Git
- Text editor (VS Code recommended)
- Web browser (Chrome or Safari)
- Smartphone for testing

### Getting Started

1. **Fork the repository**

   Click "Fork" button on GitHub

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/ergonomic-ar.git
   cd ergonomic-ar
   ```

3. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make changes**

   Edit files as needed

5. **Test locally**

   ```bash
   python -m http.server 8000
   ```

6. **Test on mobile**

   Use your local IP: `http://YOUR_IP:8000`

## 📝 Code Style Guidelines

### HTML

- Use semantic HTML5 elements
- Indent with 4 spaces
- Add comments for complex sections
- Keep accessibility in mind

```html
<!-- Good -->
<a-box
    id="primary-zone"
    position="0 0.05 -0.2"
    width="0.8"
    height="0.02">
</a-box>

<!-- Avoid -->
<a-box id="primary-zone" position="0 0.05 -0.2" width="0.8" height="0.02"></a-box>
```

### CSS

- Use meaningful class names
- Group related properties
- Add comments for complex styles
- Prefer flexbox/grid over floats

```css
/* Good */
.primary-btn {
    /* Layout */
    padding: 18px 30px;

    /* Typography */
    font-size: 1.1rem;
    font-weight: 600;

    /* Visual */
    background: linear-gradient(135deg, #4CAF50, #45a049);
    border-radius: 12px;

    /* Animation */
    transition: all 0.3s ease;
}
```

### JavaScript

- Use ES6+ features
- Add JSDoc comments for functions
- Use meaningful variable names
- Handle errors gracefully

```javascript
/**
 * Initializes the AR scene and sets up marker tracking
 * @returns {void}
 */
initializeARScene() {
    const scene = document.querySelector('a-scene');

    if (!scene) {
        console.error('AR scene not found');
        return;
    }

    // Setup marker events...
}
```

## 🧪 Testing Guidelines

### Before Submitting

Test your changes on:

- ✅ Desktop browser (Chrome/Safari)
- ✅ iPhone (Safari)
- ✅ Android (Chrome)
- ✅ Different screen sizes
- ✅ Different lighting conditions

### Testing Checklist

- [ ] App loads without errors
- [ ] Camera permission requested
- [ ] Marker detection works
- [ ] AR zones render correctly
- [ ] Controls function properly
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Performance is acceptable

## 📤 Submitting Changes

### Pull Request Process

1. **Update documentation** if needed

2. **Test thoroughly** on multiple devices

3. **Commit your changes**

   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   ```

   **Commit Message Format**:
   ```
   Add feature: brief description

   - Detailed point 1
   - Detailed point 2
   - Fixes #issue_number
   ```

4. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**

   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the template
   - Submit

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested on iOS Safari
- [ ] Tested on Android Chrome
- [ ] Tested marker detection
- [ ] Tested AR rendering

## Screenshots
(if applicable)

## Related Issues
Fixes #(issue number)
```

## 🎨 Design Guidelines

### Colors

Use the established color scheme:

- **Primary**: `#667eea` - `#764ba2` (gradient)
- **Success/Primary Zone**: `#4CAF50`
- **Warning/Secondary Zone**: `#FFC107`
- **Info/Monitor Zone**: `#2196F3`
- **Error/Warning Zone**: `#F44336`

### Typography

- **Headers**: System font stack
- **Body**: 1rem base size
- **Mobile**: Scale down 10-15%

### Spacing

- **Small**: 10px
- **Medium**: 20px
- **Large**: 40px

## 🌍 Internationalization

To add a new language:

1. Create `lang/[locale].json`
2. Translate all strings
3. Update language selector
4. Test RTL if applicable

## 📚 Documentation

When contributing:

- Update README.md if adding features
- Add inline code comments
- Update SETUP.md for new setup steps
- Include examples where helpful

## ⚖️ Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Other unprofessional conduct

## 📞 Getting Help

Need help contributing?

- **Questions**: Open a GitHub Discussion
- **Issues**: Create a GitHub Issue
- **Chat**: Join our community (if applicable)

## 🏆 Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Desk Ergonomics AR! 🎉**

Your contributions help create healthier workspaces for everyone.

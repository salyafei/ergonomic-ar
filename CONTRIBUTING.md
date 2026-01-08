# Contributing to Ergonomic AR

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 📋 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- Modern browser for testing

### Development Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/ergonomic-ar.git
   cd ergonomic-ar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 💻 Development Workflow

### Making Changes

1. Make your changes in the appropriate files
2. Test your changes locally
3. Run linter and formatter:
   ```bash
   npm run lint
   npm run format
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(components): add rotation animation to placed objects
fix(tap-to-place): correct hit-testing offset on iOS
docs(readme): update installation instructions
```

### Testing

Before submitting a PR, test on:

1. **Desktop:**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)

2. **Mobile:**
   - Android Chrome (87+)
   - iOS Safari (12+)

3. **Test AR Features:**
   - Surface detection (Android)
   - Fallback mode (iOS)
   - Object placement
   - Reset functionality

## 🎨 Code Style

### JavaScript/TypeScript

- Use ES6+ features
- Prefer `const` over `let`
- Use arrow functions where appropriate
- Add JSDoc comments for functions
- Maximum line length: 100 characters

### A-Frame Components

```javascript
/**
 * Component Description
 */
AFRAME.registerComponent('component-name', {
  schema: {
    property: { type: 'string', default: 'value' }
  },

  init() {
    // Initialize component
  },

  tick(time, deltaTime) {
    // Update loop
  },

  remove() {
    // Cleanup
  }
});
```

### CSS

- Use CSS variables for theming
- Mobile-first approach
- Use semantic class names
- Keep selectors specific but not overly nested

### HTML

- Use semantic HTML5 elements
- Include ARIA labels where appropriate
- Ensure proper meta tags

## 📦 Adding Features

### New A-Frame Component

1. Create file in `src/components/`
2. Export component
3. Import in scene
4. Add documentation
5. Add example usage

### New 3D Model

1. Optimize model (< 5MB)
2. Use DRACO compression if possible
3. Place in `public/assets/models/`
4. Update assets in scene
5. Add attribution if required

### New Scene

1. Create HTML file in `src/scenes/`
2. Import required components
3. Add to Vite config
4. Link from index page
5. Test thoroughly

## 🐛 Reporting Bugs

### Before Reporting

- Check existing issues
- Try latest version
- Reproduce on clean install

### Bug Report Should Include

- **Description:** Clear description of the bug
- **Steps to Reproduce:**
  1. Step one
  2. Step two
  3. ...
- **Expected Behavior:** What should happen
- **Actual Behavior:** What actually happens
- **Environment:**
  - OS and version
  - Browser and version
  - Device (if mobile)
  - Node version (for build issues)
- **Screenshots/Videos:** If applicable
- **Console Errors:** Any error messages

## 💡 Feature Requests

Feature requests are welcome! Please include:

- **Use Case:** Why is this feature needed?
- **Proposed Solution:** How should it work?
- **Alternatives:** Other approaches considered
- **Examples:** Similar features in other projects

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Linter passes (`npm run lint`)
- [ ] Formatter applied (`npm run format`)
- [ ] Tested on multiple devices
- [ ] Documentation updated
- [ ] Commits follow conventional format

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Android Chrome
- [ ] Tested on iOS Safari
- [ ] Tested on Desktop
- [ ] All checks passing

## Screenshots
If applicable, add screenshots

## Related Issues
Fixes #(issue number)
```

### Review Process

1. Maintainer will review within 1-2 weeks
2. Address any requested changes
3. Once approved, PR will be merged
4. Changes will be deployed automatically

## 📝 Documentation

### Updating README

- Keep installation steps current
- Add new features to features list
- Update compatibility table
- Add troubleshooting tips

### Code Comments

```javascript
/**
 * Calculate placement position based on hit test result
 * @param {XRHitTestResult} hit - Hit test result from WebXR
 * @param {XRReferenceSpace} referenceSpace - WebXR reference space
 * @returns {THREE.Vector3} Position in 3D space
 */
function calculatePosition(hit, referenceSpace) {
  // Implementation
}
```

## 🎯 Areas for Contribution

### High Priority

- [ ] iOS WebXR improvements
- [ ] Performance optimizations
- [ ] Accessibility enhancements
- [ ] More fallback modes
- [ ] Better error handling

### Medium Priority

- [ ] Additional example scenes
- [ ] More UI themes
- [ ] Localization/i18n
- [ ] Advanced lighting
- [ ] Shadows support

### Low Priority

- [ ] Additional animations
- [ ] Sound effects
- [ ] Analytics integration
- [ ] Social sharing
- [ ] PWA enhancements

## ❓ Questions?

- **General Questions:** [Open a Discussion](https://github.com/salyafei/ergonomic-ar/discussions)
- **Bug Reports:** [Open an Issue](https://github.com/salyafei/ergonomic-ar/issues)
- **Security Issues:** Email [security contact] (do not open public issue)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Ergonomic AR! 🎉

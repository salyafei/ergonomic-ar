# 📐 AR Marker Information

## About the ADNOC Custom Marker

This application uses a **custom ADNOC logo marker** pattern for AR tracking. The ADNOC-branded marker provides a professional, corporate identity while maintaining full AR functionality with AR.js.

## Marker Download

### Using the ADNOC Marker Generator

The application includes a dedicated ADNOC Marker Generator tool:

1. **Click** "Generate ADNOC Marker" button in the app
2. **Follow** the step-by-step instructions
3. **Download** the ADNOC logo from www.adnoc.ae
4. **Generate** the custom marker pattern using AR.js tools
5. **Print** the generated marker

### Detailed Setup Guide

For complete instructions, see: **[ADNOC-MARKER-SETUP.md](ADNOC-MARKER-SETUP.md)**

### Alternative: Standard Hiro Marker (Fallback)

If you prefer to use the standard marker instead of the ADNOC logo:
```
https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png
```
Note: The application is configured for ADNOC marker by default.

## Printing Guidelines

### Paper Specifications

- **Paper Type**: White, non-glossy paper
- **Paper Size**: A4 (210 × 297mm) or Letter (8.5 × 11 inches)
- **Color Mode**: Black and white (not grayscale)
- **Resolution**: Minimum 300 DPI

### Print Settings

1. **Printer Settings**:
   - Quality: Best/High quality
   - Color: Black and white
   - Paper: Plain paper
   - Scale: 100% (actual size)

2. **Margins**:
   - Keep standard margins
   - Do not scale to fit
   - Ensure marker is centered

3. **Quality Check**:
   - Black areas should be solid black
   - White areas should be pure white
   - No smudging or fading
   - Clear, sharp edges

## Marker Preparation

### Cutting

1. Cut around the marker leaving ~2cm white border
2. Use sharp scissors or paper cutter
3. Ensure straight, clean edges

### Protection

Choose one of these methods:

1. **Lamination** (Best):
   - Use laminating pouch
   - Remove air bubbles
   - Trim excess laminate

2. **Sheet Protector**:
   - Place in clear sheet protector
   - Tape edges if needed

3. **Clear Contact Paper**:
   - Apply to both sides
   - Smooth out bubbles
   - Trim edges

4. **Tape**:
   - Clear packing tape over surface
   - Overlap strips slightly
   - Avoid wrinkles

### Mounting

1. **Desk Surface**:
   - Place on flat area
   - Center in workspace
   - Ensure it won't move

2. **Attachment Options**:
   - Double-sided tape (removable)
   - Blu-tack for temporary placement
   - Tape corners for permanent setup
   - Desk mat underneath

## Placement Guidelines

### Location

- **Position**: Center of main work area
- **Height**: Flat on desk surface
- **Orientation**: Any rotation works
- **Clearance**: Keep area around marker clear

### Environmental Factors

1. **Lighting**:
   - Bright, even lighting
   - Avoid harsh shadows
   - No direct glare or reflections
   - Minimum 300 lux recommended

2. **Background**:
   - Contrasting desk surface
   - Avoid similar patterns nearby
   - Keep area uncluttered

3. **Viewing Angle**:
   - Best: 30-60° angle
   - Works: 15-75° angle
   - Avoid: Nearly parallel to surface

## Marker Size Guidelines

### Standard Size (Recommended)

- **Dimensions**: 15cm × 15cm (6" × 6")
- **Tracking Distance**: 30-100cm (12-40")
- **Use Case**: Most desk setups

### Large Size

- **Dimensions**: 20cm × 20cm (8" × 8")
- **Tracking Distance**: 40-150cm (16-60")
- **Use Case**: Large desks, standing position

### Small Size

- **Dimensions**: 10cm × 10cm (4" × 4")
- **Tracking Distance**: 20-60cm (8-24")
- **Use Case**: Small desks, close viewing

## Troubleshooting Marker Detection

### Marker Not Detected

**Possible Causes & Solutions**:

1. **Poor Print Quality**:
   - Reprint at higher quality
   - Check printer ink levels
   - Use better paper

2. **Bad Lighting**:
   - Add more light
   - Reduce shadows
   - Avoid backlight

3. **Wrinkled/Damaged Marker**:
   - Replace with fresh print
   - Flatten marker
   - Laminate for protection

4. **Wrong Distance**:
   - Move camera closer/further
   - Optimal: 40-60cm

5. **Obstructions**:
   - Remove objects over marker
   - Keep marker fully visible
   - Clean camera lens

### Tracking Lost Frequently

**Solutions**:

1. **Improve Marker Stability**:
   - Secure marker firmly
   - Use heavier paper
   - Laminate for stiffness

2. **Better Lighting**:
   - Add desk lamp
   - Use diffused light
   - Eliminate flickering lights

3. **Marker Condition**:
   - Replace faded marker
   - Ensure flat placement
   - Check for damage

## Alternative Markers

### Creating Custom Markers

While this app uses the Hiro marker, you can create custom markers:

1. Visit AR.js marker generator:
   ```
   https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
   ```

2. Upload your custom image

3. Download generated marker

4. Update `index.html`:
   ```html
   <a-marker type="pattern" url="path/to/your/pattern.patt">
   ```

### Other Standard Markers

AR.js supports these built-in markers:

- **Hiro** (default): `preset="hiro"`
- **Kanji**: `preset="kanji"`
- **Custom**: `type="pattern" url="marker.patt"`

## QR Code Integration

While the marker is for AR tracking, the QR code serves a different purpose:

- **QR Code**: Launches the web app
- **AR Marker**: Tracks desk surface for AR overlay

Both are needed for complete functionality:
1. User scans QR → App loads
2. Point camera at marker → AR zones appear

## Marker Maintenance

### Regular Checks

- **Weekly**: Check for damage or fading
- **Monthly**: Clean protective layer
- **As Needed**: Replace if torn or worn

### Cleaning

1. **Laminated Markers**:
   - Wipe with damp microfiber cloth
   - Dry immediately
   - Avoid harsh chemicals

2. **Unprotected Markers**:
   - Do not clean (may damage)
   - Replace when dirty

### Storage

When not in use:
- Store flat
- Keep dry
- Avoid folding
- Protect from sunlight

## Best Practices

1. ✅ Print at high quality
2. ✅ Laminate for durability
3. ✅ Place in well-lit area
4. ✅ Keep marker flat and clean
5. ✅ Secure firmly to desk
6. ✅ Replace when damaged
7. ✅ Test before important use

## Technical Specifications

### Marker Pattern Details

- **Type**: 2D fiducial marker
- **Pattern**: Black and white asymmetric
- **Border**: Required for detection
- **Inner Pattern**: Unique identifier
- **Detection Method**: Computer vision

### Recognition Technology

- **Algorithm**: Template matching
- **Processing**: Client-side (in browser)
- **Framerate**: 30-60 FPS
- **Latency**: <100ms typically

## Resources

- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [Marker Training Guide](https://ar-js-org.github.io/AR.js-Docs/marker-based/)
- [Marker Generator](https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)

---

**Questions?** Check the main README.md or open an issue on GitHub.

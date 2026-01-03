# 🎯 ADNOC Marker Setup Guide

Complete guide for setting up the ADNOC logo as your AR marker for the Desk Ergonomics AR application.

## 📋 Overview

This application has been configured to use a custom AR marker based on the **ADNOC logo** instead of the standard Hiro marker. This provides a branded, professional experience while maintaining full AR functionality.

## 🔧 What You Need

- ADNOC logo image (downloaded from www.adnoc.ae)
- AR.js Pattern Marker Generator (web-based tool)
- Printer (for physical marker)
- White A4 or Letter paper

## 📝 Step-by-Step Setup

### Step 1: Download the ADNOC Logo

#### Option A: From ADNOC Website

1. **Visit the official ADNOC website:**
   ```
   https://www.adnoc.ae
   ```

2. **Locate the ADNOC logo:**
   - Usually found in the top-left corner of the header
   - Look for the green ADNOC corporate logo

3. **Download the logo:**
   - **Method 1:** Right-click on the logo → "Save image as..."
   - **Method 2:** Open browser DevTools (F12) → Elements tab → Find `<img>` tag with logo → Copy image URL
   - **Method 3:** View page source → Search for logo image path

4. **Save the file:**
   - Filename: `adnoc-logo.png` or `adnoc-logo.svg`
   - Location: Your downloads folder

#### Option B: Use Brand Guidelines

If you have access to ADNOC's brand guidelines or press kit:
- Use the official high-resolution logo
- Prefer vector format (SVG) or high-res PNG
- Ensure it's the approved corporate logo

### Step 2: Prepare the Logo for AR Marker Generation

For best AR tracking results, prepare your logo:

1. **Image Requirements:**
   - **Format:** PNG or JPG
   - **Size:** Minimum 512x512 pixels (1024x1024 recommended)
   - **Aspect Ratio:** Square or near-square
   - **Background:** White or transparent
   - **Logo Color:** High contrast (ADNOC green works well)

2. **Image Editing (if needed):**
   - Open logo in image editor (Photoshop, GIMP, Canva, etc.)
   - Create square canvas (e.g., 1024x1024px)
   - Center the ADNOC logo
   - Add white background if transparent
   - Ensure good contrast between logo and background
   - Export as PNG

### Step 3: Generate AR Marker Pattern

#### Using AR.js Online Generator

1. **Open the AR.js Pattern Marker Generator:**
   ```
   https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
   ```

2. **Upload your ADNOC logo:**
   - Click "Choose File" or drag-and-drop
   - Select your prepared ADNOC logo image
   - Wait for processing (usually instant)

3. **Download the generated files:**

   **File 1: Pattern File (.patt)**
   - Click "Download Marker" or "Download Pattern"
   - Save as: `adnoc-marker.patt`
   - This file contains the tracking data for AR.js

   **File 2: Printable Marker (PNG)**
   - The generator shows a preview with black border
   - Right-click → "Save image as..."
   - Save as: `adnoc-marker.png`
   - This is what you'll print and place on your desk

4. **Verify the files:**
   - `adnoc-marker.patt` - Text file with pattern data
   - `adnoc-marker.png` - Image with logo in center, black border frame

### Step 4: Add Files to Your Project

1. **Locate your project directory:**
   ```bash
   cd ergonomic-ar
   ```

2. **Add the pattern file:**
   - Copy `adnoc-marker.patt` to the root directory
   ```bash
   # Example:
   cp ~/Downloads/adnoc-marker.patt ./adnoc-marker.patt
   ```

3. **Add the printable marker:**
   - Copy `adnoc-marker.png` to the root directory
   ```bash
   cp ~/Downloads/adnoc-marker.png ./adnoc-marker.png
   ```

4. **Verify files are in place:**
   ```bash
   ls -la | grep adnoc
   ```

   Should show:
   ```
   adnoc-marker.patt
   adnoc-marker.png
   ```

5. **Commit the files:**
   ```bash
   git add adnoc-marker.patt adnoc-marker.png
   git commit -m "Add ADNOC custom AR marker pattern and printable image"
   git push origin claude/ar-desk-ergonomics-8vnnY
   ```

### Step 5: Print and Deploy the Physical Marker

1. **Print the marker:**
   - Open `adnoc-marker.png`
   - Print settings:
     - **Quality:** Best/High (300 DPI minimum)
     - **Color:** Color (to preserve ADNOC green)
     - **Paper:** White A4 or Letter
     - **Scale:** 100% actual size (no fitting)
     - **Orientation:** Portrait or Landscape (depending on logo)

2. **Prepare the physical marker:**
   - Cut around the black border (leave ~1cm white margin)
   - **Laminate** (recommended):
     - Use laminating pouch
     - Remove all air bubbles
     - Trim excess laminate
   - **Or use sheet protector:**
     - Place in clear sheet protector
     - Tape edges to secure

3. **Place on desk:**
   - Center in your workspace
   - Ensure flat surface (no wrinkles or curves)
   - Secure with double-sided tape or blu-tack
   - Good lighting conditions
   - No shadows or glare

### Step 6: Test the AR Experience

1. **Deploy your updated app:**
   - Merge to main and deploy to GitHub Pages
   - Or test locally on your network

2. **Open on mobile device:**
   - Visit app URL
   - Click "Start AR Experience"
   - Allow camera access

3. **Point camera at ADNOC marker:**
   - Hold phone 40-60cm from marker
   - Angle 30-60 degrees
   - Keep marker fully visible
   - Wait for tracking to activate

4. **Verify zones appear:**
   - Green primary zone
   - Yellow secondary zone
   - Blue monitor zone
   - Red warning zone
   - Guidelines panel

## ✅ Verification Checklist

Before going live, verify:

- [ ] `adnoc-marker.patt` is in project root
- [ ] `adnoc-marker.png` is in project root
- [ ] Files committed to git repository
- [ ] Changes pushed to GitHub
- [ ] Marker printed at high quality
- [ ] Marker laminated or protected
- [ ] Marker placed on desk
- [ ] App deployed (GitHub Pages/Netlify)
- [ ] Tested on iOS Safari
- [ ] Tested on Android Chrome
- [ ] Tracking works reliably
- [ ] Zones display correctly

## 🎨 Customization Tips

### Adjusting Marker Size

If tracking is unreliable, try different marker sizes:

**Small marker (15cm × 15cm):**
- Best for: Close-range viewing (20-60cm)
- Print: Scale to 50-60% of page

**Medium marker (20cm × 20cm):**
- Best for: Standard desk viewing (40-100cm)
- Print: Scale to 70-80% of page

**Large marker (25cm × 25cm):**
- Best for: Far viewing or standing desk (60-150cm)
- Print: Full page size

### Improving Tracking Performance

1. **Enhance contrast:**
   - Use bright white background
   - Ensure ADNOC green is vibrant
   - Avoid faded prints

2. **Optimize lighting:**
   - 300-500 lux ambient light
   - Avoid direct sunlight
   - No harsh shadows
   - Diffused lighting works best

3. **Marker placement:**
   - Completely flat surface
   - No wrinkles or bends
   - Stable position (won't move)
   - Clear area around marker

## 🔄 Alternative: Multiple Markers

You can configure the app to support both ADNOC and standard markers:

1. **Edit index.html:**
   ```html
   <!-- ADNOC Marker -->
   <a-marker type="pattern" url="adnoc-marker.patt" id="marker-adnoc">
       <!-- zones here -->
   </a-marker>

   <!-- Fallback Hiro Marker -->
   <a-marker preset="hiro" id="marker-hiro">
       <!-- same zones here -->
   </a-marker>
   ```

2. **Update app.js to detect both:**
   ```javascript
   const adnocMarker = document.querySelector('#marker-adnoc');
   const hiroMarker = document.querySelector('#marker-hiro');

   // Add event listeners to both
   ```

This allows users to choose between ADNOC-branded or standard marker.

## 🐛 Troubleshooting

### Marker Not Detected

**Problem:** Camera doesn't recognize the ADNOC marker

**Solutions:**
1. Improve lighting conditions
2. Reprint marker at higher quality
3. Ensure marker is completely flat
4. Check pattern file is correctly uploaded
5. Verify file path in index.html is correct
6. Try regenerating pattern with different logo preparation

### Tracking is Unstable

**Problem:** Zones appear and disappear frequently

**Solutions:**
1. Increase marker size (print larger)
2. Laminate marker for stiffness
3. Improve lighting (add desk lamp)
4. Reduce logo complexity (simpler version)
5. Ensure marker has clear black border

### Pattern File Not Loading

**Problem:** Console shows 404 error for adnoc-marker.patt

**Solutions:**
1. Verify file is in project root directory
2. Check filename matches exactly: `adnoc-marker.patt`
3. Ensure file is committed and pushed to GitHub
4. Check GitHub repository shows the file
5. Wait a few minutes for deployment

### Logo Appears Distorted

**Problem:** ADNOC logo looks stretched or pixelated

**Solutions:**
1. Use higher resolution source image
2. Ensure square aspect ratio
3. Regenerate marker with better quality logo
4. Use vector (SVG) source if available

## 📚 Additional Resources

- **AR.js Documentation:** https://ar-js-org.github.io/AR.js-Docs/
- **Marker Training Guide:** https://ar-js-org.github.io/AR.js-Docs/marker-based/
- **Pattern Marker Generator:** https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
- **ADNOC Website:** https://www.adnoc.ae

## 🆘 Need Help?

If you encounter issues:

1. **Check the documentation:**
   - README.md - Main documentation
   - MARKER-INFO.md - General marker guide
   - This file - ADNOC-specific setup

2. **Common issues:**
   - File paths must be exact
   - Pattern file must be .patt format
   - Marker must have high contrast
   - Lighting is critical for tracking

3. **Get support:**
   - Open GitHub issue
   - Check AR.js community forums
   - Review AR.js examples

## ✨ Benefits of ADNOC Branded Marker

- **Professional branding:** Custom ADNOC logo
- **Corporate identity:** Reinforces company brand
- **Unique experience:** Personalized AR tracking
- **Same functionality:** All ergonomic features work identically
- **Easy recognition:** Familiar logo for ADNOC employees

---

**Your ADNOC-branded AR ergonomics experience is ready!**

Follow the steps above to complete setup and start visualizing ergonomic zones with the ADNOC logo.

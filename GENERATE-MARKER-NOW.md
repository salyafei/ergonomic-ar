# Quick ADNOC Marker Generation

## You've provided the ADNOC logo! Here's how to complete the setup:

### STEP 1: Generate Pattern File (2 minutes)

1. **Open this URL in your browser:**
   ```
   https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
   ```

2. **Upload the ADNOC logo image** you just shared (save it first if needed)

3. **The tool will generate TWO files automatically:**

   **File 1: Pattern File**
   - Appears as downloadable link or button
   - Right-click → "Save as..."
   - Save as: `adnoc-marker.patt`
   - Save to: `~/Downloads/`

   **File 2: Marker Image**
   - Shows preview with black border around ADNOC logo
   - Right-click on the preview image → "Save image as..."
   - Save as: `adnoc-marker.png`
   - Save to: `~/Downloads/`

### STEP 2: Add to Project (30 seconds)

Once you have both files in ~/Downloads/, run:

```bash
cd /home/user/ergonomic-ar
cp ~/Downloads/adnoc-marker.patt ./adnoc-marker.patt
cp ~/Downloads/adnoc-marker.png ./adnoc-marker.png
git add adnoc-marker.patt adnoc-marker.png
git commit -m "Add generated ADNOC marker pattern and printable image"
git push origin claude/ar-desk-ergonomics-8vnnY
```

### STEP 3: Deploy (1 minute)

Then proceed with GitHub Pages deployment!

---

## ⚡ QUICK START

1. Open: https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
2. Upload your ADNOC logo
3. Download both files
4. Run the commands above
5. Done!

---

**I'm ready to help once you have the files downloaded!**

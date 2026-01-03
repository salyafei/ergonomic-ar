================================================================================
  ADNOC AR MARKER SETUP - REQUIRED ACTION
================================================================================

The Desk Ergonomics AR application is configured to use a custom ADNOC logo
marker for AR tracking. To complete the setup, you need to generate the
marker pattern file.

================================================================================
  QUICK SETUP (5 minutes)
================================================================================

STEP 1: Download ADNOC Logo
----------------------------
Visit: https://www.adnoc.ae
- Find the ADNOC logo (usually in header)
- Right-click > Save image as "adnoc-logo.png"
- Save to your computer

STEP 2: Generate Marker Pattern
--------------------------------
Visit: https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
- Upload your adnoc-logo.png
- Download the generated .patt file
- Save as "adnoc-marker.patt"

STEP 3: Add Files to Project
-----------------------------
- Replace "adnoc-marker.patt" in project root with your generated file
- Add the printable marker PNG to project
- Commit and push to GitHub

STEP 4: Print and Deploy
-------------------------
- Print the marker image on white A4/Letter paper
- Laminate or protect with clear sheet
- Place on your desk
- Test the AR experience!

================================================================================
  DETAILED DOCUMENTATION
================================================================================

For complete step-by-step instructions with screenshots, see:
- ADNOC-MARKER-SETUP.md (comprehensive guide)
- adnoc-marker-generator.html (web-based tool)
- MARKER-INFO.md (general marker information)

================================================================================
  ALTERNATIVE OPTION
================================================================================

If you want to use the standard Hiro marker instead:
1. Edit index.html line 85
2. Change: type="pattern" url="adnoc-marker.patt"
   To: preset="hiro"
3. Download Hiro marker from:
   https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

================================================================================
  SUPPORT
================================================================================

Questions? Check the documentation or open a GitHub issue.

The ADNOC branded marker provides a professional, corporate AR experience
that reinforces brand identity while maintaining full functionality.

================================================================================

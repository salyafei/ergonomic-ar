# Creating the USDZ Model for iOS AR Quick Look

## Quick Start

You need to create a `desk-ergonomics.usdz` file and place it in this folder.

## Method 1: Use the Generator Tool (Recommended)

1. Open `create-usdz-model.html` in your browser
2. Click "Generate 3D Model"
3. Click "Download GLB File"
4. Convert the GLB to USDZ using one of these methods:

### Option A: Reality Converter (Mac only - FREE)
1. Download [Reality Converter](https://developer.apple.com/augmented-reality/tools/) from Apple
2. Drag the downloaded `ergonomic-zones.glb` file into Reality Converter
3. Click "Export" and save as `desk-ergonomics.usdz`
4. Move the file to this `models/` folder

### Option B: Online Converter (Any platform)
1. Visit [Aspose GLB to USDZ Converter](https://products.aspose.app/3d/conversion/glb-to-usdz)
2. Upload the `ergonomic-zones.glb` file
3. Click "Convert"
4. Download the USDZ file
5. Rename it to `desk-ergonomics.usdz`
6. Move it to this `models/` folder

### Option C: Command Line (Mac with Xcode)
```bash
# Navigate to this directory
cd models/

# Convert GLB to USDZ
xcrun usdz_converter ergonomic-zones.glb desk-ergonomics.usdz

# Verify the file was created
ls -lh desk-ergonomics.usdz
```

## Method 2: Use a Sample USDZ File

For quick testing, you can download a sample USDZ model:

1. Visit [Apple's AR Quick Look Gallery](https://developer.apple.com/augmented-reality/quick-look/)
2. Download any sample USDZ file
3. Rename it to `desk-ergonomics.usdz`
4. Place it in this folder

**Note:** This will show the sample object, not the actual ergonomic zones. Use Method 1 for the proper zones model.

## Verifying It Works

1. Make sure `desk-ergonomics.usdz` is in the `models/` folder
2. Commit and push to GitHub
3. Wait for GitHub Pages to rebuild (2-3 minutes)
4. Visit the app on your iPhone
5. Tap the "View in AR (iOS Quick Look)" button
6. Your iPhone should launch the AR viewer!

## File Structure

```
ergonomic-ar/
├── models/
│   ├── desk-ergonomics.usdz  ← Place your USDZ file here
│   └── README.md  ← This file
├── create-usdz-model.html  ← Generator tool
└── index.html
```

## Troubleshooting

**"Can't find desk-ergonomics.usdz"**
- Make sure the file is named exactly `desk-ergonomics.usdz` (all lowercase)
- Make sure it's in the `models/` folder
- Make sure you've pushed it to GitHub

**"AR doesn't launch when I tap the button"**
- Make sure you're using Safari on iOS (not Chrome)
- Make sure you're on HTTPS (not HTTP)
- Make sure your iPhone is 6s or later

**"The zones don't look right"**
- Use the generator tool (`create-usdz-model.html`) to create the proper model
- Don't use sample USDZ files for production

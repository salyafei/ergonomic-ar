# iOS Safari Setup Guide for WebXR

## Why You Need This

WebXR is an **experimental feature** in iOS Safari and needs to be manually enabled. Even if you have iOS 15.4 or later, WebXR won't work until you enable it in Safari settings.

## Step-by-Step Instructions

### 1. Check Your iOS Version
- Go to **Settings** > **General** > **About**
- Look at **Software Version**
- You need **iOS 15.4 or later**

If your iOS version is below 15.4, you'll need to update iOS first:
- Go to **Settings** > **General** > **Software Update**

### 2. Enable WebXR in Safari

Follow these exact steps:

1. **Open Settings app** on your iPhone/iPad
2. **Scroll down** and tap **Safari**
3. **Scroll down** to the bottom and tap **Advanced**
4. Tap **Feature Flags** (on some iOS versions this is called **Experimental Features**)
5. **Find and enable** the following:
   - ✅ **WebXR Device API**
   - ✅ **WebXR Augmented Reality Module** (if available)
6. **Close Settings**

### 3. Restart Safari

Important: You must fully close and reopen Safari:

1. **Double-click** the Home button (or swipe up from bottom on newer iPhones)
2. **Swipe up** on Safari to close it completely
3. **Reopen Safari**

### 4. Test the App

1. Visit: `https://salyafei.github.io/ergonomic-ar/`
2. The **"Start AR Experience"** button should now be enabled (not grayed out)
3. Tap the button and grant camera permission
4. Point your camera at your desk and tap to place zones!

## Troubleshooting

### "Feature Flags" option not available
- Update to the latest iOS version
- Older versions may call it "Experimental Features" instead

### Button still says "WebXR Not Supported"
- Make sure you completely closed and reopened Safari
- Try restarting your iPhone/iPad
- Check that you're using Safari (not Chrome or another browser on iOS)

### AR session fails to start
- Make sure you're on HTTPS (https://salyafei.github.io/...)
- Grant camera permission when prompted
- Try in good lighting conditions
- Ensure your desk surface has visible features (not completely blank/white)

## Device Requirements

- **Minimum:** iOS 15.4
- **Recommended:** iOS 16 or later
- **Browser:** Safari only (Chrome/Firefox won't work for WebXR on iOS)
- **Connection:** HTTPS required
- **Hardware:** iPhone 6s or later, iPad (5th generation) or later

## Still Having Issues?

If you've followed all steps and it still doesn't work:

1. Check your iOS version is truly 15.4+
2. Make sure you're using Safari (not another browser)
3. Verify the URL starts with `https://` (not `http://`)
4. Try on a different WiFi network
5. Restart your device

## Alternative: Use Android

If you can't get WebXR working on iOS, the app works great on Android:
- Android 9 or later
- Chrome browser 87 or later
- No special settings needed - WebXR works by default!

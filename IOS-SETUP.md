# iOS Safari Setup Guide for WebXR

## ⚠️ UPDATE: WebXR No Longer Needed on iOS!

**Good news!** The app now uses **AR Quick Look** for iOS devices, which works natively without any WebXR settings.

**What this means:**
- ✅ Works on iOS 12+ (not just 15.4+)
- ✅ No Feature Flags to enable
- ✅ No WebXR setup required
- ✅ Just tap the button and AR launches automatically!

**This guide is kept for reference only** - you don't need to follow these steps anymore if you're using the current version of the app.

---

## Old WebXR Setup (Not Required Anymore)

Below are the old instructions for enabling WebXR on iOS. **You don't need this anymore** - the app uses AR Quick Look instead, which works out of the box.

### Why You Needed This (Before)

WebXR was an **experimental feature** in iOS Safari that needed manual enablement. The app no longer uses WebXR on iOS.

## Step-by-Step Instructions

### 1. Check Your iOS Version First!

**This is critical - check this first:**

1. Go to **Settings** > **General** > **About**
2. Look at **Software Version**
3. You need **iOS 15.4 or later** (preferably iOS 16+)

**Examples of version numbers:**
- ✅ iOS 16.5 - **Works** (WebXR available)
- ✅ iOS 15.4 - **Works** (WebXR available)
- ❌ iOS 15.3 - **Won't work** (WebXR not available)
- ❌ iOS 14.x - **Won't work** (WebXR not available)

**If your iOS version is below 15.4:**
- Go to **Settings** > **General** > **Software Update**
- Update to at least iOS 15.4 or later
- WebXR will NOT work on iOS 15.3 or earlier, no matter what you do

### 2. Enable WebXR in Safari

Follow these exact steps:

1. **Open Settings app** on your iPhone/iPad
2. **Scroll down** and tap **Safari**
3. **Scroll down** to the bottom and tap **Advanced**
4. Tap **Feature Flags** (on some iOS versions this is called **Experimental Features**)
5. **Scroll through the list** and look for ANY of these names:
   - ✅ **WebXR Device API**
   - ✅ **WebXR** (just "WebXR" by itself)
   - ✅ **WebXR Augmented Reality Module**
   - ✅ Any flag containing "XR" or "WebXR"
6. **Enable all WebXR-related flags you find**
7. **Close Settings**

**⚠️ Can't find any WebXR flags?** This means your iOS version doesn't support WebXR. See "Check Your iOS Version" below.

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
- If you still can't find it, your device may not support it

### No WebXR flags in the Feature Flags list
**This is the most common issue!**

If you open Feature Flags but can't find ANY WebXR-related options:
1. **Check your exact iOS version:** Settings > General > About > Software Version
2. **If you're on iOS 15.0-15.3:** WebXR was added in iOS 15.4, you MUST update
3. **If you're on iOS 14.x or earlier:** WebXR is not available, you MUST update to iOS 15.4+
4. **If you're on iOS 15.4+:** Try searching the flags list more carefully - look for ANY flag with "XR" in the name

**Note:** Some older iPhone models may not support iOS 15.4+. Check if your device can update to iOS 15.4 or later.

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

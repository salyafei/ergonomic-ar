# 🚀 GitHub Pages Deployment Guide

Your Desk Ergonomics AR app is ready to deploy! Follow these simple steps to make it live on GitHub Pages.

## 📋 Deployment Steps

### Step 1: Merge to Main Branch (via GitHub Web Interface)

Since the code is currently in the `claude/ar-desk-ergonomics-8vnnY` branch, you need to merge it to `main`:

**Option A: Create Pull Request (Recommended)**

1. **Go to your GitHub repository:**
   ```
   https://github.com/salyafei/ergonomic-ar
   ```

2. **Click "Compare & pull request"** button (should appear automatically)

3. **Or manually create PR:**
   - Click "Pull requests" tab
   - Click "New pull request"
   - Base: `main` ← Compare: `claude/ar-desk-ergonomics-8vnnY`
   - Click "Create pull request"

4. **Review and merge:**
   - Add title: "Deploy Desk Ergonomics AR application"
   - Click "Create pull request"
   - Click "Merge pull request"
   - Click "Confirm merge"

**Option B: Direct Merge via Command Line (Advanced)**

If you have write access to main locally:
```bash
git checkout main
git merge claude/ar-desk-ergonomics-8vnnY
git push origin main
```

### Step 2: Enable GitHub Pages

1. **Go to repository Settings:**
   - Navigate to: `https://github.com/salyafei/ergonomic-ar/settings`
   - Or click "Settings" tab in your repository

2. **Scroll to "Pages" section:**
   - In left sidebar, click "Pages"

3. **Configure source:**
   - Under "Source", select:
     - **Branch:** `main`
     - **Folder:** `/ (root)`
   - Click "Save"

4. **Wait for deployment:**
   - GitHub will start building your site
   - Takes 1-3 minutes typically
   - Refresh the page to see the URL

### Step 3: Access Your Live App

Your app will be available at:
```
https://salyafei.github.io/ergonomic-ar/
```

**Pages to access:**
- Main app: `https://salyafei.github.io/ergonomic-ar/`
- QR Generator: `https://salyafei.github.io/ergonomic-ar/qr-generator.html`

## ✅ Verification

Once deployed, verify:

1. **Main page loads:**
   - Visit the URL above
   - Should see the landing page

2. **Camera access works:**
   - Open on mobile device
   - Click "Start AR Experience"
   - Should request camera permission

3. **AR marker detection:**
   - Print the Hiro marker
   - Point camera at marker
   - Zones should appear

## 🔄 Automatic Deployment (Already Configured!)

I've included a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys to GitHub Pages whenever you push to `main`. This means:

- **Push to main** → Auto-deploys to GitHub Pages
- No manual intervention needed after initial setup
- Deployment typically completes in 1-2 minutes

## 🌐 Custom Domain (Optional)

Want to use your own domain?

1. **Add CNAME file:**
   ```bash
   echo "your-domain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

2. **Configure DNS:**
   - Add CNAME record pointing to: `salyafei.github.io`

3. **Update GitHub Pages settings:**
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## 🔍 Troubleshooting

### "404 - Page not found"

**Cause:** GitHub Pages not properly configured

**Solution:**
- Check Settings → Pages is set to `main` branch
- Wait 2-3 minutes after enabling
- Clear browser cache

### "Deployment failed"

**Cause:** GitHub Actions workflow error

**Solution:**
- Check "Actions" tab in GitHub
- Review error logs
- Ensure all files are valid HTML/CSS/JS

### "Camera not working"

**Cause:** Not using HTTPS

**Solution:**
- GitHub Pages automatically uses HTTPS
- Ensure you're accessing via `https://` not `http://`
- On iOS, use Safari (not Chrome)

## 📱 Next Steps After Deployment

1. **Generate QR Code:**
   - Visit: `https://salyafei.github.io/ergonomic-ar/qr-generator.html`
   - URL auto-fills with your GitHub Pages URL
   - Generate and print QR code

2. **Download Marker:**
   - Click "Download Desk Marker" in the app
   - Or visit: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png
   - Print on white paper (high quality)

3. **Test on Mobile:**
   - Scan QR code or visit URL
   - Allow camera access
   - Point at marker
   - Verify zones appear

4. **Share with Others:**
   - Send URL to colleagues
   - Print QR codes for multiple desks
   - Demonstrate AR ergonomics

## 🎉 You're Live!

Once Steps 1 & 2 are complete, your AR app will be:
- ✅ Accessible worldwide
- ✅ Running on HTTPS
- ✅ Free hosting via GitHub
- ✅ Automatically deployed on updates

## 📊 Monitoring

Check deployment status:
- **Actions tab:** See build/deploy progress
- **Deployments:** View deployment history
- **Settings → Pages:** See live URL and status

## 🆘 Need Help?

- **GitHub Pages Docs:** https://docs.github.com/pages
- **Workflow Status:** Check Actions tab
- **Issues:** Create issue in repository

---

**Deployment Time: ~5 minutes**

**Your AR ergonomics app will be live and ready to improve workspaces worldwide!** 🚀

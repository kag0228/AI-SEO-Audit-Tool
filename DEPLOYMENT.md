# 🚀 Deployment Guide - AI SEO Audit Tool

This guide walks you through deploying your AI SEO Audit Tool to GitHub Pages and sharing it on LinkedIn.

## Prerequisites

- GitHub account
- Git installed on your computer
- Node.js 16+ installed

## Step 1: Prepare Your Repository on GitHub

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Repository name: `ai-seo-audit-tool` (or your preferred name)
   - Description: "AI SEO Audit Tool - Measure your visibility in AI-powered search"
   - Public repository (required for free GitHub Pages)
   - DO NOT initialize with README (we already have one)
   - Click "Create repository"

2. **Note your GitHub username** - you'll need it in Step 2

## Step 2: Upload Your Code to GitHub

### Option A: Using Git Command Line

1. **Navigate to your project folder**
```bash
cd /path/to/your/ai-seo-audit-tool
```

2. **Initialize git repository**
```bash
git init
git add .
git commit -m "Initial commit - AI SEO Audit Tool"
```

3. **Connect to GitHub** (replace YOUR-USERNAME with your actual GitHub username)
```bash
git remote add origin https://github.com/YOUR-USERNAME/ai-seo-audit-tool.git
git branch -M main
git push -u origin main
```

### Option B: Using GitHub Desktop (Easier for Non-Developers)

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop
3. Click "Add" → "Add Existing Repository"
4. Browse to your project folder
5. Click "Publish repository"
6. Make sure "Keep this code private" is UNCHECKED
7. Click "Publish repository"

### Option C: Upload Files Directly (Simplest but Slower)

1. Go to your repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop ALL files from your project folder
4. Click "Commit changes"

## Step 3: Update Configuration

Before deploying, you need to update one file:

1. **Edit `vite.config.js`**
   
   Change this line:
   ```javascript
   base: '/ai-seo-audit-tool/',
   ```
   
   To match YOUR repository name:
   ```javascript
   base: '/YOUR-REPO-NAME/',
   ```

2. **Commit the change**
```bash
git add vite.config.js
git commit -m "Update base path for GitHub Pages"
git push
```

## Step 4: Deploy to GitHub Pages

### Method 1: Automatic Deployment (Recommended)

1. **Install gh-pages package**
```bash
npm install --save-dev gh-pages
```

2. **Add deployment scripts to `package.json`**

Open `package.json` and add these two scripts to the "scripts" section:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Deploy**
```bash
npm run deploy
```

This will:
- Build your app
- Create a `gh-pages` branch
- Push the built files to GitHub

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages" (in the left sidebar)
   - Under "Source", select branch: `gh-pages`
   - Click "Save"

5. **Wait 2-3 minutes** for GitHub to build your site

6. **Your site is live!**
   - URL: `https://YOUR-USERNAME.github.io/ai-seo-audit-tool/`

### Method 2: GitHub Actions (Automated on Every Push)

1. **Create workflow file**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. **Commit and push**
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow"
git push
```

3. **Enable GitHub Pages** (same as Method 1, step 4)

Now every time you push to `main`, your site automatically rebuilds!

## Step 5: Verify Your Deployment

1. **Visit your live site**
   - URL: `https://YOUR-USERNAME.github.io/ai-seo-audit-tool/`

2. **Test the full workflow**
   - Enter company info
   - Select queries
   - Run an audit
   - Check that exports work

3. **Check for errors**
   - Open browser console (F12)
   - Look for any error messages

## Step 6: Share on LinkedIn

Now that your site is live, share it with your network!

### Sample LinkedIn Posts

**Option 1: Professional / Tech-Focused**
```
🚀 Excited to share the AI SEO Audit Tool I built!

As ChatGPT, Claude, and other AI assistants become primary research tools, 
brands need to understand their "AI search visibility."

This free tool measures:
✅ How often AI models mention your brand
✅ Sentiment (positive vs negative portrayal)
✅ Technical SEO issues blocking AI crawlers
✅ Blind spots where competitors dominate

🔗 Try it: https://YOUR-USERNAME.github.io/ai-seo-audit-tool/

Built with React + Claude API. Fully open source.

What's your take on AI SEO? Is this the future of search?

#AISearch #SEO #Marketing #OpenSource #BuildInPublic
```

**Option 2: Marketing-Focused**
```
📊 New tool alert for marketers!

Ever wondered how AI assistants like ChatGPT and Claude see your brand?

I built a free AI SEO audit tool that shows you:

→ Your "AI visibility score" across different queries
→ Whether AI portrays you positively or negatively
→ Exact queries where competitors appear but you don't
→ Technical fixes to improve AI discoverability

This matters because 40% of people now start product research 
by asking an AI assistant, not Google.

🔗 Run your first audit: [YOUR-URL]

PS - It's open source! Code on GitHub if you want to contribute.

#Marketing #SEO #AI #MarTech
```

**Option 3: Founder / Indie Hacker Style**
```
Built and shipped an AI SEO audit tool this weekend 🛠️

The problem: Brands have no idea how AI models like ChatGPT 
and Claude talk about them.

The solution: Free tool that audits your "AI search presence"

Features:
• Visibility scoring (0-100)
• Sentiment analysis
• Competitor comparison  
• Technical SEO checks
• PDF/CSV exports

Tech stack: React, Vite, Claude API
Time to build: ~2 days
Cost to run: $0 (client-side only)

🔗 Try it: [YOUR-URL]
💻 Source: github.com/YOUR-USERNAME/ai-seo-audit-tool

Feedback welcome! What should I add next?

#BuildInPublic #IndieHacker #SaaS
```

### LinkedIn Posting Tips

1. **Add a screenshot or demo video** to your post (increases engagement 3x)
   - Take a screenshot of the results dashboard
   - Or record a 30-second screen recording showing the audit flow

2. **Post at optimal times**
   - Tuesday-Thursday, 8-10 AM or 12-1 PM (your local time)

3. **Engage with comments**
   - Reply to everyone who comments in the first hour
   - Ask questions to encourage discussion

4. **Follow up posts**
   - Day 2: Share specific insights ("Just ran an audit for [industry], here's what I found...")
   - Week 2: Share usage stats ("500+ audits run this week! Top finding: 73% of brands have schema markup issues")

## Step 7: Optional Enhancements

### Add Google Analytics

1. Create a Google Analytics property
2. Add tracking code to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Add Custom Domain

1. Buy a domain (e.g., aiseoaudit.com)
2. In your repo, create `public/CNAME` file:
   ```
   aiseoaudit.com
   ```
3. In your domain provider DNS settings:
   - Add A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add CNAME record: `YOUR-USERNAME.github.io`

### Add a Demo Video

1. Record a screen capture using Loom or OBS
2. Upload to YouTube
3. Embed in README.md:
   ```markdown
   ## Demo Video
   
   [![Watch the demo](https://img.youtube.com/vi/YOUR-VIDEO-ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR-VIDEO-ID)
   ```

## Troubleshooting

### Site shows 404

- Check that GitHub Pages is enabled and set to `gh-pages` branch
- Verify the `base` path in `vite.config.js` matches your repo name
- Wait 5 minutes after deployment

### Styles are broken

- Check browser console for 404 errors on CSS files
- Verify `base` path in `vite.config.js`
- Clear browser cache

### API calls not working

- Check browser console for CORS errors
- Verify API endpoint is accessible
- Check that API calls are being made to correct URL

### Changes not showing up

- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Check that you pushed to GitHub
- Verify GitHub Actions workflow completed successfully (if using)

## Alternative Hosting Options

If GitHub Pages doesn't work for you:

### Vercel (Easiest, Best Performance)

1. Go to vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Click "Deploy"
5. Your site is live at `project-name.vercel.app`

**Pros:** Fastest, auto-deploys on git push, free SSL, custom domains
**Cons:** Requires Vercel account

### Netlify (Great for Forms/Functions)

1. Go to netlify.com
2. Drag and drop your `dist` folder
3. Site is live instantly

**Pros:** Drag-and-drop deploy, form handling, serverless functions
**Cons:** Build minutes limited on free plan

### Cloudflare Pages (Best for Global Performance)

1. Go to pages.cloudflare.com
2. Connect GitHub repo
3. Deploy

**Pros:** Fastest global CDN, unlimited bandwidth
**Cons:** Slightly more complex setup

## Support

If you run into issues:

1. Check the [GitHub Issues](https://github.com/YOUR-USERNAME/ai-seo-audit-tool/issues)
2. Review the [troubleshooting section](#troubleshooting)
3. Create a new issue with:
   - What you were trying to do
   - What happened instead
   - Error messages (screenshot)
   - Browser and OS version

---

**You're all set! 🎉**

Your AI SEO Audit Tool is now live and ready to share with the world.

Don't forget to:
- ⭐ Star your own repo on GitHub
- 📱 Share on LinkedIn
- 📊 Monitor usage with analytics
- 🔄 Keep iterating based on feedback

Good luck! 🚀

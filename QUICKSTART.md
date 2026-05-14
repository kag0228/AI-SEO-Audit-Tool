# ⚡ Quick Start - Get Your Site Live in 10 Minutes

The fastest way to deploy your AI SEO Audit Tool and share it on LinkedIn.

## Prerequisites
- [ ] GitHub account ([sign up](https://github.com/join))
- [ ] Git installed ([download](https://git-scm.com/downloads))
- [ ] Node.js 16+ installed ([download](https://nodejs.org/))

## 3 Simple Steps

### Step 1: Upload to GitHub (2 minutes)

**Option A: Command Line**
```bash
# Navigate to the project folder
cd /path/to/ai-seo-audit-tool

# Run the setup wizard
chmod +x setup.sh
./setup.sh

# Follow the prompts - it will configure everything for you
```

**Option B: Manual**
1. Create new repo at https://github.com/new
   - Name: `ai-seo-audit-tool`
   - Public ✓
   - Don't initialize with README
2. In your terminal:
```bash
cd /path/to/ai-seo-audit-tool
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/ai-seo-audit-tool.git
git push -u origin main
```

### Step 2: Deploy to GitHub Pages (5 minutes)

```bash
# Install dependencies
npm install

# Install deployment tool
npm install --save-dev gh-pages

# Add these lines to package.json "scripts" section:
#   "predeploy": "npm run build",
#   "deploy": "gh-pages -d dist"

# Deploy!
npm run deploy
```

Then enable GitHub Pages:
1. Go to your repo → Settings → Pages
2. Source: Deploy from branch → `gh-pages`
3. Wait 2-3 minutes

✅ Your site is now live at: `https://YOUR-USERNAME.github.io/ai-seo-audit-tool/`

### Step 3: Share on LinkedIn (3 minutes)

Copy this template and customize it:

```
🚀 Built an AI SEO Audit Tool!

As AI assistants become the new Google, brands need to know:
• How often does ChatGPT/Claude mention us?
• Is the sentiment positive or negative?
• Where do competitors show up that we don't?

I built a free tool to answer these questions:
🔗 [YOUR-LIVE-URL]

Features:
✅ AI visibility scoring
✅ Sentiment analysis  
✅ Competitor comparison
✅ Technical SEO checks
✅ Export reports (PDF/CSV)

Built with React + Claude API. Open source on GitHub.

What's your take on "AI SEO"? Is this the future of search?

#AI #SEO #Marketing #BuildInPublic
```

**Pro Tips:**
- Add a screenshot of the results dashboard
- Tag relevant people/companies in comments
- Post Tuesday-Thursday 8-10 AM for best engagement

## That's It! 🎉

Your AI SEO Audit Tool is now live and shared with your network.

## Troubleshooting

**Site shows 404?**
- Wait 5 more minutes for GitHub to build it
- Check GitHub Pages settings are correct
- Verify `base` in `vite.config.js` matches your repo name

**Need help?**
- Read the full [DEPLOYMENT.md](DEPLOYMENT.md) guide
- Check [README.md](README.md) for detailed docs
- Open an issue on GitHub

## What's Next?

- [ ] Set up Google Analytics to track visitors
- [ ] Create a demo video for your README
- [ ] Share updates as you get feedback
- [ ] Consider adding your own features
- [ ] Star ⭐ your repo on GitHub

---

**Pro Tip:** After sharing on LinkedIn, monitor comments in the first hour and engage with everyone. This signals to LinkedIn's algorithm that your post is interesting, boosting its reach.

Good luck! 🚀

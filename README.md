# AI SEO Audit Tool

Measure and optimize your brand's visibility in AI-powered search results from Claude, ChatGPT, and other AI assistants.

![AI SEO Audit Tool](https://via.placeholder.com/800x400/1F4788/FFFFFF?text=AI+SEO+Audit+Tool)

## Overview

As AI assistants become primary research tools, understanding how these systems discover and recommend your brand is critical. The AI SEO Audit Tool helps you:

- **Measure Visibility**: See how often your brand appears in AI responses to relevant queries
- **Track Sentiment**: Understand whether AI models portray you positively or negatively  
- **Identify Blind Spots**: Find queries where competitors appear but you don't
- **Fix Technical Issues**: Detect schema markup problems and crawler access issues
- **Compare Competitors**: Benchmark your AI visibility against competitors

## Features

### 🎯 Comprehensive Scoring
- **Overall AI SEO Score** (0-100) with weighted components
- **Visibility Score** (40% weight) - How often you're mentioned
- **Sentiment Score** (30% weight) - How you're portrayed  
- **Technical SEO** (20% weight) - Crawler access & schema markup
- **Source Quality** (10% weight) - Reliability of information sources

### 📊 Dashboard & Analytics
- Real-time audit results with visual score cards
- Blind spots analysis showing competitor advantages
- Query-by-query breakdown with sentiment labels
- Side-by-side competitor comparison
- Share of Voice calculations

### 📥 Export Options
- **PDF Report**: Narrative-style executive summary with recommendations
- **CSV Export**: Raw data including full AI responses for analysis

### 🔄 Automation
- Optional weekly re-audits to track changes over time
- Alert system for visibility drops and negative sentiment
- Historical trend tracking

## Demo

🔗 **Live Demo**: [https://yourusername.github.io/ai-seo-audit-tool/](https://yourusername.github.io/ai-seo-audit-tool/)

## Quick Start

### Prerequisites
- Node.js 16+ installed
- Anthropic API key (the tool queries Claude AI)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-seo-audit-tool.git
cd ai-seo-audit-tool
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment Options

### Option 1: GitHub Pages (Recommended for Demo)

1. **Update `vite.config.js`**  
   Change `base: '/ai-seo-audit-tool/'` to match your repo name

2. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

3. **Add deploy scripts to `package.json`**
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. **Deploy**
```bash
npm run deploy
```

5. **Enable GitHub Pages**
   - Go to your repo settings → Pages
   - Source: Deploy from branch → `gh-pages`
   - Your site will be live at: `https://yourusername.github.io/ai-seo-audit-tool/`

### Option 2: Vercel (Best for Production)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow prompts** to link your GitHub repo
4. **Your site will be live** at a vercel.app URL (or custom domain)

### Option 3: Netlify

1. **Sign up at netlify.com**
2. **Click "Add new site" → "Import from Git"**
3. **Connect your GitHub repo**
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy** - Your site goes live instantly

## Usage

### Running Your First Audit

1. **Company Profile** - Enter your company details, website, industry, products, and brand truth statements
2. **Query Selection** - Choose up to 3 queries (suggested or custom)
3. **Competitors** - Add up to 3 competitors to track
4. **Run Audit** - Wait 1-2 minutes while the tool queries Claude AI
5. **Review Results** - Analyze scores, identify gaps, export reports

### Understanding Your Scores

- **80-100**: Excellent AI visibility
- **60-79**: Good presence, room for improvement  
- **40-59**: Needs attention, significant blind spots
- **0-39**: Critical - immediate action required

### Improving Your Scores

**Week 1-2: Technical Foundation**
- Fix schema markup (Organization, Product, FAQ)
- Ensure AI crawlers can access your site
- Add proper meta tags

**Week 3-4: Content for Blind Spots**  
- Create content addressing queries where you're not mentioned
- Target high-intent keywords

**Week 5-6: Sentiment Optimization**
- Address negative mentions
- Create positive case studies
- Update outdated information

**Ongoing: Source Quality**
- Build relationships with quality publications
- Encourage reviews
- Maintain content freshness

## How It Works

### Scoring Methodology

**Overall Score Calculation:**
```
Overall = (Visibility × 0.40) + (Sentiment × 0.30) + (Technical × 0.20) + (Source Quality × 0.10)
```

**Visibility Score:**
```
Visibility = (Queries where mentioned / Total queries) × 100
```

**Sentiment Analysis:**
- Counts positive keywords: good, great, best, excellent, reliable, efficient
- Counts negative keywords: bad, poor, worst, expensive, difficult, complex
- Assigns: Slightly Positive, Neutral, or Slightly Negative

**Technical SEO:**
- Checks AI crawler access (Claude, GPTBot, CCBot, Google-Extended)
- Validates schema markup (Organization, Product, FAQ)
- Confirms meta tag presence

**Source Quality:**
- Own website: 100 points
- News sites: 80 points
- Forums/Reddit: 40 points
- Competitor sites: 20 points
- Inaccurate sources: 0 points

For detailed technical documentation, see the [Technical Guide](./docs/AI-SEO-Audit-Technical-Guide.docx).

## API Requirements

The tool requires the Anthropic API to query Claude AI. API calls are made client-side (no server required).

**Important Notes:**
- The app currently queries Claude only (multi-model support coming)
- API calls are rate-limited - each audit makes 3 requests (one per query)
- No API key is stored or logged

## Project Structure

```
ai-seo-audit-tool/
├── src/
│   ├── App.jsx           # Main application component
│   └── main.jsx          # React entry point
├── docs/
│   ├── AI-SEO-Audit-User-Guide.docx
│   └── AI-SEO-Audit-Technical-Guide.docx
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## Documentation

- **[User Guide](./docs/AI-SEO-Audit-User-Guide.docx)** - Complete usage instructions and score interpretation
- **[Technical Guide](./docs/AI-SEO-Audit-Technical-Guide.docx)** - Detailed scoring equations and implementation

## Roadmap

### Coming Soon
- [ ] Multi-model support (ChatGPT, Gemini, Perplexity)
- [ ] Real technical SEO crawling (not simulated)
- [ ] Citation extraction and source analysis
- [ ] Position-weighted visibility scoring
- [ ] Historical trend charts
- [ ] Automated query generation from website content

### Future Enhancements
- [ ] Query importance weighting by search volume
- [ ] Advanced NLP sentiment analysis
- [ ] Real competitor score calculation
- [ ] API endpoint for programmatic access
- [ ] Slack/email alert integrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/ai-seo-audit-tool/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/ai-seo-audit-tool/discussions)

## Acknowledgments

- Built with React and Vite
- Icons by [Lucide](https://lucide.dev/)
- Powered by Anthropic's Claude API

## Share on LinkedIn

After deploying, share your live demo on LinkedIn:

**Sample LinkedIn Post:**

```
🚀 Excited to share the AI SEO Audit Tool I built!

As AI assistants like Claude and ChatGPT become go-to research tools, brands need to understand their AI search visibility.

This free tool helps you:
✅ Measure how often AI mentions your brand
✅ Track sentiment (positive vs negative)
✅ Identify blind spots where competitors appear
✅ Fix technical issues blocking AI crawlers
✅ Export detailed reports

🔗 Try it now: [YOUR-LIVE-URL]

Built with React + Claude API. Open source on GitHub.

What do you think? How should brands approach AI SEO in 2026?

#AI #SEO #Marketing #Tech #OpenSource
```

---

**Made with ❤️ for better AI discoverability**

#!/bin/bash

# AI SEO Audit Tool - Quick Setup Script
# This script helps you configure and deploy your app

echo "🚀 AI SEO Audit Tool - Setup Wizard"
echo "===================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first:"
    echo "   https://nodejs.org/"
    exit 1
fi

echo "✅ Git and Node.js are installed"
echo ""

# Get GitHub username
echo "📝 Let's configure your deployment"
echo ""
read -p "Enter your GitHub username: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ GitHub username is required"
    exit 1
fi

# Get repository name
read -p "Enter your repository name (default: ai-seo-audit-tool): " REPO_NAME
REPO_NAME=${REPO_NAME:-ai-seo-audit-tool}

echo ""
echo "Configuration:"
echo "  GitHub User: $GITHUB_USER"
echo "  Repository:  $REPO_NAME"
echo "  Live URL:    https://$GITHUB_USER.github.io/$REPO_NAME/"
echo ""
read -p "Is this correct? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Setup cancelled"
    exit 0
fi

# Update vite.config.js with correct base path
echo ""
echo "📝 Updating vite.config.js..."
sed -i.bak "s|base: '/ai-seo-audit-tool/'|base: '/$REPO_NAME/'|g" vite.config.js
echo "✅ vite.config.js updated"

# Update package.json with repo info
echo "📝 Updating package.json..."
sed -i.bak "s|https://github.com/yourusername/ai-seo-audit-tool.git|https://github.com/$GITHUB_USER/$REPO_NAME.git|g" package.json
echo "✅ package.json updated"

# Update README with correct URLs
echo "📝 Updating README.md..."
sed -i.bak "s|yourusername|$GITHUB_USER|g" README.md
sed -i.bak "s|ai-seo-audit-tool|$REPO_NAME|g" README.md
echo "✅ README.md updated"

# Initialize git repository
echo ""
echo "🔧 Setting up Git repository..."
if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "Initial commit - AI SEO Audit Tool"
    echo "✅ Git repository initialized"
else
    echo "ℹ️  Git repository already exists"
fi

# Add remote
echo "🔗 Adding GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
echo "✅ Remote added: https://github.com/$GITHUB_USER/$REPO_NAME.git"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo "   Name: $REPO_NAME"
echo "   (Make sure it's PUBLIC, don't initialize with README)"
echo ""
echo "2. Push your code to GitHub:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Install dependencies and deploy:"
echo "   npm install"
echo "   npm install --save-dev gh-pages"
echo "   npm run deploy"
echo ""
echo "4. Enable GitHub Pages:"
echo "   Go to: https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
echo "   Source: Deploy from branch → gh-pages"
echo ""
echo "5. Your site will be live at:"
echo "   https://$GITHUB_USER.github.io/$REPO_NAME/"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""

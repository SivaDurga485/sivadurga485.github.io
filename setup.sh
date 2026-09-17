#!/bin/bash

# Portfolio Project Setup Script
# Run this script to quickly set up the project

echo "🎨 Setting up Siva Durga Portfolio..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Add your environment variables here
# Example:
# NEXT_PUBLIC_GITHUB_URL=https://github.com/your-username
# NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/your-profile
EOF
    echo "✅ .env.local created"
fi

echo ""
echo "🚀 Setup Complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "📖 Read SETUP.md for customization instructions"
echo ""

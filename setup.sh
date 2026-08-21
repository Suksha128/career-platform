#!/bin/bash
# ============================================================
# CareerAI Setup Script
# Works on Mac, Linux, and Windows Git Bash
# ============================================================

echo "🚀 Setting up CareerAI Environment..."

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating python3 virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
echo "Installing dependencies from requirements.txt..."
pip install -r requirements.txt

# Copy env template if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env configuration file..."
    cp .env.example .env
    echo "⚠️ Please edit the .env file and add your HF_API_TOKEN!"
fi

echo "✅ Setup Complete. Run ./run.sh to start CareerAI!"

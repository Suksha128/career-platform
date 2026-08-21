#!/bin/bash
# ============================================================
# CareerAI Run Script
# Activates server and opens UI
# ============================================================

echo "🚀 Starting CareerAI Backend Service..."

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
else
    echo "❌ Virtual environment not found. Please run ./setup.sh first."
    exit 1
fi

# Open UI in background
echo "🌐 Launching CareerAI Dashboard in browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open public/index.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open public/index.html
else
    start public/index.html
fi

# Start FastAPI server
python backend/app.py

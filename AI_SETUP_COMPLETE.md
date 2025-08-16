# Complete AI Setup Guide for SmaRta Notes

## 🚀 Quick Start

### 1. Create Environment File
Create a `.env` file in your project root with the following content:

```env
# AI API Configuration
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
VITE_AI_TEST_MODE=false
```

### 2. Get Your OpenRouter API Key (Recommended)
1. Visit [OpenRouter Platform](https://openrouter.ai/)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

**Why OpenRouter?**
- Access to GPT OSS 20B (free tier)
- Multiple AI models available
- Better rate limiting and reliability
- Unified API for different models

### 3. Restart Development Server
```bash
npm run dev
```

## 🤖 AI Features Available

### AI Chat Interface
- **Real-time conversations** with GPT OSS 20B AI
- **Context-aware responses** based on your notes
- **Memory** of conversation history
- **Smart suggestions** and analysis

### AI Quiz Generator
- **Generate quizzes** from any topic using GPT OSS 20B
- **Multiple difficulty levels** (Easy, Medium, Hard)
- **Customizable question counts**
- **Detailed explanations** for each answer
- **Performance tracking** and results

### AI Note Analysis
- **Smart summaries** of note content
- **Key point extraction**
- **Writing improvement** suggestions
- **Content organization** help

## 🔧 How It Works

The AI service now uses:
- **Primary Model**: `openai/gpt-oss-20b:free` via OpenRouter
- **API Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
- **Fallback**: Enhanced rule-based responses when API unavailable
- **Context Awareness**: Uses conversation history and note content

## ✅ Verification

Once configured, you should see in the browser console:
```
AI Service initialized with OpenRouter API (GPT OSS 20B)
```

## 🆘 Troubleshooting

### No API Key
- App works with fallback responses
- AI features still functional but less dynamic

### Invalid API Key
- Check the key format and validity
- Ensure no extra spaces or characters
- Restart development server after changes

### API Errors
- Check console for error messages
- Verify internet connection
- Confirm OpenRouter API status

## 🎯 Usage Examples

### AI Chat
1. Go to "AI Chat" tab
2. Ask questions like:
   - "Summarize my recent notes"
   - "What are the main themes in my notes?"
   - "Help me improve my writing style"

### AI Quiz
1. Go to "AI Quiz" tab
2. Enter a topic (e.g., "JavaScript", "Machine Learning")
3. Choose difficulty and question count
4. Generate and take the quiz

## 🔒 Security & Privacy

- API keys are loaded from environment variables
- Keys are never exposed in client-side code
- Only note content is sent for AI context
- Fallback ensures app works without API access

## 🚀 New Features

- **API Status Button**: Blue brain icon to test API connection
- **Real-time Status**: Shows "AI Ready" or "AI Offline"
- **Easy Testing**: Click brain icon to verify setup
- **Setup Guidance**: Helpful prompts when API key missing

---

**Note**: The app works perfectly even without API keys - you'll get enhanced rule-based responses instead of AI-powered ones.

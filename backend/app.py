# ============================================================
# CareerAI — FastAPI Backend (app.py)
# Upgraded to Qwen2.5-7B-Instruct via Hugging Face API
# ============================================================

import os
import json
import random
import httpx
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv
from duckduckgo_search import DDGS

# Load environment variables
load_dotenv()

app = FastAPI(title="CareerAI Upgraded Recruitment API")

# Enable CORS for frontend local loading
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route to serve the frontend homepage
@app.get("/")
def serve_frontend():
    # Looks for index.html in the current root workspace
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    index_path = os.path.join(root_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    # Fallback to public folder
    fallback_path = os.path.join(root_dir, "public", "index.html")
    if os.path.exists(fallback_path):
        return FileResponse(fallback_path)
    return {"message": "Frontend index.html not found on server"}

HF_API_TOKEN = os.getenv("HF_API_TOKEN", "")
HF_MODEL_ID = os.getenv("HF_MODEL_ID", "Qwen/Qwen2.5-7B-Instruct")
SERPAPI_KEY = os.getenv("SERPAPI_KEY", "")

# Load question bank
QB_PATH = os.path.join(os.path.dirname(__file__), "data", "question_bank.json")
try:
    with open(QB_PATH, "r") as f:
        QUESTION_BANK = json.load(f)
except Exception as e:
    QUESTION_BANK = {"companies": {}}

# Request schemas
class ChatQuery(BaseModel):
    message: str
    context: dict = {}

class QuizQuery(BaseModel):
    company: str
    category: str = "all"
    count: int = 5

class WeakPracticeQuery(BaseModel):
    weak_topic: str
    count: int = 5

def query_huggingface(prompt: str, system_prompt: str = "") -> str:
    """Helper to query Qwen2.5-7B-Instruct or Llama-3-8B-Instruct via Hugging Face API"""
    if not HF_API_TOKEN:
        return "⚠️ HF_API_TOKEN is missing in your .env configuration. Running in demo mode."
        
    url = f"https://api-inference.huggingface.co/models/{HF_MODEL_ID}"
    headers = {"Authorization": f"Bearer {HF_API_TOKEN}"}
    
    # Construct standard chat template prompt for Instruct models
    full_prompt = f"<|im_start|>system\n{system_prompt or 'You are CareerAI recruiter, a helpful recruitment advisor.'}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant\n"
    
    payload = {
        "inputs": full_prompt,
        "parameters": {
            "max_new_tokens": 800,
            "temperature": 0.3,
            "return_full_text": False
        }
    }
    
    try:
        response = httpx.post(url, headers=headers, json=payload, timeout=20.0)
        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                text = result[0].get("generated_text", "")
                # Clean up prompt residues if any
                return text.replace(full_prompt, "").strip()
            return "Unexpected model response format."
        else:
            return f"Error: Hugging Face API returned status {response.status_code} - {response.text}"
    except Exception as e:
        return f"Connection error: {str(e)}"

def get_web_grounding(query: str) -> str:
    """Performs a live web search to feed current recruitment data to Qwen"""
    search_context = ""
    try:
        with DDGS() as ddgs:
            results = ddgs.text(f"{query} hiring recruitment jobs 2025 2026", max_results=3)
            for r in results:
                search_context += f"Source: {r['title']}\nContent: {r['body']}\nLink: {r['href']}\n\n"
    except Exception as e:
        search_context = "Web search currently unavailable. Falling back to offline model knowledge."
    return search_context

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "model": HF_MODEL_ID,
        "token_configured": bool(HF_API_TOKEN)
    }

@app.post("/api/chat")
async def chat_endpoint(query: ChatQuery):
    user_msg = query.message
    
    # Run live search grounding to fetch real status, deadlines, and portals
    search_data = get_web_grounding(user_msg)
    
    sys_prompt = (
        "You are an Elite Career & Recruitment Intelligence Assistant powered by Qwen2.5-7B-Instruct.\n"
        "Your task is to analyze company recruitment dates, deadlines, and openings.\n"
        "Format output in clean, easy-to-read markdown. Always include registration link buttons "
        "using markdown links, e.g., '[Button Text](url)' which the frontend will compile into action buttons.\n"
        "Keep responses highly professional, concise, and focused on Indian IT/Product companies."
    )
    
    prompt = (
        f"User Query: {user_msg}\n\n"
        f"Live Web Grounding Data:\n{search_data}\n\n"
        f"Combine this web data with your internal knowledge. Outline hiring status, exact timelines/dates, "
        f"and provide clickable link buttons for portals. If no open drives exist, suggest alternative roles."
    )
    
    response_text = query_huggingface(prompt, sys_prompt)
    return {"response": response_text}

@app.post("/api/generate-quiz")
async def generate_quiz(query: QuizQuery):
    co = query.company
    cat = query.category
    count = query.count
    
    # Retrieve base questions from bank
    co_data = QUESTION_BANK.get("companies", {}).get(co, {})
    all_qs = []
    
    # Flatten matching categories
    for category_name, diff_map in co_data.items():
        if cat == "all" or category_name.lower() == cat.lower():
            for diff_level, q_list in diff_map.items():
                all_qs.extend(q_list)
                
    # If not enough local questions, ask Qwen to generate more
    if len(all_qs) < count and HF_API_TOKEN:
        sys_prompt = "You are an Elite Technical Assessment Designer. You generate high-quality previous year multiple choice questions."
        prompt = (
            f"Generate exactly {count - len(all_qs)} MCQ questions for {co} placement drive targeting {cat}.\n"
            "Format the output strictly as a JSON array of objects. Each object must have fields:\n"
            "- year: e.g. 'Accenture 2024'\n"
            "- cat: e.g. 'Aptitude' or 'Coding' or 'SQL'\n"
            "- diff: 'Easy' or 'Medium'\n"
            "- q: The question text\n"
            "- opts: Array of 4 option strings\n"
            "- ans: Index of correct option (0-3)\n"
            "- exp: Detailed explanation text\n\n"
            "Return ONLY the JSON array, no conversational prefixes."
        )
        model_res = query_huggingface(prompt, sys_prompt)
        try:
            # Clean up potential markdown formatting
            cleaned_res = model_res.strip("`").replace("json", "", 1).strip()
            extra_qs = json.loads(cleaned_res)
            all_qs.extend(extra_qs)
        except Exception:
            pass
            
    # Sample to requested count
    sampled_qs = random.sample(all_qs, min(len(all_qs), count))
    
    # Fallback to local TCS dataset if empty
    if not sampled_qs:
        tcs_data = QUESTION_BANK.get("companies", {}).get("TCS", {}).get("Aptitude", {}).get("Easy", [])
        sampled_qs = tcs_data[:count]
        
    return {"questions": sampled_qs}

@app.post("/api/weak-practice")
async def weak_practice(query: WeakPracticeQuery):
    topic = query.weak_topic
    count = query.count
    
    sys_prompt = "You are a Technical Interview tutor. You generate target study questions."
    prompt = (
        f"Generate {count} MCQs with options targeting the student's weak area: {topic}.\n"
        "Focus on core concepts with clear explanations. Format strictly as a JSON array of objects with fields:\n"
        "- year: 'Target Practice'\n"
        "- cat: f'{topic}'\n"
        "- diff: 'Medium'\n"
        "- q: Question text\n"
        "- opts: 4 option strings\n"
        "- ans: Correct index (0-3)\n"
        "- exp: Explanatory logic\n\n"
        "Return ONLY the JSON array."
    )
    
    model_res = query_huggingface(prompt, sys_prompt)
    try:
        cleaned_res = model_res.strip("`").replace("json", "", 1).strip()
        qs = json.loads(cleaned_res)
        return {"questions": qs}
    except Exception:
        # Local fallback based on category matching
        fallback_qs = []
        for co, categories in QUESTION_BANK.get("companies", {}).items():
            for cat, diff_map in categories.items():
                if cat.lower() == topic.lower():
                    for diff, q_list in diff_map.items():
                        fallback_qs.extend(q_list)
        sampled = random.sample(fallback_qs, min(len(fallback_qs), count)) if fallback_qs else []
        return {"questions": sampled}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8090))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("app:app", host=host, port=port, reload=True)

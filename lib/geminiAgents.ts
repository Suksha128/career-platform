// =====================================================================
// lib/geminiAgents.ts — 5 Specialized Gemini AI Agents with system prompts
// Falls back gracefully to mock data when API key is not present.
// =====================================================================

import { GoogleGenAI } from "@google/genai";
import {
  MOCK_CANDIDATE_PROFILE,
  MOCK_JOB_OPENINGS,
  MOCK_RESUME_TAILORED,
  MOCK_QUIZ_QUESTIONS,
  MOCK_LEARNING_PATH,
} from "./mockData";

const genai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

const MODEL = "gemini-2.0-flash-exp";

// Helper: call Gemini with JSON mode
async function callGemini(systemPrompt: string, userContent: string) {
  if (!genai) throw new Error("No API key");
  const response = await genai.models.generateContent({
    model: MODEL,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      temperature: 0.7,
    },
    contents: [{ role: "user", parts: [{ text: userContent }] }],
  });
  const text = response.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
  return JSON.parse(text);
}

// ─── AGENT 1: Resume & Profile Parser ───────────────────────────────
const RESUME_PARSER_PROMPT = `
You are an expert Technical Recruiter and Resume Parser AI.
Analyze the provided resume text and user inputs to extract a structured candidate profile.

OUTPUT FORMAT (strict JSON):
{
  "name": "string",
  "email": "string",
  "preferred_domain": "string",
  "experience_years": number,
  "location": "string",
  "extracted_skills": ["string"],
  "soft_skills": ["string"],
  "tools": ["string"],
  "education": [{"degree": "string", "institution": "string", "year": "string", "cgpa": "string"}],
  "projects": [{"title": "string", "description": "string", "tech_stack": ["string"]}],
  "certifications": ["string"]
}

RULES:
- Extract only explicitly mentioned or clearly implied skills.
- Do not fabricate information.
- Identify ALL unique technical and soft skills mentioned.
- Return valid JSON only, no markdown or extra text.
`;

export async function parseResume(resumeText: string, userInputs: Record<string, string>) {
  try {
    return await callGemini(RESUME_PARSER_PROMPT, JSON.stringify({ resumeText, userInputs }));
  } catch {
    console.log("Using mock profile data (no API key or parse error)");
    return MOCK_CANDIDATE_PROFILE;
  }
}

// ─── AGENT 2: Job Matcher & Skill Gap Analyzer ──────────────────────
const JOB_MATCHER_PROMPT = `
You are an AI Career Strategist and Job Match Scoring Engine.
Given a candidate profile and job description, compute a precise match analysis.

OUTPUT FORMAT (strict JSON):
{
  "company": "string",
  "role": "string",
  "match_score": number (0-100),
  "score_breakdown": {
    "technical_skills_match": number,
    "experience_match": number,
    "location_suitability": "High|Medium|Low"
  },
  "matched_skills": ["string"],
  "missing_skills": ["string"],
  "key_differentiators": ["string"],
  "verdict": "string (2-3 sentence actionable recommendation)"
}

SCORING CRITERIA:
- Technical skills: Weight 60% of score
- Experience alignment: Weight 25%
- Location match: Weight 15%
- Be precise and honest. Do not inflate scores.
`;

export async function matchJob(candidateProfile: object, jobDetails: object) {
  try {
    return await callGemini(JOB_MATCHER_PROMPT, JSON.stringify({ candidateProfile, jobDetails }));
  } catch {
    return MOCK_JOB_OPENINGS[0];
  }
}

// ─── AGENT 3: ATS Resume Tailor ─────────────────────────────────────
const RESUME_TAILOR_PROMPT = `
You are an elite ATS Resume Optimization Agent. Your mission is to maximize a candidate's
interview callback rate by tailoring their resume for a specific company and role.

OUTPUT FORMAT (strict JSON):
{
  "company": "string",
  "role": "string",
  "ats_score_before": number,
  "ats_score_after": number,
  "summary": "string (3-sentence tailored professional summary)",
  "bullets": [
    {
      "original": "string",
      "tailored": "string (Google XYZ formula: Accomplished X, measured by Y, by doing Z)",
      "keywords_added": ["string"]
    }
  ],
  "ats_keywords": ["string (keywords to inject)"],
  "formatting_tips": ["string"]
}

GOOGLE XYZ FORMULA: "Accomplished [X] as measured by [Y], by doing [Z]"
RULES:
- Never fabricate metrics. Extrapolate realistically from existing context.
- Inject the top ATS keywords for the target role throughout the bullets.
- Boost ATS score by minimum 25 points.
`;

export async function tailorResume(profile: object, targetJob: object) {
  try {
    return await callGemini(RESUME_TAILOR_PROMPT, JSON.stringify({ profile, targetJob }));
  } catch {
    return MOCK_RESUME_TAILORED;
  }
}

// ─── AGENT 4: Company Interview Quiz Generator ──────────────────────
const QUIZ_GENERATOR_PROMPT = `
You are an Interview Intelligence Agent specializing in campus placement preparation.
Generate an authentic, company-specific quiz based on verified historical interview patterns.

OUTPUT FORMAT (strict JSON array):
[
  {
    "id": number,
    "company": "string",
    "year_asked": "string (e.g., 'TCS NQT 2024')",
    "category": "string (Aptitude|Coding|SQL|OOP|System Design|Verbal|Reasoning)",
    "difficulty": "Easy|Medium|Hard",
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correct_index": number (0-3),
    "explanation": "string (detailed, educational explanation)"
  }
]

RULES:
- Reflect actual patterns from that company's known placement drives.
- Balance categories: ~30% Aptitude, ~40% Technical, ~20% Domain, ~10% Verbal.
- Explanations must be genuinely educational and memorable.
- Year tags must be realistic (2021–2025 range).
- Generate exactly 5 questions per call.
`;

export async function generateQuiz(company: string, role: string, topics: string[]) {
  try {
    return await callGemini(QUIZ_GENERATOR_PROMPT, JSON.stringify({ company, role, topics }));
  } catch {
    return MOCK_QUIZ_QUESTIONS[company as keyof typeof MOCK_QUIZ_QUESTIONS] ?? MOCK_QUIZ_QUESTIONS["TCS"];
  }
}

// ─── AGENT 5: Learning Path & Resource Curator ──────────────────────
const LEARNING_PATH_PROMPT = `
You are an AI Learning Architect. Generate a structured, prioritized learning roadmap
for a student who has skill gaps for a target placement role.

OUTPUT FORMAT (strict JSON array):
[
  {
    "skill": "string",
    "priority": "Critical|High|Medium|Low",
    "hours": number,
    "difficulty": "Beginner|Intermediate|Advanced",
    "color": "string (hex color)",
    "why": "string (1-sentence reason why this skill matters for the target role)",
    "modules": [
      {
        "topic": "string",
        "hours": number,
        "resource": "string (name of free resource)",
        "url": "string (actual YouTube/GitHub/website URL)",
        "platform": "YouTube|GitHub|Website|LeetCode|HackerRank"
      }
    ]
  }
]

RULES:
- Only recommend FREE resources (YouTube, GitHub, official docs, HackerRank, LeetCode free).
- Order by priority: Critical first.
- Be specific — use real, working URLs for well-known resources.
- Total hours per skill should be realistic for the priority level.
`;

export async function generateLearningPath(missingSkills: string[], targetRole: string) {
  try {
    return await callGemini(LEARNING_PATH_PROMPT, JSON.stringify({ missingSkills, targetRole }));
  } catch {
    return MOCK_LEARNING_PATH;
  }
}

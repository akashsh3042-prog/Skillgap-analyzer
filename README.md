# SkillGap Analyzer (Full-Stack Application)

A modern full-stack web application designed to benchmark job seeker resumes (PDF/DOCX) against job descriptions. It extracts tech stack keywords using **FastAPI** and **Google Gemini AI**, calculates match scores, renders interactive skill chips and category coverage charts, and provides a step-by-step course learning roadmap.

---

## Architecture Overview

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend**: Python FastAPI, Uvicorn, PyPDF / Python-Docx text parsing, Google Gemini API (`google-genai`), Python-Dotenv, CORS Middleware.

---

## Prerequisites

- **Node.js**: v18.0 or higher
- **Python**: v3.9 or higher

---

## 🚀 Quick Start Guide

### 1. Setup Backend (Python FastAPI)

1. Navigate to the `backend` directory or project root:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment (optional but recommended):
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure your environment variables:
   Copy `.env.example` to `.env` and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=8000
   ```
   *(Note: If no API key is provided, the backend seamlessly uses a built-in heuristic keyword matching engine).*

5. Start the FastAPI backend server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   The backend API will be running at: **`http://localhost:8000`**
   Interactive Swagger docs are available at: **`http://localhost:8000/docs`**

---

### 2. Setup Frontend (React + Vite)

1. In a new terminal window, navigate to the project root:
   ```bash
   cd "sample project"
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   **`http://localhost:3000`** (or `http://localhost:5173`)

---

## 📡 API Reference

### `POST /analyze`
Accepts a multipart form or form-data body containing:
- `resume_file` *(optional UploadFile)*: PDF or DOCX resume document.
- `resume_text` *(optional string)*: Raw text extracted from resume.
- `job_description` *(required string)*: Target job post requirements.

#### Response JSON:
```json
{
  "match_score": 78,
  "readiness_rating": "Strong Alignment",
  "summary": "You match 78% of the core competencies...",
  "stats": {
    "total_required": 18,
    "matched_count": 12,
    "missing_count": 6
  },
  "categories": [
    { "name": "Core Frontend", "percentage": 95, "color": "bg-sky-500" }
  ],
  "matched_skills": [
    { "name": "React.js", "level": "Expert", "category": "Core Frontend", "icon": "Code" }
  ],
  "missing_skills": [
    { "name": "Next.js 14", "priority": "High Priority", "category": "Fullstack & Cloud", "hoursToLearn": 20, "impact": "+10% Match" }
  ],
  "roadmap": [
    {
      "id": "nextjs-14",
      "skillName": "Next.js 14",
      "estimatedDuration": "2 Weeks (20 hrs)",
      "courses": [...]
    }
  ]
}
```

### `GET /health`
Returns backend service status and API configuration state.

---

## 🛠️ Build for Production

To build the React static frontend bundle for deployment:
```bash
npm run build
```
The production assets will be output to the `dist/` directory.

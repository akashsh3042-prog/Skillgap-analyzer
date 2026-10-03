# SkillGap Analyzer Backend

Python FastAPI backend for document parsing (PDF/DOCX) and AI skill gap extraction using Google Gemini API.

## Requirements
- Python 3.9+
- Packages listed in `requirements.txt`

## Environment Setup
Create a `.env` file in this directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
HOST=0.0.0.0
PORT=8000
```

## Running the Server
```bash
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```

Swagger API Docs: `http://localhost:8000/docs`

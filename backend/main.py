import os
import logging
from typing import Optional
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from backend.parser import parse_document
from backend.analyzer import analyze_skill_gap

# Load environment variables
load_dotenv()

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("skillgap.main")

app = FastAPI(
    title="SkillGap Analyzer API",
    description="Backend API for resume & job description skill gap analysis",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from localhost:3000, 5173, etc.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "SkillGap Analyzer API",
        "version": "1.0.0",
        "has_gemini_key": bool(os.getenv("GEMINI_API_KEY"))
    }

@app.post("/analyze")
async def analyze_skills(
    resume_file: Optional[UploadFile] = File(None),
    resume_text: Optional[str] = Form(""),
    job_description: str = Form(...)
):
    """
    POST /analyze endpoint:
    - Accepts uploaded PDF/DOCX resume file or raw resume_text string.
    - Accepts job_description text.
    - Returns match score, matched skills, missing skills, category breakdown, and course roadmap.
    """
    extracted_resume_text = ""

    # Parse uploaded file if present
    if resume_file:
        try:
            file_bytes = await resume_file.read()
            extracted_resume_text = parse_document(file_bytes, resume_file.filename)
            logger.info(f"Extracted {len(extracted_resume_text)} chars from uploaded file '{resume_file.filename}'.")
        except Exception as e:
            logger.error(f"Error parsing resume file: {e}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Could not parse resume file '{resume_file.filename}': {str(e)}"
            )

    # Fallback to resume_text form field if file wasn't uploaded or extracted text was small
    if not extracted_resume_text and resume_text:
        extracted_resume_text = resume_text.strip()

    if not extracted_resume_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please provide a valid resume file (PDF/DOCX) or paste resume text."
        )

    if not job_description or not job_description.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Job description text is required."
        )

    # Perform analysis
    try:
        result = analyze_skill_gap(extracted_resume_text, job_description)
        return result
    except Exception as e:
        logger.error(f"Error during skill gap analysis: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while analyzing skills: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("backend.main:app", host=host, port=port, reload=True)

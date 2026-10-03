/**
 * API helper service for SkillGap Analyzer.
 * Reads backend URL from VITE_API_URL env variable (default: http://localhost:8000).
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function analyzeSkillsApi(resumeFile, resumeText, jobDescription) {
  // 1. Client-side input validation
  if (!resumeFile && (!resumeText || !resumeText.trim())) {
    throw new Error('Please select a resume file (PDF/DOCX) or paste your resume text before analyzing.');
  }

  if (!jobDescription || !jobDescription.trim()) {
    throw new Error('Please paste the target job description to run the skill comparison.');
  }

  // 2. Build multipart/form-data
  const formData = new FormData();
  
  if (resumeFile) {
    formData.append('resume_file', resumeFile);
  }
  if (resumeText) {
    formData.append('resume_text', resumeText.trim());
  }
  formData.append('job_description', jobDescription.trim());

  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = `Server error (${response.status})`;
      try {
        const errJson = await response.json();
        if (errJson.detail) {
          errorMessage = errJson.detail;
        }
      } catch (e) {
        // Response was not JSON
      }

      if (response.status === 400) {
        throw new Error(errorMessage || 'Unreadable PDF or invalid file format.');
      } else {
        throw new Error(errorMessage);
      }
    }

    const data = await response.json();
    return data;

  } catch (error) {
    // Check if network error (backend not reachable)
    if (error.name === 'TypeError' || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(`Unable to connect to SkillGap backend server at ${API_BASE_URL}. Please ensure the FastAPI backend is running.`);
    }
    throw error;
  }
}

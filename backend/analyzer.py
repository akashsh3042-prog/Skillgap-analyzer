import os
import json
import logging
import re
from typing import Dict, Any, List

logger = logging.getLogger("skillgap.analyzer")

# Tech Dictionary for heuristic fallback analysis & course enrichment
TECH_CATALOG = {
    "react": {"name": "React.js", "category": "Core Frontend", "icon": "Code", "hours": 12, "course": "React - The Complete Guide", "provider": "Udemy / Meta", "url": "https://react.dev/learn"},
    "typescript": {"name": "TypeScript", "category": "Core Frontend", "icon": "FileCode", "hours": 15, "course": "Understanding TypeScript", "provider": "Udemy", "url": "https://www.typescriptlang.org/docs/"},
    "tailwind": {"name": "Tailwind CSS", "category": "Core Frontend", "icon": "Palette", "hours": 8, "course": "Tailwind CSS From Scratch", "provider": "Scrimba / YouTube", "url": "https://tailwindcss.com/docs"},
    "next.js": {"name": "Next.js 14", "category": "Fullstack & Cloud", "icon": "Zap", "hours": 20, "course": "Next.js 14 App Router Course", "provider": "Vercel Official", "url": "https://nextjs.org/learn"},
    "node": {"name": "Node.js", "category": "Fullstack & Cloud", "icon": "Server", "hours": 18, "course": "Complete Node.js Developer Course", "provider": "Udemy", "url": "https://nodejs.org/en/docs/"},
    "express": {"name": "Express.js", "category": "Fullstack & Cloud", "icon": "Cpu", "hours": 10, "course": "Node & Express Masterclass", "provider": "Coursera", "url": "https://expressjs.com/"},
    "python": {"name": "Python", "category": "AI & Data", "icon": "Cpu", "hours": 20, "course": "100 Days of Code: Python", "provider": "Udemy", "url": "https://docs.python.org/3/"},
    "fastapi": {"name": "FastAPI", "category": "Fullstack & Cloud", "icon": "Zap", "hours": 12, "course": "FastAPI Web Development", "provider": "TestDriven.io", "url": "https://fastapi.tiangolo.com/"},
    "graphql": {"name": "GraphQL & Apollo", "category": "State & APIs", "icon": "Globe", "hours": 14, "course": "GraphQL with React & Node", "provider": "Apollo Odyssey", "url": "https://www.apollographql.com/tutorials/"},
    "docker": {"name": "Docker & Containers", "category": "Testing & DevOps", "icon": "Layers", "hours": 16, "course": "Docker Mastery with Kubernetes", "provider": "Udemy", "url": "https://docs.docker.com/"},
    "aws": {"name": "AWS Cloud", "category": "Fullstack & Cloud", "icon": "Cloud", "hours": 25, "course": "AWS Certified Cloud Practitioner", "provider": "Udemy / AWS Skill Builder", "url": "https://aws.amazon.com/training/"},
    "postgresql": {"name": "PostgreSQL & SQL", "category": "State & APIs", "icon": "Database", "hours": 15, "course": "PostgreSQL Bootcamp", "provider": "Coursera", "url": "https://www.postgresql.org/docs/"},
    "mongodb": {"name": "MongoDB", "category": "State & APIs", "icon": "Database", "hours": 10, "course": "MongoDB University Complete Course", "provider": "MongoDB University", "url": "https://university.mongodb.com/"},
    "jest": {"name": "Jest Unit Testing", "category": "Testing & DevOps", "icon": "CheckCircle", "hours": 10, "course": "Testing React Apps with Jest", "provider": "Frontend Masters", "url": "https://jestjs.io/"},
    "playwright": {"name": "Playwright E2E", "category": "Testing & DevOps", "icon": "Gauge", "hours": 12, "course": "Playwright Web Automation", "provider": "Udemy", "url": "https://playwright.dev/"},
    "git": {"name": "Git & GitHub", "category": "Testing & DevOps", "icon": "GitBranch", "hours": 6, "course": "Git Complete Guide", "provider": "Udemy", "url": "https://git-scm.com/doc"}
}

def analyze_with_gemini(resume_text: str, job_description: str, api_key: str) -> Dict[str, Any]:
    """Call Google Gemini API for skill extraction and benchmark."""
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')

        prompt = f"""
You are an expert ATS (Applicant Tracking System) parser and Tech Career Advisor.
Compare the following Candidate Resume against the Job Description.

RESUME TEXT:
{resume_text[:3000]}

JOB DESCRIPTION:
{job_description[:3000]}

Respond STRICTLY with valid JSON (no markdown wrapping, no text before or after):
{{
  "match_score": integer (0 to 100),
  "readiness_rating": string ("Strong Alignment" | "Moderate Gap" | "Action Required"),
  "summary": string (2 sentence overview of candidate match),
  "stats": {{
    "total_required": integer,
    "matched_count": integer,
    "missing_count": integer
  }},
  "categories": [
    {{ "name": "Core Frontend", "percentage": integer (0-100), "color": "bg-sky-500" }},
    {{ "name": "State & APIs", "percentage": integer (0-100), "color": "bg-emerald-500" }},
    {{ "name": "Fullstack & Cloud", "percentage": integer (0-100), "color": "bg-amber-500" }},
    {{ "name": "Testing & DevOps", "percentage": integer (0-100), "color": "bg-rose-500" }}
  ],
  "matched_skills": [
    {{ "name": string, "level": "Expert"|"Advanced"|"Intermediate", "category": string, "icon": "Code" }}
  ],
  "missing_skills": [
    {{ "name": string, "priority": "High Priority"|"Medium Priority"|"Low Priority", "category": string, "hoursToLearn": integer, "impact": string }}
  ],
  "suggestions": [
    {{
      "id": string,
      "skillName": string,
      "category": string,
      "priority": "High Priority"|"Medium Priority"|"Low Priority",
      "estimatedDuration": string,
      "difficulty": "Beginner"|"Intermediate"|"Advanced",
      "description": string,
      "keyTopics": [string],
      "courses": [
        {{
          "title": string,
          "platform": string,
          "instructor": string,
          "rating": float,
          "reviewsCount": integer,
          "duration": string,
          "price": string,
          "isFree": boolean,
          "url": string
        }}
      ],
      "projectIdea": string
    }}
  ],
  "roadmap": [
    {{
      "id": string,
      "skillName": string,
      "category": string,
      "priority": "High Priority"|"Medium Priority"|"Low Priority",
      "estimatedDuration": string,
      "difficulty": "Beginner"|"Intermediate"|"Advanced",
      "description": string,
      "keyTopics": [string],
      "courses": [
        {{
          "title": string,
          "platform": string,
          "instructor": string,
          "rating": float,
          "reviewsCount": integer,
          "duration": string,
          "price": string,
          "isFree": boolean,
          "url": string
        }}
      ],
      "projectIdea": string
    }}
  ]
}}
"""
        response = model.generate_content(prompt)
        text_resp = response.text.strip()
        # Clean potential JSON codeblocks
        if text_resp.startswith("```"):
            text_resp = re.sub(r"^```[a-z]*\n?", "", text_resp)
            text_resp = re.sub(r"\n?```$", "", text_resp)
        return json.loads(text_resp)
    except Exception as e:
        logger.error(f"Gemini API analysis failed: {e}")
        return None

def analyze_with_heuristics(resume_text: str, job_description: str) -> Dict[str, Any]:
    """Robust fallback keyword parser if LLM API key is missing or encounters rate limits."""
    resume_lower = resume_text.lower()
    job_lower = job_description.lower()

    matched = []
    missing = []
    roadmap = []

    for key, info in TECH_CATALOG.items():
        in_job = key in job_lower
        in_resume = key in resume_lower

        if in_job or in_resume:
            if in_resume:
                matched.append({
                  "name": info["name"],
                  "level": "Advanced" if resume_lower.count(key) > 1 else "Intermediate",
                  "category": info["category"],
                  "icon": info["icon"]
                })
            else:
                missing.append({
                  "name": info["name"],
                  "priority": "High Priority" if info["hours"] >= 15 else "Medium Priority",
                  "category": info["category"],
                  "hoursToLearn": info["hours"],
                  "impact": f"+{min(15, info['hours'] // 2)}% Match"
                })

                roadmap.append({
                  "id": f"fallback-{key}",
                  "skillName": info["name"],
                  "category": info["category"],
                  "priority": "High Priority" if info["hours"] >= 15 else "Medium Priority",
                  "estimatedDuration": f"{max(1, info['hours'] // 7)} Weeks ({info['hours']} hrs)",
                  "difficulty": "Intermediate" if info["hours"] >= 15 else "Beginner",
                  "description": f"Master {info['name']} to satisfy core job requirements.",
                  "keyTopics": [
                    f"Core fundamentals of {info['name']}",
                    f"Integration into fullstack architecture",
                    "Best practices, error handling & optimization",
                    "Deployment and testing"
                  ],
                  "courses": [
                    {
                      "title": info["course"],
                      "platform": info["provider"],
                      "instructor": "Top Rated Instructor",
                      "rating": 4.8,
                      "reviewsCount": 18500,
                      "duration": f"{info['hours']} hours",
                      "price": "Free / $14.99",
                      "isFree": True,
                      "url": info["url"]
                    }
                  ],
                  "projectIdea": f"Build a practical hands-on application demonstrating {info['name']} proficiency."
                })

    # Ensure baseline matched skills if empty
    if not matched:
        matched.append({"name": "JavaScript (ES6+)", "level": "Intermediate", "category": "Core Frontend", "icon": "Code"})
        matched.append({"name": "HTML5 & CSS3", "level": "Expert", "category": "Core Frontend", "icon": "Layout"})

    if not missing:
        missing.append({"name": "TypeScript", "priority": "High Priority", "category": "Core Frontend", "hoursToLearn": 15, "impact": "+12% Match"})

    total_req = len(matched) + len(missing)
    score = Math_score = min(96, max(40, int((len(matched) / max(1, total_req)) * 100)))

    # Set suggestions alias for frontend compatibility
    res_dict = {
        "match_score": Math_score,
        "readiness_rating": "Strong Alignment" if Math_score >= 75 else "Moderate Gap" if Math_score >= 55 else "Action Required",
        "summary": f"Your candidate profile matches {Math_score}% of the target requirements. You have {len(matched)} matching skills and {len(missing)} targeted skill gaps to bridge.",
        "stats": {
            "total_required": total_req,
            "matched_count": len(matched),
            "missing_count": len(missing)
        },
        "categories": [
            {"name": "Core Frontend", "percentage": min(100, Math_score + 10), "color": "bg-sky-500"},
            {"name": "State & APIs", "percentage": max(30, Math_score - 5), "color": "bg-emerald-500"},
            {"name": "Fullstack & Cloud", "percentage": max(25, Math_score - 15), "color": "bg-amber-500"},
            {"name": "Testing & DevOps", "percentage": max(20, Math_score - 20), "color": "bg-rose-500"}
        ],
        "matched_skills": matched,
        "missing_skills": missing,
        "suggestions": roadmap,
        "roadmap": roadmap
    }
    return res_dict

def analyze_skill_gap(resume_text: str, job_description: str) -> Dict[str, Any]:
    """Main skill gap analysis dispatcher with LLM primary and fallback parser."""
    gemini_key = os.getenv("GEMINI_API_KEY", "").strip()

    if gemini_key and gemini_key != "your_gemini_api_key_here":
        logger.info("Using Gemini AI API for skill analysis...")
        ai_res = analyze_with_gemini(resume_text, job_description, gemini_key)
        if ai_res:
            return ai_res

    logger.info("Using rule-based keyword fallback parser...")
    return analyze_with_heuristics(resume_text, job_description)

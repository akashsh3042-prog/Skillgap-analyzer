import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultsSection';
import RoadmapSection from './components/RoadmapSection';
import LoadingModal from './components/LoadingModal';
import Footer from './components/Footer';
import { SAMPLE_PROFILES, analyzeCustomInput } from './data/mockData';

const API_BASE_URL = 'http://localhost:8000';

export default function App() {
  const [activeTab, setActiveTab] = useState('upload');
  
  // Input States
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  
  // Analysis & Error States
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUsingBackend, setIsUsingBackend] = useState(false);
  
  // Roadmap Progress State
  const [completedSkillIds, setCompletedSkillIds] = useState([]);

  // Format backend API response schema to match frontend component prop expectations
  const formatApiResponse = (data) => {
    return {
      matchScore: data.match_score ?? data.matchScore ?? 75,
      readinessRating: data.readiness_rating ?? data.readinessRating ?? 'Strong Alignment',
      summary: data.summary ?? 'Skill gap analysis complete.',
      stats: {
        totalRequired: data.stats?.total_required ?? data.stats?.totalRequired ?? 10,
        matchedCount: data.stats?.matched_count ?? data.stats?.matchedCount ?? 7,
        missingCount: data.stats?.missing_count ?? data.stats?.missingCount ?? 3,
      },
      categories: data.categories || [],
      matchedSkills: (data.matched_skills || data.matchedSkills || []).map(s => ({
        name: s.name,
        level: s.level || 'Proficient',
        category: s.category || 'Technical',
        icon: s.icon || 'Code'
      })),
      missingSkills: (data.missing_skills || data.missingSkills || []).map(s => ({
        name: s.name,
        priority: s.priority || 'High Priority',
        category: s.category || 'Technical',
        hoursToLearn: s.hoursToLearn ?? s.hours_to_learn ?? 12,
        impact: s.impact || '+10% Match'
      })),
      roadmap: (data.roadmap || []).map((r, idx) => ({
        id: r.id || `roadmap-${idx}`,
        skillName: r.skillName || r.skill_name || 'Skill',
        category: r.category || 'Technical',
        priority: r.priority || 'High Priority',
        estimatedDuration: r.estimatedDuration || r.estimated_duration || '2 Weeks',
        difficulty: r.difficulty || 'Intermediate',
        description: r.description || 'Master this skill.',
        keyTopics: r.keyTopics || r.key_topics || [],
        courses: r.courses || [],
        projectIdea: r.projectIdea || r.project_idea || 'Build a practical portfolio project.'
      }))
    };
  };

  // Submit analysis request to FastAPI backend with client-side fallback
  const handleAnalyze = async () => {
    setErrorMessage('');

    if (!resumeFile && !resumeText.trim()) {
      setErrorMessage('Please upload a resume file (PDF/DOCX) or paste your resume text before analyzing.');
      return;
    }

    if (!jobDescription.trim()) {
      setErrorMessage('Please paste the target job description to run the skill comparison.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      if (resumeFile) {
        formData.append('resume_file', resumeFile);
      }
      formData.append('resume_text', resumeText);
      formData.append('job_description', jobDescription);

      logger_log('Sending POST request to FastAPI backend http://localhost:8000/analyze');

      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Backend server error' }));
        throw new Error(errorData.detail || `Server returned error status ${response.status}`);
      }

      const rawData = await response.json();
      const formatted = formatApiResponse(rawData);
      
      setAnalysisResult(formatted);
      setIsUsingBackend(true);
      setIsLoading(false);
      setActiveTab('results');

    } catch (err) {
      console.warn('FastAPI backend API fetch failed or server offline. Using client-side fallback engine.', err);
      
      // Fallback parser so the web app works reliably even if backend server is starting
      setTimeout(() => {
        const fallbackResult = analyzeCustomInput(resumeText || resumeFile?.name || '', jobDescription);
        setAnalysisResult(fallbackResult);
        setIsUsingBackend(false);
        setIsLoading(false);
        setActiveTab('results');
      }, 1500);
    }
  };

  function logger_log(msg) {
    console.log('[SkillGap API]', msg);
  }

  // Preset sample loader
  const handleLoadSampleProfile = (profile) => {
    setErrorMessage('');
    setResumeFile({ name: profile.resumeFileName, size: 45800, type: 'application/pdf' });
    setResumeText(profile.resumeText);
    setJobDescription(profile.jobDescription);
    setAnalysisResult(profile.analysisResult);
    setCompletedSkillIds([]);
    setIsUsingBackend(false);
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveTab('results');
    }, 1200);
  };

  // Reset inputs
  const handleReset = () => {
    setResumeFile(null);
    setResumeText('');
    setJobDescription('');
    setAnalysisResult(null);
    setErrorMessage('');
    setCompletedSkillIds([]);
    setIsUsingBackend(false);
    setActiveTab('upload');
  };

  // Toggle interactive roadmap progress checkbox
  const handleToggleSkillCompleted = (skillId) => {
    setCompletedSkillIds(prev => 
      prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        analysisResult={analysisResult}
        onSelectProfile={handleLoadSampleProfile}
        onReset={handleReset}
      />

      {/* Main View Area */}
      <main className="mb-auto">
        {activeTab === 'upload' && (
          <UploadSection
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
            resumeText={resumeText}
            setResumeText={setResumeText}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            onAnalyze={handleAnalyze}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            onLoadSampleProfile={handleLoadSampleProfile}
          />
        )}

        {activeTab === 'results' && (
          <ResultsSection
            analysisResult={analysisResult}
            onNavigateRoadmap={() => setActiveTab('roadmap')}
            onReanalyze={() => setActiveTab('upload')}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapSection
            analysisResult={analysisResult}
            completedSkillIds={completedSkillIds}
            onToggleSkillCompleted={handleToggleSkillCompleted}
          />
        )}
      </main>

      {/* Animated Loading Overlay */}
      {isLoading && <LoadingModal />}

      {/* Footer */}
      <Footer />

    </div>
  );
}

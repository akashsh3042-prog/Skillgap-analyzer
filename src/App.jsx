import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultsSection';
import RoadmapSection from './components/RoadmapSection';
import LoadingModal from './components/LoadingModal';
import Footer from './components/Footer';
import { analyzeSkillsApi } from './services/api';
import { SAMPLE_PROFILES } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('upload');
  
  // Form Input States
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  
  // API Response & UI States
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Roadmap Completion Progress Tracker State
  const [completedSkillIds, setCompletedSkillIds] = useState([]);

  // Map API response to match UI component expectations
  const formatApiResponse = (data) => {
    const suggestionsList = data.suggestions || data.roadmap || [];

    return {
      matchScore: data.match_score ?? data.matchScore ?? 0,
      readinessRating: data.readiness_rating ?? data.readinessRating ?? 'Moderate Gap',
      summary: data.summary ?? 'Skill gap analysis complete.',
      stats: {
        totalRequired: data.stats?.total_required ?? data.stats?.totalRequired ?? ((data.matched_skills?.length || 0) + (data.missing_skills?.length || 0)),
        matchedCount: data.stats?.matched_count ?? data.stats?.matchedCount ?? (data.matched_skills?.length || 0),
        missingCount: data.stats?.missing_count ?? data.stats?.missingCount ?? (data.missing_skills?.length || 0),
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
      roadmap: suggestionsList.map((r, idx) => ({
        id: r.id || `roadmap-${idx}`,
        skillName: r.skillName || r.skill_name || 'Skill',
        category: r.category || 'Technical',
        priority: r.priority || 'High Priority',
        estimatedDuration: r.estimatedDuration || r.estimated_duration || '2 Weeks',
        difficulty: r.difficulty || 'Intermediate',
        description: r.description || 'Master this skill to meet role requirements.',
        keyTopics: r.keyTopics || r.key_topics || [],
        courses: r.courses || [],
        projectIdea: r.projectIdea || r.project_idea || 'Build a practical portfolio project.'
      }))
    };
  };

  // Trigger analysis call to FastAPI backend
  const handleAnalyze = async () => {
    setErrorMessage('');

    // Client-side validations
    if (!resumeFile && (!resumeText || !resumeText.trim())) {
      setErrorMessage('No file selected or resume text provided. Please upload a PDF/DOCX resume or paste text.');
      return;
    }

    if (!jobDescription || !jobDescription.trim()) {
      setErrorMessage('Empty job description. Please paste the target job description before analyzing.');
      return;
    }

    setIsLoading(true);

    try {
      // Call backend API helper
      const apiResponse = await analyzeSkillsApi(resumeFile, resumeText, jobDescription);
      
      const formatted = formatApiResponse(apiResponse);
      setAnalysisResult(formatted);
      setIsLoading(false);
      setActiveTab('results');

    } catch (err) {
      console.error('SkillGap Analysis Error:', err);
      setIsLoading(false);
      setErrorMessage(err.message || 'An unexpected error occurred during analysis.');
    }
  };

  // Preset sample loader (loads sample text into inputs and calls API)
  const handleLoadSampleProfile = (profile) => {
    setErrorMessage('');
    setResumeFile({ name: profile.resumeFileName, size: 45800, type: 'application/pdf' });
    setResumeText(profile.resumeText);
    setJobDescription(profile.jobDescription);
    setAnalysisResult(profile.analysisResult);
    setCompletedSkillIds([]);
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveTab('results');
    }, 1000);
  };

  // Reset inputs
  const handleReset = () => {
    setResumeFile(null);
    setResumeText('');
    setJobDescription('');
    setAnalysisResult(null);
    setErrorMessage('');
    setCompletedSkillIds([]);
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

      {/* Main View Container */}
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

      {/* Animated Loading Overlay Spinner */}
      {isLoading && <LoadingModal />}

      {/* Footer */}
      <Footer />

    </div>
  );
}

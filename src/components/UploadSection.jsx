import React, { useState, useRef } from 'react';
import { 
  UploadCloud, FileText, CheckCircle, AlertTriangle, Sparkles, X, 
  ArrowRight, FileCheck, Layers, Cpu, HelpCircle, RefreshCw, Zap
} from 'lucide-react';
import { SAMPLE_PROFILES } from '../data/mockData';

export default function UploadSection({
  resumeFile,
  setResumeFile,
  resumeText,
  setResumeText,
  jobDescription,
  setJobDescription,
  onAnalyze,
  errorMessage,
  setErrorMessage,
  onLoadSampleProfile
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [activeResumeMode, setActiveResumeMode] = useState('file'); // 'file' or 'text'
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setErrorMessage('');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileChange = (e) => {
    setErrorMessage('');
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
    const fileName = file.name.toLowerCase();

    if (!validTypes.includes(file.type) && !fileName.endsWith('.pdf') && !fileName.endsWith('.docx') && !fileName.endsWith('.txt')) {
      setErrorMessage('Invalid file format. Please upload a PDF or DOCX file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB limit. Please upload a smaller resume.');
      return;
    }

    setResumeFile(file);
    setActiveResumeMode('file');
    
    // Simulate extracted text preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      if (typeof text === 'string') {
        setResumeText(text.substring(0, 1500) || `Extracted skills from ${file.name}: React, JavaScript, HTML, CSS, REST APIs, Git.`);
      }
    };
    reader.readAsText(file);
  };

  const handleClearResume = () => {
    setResumeFile(null);
    setResumeText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerSimulatedError = () => {
    setErrorMessage('Simulation: Failed to parse resume file. The PDF appears to be corrupted or password protected.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Hero Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-700 border border-sky-200 text-xs font-semibold mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
          <span>AI-Powered Career Skill Gap Benchmark</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Bridge Your Skill Gap. <br />
          <span className="text-gradient">Land Your Next Big Role.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Upload your resume and paste the target job description. We’ll analyze keyword alignments, calculate your score, and generate a step-by-step course roadmap.
        </p>

        {/* Preset Sample Quick Fill Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Quick Sample:</span>
          {SAMPLE_PROFILES.map((p) => (
            <button
              key={p.id}
              onClick={() => onLoadSampleProfile(p)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-sky-200 text-sky-700 text-xs font-semibold hover:bg-sky-50 hover:border-sky-300 transition-all shadow-sm group"
            >
              <Zap className="w-3.5 h-3.5 text-sky-500 group-hover:scale-110 transition-transform" />
              <span>{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Error Alert Display */}
      {errorMessage && (
        <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start justify-between gap-3 text-rose-800 shadow-sm animate-in fade-in duration-150">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold">Analysis Failed or Validation Error</h4>
              <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
          <button 
            onClick={() => setErrorMessage('')}
            className="text-rose-400 hover:text-rose-700 p-1 rounded hover:bg-rose-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Resume Upload Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Upload Your Resume</h3>
                  <p className="text-xs text-slate-500">Supports PDF or DOCX formats (Max 5MB)</p>
                </div>
              </div>

              {/* Mode Toggle: File Upload vs Direct Text */}
              <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveResumeMode('file')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeResumeMode === 'file' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  File Upload
                </button>
                <button
                  onClick={() => setActiveResumeMode('text')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeResumeMode === 'text' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Paste Text
                </button>
              </div>
            </div>

            {activeResumeMode === 'file' ? (
              <div>
                {!resumeFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[220px] ${
                      isDragging
                        ? 'border-sky-500 bg-sky-50/80 scale-[0.99]'
                        : 'border-sky-200 bg-sky-50/30 hover:bg-sky-50/70 hover:border-sky-400'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.doc,.txt"
                      className="hidden"
                    />
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-3 shadow-inner">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      Drag & drop your resume file here, or <span className="text-sky-600 underline">browse</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">PDF or DOCX (up to 5MB)</p>
                  </div>
                ) : (
                  /* File Selected Preview Box */
                  <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col gap-3 min-h-[220px] justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow">
                          {resumeFile.name.endsWith('.pdf') ? 'PDF' : 'DOCX'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 truncate max-w-[200px] sm:max-w-[240px]">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {(resumeFile.size / 1024).toFixed(1)} KB &bull; Ready for parsing
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleClearResume}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Extracted text snippet preview */}
                    <div className="bg-white p-3 rounded-xl border border-sky-100 text-xs text-slate-600 max-h-28 overflow-y-auto">
                      <p className="font-semibold text-sky-700 mb-1 flex items-center gap-1">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-500" /> Extracted Resume Summary:
                      </p>
                      <p className="italic font-mono text-[11px] text-slate-600 leading-relaxed">
                        {resumeText || 'Text successfully parsed from document...'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-600">
                      <CheckCircle className="w-3.5 h-3.5" /> File validated & text indexed
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Paste Resume Text View */
              <div>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here (experience, skills, summary)..."
                  className="w-full h-[220px] p-4 text-xs font-mono bg-slate-50 border border-sky-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all outline-none resize-none"
                />
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Status: {resumeFile || resumeText ? 'Ready' : 'Waiting for file'}</span>
            {resumeText && (
              <span className="text-[11px] font-mono">{resumeText.length} characters</span>
            )}
          </div>
        </div>

        {/* Right Column: Job Description Area */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Job Description</h3>
                  <p className="text-xs text-slate-500">Paste the job post or requirements text</p>
                </div>
              </div>

              {jobDescription && (
                <button
                  onClick={() => setJobDescription('')}
                  className="text-xs text-slate-400 hover:text-rose-600 font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Textarea for Job Description */}
            <div className="relative">
              <textarea
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Paste the target job description here (e.g. Requirements, Responsibilities, Desired Technical Skills)..."
                className="w-full h-[220px] p-4 text-xs leading-relaxed font-sans bg-slate-50 border border-sky-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all outline-none resize-none"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Requirement text</span>
            <span className="text-[11px] font-mono">{jobDescription.length} characters</span>
          </div>
        </div>

      </div>

      {/* Primary Action Button & Error Simulator Toggle */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <button
          onClick={onAnalyze}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold text-base shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
        >
          <Sparkles className="w-5 h-5 text-sky-200 group-hover:rotate-12 transition-transform" />
          <span>Analyze Skill Gap</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Test Error State Option */}
        <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
          <span>Testing tools:</span>
          <button
            onClick={triggerSimulatedError}
            className="text-slate-500 hover:text-rose-600 underline font-medium"
          >
            Simulate File Parse Error
          </button>
        </div>
      </div>

    </div>
  );
}

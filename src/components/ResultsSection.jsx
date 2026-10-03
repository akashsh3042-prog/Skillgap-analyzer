import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, Award, Compass, Search, Download, 
  ArrowRight, Sparkles, Filter, ChevronRight, Layers, HelpCircle,
  FileCode, Code, Palette, Cpu, Globe, GitBranch, Zap, Gauge, Layout, Server, Database
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  Code, FileCode, Palette, Cpu, Globe, GitBranch, Zap, Gauge, Layout, Server, Database, CheckCircle: CheckCircle2
};

export default function ResultsSection({ analysisResult, onNavigateRoadmap, onReanalyze }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (analysisResult && analysisResult.matchScore >= 70) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [analysisResult]);

  if (!analysisResult) return null;

  const { matchScore, readinessRating, summary, stats, categories, matchedSkills, missingSkills } = analysisResult;

  // Filter skills by search query and category
  const filteredMatched = matchedSkills.filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredMissing = missingSkills.filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate SVG circular progress dimensions
  const radius = 64;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchScore / 100) * circumference;

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Analysis Complete</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Skill Gap & Competency Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compare keywords, benchmark missing requirements, and launch your roadmap.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadReport}
            className="px-4 py-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Report</span>
          </button>

          <button
            onClick={onNavigateRoadmap}
            className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/20 transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>View Learning Roadmap ({missingSkills.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Row 1: Circular Match Score Gauge & Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Match Score Circular Gauge */}
        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 text-[11px] font-extrabold border border-sky-200">
              {readinessRating}
            </span>
          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Overall Match Score</p>

          {/* SVG Circular Progress Meter */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 160 160">
              {/* Background track circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-slate-100"
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
              />
              {/* Animated Progress Gradient Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="circle-chart-circle text-sky-500"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="url(#skyGradient)"
                fill="transparent"
              />
              <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Percentage Label */}
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {matchScore}%
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Match
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-4 leading-relaxed max-w-xs">
            {summary}
          </p>
        </div>

        {/* Card 2: Quick Metrics Overview */}
        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Competency Breakdown
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-emerald-800">Matched Skills</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-3xl font-extrabold text-emerald-900">{stats.matchedCount}</span>
                <span className="text-[11px] text-emerald-700 mt-1 font-medium">Ready in resume</span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-rose-800">Missing Skills</span>
                  <XCircle className="w-4 h-4 text-rose-600" />
                </div>
                <span className="text-3xl font-extrabold text-rose-900">{stats.missingCount}</span>
                <span className="text-[11px] text-rose-700 mt-1 font-medium">Skill gaps identified</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center gap-3">
            <Award className="w-6 h-6 text-sky-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-800">Target Role Alignment</p>
              <p className="text-[11px] text-slate-500">
                You have strong foundational coverage. Bridging top 3 missing skills boosts match to 90%+.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Skill Category Breakdown Chart */}
        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Skill Category Coverage
            </h3>

            <div className="space-y-3.5">
              {categories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">{cat.name}</span>
                    <span className="text-slate-900 font-bold">{cat.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${cat.color || 'bg-sky-500'}`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 italic">
            * Coverage calculated from required keywords vs extracted resume tokens.
          </p>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            All Categories ({matchedSkills.length + missingSkills.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedCategory(c.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === c.name
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Grid Row 2: Matched Skills (Green Chips) & Missing Skills (Red Chips) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Box: Matched Skills (Green Chips) */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Matched Skills</h3>
                  <p className="text-xs text-slate-500">Validated in your resume profile</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {filteredMatched.length} Found
              </span>
            </div>

            {/* Green Skill Chips Grid */}
            <div className="flex flex-wrap gap-2.5 my-4 min-h-[140px]">
              {filteredMatched.length > 0 ? (
                filteredMatched.map((skill, idx) => {
                  const IconComp = ICON_MAP[skill.icon] || Code;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50/90 text-emerald-900 border border-emerald-200/80 shadow-sm hover:scale-[1.02] transition-transform"
                    >
                      <IconComp className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold">{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-200/70 text-emerald-900">
                          {skill.level}
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="w-full text-center py-8 text-slate-400 text-xs">
                  No matched skills found for your filter.
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Keep these highlighted on your resume top section.</span>
          </div>
        </div>

        {/* Right Box: Missing Skills (Red Chips) */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Missing Skills</h3>
                  <p className="text-xs text-slate-500">Required by job description but missing</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                {filteredMissing.length} Missing
              </span>
            </div>

            {/* Red Skill Chips Grid */}
            <div className="flex flex-wrap gap-2.5 my-4 min-h-[140px]">
              {filteredMissing.length > 0 ? (
                filteredMissing.map((skill, idx) => (
                  <div
                    key={idx}
                    onClick={onNavigateRoadmap}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50/90 text-rose-900 border border-rose-200/80 shadow-sm hover:scale-[1.02] cursor-pointer transition-transform group"
                    title="Click to view learning course roadmap"
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs font-bold">{skill.name}</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-200/70 text-rose-900">
                      {skill.priority}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-8 text-slate-400 text-xs">
                  No missing skills matching filter!
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need to acquire these skills?</span>
            <button
              onClick={onNavigateRoadmap}
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
            >
              <span>Explore Course Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

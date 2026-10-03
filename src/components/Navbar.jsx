import React, { useState } from 'react';
import { Target, Upload, BarChart3, Compass, Sparkles, ChevronDown, RefreshCw } from 'lucide-react';
import { SAMPLE_PROFILES } from '../data/mockData';

export default function Navbar({ activeTab, setActiveTab, analysisResult, onSelectProfile, onReset }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-sky-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('upload')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                SkillGap<span className="text-sky-500">.ai</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide bg-sky-100 text-sky-700 rounded-full border border-sky-200">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">Resume & JD Gap Analyzer</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 shadow-inner">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-sky-500" />
            <span>1. Home / Upload</span>
          </button>

          <button
            onClick={() => {
              if (!analysisResult) return;
              setActiveTab('results');
            }}
            disabled={!analysisResult}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'results'
                ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                : analysisResult
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                : 'text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
            <span>2. Skill Results</span>
            {analysisResult && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
                {analysisResult.matchScore}%
              </span>
            )}
          </button>

          <button
            onClick={() => {
              if (!analysisResult) return;
              setActiveTab('roadmap');
            }}
            disabled={!analysisResult}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'roadmap'
                ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                : analysisResult
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                : 'text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-500" />
            <span>3. Learning Roadmap</span>
            {analysisResult && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-full">
                {analysisResult.missingSkills.length}
              </span>
            )}
          </button>
        </nav>

        {/* Quick Actions & Preset Selector */}
        <div className="flex items-center gap-2">
          {/* Preset Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-lg text-xs font-semibold hover:bg-sky-100 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline">Try Demo Profiles</span>
              <span className="sm:hidden">Demos</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Select Preset Sample
                </div>

                {SAMPLE_PROFILES.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => {
                      onSelectProfile(profile);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-sky-50 transition-colors flex flex-col gap-0.5 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                      {profile.title}
                      <span className="text-[10px] text-sky-600 font-bold bg-sky-100 px-1.5 py-0.5 rounded">
                        {profile.analysisResult.matchScore}% match
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-500 truncate">{profile.subtitle}</span>
                  </button>
                ))}

                <div className="p-1 border-t border-slate-100 bg-slate-50">
                  <button
                    onClick={() => {
                      onReset();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-center px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 font-medium rounded transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset Input Fields
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}

import React from 'react';
import { Target, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-sky-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">SkillGap Analyzer &bull; Smart AI Resume Optimizer</p>
              <p className="text-[11px] text-slate-500">Compare skills, benchmark competencies, and accelerate career growth.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-sky-500" /> Private & Client-side
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ATS Compatibility
            </span>
            <span className="hidden sm:inline-block text-slate-400">|</span>
            <span className="text-slate-400 flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Developers
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}

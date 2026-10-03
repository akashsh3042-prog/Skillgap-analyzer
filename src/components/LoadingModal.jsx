import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Sparkles, Cpu, Search, Compass } from 'lucide-react';

export default function LoadingModal() {
  const [step, setStep] = useState(0);

  const steps = [
    { title: 'Parsing Resume Document', desc: 'Extracting technical competencies & work experience...', icon: FileTextIcon },
    { title: 'Analyzing Job Description', desc: 'Identifying required tech stack, tools, and seniority levels...', icon: Search },
    { title: 'Calculating Match Score', desc: 'Comparing resume keywords against job requirements...', icon: Cpu },
    { title: 'Generating Course Roadmap', desc: 'Curating targeted learning paths for missing skills...', icon: Compass }
  ];

  function FileTextIcon(props) {
    return <Sparkles {...props} />;
  }

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 500);
    const timer2 = setTimeout(() => setStep(2), 1100);
    const timer3 = setTimeout(() => setStep(3), 1700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const progressPercent = Math.min(100, Math.round(((step + 1) / steps.length) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-sky-100 shadow-2xl sky-glow-lg text-center relative overflow-hidden">
        
        {/* Animated background glow pill */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-sky-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-200/50 rounded-full blur-2xl pointer-events-none" />

        {/* Spinner Header */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white flex items-center justify-center mb-5 shadow-lg shadow-sky-500/30">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-900">Analyzing Skill Gap</h3>
          <p className="text-xs text-slate-500 mt-1">Please wait while our engine processes your data...</p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 mt-6 mb-2 overflow-hidden border border-slate-200/60">
            <div 
              className="bg-gradient-to-r from-sky-500 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] font-bold text-sky-600 self-end font-mono mb-6">{progressPercent}%</p>

          {/* Steps List */}
          <div className="w-full text-left space-y-3">
            {steps.map((s, idx) => {
              const StepIcon = s.icon;
              const isDone = idx < step;
              const isCurrent = idx === step;

              return (
                <div 
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all border ${
                    isCurrent 
                      ? 'bg-sky-50 border-sky-200 text-sky-900 shadow-sm' 
                      : isDone 
                      ? 'bg-slate-50/70 border-slate-100 text-slate-700' 
                      : 'opacity-40 border-transparent text-slate-400'
                  }`}
                >
                  <div className="shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : isCurrent ? (
                      <Loader2 className="w-5 h-5 text-sky-600 animate-spin" />
                    ) : (
                      <StepIcon className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${isCurrent ? 'text-sky-900' : 'text-slate-800'}`}>
                      {s.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate max-w-[240px]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

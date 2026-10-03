import React, { useState } from 'react';
import { 
  Compass, Clock, Award, ExternalLink, CheckSquare, Square, 
  Sparkles, BookOpen, Rocket, Filter, Star, CheckCircle, Trophy,
  ArrowUpRight, PlayCircle, Layers, ChevronDown, ChevronUp
} from 'lucide-react';

export default function RoadmapSection({ analysisResult, completedSkillIds, onToggleSkillCompleted }) {
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [expandedCardId, setExpandedCardId] = useState(null);

  if (!analysisResult || !analysisResult.roadmap) return null;

  const { roadmap } = analysisResult;

  // Filter roadmap by priority
  const filteredRoadmap = roadmap.filter(item => {
    if (priorityFilter === 'All') return true;
    return item.priority === priorityFilter;
  });

  const completedCount = roadmap.filter(item => completedSkillIds.includes(item.id)).length;
  const totalCount = roadmap.length;
  const roadmapProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Sum total estimated learning hours
  const totalHours = roadmap.reduce((acc, item) => {
    const match = item.estimatedDuration.match(/\((\d+)\s*hrs\)/i);
    return acc + (match ? parseInt(match[1]) : 10);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Header Banner & Total Estimated Time Bar */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
        {/* Glow decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold mb-3">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Personalized Career Accelerator</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Learning Roadmap & Course Recommendations
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Targeted course paths for your {totalCount} missing skills. Track your progress as you complete courses and build real-world projects.
            </p>
          </div>

          {/* Stat Summary Box */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-6 text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/30 text-sky-300 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-sky-200 uppercase tracking-wider font-bold">Total Estimated Time</p>
                <p className="text-xl font-extrabold text-white">~{totalHours} Hours</p>
              </div>
            </div>

            <div className="h-8 w-px bg-white/20" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-emerald-200 uppercase tracking-wider font-bold">Roadmap Progress</p>
                <p className="text-xl font-extrabold text-emerald-400">{completedCount} / {totalCount} Skills</p>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <div className="w-full bg-slate-800/80 rounded-full h-3 overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-sky-400 via-emerald-400 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${roadmapProgress}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-sky-300 shrink-0">
            {roadmapProgress}% Completed
          </span>
        </div>
      </div>

      {/* Filter Tabs & Options */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Priority:
          </span>
          {['All', 'High Priority', 'Medium Priority', 'Low Priority'].map(p => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                priorityFilter === p
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-500 hidden sm:block font-medium">
          Click checkbox on any skill to mark as learned.
        </p>
      </div>

      {/* Roadmap Skill Cards List */}
      <div className="space-y-6">
        {filteredRoadmap.map((item, idx) => {
          const isCompleted = completedSkillIds.includes(item.id);
          const isExpanded = expandedCardId === item.id;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                isCompleted
                  ? 'border-emerald-200 bg-emerald-50/20 shadow-sm'
                  : 'border-sky-100 shadow-sm hover:shadow-md hover:border-sky-200'
              }`}
            >
              {/* Card Header Bar */}
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  {/* Interactive Completion Checkbox */}
                  <button
                    onClick={() => onToggleSkillCompleted(item.id)}
                    className="mt-1 text-slate-300 hover:text-emerald-600 transition-colors shrink-0"
                    title={isCompleted ? 'Mark as incomplete' : 'Mark skill as completed'}
                  >
                    {isCompleted ? (
                      <CheckSquare className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-300 hover:text-sky-500" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-lg font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {idx + 1}. {item.skillName}
                      </h3>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        item.priority === 'High Priority'
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : item.priority === 'Medium Priority'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {item.priority}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-semibold">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right Metadata pill & duration */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-500 inline" /> {item.estimatedDuration}
                    </p>
                    <p className="text-[11px] text-slate-400">Level: {item.difficulty}</p>
                  </div>

                  <button
                    onClick={() => setExpandedCardId(isExpanded ? null : item.id)}
                    className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-6 bg-slate-50/50">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Column 1 & 2: Suggested Courses */}
                  <div className="lg:col-span-2 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-sky-500" /> Curated Course Recommendations
                    </h4>

                    <div className="space-y-3">
                      {item.courses.map((course, cIdx) => (
                        <div 
                          key={cIdx} 
                          className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-sky-300 transition-colors"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-xs sm:text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors">
                                {course.title}
                              </h5>
                              {course.isFree && (
                                <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                                  FREE
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                              <span className="font-semibold text-slate-700">{course.platform}</span>
                              <span>&bull; {course.instructor}</span>
                              <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {course.rating}
                              </span>
                              <span>({course.reviewsCount?.toLocaleString()} reviews)</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs font-bold text-slate-800">{course.price}</span>
                            <a
                              href={course.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white border border-sky-200 text-xs font-bold transition-all flex items-center gap-1 group"
                            >
                              <span>Start Course</span>
                              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Recommended Portfolio Project & Key Topics */}
                  <div className="space-y-4">
                    {/* Portfolio Project Suggestion */}
                    <div className="bg-gradient-to-tr from-sky-50 to-indigo-50/50 p-4 rounded-2xl border border-sky-200/80">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5 mb-2">
                        <Rocket className="w-4 h-4 text-sky-600" /> Recommended Portfolio Project
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.projectIdea}
                      </p>
                    </div>

                    {/* Key Topics List */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Key Topics to Master
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {item.keyTopics.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

import React from 'react';
import { ArrowDown, Sparkles, Binary, CheckCircle2, Layers } from 'lucide-react';

interface HeroProps {
  onStartAnalyzing: () => void;
  onOpenPresetModal: () => void;
  counts: {
    instagram: number;
    twitter: number;
    facebook: number;
    totalUnique: number;
    allThree: number;
  };
}

export const Hero: React.FC<HeroProps> = ({
  onStartAnalyzing,
  onOpenPresetModal,
  counts,
}) => {
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      {/* Background subtle math grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50/80 text-indigo-800 border border-indigo-200/60 shadow-2xs">
              <Binary className="w-3.5 h-3.5 text-indigo-600" />
              <span>Discrete Mathematics Set Theory Project</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Understand Your <br />
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Social Media Audience
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Use Set Theory to discover common, unique, and total audiences across{' '}
              <strong className="text-slate-800 font-semibold">Instagram</strong>,{' '}
              <strong className="text-slate-800 font-semibold">Twitter/X</strong>, and{' '}
              <strong className="text-slate-800 font-semibold">Facebook</strong>.
              Perform mathematical set operations like union, intersection, and difference in real time.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onStartAnalyzing}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>Start Analyzing</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPresetModal}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs hover:border-indigo-300 hover:text-indigo-600 transition-all active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>Load Sample Presets</span>
              </button>
            </div>

            {/* Quick feature highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-200/70 text-left">
              <div>
                <span className="text-xs font-medium text-slate-500 block">Sets Analyzed</span>
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 3 Platforms
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500 block">Core Identity</span>
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-500" /> Inclusion-Exclusion
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500 block">Deduplication</span>
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-500" /> Case-Insensitive
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Three Overlapping Circles Mini Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-indigo-100/40">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Set Overlap Model (A ∩ B ∩ C)
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  7 Disjoint Subsets
                </span>
              </div>

              {/* Visual 3 Overlapping Rings SVG Preview */}
              <div className="relative aspect-square w-full flex items-center justify-center p-2">
                <svg viewBox="0 0 300 280" className="w-full h-full drop-shadow-sm">
                  <defs>
                    {/* Ring A: Instagram (Top Left) */}
                    <linearGradient id="heroInsta" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                    </linearGradient>
                    {/* Ring B: Twitter/X (Top Right) */}
                    <linearGradient id="heroTwitter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
                    </linearGradient>
                    {/* Ring C: Facebook (Bottom Center) */}
                    <linearGradient id="heroFb" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Circle 1: Instagram (Top Left) */}
                  <circle
                    cx="115"
                    cy="110"
                    r="80"
                    fill="url(#heroInsta)"
                    stroke="#ec4899"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    className="transition-all hover:opacity-90"
                  />

                  {/* Circle 2: Twitter/X (Top Right) */}
                  <circle
                    cx="185"
                    cy="110"
                    r="80"
                    fill="url(#heroTwitter)"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    className="transition-all hover:opacity-90"
                  />

                  {/* Circle 3: Facebook (Bottom Center) */}
                  <circle
                    cx="150"
                    cy="170"
                    r="80"
                    fill="url(#heroFb)"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    className="transition-all hover:opacity-90"
                  />

                  {/* Platform Labels */}
                  <text x="80" y="65" textAnchor="middle" className="text-[11px] font-bold fill-pink-600">
                    Instagram (A)
                  </text>
                  <text x="220" y="65" textAnchor="middle" className="text-[11px] font-bold fill-sky-600">
                    Twitter/X (B)
                  </text>
                  <text x="150" y="240" textAnchor="middle" className="text-[11px] font-bold fill-blue-600">
                    Facebook (C)
                  </text>

                  {/* Center Core: A ∩ B ∩ C */}
                  <circle cx="150" cy="132" r="16" fill="#10b981" fillOpacity="0.85" stroke="#059669" strokeWidth="1.5" />
                  <text
                    x="150"
                    y="136"
                    textAnchor="middle"
                    className="text-[11px] font-extrabold fill-white"
                  >
                    {counts.allThree}
                  </text>

                  {/* Overlap Badges */}
                  <text x="150" y="100" textAnchor="middle" className="text-[10px] font-semibold fill-purple-700">
                    A ∩ B
                  </text>
                  <text x="115" y="160" textAnchor="middle" className="text-[10px] font-semibold fill-fuchsia-700">
                    A ∩ C
                  </text>
                  <text x="185" y="160" textAnchor="middle" className="text-[10px] font-semibold fill-cyan-700">
                    B ∩ C
                  </text>
                </svg>
              </div>

              {/* Bottom Quick Indicator */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Total Unique Universe |U|:</span>
                <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                  {counts.totalUnique} users
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

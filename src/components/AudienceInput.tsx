import React, { useState } from 'react';
import { Trash2, Sparkles, UserCheck, AlertCircle, Info, ChevronDown, Check } from 'lucide-react';
import type { PlatformId, SamplePreset } from '../types';
import { SAMPLE_PRESETS } from '../utils/samplePresets';

interface AudienceInputProps {
  instagramRaw: string;
  twitterRaw: string;
  facebookRaw: string;
  onInstagramChange: (val: string) => void;
  onTwitterChange: (val: string) => void;
  onFacebookChange: (val: string) => void;
  onClearPlatform: (platform: PlatformId) => void;
  onClearAll: () => void;
  onLoadPreset: (preset: SamplePreset) => void;
  onOpenPresetModal: () => void;
  activePresetId: string | null;
  parsedCounts: {
    instagram: number;
    twitter: number;
    facebook: number;
  };
  parsedUsers: {
    instagram: string[];
    twitter: string[];
    facebook: string[];
  };
}

export const AudienceInput: React.FC<AudienceInputProps> = ({
  instagramRaw,
  twitterRaw,
  facebookRaw,
  onInstagramChange,
  onTwitterChange,
  onFacebookChange,
  onClearPlatform,
  onClearAll,
  onLoadPreset,
  onOpenPresetModal,
  activePresetId,
  parsedCounts,
  parsedUsers,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section id="analyzer" className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Global Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 mb-2">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Step 1: Set Definition & Data Entry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Enter Platform Audiences
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Type or paste user lists for each platform, or pick from ready-made presets demonstrating different discrete mathematical set structures.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto relative">
            {/* Load Sample Presets Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                type="button"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Load Sample Presets</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 z-30 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Choose Sample Dataset
                      </span>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenPresetModal();
                        }}
                        className="text-[11px] font-semibold text-indigo-600 hover:underline"
                      >
                        View Details
                      </button>
                    </div>
                    {SAMPLE_PRESETS.map((p) => {
                      const isSel = activePresetId === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            onLoadPreset(p);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            isSel
                              ? 'bg-indigo-50 text-indigo-900 font-semibold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div>
                            <span className="block font-medium">{p.title}</span>
                            <span className="text-[10px] text-slate-400 block truncate max-w-[210px]">
                              {p.badge}
                            </span>
                          </div>
                          {isSel && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={onClearAll}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all cursor-pointer"
              title="Clear all 3 platforms"
            >
              <Trash2 className="w-4 h-4 text-slate-500" />
              Reset All
            </button>
          </div>
        </div>

        {/* Quick Clickable Preset Tabs Bar */}
        <div className="mb-6 p-2 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 px-3 shrink-0 uppercase tracking-wider text-[10px]">
            Presets:
          </span>
          {SAMPLE_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onLoadPreset(preset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{preset.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {preset.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3 Input Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1: INSTAGRAM */}
          <div className="bg-white rounded-2xl border-2 border-pink-100 hover:border-pink-300 shadow-sm transition-all duration-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-50/70 via-rose-50/40 to-transparent border-b border-pink-100/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
                  <span className="font-bold text-xs tracking-wider">IG</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Instagram</h3>
                  <span className="text-[11px] font-mono font-medium text-pink-700">Set A</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                  Unique Users: {parsedCounts.instagram}
                </span>
                <button
                  onClick={() => onClearPlatform('instagram')}
                  type="button"
                  title="Clear Instagram users"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-pink-100/50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Input body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col space-y-3">
              <label htmlFor="insta-input" className="text-xs font-medium text-slate-600 flex items-center justify-between">
                <span>Enter Usernames (Set A):</span>
                <span className="text-[11px] text-slate-400">Comma or Newline separated</span>
              </label>
              <textarea
                id="insta-input"
                rows={6}
                value={instagramRaw}
                onChange={(e) => onInstagramChange(e.target.value)}
                placeholder="Rahul&#10;Amit&#10;Priya&#10;Neha&#10;Karan"
                className="w-full p-3 font-mono text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all outline-none resize-none bg-slate-50/50 placeholder:text-slate-400"
              />

              {/* Parsed tags preview */}
              <div className="pt-2 border-t border-slate-100 flex-1">
                <span className="text-[11px] font-medium text-slate-400 block mb-1.5">
                  Set Elements ({parsedUsers.instagram.length}):
                </span>
                {parsedUsers.instagram.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {parsedUsers.instagram.map((user) => (
                      <span
                        key={user}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-pink-50 text-pink-700 border border-pink-200"
                      >
                        @{user}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 italic py-2">
                    <Info className="w-3.5 h-3.5" />
                    <span>No users entered yet.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CARD 2: TWITTER / X */}
          <div className="bg-white rounded-2xl border-2 border-sky-100 hover:border-sky-300 shadow-sm transition-all duration-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-50/70 via-cyan-50/40 to-transparent border-b border-sky-100/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 via-cyan-600 to-slate-800 flex items-center justify-center text-white shadow-xs">
                  <span className="font-bold text-xs tracking-wider">X</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Twitter / X</h3>
                  <span className="text-[11px] font-mono font-medium text-sky-700">Set B</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                  Unique Users: {parsedCounts.twitter}
                </span>
                <button
                  onClick={() => onClearPlatform('twitter')}
                  type="button"
                  title="Clear Twitter users"
                  className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-100/50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Input body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col space-y-3">
              <label htmlFor="twitter-input" className="text-xs font-medium text-slate-600 flex items-center justify-between">
                <span>Enter Usernames (Set B):</span>
                <span className="text-[11px] text-slate-400">Comma or Newline separated</span>
              </label>
              <textarea
                id="twitter-input"
                rows={6}
                value={twitterRaw}
                onChange={(e) => onTwitterChange(e.target.value)}
                placeholder="Amit&#10;Priya&#10;Karan&#10;Rohit"
                className="w-full p-3 font-mono text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all outline-none resize-none bg-slate-50/50 placeholder:text-slate-400"
              />

              {/* Parsed tags preview */}
              <div className="pt-2 border-t border-slate-100 flex-1">
                <span className="text-[11px] font-medium text-slate-400 block mb-1.5">
                  Set Elements ({parsedUsers.twitter.length}):
                </span>
                {parsedUsers.twitter.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {parsedUsers.twitter.map((user) => (
                      <span
                        key={user}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200"
                      >
                        @{user}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 italic py-2">
                    <Info className="w-3.5 h-3.5" />
                    <span>No users entered yet.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CARD 3: FACEBOOK */}
          <div className="bg-white rounded-2xl border-2 border-blue-100 hover:border-blue-300 shadow-sm transition-all duration-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-transparent border-b border-blue-100/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                  <span className="font-bold text-xs tracking-wider">FB</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Facebook</h3>
                  <span className="text-[11px] font-mono font-medium text-blue-700">Set C</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                  Unique Users: {parsedCounts.facebook}
                </span>
                <button
                  onClick={() => onClearPlatform('facebook')}
                  type="button"
                  title="Clear Facebook users"
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-100/50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Input body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col space-y-3">
              <label htmlFor="fb-input" className="text-xs font-medium text-slate-600 flex items-center justify-between">
                <span>Enter Usernames (Set C):</span>
                <span className="text-[11px] text-slate-400">Comma or Newline separated</span>
              </label>
              <textarea
                id="fb-input"
                rows={6}
                value={facebookRaw}
                onChange={(e) => onFacebookChange(e.target.value)}
                placeholder="Rahul&#10;Priya&#10;Rohit&#10;Sneha"
                className="w-full p-3 font-mono text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none bg-slate-50/50 placeholder:text-slate-400"
              />

              {/* Parsed tags preview */}
              <div className="pt-2 border-t border-slate-100 flex-1">
                <span className="text-[11px] font-medium text-slate-400 block mb-1.5">
                  Set Elements ({parsedUsers.facebook.length}):
                </span>
                {parsedUsers.facebook.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {parsedUsers.facebook.map((user) => (
                      <span
                        key={user}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        @{user}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 italic py-2">
                    <Info className="w-3.5 h-3.5" />
                    <span>No users entered yet.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mathematical Set Theory Note */}
        <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
          <AlertCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold text-slate-800">Set Property Enforced:</strong> By mathematical definition, sets contain only distinct elements (\(x \in A\)). Any repetitive inputs within the same platform are deduplicated automatically, and user identifiers are matched case-insensitively (e.g. <code>Rahul</code> = <code>rahul</code>).
          </p>
        </div>
      </div>
    </section>
  );
};

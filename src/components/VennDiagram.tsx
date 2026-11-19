import { useState } from 'react';
import type { VennRegionId, VennRegionData } from '../types';
import { Sparkles, Filter, Check } from 'lucide-react';

interface VennDiagramProps {
  regions: Record<VennRegionId, VennRegionData>;
  selectedRegionId: string | null;
  onSelectRegion: (id: string | null) => void;
  onSelectUser?: (username: string) => void;
}

export const VennDiagram: React.FC<VennDiagramProps> = ({
  regions,
  selectedRegionId,
  onSelectRegion,
  onSelectUser,
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Determine which regions to highlight:
  // If selectedRegionId is an operation like "op_insta_twitter_inter",
  // it might map to multiple regions.
  const isRegionActive = (regionId: VennRegionId): boolean => {
    if (!selectedRegionId) return false;
    if (selectedRegionId === regionId) return true;

    // Operation mappings
    if (selectedRegionId === 'op_all_three') {
      return regionId === 'all_three';
    }
    if (selectedRegionId === 'op_insta_twitter_inter') {
      return regionId === 'instagram_twitter_only' || regionId === 'all_three';
    }
    if (selectedRegionId === 'op_insta_fb_inter') {
      return regionId === 'instagram_facebook_only' || regionId === 'all_three';
    }
    if (selectedRegionId === 'op_twitter_fb_inter') {
      return regionId === 'twitter_facebook_only' || regionId === 'all_three';
    }
    if (selectedRegionId === 'op_union_all') {
      return true; // All regions are part of union!
    }
    // Differences
    if (selectedRegionId === 'diff_insta_minus_twitter') {
      return regionId === 'instagram_only' || regionId === 'instagram_facebook_only';
    }
    if (selectedRegionId === 'diff_twitter_minus_insta') {
      return regionId === 'twitter_only' || regionId === 'twitter_facebook_only';
    }
    if (selectedRegionId === 'diff_insta_minus_fb') {
      return regionId === 'instagram_only' || regionId === 'instagram_twitter_only';
    }
    if (selectedRegionId === 'diff_fb_minus_insta') {
      return regionId === 'facebook_only' || regionId === 'twitter_facebook_only';
    }
    if (selectedRegionId === 'diff_twitter_minus_fb') {
      return regionId === 'twitter_only' || regionId === 'instagram_twitter_only';
    }
    if (selectedRegionId === 'diff_fb_minus_twitter') {
      return regionId === 'facebook_only' || regionId === 'instagram_facebook_only';
    }

    return false;
  };

  // Region node coordinates in SVG
  const regionNodes: Array<{
    id: VennRegionId;
    x: number;
    y: number;
    label: string;
    sublabel: string;
    defaultBg: string;
    activeBg: string;
  }> = [
    {
      id: 'instagram_only',
      x: 105,
      y: 95,
      label: 'Instagram Only',
      sublabel: 'I \\ (T ∪ F)',
      defaultBg: '#fdf2f8',
      activeBg: '#f43f5e',
    },
    {
      id: 'twitter_only',
      x: 295,
      y: 95,
      label: 'Twitter/X Only',
      sublabel: 'T \\ (I ∪ F)',
      defaultBg: '#f0f9ff',
      activeBg: '#0284c7',
    },
    {
      id: 'facebook_only',
      x: 200,
      y: 265,
      label: 'Facebook Only',
      sublabel: 'F \\ (I ∪ T)',
      defaultBg: '#eff6ff',
      activeBg: '#2563eb',
    },
    {
      id: 'instagram_twitter_only',
      x: 200,
      y: 100,
      label: 'IG & TW Only',
      sublabel: '(I ∩ T) \\ F',
      defaultBg: '#f5f3ff',
      activeBg: '#7c3aed',
    },
    {
      id: 'instagram_facebook_only',
      x: 140,
      y: 185,
      label: 'IG & FB Only',
      sublabel: '(I ∩ F) \\ T',
      defaultBg: '#fdf4ff',
      activeBg: '#c026d3',
    },
    {
      id: 'twitter_facebook_only',
      x: 260,
      y: 185,
      label: 'TW & FB Only',
      sublabel: '(T ∩ F) \\ I',
      defaultBg: '#ecfeff',
      activeBg: '#0891b2',
    },
    {
      id: 'all_three',
      x: 200,
      y: 155,
      label: 'All Three',
      sublabel: 'I ∩ T ∩ F',
      defaultBg: '#ecfdf5',
      activeBg: '#059669',
    },
  ];

  // Active details calculation
  const currentActiveId = hoveredRegion || selectedRegionId;
  const activeRegionData = currentActiveId && currentActiveId in regions 
    ? regions[currentActiveId as VennRegionId] 
    : null;

  return (
    <section id="visualization" className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 3: Three-Set Venn Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Interactive Venn Diagram
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Visualizing the 7 mutually disjoint regions of the three social platform sets.
              Hover or click any region or operation to inspect its mathematical notation and member users.
            </p>
          </div>

          {selectedRegionId && (
            <button
              onClick={() => onSelectRegion(null)}
              className="self-start md:self-auto text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              Clear Venn Filter
            </button>
          )}
        </div>

        {/* Visualization Grid: Venn Diagram on Left, Details & Region List on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive SVG Diagram */}
          <div className="lg:col-span-7 bg-slate-50/70 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
            {/* Platform Indicators Header */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-slate-200/60 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-pink-500 ring-2 ring-pink-100 inline-block" />
                <span className="text-slate-700 font-semibold">A: Instagram</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500 ring-2 ring-sky-100 inline-block" />
                <span className="text-slate-700 font-semibold">B: Twitter / X</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-100 inline-block" />
                <span className="text-slate-700 font-semibold">C: Facebook</span>
              </div>
            </div>

            {/* SVG Diagram */}
            <div className="relative w-full max-w-[480px] aspect-[4/3.4]">
              <svg
                viewBox="0 0 400 330"
                className="w-full h-full select-none"
              >
                <defs>
                  {/* Circle Gradients */}
                  <radialGradient id="gradInsta" cx="35%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.18" />
                  </radialGradient>
                  <radialGradient id="gradTwitter" cx="65%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.18" />
                  </radialGradient>
                  <radialGradient id="gradFb" cx="50%" cy="75%" r="70%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.18" />
                  </radialGradient>

                  {/* Filter for shadow badge */}
                  <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" />
                  </filter>
                </defs>

                {/* --- 3 MAIN SET CIRCLES --- */}
                {/* Circle A: Instagram */}
                <circle
                  cx="145"
                  cy="135"
                  r="98"
                  fill="url(#gradInsta)"
                  stroke="#ec4899"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                  className="transition-all duration-300"
                />

                {/* Circle B: Twitter */}
                <circle
                  cx="255"
                  cy="135"
                  r="98"
                  fill="url(#gradTwitter)"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                  className="transition-all duration-300"
                />

                {/* Circle C: Facebook */}
                <circle
                  cx="200"
                  cy="205"
                  r="98"
                  fill="url(#gradFb)"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                  className="transition-all duration-300"
                />

                {/* Circle Outer Labels */}
                <text x="85" y="55" className="text-[12px] font-bold fill-pink-600">
                  Instagram
                </text>
                <text x="315" y="55" className="text-[12px] font-bold fill-sky-600 text-anchor-end" textAnchor="end">
                  Twitter / X
                </text>
                <text x="200" y="322" className="text-[12px] font-bold fill-blue-600" textAnchor="middle">
                  Facebook
                </text>

                {/* --- 7 INTERACTIVE REGION BADGES --- */}
                {regionNodes.map((node) => {
                  const regData = regions[node.id];
                  const active = isRegionActive(node.id) || hoveredRegion === node.id;
                  const count = regData ? regData.count : 0;
                  const isCenter = node.id === 'all_three';

                  return (
                    <g
                      key={node.id}
                      onClick={() => onSelectRegion(selectedRegionId === node.id ? null : node.id)}
                      onMouseEnter={() => setHoveredRegion(node.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      className="cursor-pointer transition-transform duration-200"
                      transform={`translate(${node.x}, ${node.y})`}
                    >
                      {/* Region Hotspot Badge */}
                      <rect
                        x="-32"
                        y="-19"
                        width="64"
                        height="38"
                        rx="19"
                        fill={active ? node.activeBg : '#ffffff'}
                        stroke={active ? '#ffffff' : (count > 0 ? '#cbd5e1' : '#e2e8f0')}
                        strokeWidth={active ? '2.5' : '1.5'}
                        filter="url(#badgeShadow)"
                        className="transition-all duration-200"
                      />

                      {/* Cardinality Count */}
                      <text
                        x="0"
                        y="-1"
                        textAnchor="middle"
                        className={`text-[13px] font-extrabold font-mono transition-colors ${
                          active ? 'fill-white' : (count > 0 ? 'fill-slate-900' : 'fill-slate-400')
                        }`}
                      >
                        {count}
                      </text>

                      {/* Sub-label Notation */}
                      <text
                        x="0"
                        y="12"
                        textAnchor="middle"
                        className={`text-[9px] font-semibold transition-colors ${
                          active ? 'fill-white/90' : 'fill-slate-500'
                        }`}
                      >
                        {isCenter ? 'A ∩ B ∩ C' : node.sublabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Hint message under diagram */}
            <p className="text-[11px] text-slate-500 mt-2 text-center">
              💡 Click any bubble inside the diagram or table below to isolate that subset.
            </p>
          </div>

          {/* Right Column: Region Details Panel & Quick Selector */}
          <div className="lg:col-span-5 space-y-4">
            {/* Active Region Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Subset Inspector
                </span>
                {activeRegionData && (
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {activeRegionData.mathNotation}
                  </span>
                )}
              </div>

              {activeRegionData ? (
                <div className="mt-3 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold text-slate-900">
                      {activeRegionData.label}
                    </h3>
                    <span className="text-sm font-semibold text-slate-500">
                      Cardinality: <strong className="text-slate-900">{activeRegionData.count}</strong>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {getRegionDescription(activeRegionData.id)}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-medium text-slate-500 block mb-2">
                      Users in this region ({activeRegionData.users.length}):
                    </span>
                    {activeRegionData.users.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                        {activeRegionData.users.map((username) => (
                          <button
                            key={username}
                            onClick={() => onSelectUser && onSelectUser(username)}
                            title="Click to inspect this user"
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 border border-slate-200 transition-colors cursor-pointer"
                          >
                            @{username}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-400 italic text-center">
                        Empty set: ∅ (no users found in this region)
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center space-y-2">
                  <Filter className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-sm font-medium text-slate-700">
                    No Region or Operation Selected
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Hover over or click any region inside the diagram or choose from the list below to inspect users and set formulas.
                  </p>
                </div>
              )}
            </div>

            {/* Quick 7-Region Selector List */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                All 7 Disjoint Subsets
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {Object.values(regions).map((region) => {
                  const isSelected = selectedRegionId === region.id;
                  return (
                    <button
                      key={region.id}
                      onClick={() => onSelectRegion(isSelected ? null : region.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50/70 font-semibold shadow-2xs'
                          : 'border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: region.color }}
                        />
                        <span className="truncate text-slate-800">{region.label}</span>
                        <span className="text-[10px] font-mono text-slate-400">{region.mathNotation}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 pl-2">
                        <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {region.count}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function getRegionDescription(regionId: VennRegionId): string {
  switch (regionId) {
    case 'instagram_only':
      return 'Exclusive to Instagram: Users who are in Set A, but strictly not in Set B or Set C.';
    case 'twitter_only':
      return 'Exclusive to Twitter/X: Users who are in Set B, but strictly not in Set A or Set C.';
    case 'facebook_only':
      return 'Exclusive to Facebook: Users who are in Set C, but strictly not in Set A or Set B.';
    case 'instagram_twitter_only':
      return 'Present on both Instagram and Twitter, but absent from Facebook.';
    case 'instagram_facebook_only':
      return 'Present on both Instagram and Facebook, but absent from Twitter/X.';
    case 'twitter_facebook_only':
      return 'Present on both Twitter/X and Facebook, but absent from Instagram.';
    case 'all_three':
      return 'The Triple Core: Users belonging to the simultaneous intersection of Instagram, Twitter, and Facebook.';
    default:
      return '';
  }
}

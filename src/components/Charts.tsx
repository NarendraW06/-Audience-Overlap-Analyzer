import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

interface ChartsProps {
  platformSizes: {
    instagram: number;
    twitter: number;
    facebook: number;
  };
  overlapSizes: {
    instaTwitter: number;
    instaFb: number;
    twitterFb: number;
    allThree: number;
  };
}

export const Charts: React.FC<ChartsProps> = ({
  platformSizes,
  overlapSizes,
}) => {
  // Data for Chart 1: Platform Audience Size
  const sizeData = [
    { name: 'Instagram', size: platformSizes.instagram, fill: '#ec4899' },
    { name: 'Twitter / X', size: platformSizes.twitter, fill: '#0284c7' },
    { name: 'Facebook', size: platformSizes.facebook, fill: '#2563eb' },
  ];

  // Data for Chart 2: Overlap Cardinality
  const overlapData = [
    { name: 'IG ∩ TW', count: overlapSizes.instaTwitter, fill: '#8b5cf6' },
    { name: 'IG ∩ FB', count: overlapSizes.instaFb, fill: '#d946ef' },
    { name: 'TW ∩ FB', count: overlapSizes.twitterFb, fill: '#06b6d4' },
    { name: 'All Three', count: overlapSizes.allThree, fill: '#10b981' },
  ];

  return (
    <section id="charts" className="py-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Step 6: Visual Analytics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Platform & Overlap Distributions
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Comparing individual set sizes against multi-set intersection sizes.
          </p>
        </div>

        {/* 2 Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Platform Audience Size */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Platform Audience Sizes
                  </h3>
                  <span className="text-xs text-slate-500">
                    Cardinality |S| of each individual platform set
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  |A|, |B|, |C|
                </span>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sizeData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-2.5 rounded-lg bg-slate-900 text-white shadow-lg text-xs">
                              <span className="font-semibold block">{data.name}</span>
                              <span className="font-mono text-indigo-300">
                                Size: {data.size} unique users
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="size" radius={[6, 6, 0, 0]}>
                      {sizeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-around text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                Instagram: {platformSizes.instagram}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                Twitter/X: {platformSizes.twitter}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                Facebook: {platformSizes.facebook}
              </span>
            </div>
          </div>

          {/* Chart 2: Overlap Cardinality */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Audience Overlap Comparison
                  </h3>
                  <span className="text-xs text-slate-500">
                    Pairwise and triple intersection audience volumes
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Intersection Sets
                </span>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overlapData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-2.5 rounded-lg bg-slate-900 text-white shadow-lg text-xs">
                              <span className="font-semibold block">{data.name}</span>
                              <span className="font-mono text-emerald-300">
                                Overlap: {data.count} users
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {overlapData.map((entry, index) => (
                        <Cell key={`overlap-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-around text-xs text-slate-600 flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                IG ∩ TW: {overlapSizes.instaTwitter}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500" />
                IG ∩ FB: {overlapSizes.instaFb}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                TW ∩ FB: {overlapSizes.twitterFb}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                All 3: {overlapSizes.allThree}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

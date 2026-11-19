import { Users, Sparkles, TrendingUp, Layers } from 'lucide-react';

interface StatisticsCardsProps {
  counts: {
    instagram: number;
    twitter: number;
    facebook: number;
    totalUnique: number;
    allThree: number;
  };
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ counts }) => {
  const stats = [
    {
      label: 'Instagram Audience',
      symbol: '|Instagram|',
      mathName: 'Cardinality Set A',
      value: counts.instagram,
      bgColor: 'bg-rose-50/60',
      borderColor: 'border-pink-200',
      badgeColor: 'bg-pink-100 text-pink-700',
      icon: Users,
      iconColor: 'text-pink-600',
      accentColor: 'text-pink-600',
    },
    {
      label: 'Twitter / X Audience',
      symbol: '|Twitter|',
      mathName: 'Cardinality Set B',
      value: counts.twitter,
      bgColor: 'bg-sky-50/60',
      borderColor: 'border-sky-200',
      badgeColor: 'bg-sky-100 text-sky-700',
      icon: Users,
      iconColor: 'text-sky-600',
      accentColor: 'text-sky-600',
    },
    {
      label: 'Facebook Audience',
      symbol: '|Facebook|',
      mathName: 'Cardinality Set C',
      value: counts.facebook,
      bgColor: 'bg-blue-50/60',
      borderColor: 'border-blue-200',
      badgeColor: 'bg-blue-100 text-blue-700',
      icon: Users,
      iconColor: 'text-blue-600',
      accentColor: 'text-blue-600',
    },
    {
      label: 'Total Unique Audience',
      symbol: '|I ∪ T ∪ F|',
      mathName: 'Three-Set Union',
      value: counts.totalUnique,
      bgColor: 'bg-purple-50/60',
      borderColor: 'border-purple-200',
      badgeColor: 'bg-purple-100 text-purple-700',
      icon: Layers,
      iconColor: 'text-purple-600',
      accentColor: 'text-purple-600',
    },
    {
      label: 'Common to All Three',
      symbol: '|I ∩ T ∩ F|',
      mathName: 'Triple Intersection',
      value: counts.allThree,
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      icon: Sparkles,
      iconColor: 'text-emerald-600',
      accentColor: 'text-emerald-600',
    },
  ];

  return (
    <section id="statistics" className="py-10 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-200/80 text-slate-700 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              <span>Step 2: Cardinality Metrics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Audience Cardinality & Overview
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Cardinality: n(S) = |S| = Number of distinct members
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${stat.borderColor} ${stat.bgColor} bg-white shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${stat.badgeColor}`}>
                  {stat.symbol}
                </span>
                <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>

              <div className="my-1.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-0.5 truncate">
                  {stat.label}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 truncate">
                {stat.mathName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

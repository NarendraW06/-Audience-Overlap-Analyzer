import type { OverlapMetric } from '../types';
import { Percent, ArrowRight } from 'lucide-react';

interface OverlapPercentageProps {
  metrics: OverlapMetric[];
}

export const OverlapPercentage: React.FC<OverlapPercentageProps> = ({ metrics }) => {
  return (
    <section id="overlap" className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
            <Percent className="w-3.5 h-3.5 text-indigo-600" />
            <span>Step 5: Proportional Set Overlap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Audience Overlap Percentages
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Measures the proportion of one platform's audience that also participates on another platform. Notice that overlap percentage is directional (asymmetrical) when set sizes differ.
          </p>
        </div>

        {/* Formula Explainer Banner */}
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
              %
            </div>
            <div>
              <span className="text-xs font-bold text-slate-700 block">
                Mathematical Overlap Formula
              </span>
              <p className="text-xs text-slate-600 font-mono">
                Overlap(A → B) = \frac{'{|A ∩ B|}'}{'{|A|}'} \times 100\%
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 max-w-md">
            <strong className="text-slate-700">Set Asymmetry Principle:</strong> If Instagram has 5 users and Twitter has 4, with 3 common users, then 60.0% of Instagram is on Twitter, but 75.0% of Twitter is on Instagram!
          </div>
        </div>

        {/* Overlap Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <span>{metric.fromName}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>{metric.toName}</span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {metric.intersectionCount} / {metric.baseCount} users
                  </span>
                </div>

                {/* Percentage Progress Bar */}
                <div className="my-3">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono">
                      {metric.percentage}%
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      common ratio
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        metric.percentage > 60
                          ? 'bg-emerald-500'
                          : metric.percentage > 30
                          ? 'bg-indigo-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(metric.percentage, 100)}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2">
                  {metric.explanation}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400 truncate">
                {metric.formula}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

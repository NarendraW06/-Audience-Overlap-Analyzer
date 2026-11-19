import React from 'react';
import { Target, Megaphone, Repeat, ShieldCheck, Crosshair, TrendingUp } from 'lucide-react';

export const Applications: React.FC = () => {
  const applications = [
    {
      title: 'Marketing Campaign Optimization',
      icon: Megaphone,
      iconColor: 'text-pink-600',
      description:
        'Prevents wasting marketing budget by analyzing user overlap before running ad campaigns across multiple channels.',
    },
    {
      title: 'Audience Targeting & Retargeting',
      icon: Target,
      iconColor: 'text-indigo-600',
      description:
        'Isolate the intersection (A ∩ B) to deliver tailored retargeting messages to high-intent omni-channel users.',
    },
    {
      title: 'Avoiding Repeated Targeting & Ad Fatigue',
      icon: Repeat,
      iconColor: 'text-amber-600',
      description:
        'By computing relative complements (A \\ B), advertisers ensure users are not repeatedly bombarded by identical ads on multiple networks.',
    },
    {
      title: 'Identifying Platform-Exclusive Loyalists',
      icon: Crosshair,
      iconColor: 'text-emerald-600',
      description:
        'Quantifies exclusive user bases (A \\ (B ∪ C)) that cannot be reached anywhere else, highlighting unique value propositions.',
    },
    {
      title: 'Influencer & Sponsor ROI Analysis',
      icon: TrendingUp,
      iconColor: 'text-sky-600',
      description:
        'When brands partner with creators across TikTok, YouTube, and Instagram, set overlap calculates the incremental unique reach gained.',
    },
    {
      title: 'Cross-Platform Content Strategy',
      icon: ShieldCheck,
      iconColor: 'text-purple-600',
      description:
        'Guides social media teams on whether to repurpose identical content or tailor messages based on how distinct the followers are.',
    },
  ];

  return (
    <section id="applications" className="py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Practical Industrial Utility</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Real-World Applications
          </h2>
          <p className="mt-3 text-base text-slate-600">
            How modern data scientists, marketing strategists, and digital advertisers apply Set Theory to maximize campaign effectiveness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3">
                <app.icon className={`w-5 h-5 ${app.iconColor}`} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                {app.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {app.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

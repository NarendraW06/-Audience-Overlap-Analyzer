import React from 'react';
import { BookOpen, Layers, GitMerge, MinusCircle, Hash, Eye, Binary } from 'lucide-react';

export const Concepts: React.FC = () => {
  const concepts = [
    {
      title: 'Set',
      symbol: 'S = { x₁ , x₂ , ... }',
      icon: BookOpen,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50/50',
      borderColor: 'border-indigo-200',
      definition: 'A well-defined collection of distinct objects or elements.',
      explanation: 'In discrete mathematics, a set cannot contain duplicates. Order does not matter: {Amit, Rahul} is identical to {Rahul, Amit}.',
      socialExample: 'Set A = All unique users registered on Instagram: {Rahul, Amit, Priya, Neha, Karan}.',
    },
    {
      title: 'Union',
      symbol: 'A ∪ B',
      icon: Layers,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50/50',
      borderColor: 'border-purple-200',
      definition: 'The set of all elements that belong to A, B, or both.',
      explanation: 'Combines members across multiple groups while eliminating repetitive entries so each person is counted once.',
      socialExample: 'Instagram ∪ Twitter: The combined list of people reachable across either platform without double-counting.',
    },
    {
      title: 'Intersection',
      symbol: 'A ∩ B',
      icon: GitMerge,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/50',
      borderColor: 'border-emerald-200',
      definition: 'The set of elements belonging simultaneously to both sets A and B.',
      explanation: 'Finds strictly common members. If an element is absent from even one set, it cannot be in the intersection.',
      socialExample: 'Instagram ∩ Twitter: Cross-platform users active on both platforms (e.g. {Amit, Priya, Karan}).',
    },
    {
      title: 'Set Difference (Relative Complement)',
      symbol: 'A \\ B  (or A - B)',
      icon: MinusCircle,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50/50',
      borderColor: 'border-amber-200',
      definition: 'The set of elements belonging to A but strictly not belonging to B.',
      explanation: 'Removes all members of set B from set A. Notice that A - B is generally not equal to B - A.',
      socialExample: 'Instagram - Twitter: Loyalists who use Instagram exclusively and have no Twitter presence (e.g. {Rahul, Neha}).',
    },
    {
      title: 'Cardinality',
      symbol: '|S| or n(S)',
      icon: Hash,
      iconColor: 'text-pink-600',
      bgColor: 'bg-pink-50/50',
      borderColor: 'border-pink-200',
      definition: 'A measure of the number of elements in a finite set.',
      explanation: 'Denotes the count or size of the set. For the empty set ∅, |∅| = 0.',
      socialExample: 'If Instagram has 5 unique followers, its cardinality is |Instagram| = 5.',
    },
    {
      title: 'Venn Diagram',
      symbol: 'Visual Topology',
      icon: Eye,
      iconColor: 'text-sky-600',
      bgColor: 'bg-sky-50/50',
      borderColor: 'border-sky-200',
      definition: 'Geometric diagrams depicting logical relationships between sets.',
      explanation: 'For 3 sets (A, B, C), the diagram partitions the universe into exactly 2³ = 8 regions (7 visible subsets plus the complement).',
      socialExample: 'A 3-circle diagram showing Instagram, Twitter, and Facebook audiences partitioned into distinct non-overlapping pockets.',
    },
  ];

  return (
    <section id="concepts" className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
            <Binary className="w-3.5 h-3.5" />
            <span>Foundational Discrete Mathematics</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Set Theory Concepts Used
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Set Theory forms the fundamental mathematical basis for relational databases, audience segmentation, query logic, and discrete computation.
          </p>
        </div>

        {/* 6 Educational Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${item.borderColor} ${item.bgColor} bg-white shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center">
                      <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200 shadow-2xs">
                    {item.symbol}
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Formal Definition
                    </span>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {item.definition}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Mathematical Concept
                    </span>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-200/60 bg-white/70 -mx-6 -mb-6 p-4 rounded-b-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                  Social Media Application
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  {item.socialExample}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

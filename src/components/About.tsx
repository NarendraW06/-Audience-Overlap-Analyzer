import React from 'react';
import { GraduationCap, Code2, CheckCircle2, FileText } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Project Specification</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            About the Project
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            A comprehensive Discrete Mathematics demonstration of Set Theory applied to social network analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Problem Statement & Objective (Left Column) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Problem Statement Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3>PROBLEM STATEMENT</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                &ldquo;This project analyzes user data from multiple social media platforms such as Instagram, Twitter/X, and Facebook. By applying set operations including union, intersection, and difference, the system identifies users common to multiple platforms, users exclusive to a platform, and the total unique audience.&rdquo;
              </p>
            </div>

            {/* Objective Card */}
            <div className="p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-indigo-950 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                <h3>PROJECT OBJECTIVE</h3>
              </div>
              <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed font-normal">
                &ldquo;To demonstrate the practical application of Set Theory in analyzing social media audience overlap.&rdquo;
              </p>
            </div>

            {/* Academic Properties */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <h4 className="font-bold text-slate-900 text-sm mb-3">
                Key Discrete Mathematical Principles Demonstrated
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span><strong>Axiom of Extension:</strong> Two sets are equal if and only if they contain precisely the same elements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span><strong>Principle of Inclusion-Exclusion (PIE):</strong> Computes exact union cardinality without multiset overcounting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span><strong>Partitioning:</strong> Decomposing three arbitrary finite sets into 7 mutually disjoint subsets.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Project Details & Metadata (Right Column) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <Code2 className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Project Metadata</h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Project
                  </span>
                  <span className="font-semibold text-slate-900">
                    Social Media Audience Overlap Analyzer
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Subject
                  </span>
                  <span className="font-semibold text-slate-900">
                    Discrete Mathematics
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Main Concepts
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {['Set Theory', 'Union', 'Intersection', 'Difference', 'Cardinality', 'Venn Diagrams', 'Inclusion-Exclusion'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Lucide React', 'Recharts'].map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Architecture
                  </span>
                  <span className="text-slate-600 text-xs">
                    Pure client-side execution, deterministic Set mathematics, zero external backend dependencies.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { ArrowUp, Share2 } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white font-bold text-sm block">
                Social Media Audience Overlap Analyzer
              </span>
              <p className="text-slate-400 text-xs">
                Discrete Mathematics Mini-Project • Set Theory Demonstration
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#analyzer" className="hover:text-white transition-colors">Analyzer</a>
            <a href="#visualization" className="hover:text-white transition-colors">Venn Diagram</a>
            <a href="#operations" className="hover:text-white transition-colors">Operations</a>
            <a href="#concepts" className="hover:text-white transition-colors">Concepts</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>

          {/* Right Back to Top */}
          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {CURRENT_YEAR} Discrete Mathematics Mini-Project. Built with React, TypeScript & Tailwind CSS.</p>
          <p className="text-slate-500">Educational Set Theory Demonstration • Client-Side Engine</p>
        </div>
      </div>
    </footer>
  );
};

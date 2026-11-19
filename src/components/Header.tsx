import { useState } from 'react';
import { Share2, Menu, X, RotateCcw, Sparkles, BookOpen, BarChart3, Layers } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onOpenPresetModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset, onOpenPresetModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', icon: Share2 },
    { label: 'Analyzer', href: '#analyzer', icon: Layers },
    { label: 'Statistics', href: '#statistics', icon: BarChart3 },
    { label: 'Visualization', href: '#visualization', icon: Layers },
    { label: 'Concepts', href: '#concepts', icon: BookOpen },
    { label: 'About', href: '#about', icon: BookOpen },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Academic Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 ring-2 ring-indigo-50">
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                  Social Media Audience Overlap Analyzer
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Discrete Mathematics
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Analyze social media audience overlap using Set Theory
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenPresetModal}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-all shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Sample Presets
            </button>
            <button
              onClick={onReset}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-all active:scale-98 cursor-pointer"
              title="Reset all inputs and results"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              Reset All
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenPresetModal}
              type="button"
              className="sm:hidden inline-flex items-center p-1.5 text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg"
              title="Choose Sample Preset"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle Navigation Menu"
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="pb-2 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Navigation
            </p>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50"
            >
              <link.icon className="w-4 h-4 text-slate-500" />
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                onOpenPresetModal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Sample Presets
            </button>
            <button
              onClick={() => {
                onReset();
                setMobileMenuOpen(false);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-lg"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              Reset All
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

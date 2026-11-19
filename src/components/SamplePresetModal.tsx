import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import type { SamplePreset } from '../types';
import { SAMPLE_PRESETS } from '../utils/samplePresets';

interface SamplePresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: SamplePreset) => void;
  currentPresetId?: string;
}

export const SamplePresetModal: React.FC<SamplePresetModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  currentPresetId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Choose a Sample Audience Dataset
              </h3>
              <p className="text-xs text-slate-500">
                Select from ready-made presets demonstrating different discrete mathematical set structures.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets List */}
        <div className="p-6 space-y-3.5 overflow-y-auto flex-1">
          {SAMPLE_PRESETS.map((preset) => {
            const isSelected = currentPresetId === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-xs ring-1 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/80'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {preset.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {preset.description}
                  </p>

                  {/* Micro counts preview */}
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 pt-1">
                    <span className="text-pink-600 font-semibold">
                      IG: {preset.data.instagram.split('\n').filter(Boolean).length}
                    </span>
                    <span>•</span>
                    <span className="text-sky-600 font-semibold">
                      TW: {preset.data.twitter.split('\n').filter(Boolean).length}
                    </span>
                    <span>•</span>
                    <span className="text-blue-600 font-semibold">
                      FB: {preset.data.facebook.split('\n').filter(Boolean).length}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <span>Load This</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>You can always edit or add more users in the inputs after loading.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

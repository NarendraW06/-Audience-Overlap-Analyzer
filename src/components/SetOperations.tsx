import { useState } from 'react';
import type { SetOperationResult } from '../types';
import { Calculator, Eye } from 'lucide-react';

interface SetOperationsProps {
  unionAll: SetOperationResult;
  pairwiseIntersections: SetOperationResult[];
  tripleIntersection: SetOperationResult;
  differences: Record<string, SetOperationResult>;
  onHighlightVenn: (regionId: string) => void;
  onSelectUser: (user: string) => void;
}

export const SetOperations: React.FC<SetOperationsProps> = ({
  unionAll,
  pairwiseIntersections,
  tripleIntersection,
  differences,
  onHighlightVenn,
  onSelectUser,
}) => {
  const differenceKeys = Object.keys(differences);
  const [selectedDiffKey, setSelectedDiffKey] = useState<string>(
    differenceKeys[0] || 'diff_insta_minus_twitter'
  );

  const currentDiff = differences[selectedDiffKey] || differences[differenceKeys[0]];

  return (
    <section id="operations" className="py-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            <span>Step 4: Discrete Set Operations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Set Theory Operations & Calculations
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Live evaluation of Union, Pairwise Intersections, Triple Intersection, and Relative Complements (Set Differences).
            Click "Highlight in Diagram" to link any operation directly to the Venn visualization.
          </p>
        </div>

        {/* Operation Cards Grid */}
        <div className="space-y-6">
          {/* A. UNION CARD */}
          <div className="bg-white rounded-2xl border border-indigo-200 shadow-sm p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                  ∪
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      Total Union: {unionAll.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {unionAll.symbol}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {unionAll.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block font-medium">Result Cardinality</span>
                  <span className="text-2xl font-extrabold text-indigo-600 font-mono">
                    {unionAll.count} <span className="text-xs font-normal text-slate-500">unique users</span>
                  </span>
                </div>
                <button
                  onClick={() => onHighlightVenn(unionAll.id)}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Highlight All</span>
                </button>
              </div>
            </div>

            {/* User Tags */}
            <div className="pt-4">
              <span className="text-xs font-medium text-slate-500 block mb-2">
                Unified Audience Set ({unionAll.users.length}):
              </span>
              {unionAll.users.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {unionAll.users.map((user) => (
                    <button
                      key={user}
                      onClick={() => onSelectUser(user)}
                      className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 rounded-md transition-colors cursor-pointer"
                      title="Inspect user presence"
                    >
                      @{user}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No users entered yet.</p>
              )}
            </div>
          </div>

          {/* B & C: INTERSECTIONS GRID */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Intersections (∩)</span>
                <span className="text-xs font-normal text-slate-500">
                  Common audiences across platform pairs & triple core
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Three-Way Intersection */}
              <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-sm p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {tripleIntersection.symbol}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="my-2">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {tripleIntersection.name}
                  </h4>
                  <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
                    {tripleIntersection.count} <span className="text-xs font-normal text-slate-500">users</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {tripleIntersection.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto mb-2">
                    {tripleIntersection.users.length > 0 ? (
                      tripleIntersection.users.map((u) => (
                        <button
                          key={u}
                          onClick={() => onSelectUser(u)}
                          className="px-1.5 py-0.5 text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 rounded cursor-pointer hover:bg-emerald-100"
                        >
                          @{u}
                        </button>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Empty set (∅)</span>
                    )}
                  </div>
                  <button
                    onClick={() => onHighlightVenn(tripleIntersection.id)}
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Highlight Venn Core</span>
                  </button>
                </div>
              </div>

              {/* Pairwise Intersections */}
              {pairwiseIntersections.map((op) => (
                <div
                  key={op.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm p-4 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                      {op.symbol}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">Pairwise</span>
                  </div>

                  <div className="my-2">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {op.name}
                    </h4>
                    <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                      {op.count} <span className="text-xs font-normal text-slate-500">users</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {op.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto mb-2">
                      {op.users.length > 0 ? (
                        op.users.map((u) => (
                          <button
                            key={u}
                            onClick={() => onSelectUser(u)}
                            className="px-1.5 py-0.5 text-[11px] bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 rounded cursor-pointer"
                          >
                            @{u}
                          </button>
                        ))
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Empty set (∅)</span>
                      )}
                    </div>
                    <button
                      onClick={() => onHighlightVenn(op.id)}
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Highlight in Venn</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* D. DIFFERENCE (RELATIVE COMPLEMENT) CARD WITH DROPDOWN */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                  \
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      Set Difference (Relative Complement: A \ B)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Finds users who belong to the first platform but strictly not the second platform.
                  </p>
                </div>
              </div>

              {/* Dropdown for selecting difference */}
              <div className="flex items-center gap-2">
                <label htmlFor="diff-select" className="text-xs font-semibold text-slate-700 shrink-0">
                  Select Operation:
                </label>
                <select
                  id="diff-select"
                  value={selectedDiffKey}
                  onChange={(e) => setSelectedDiffKey(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-slate-300 bg-white text-slate-800 shadow-xs focus:ring-2 focus:ring-amber-200 focus:border-amber-500 outline-none cursor-pointer"
                >
                  {differenceKeys.map((key) => (
                    <option key={key} value={key}>
                      {differences[key].name} ({differences[key].symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Difference Result Card */}
            {currentDiff && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {currentDiff.name}
                    </span>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      {currentDiff.symbol}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {currentDiff.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                      Count
                    </span>
                    <span className="text-2xl font-extrabold text-amber-700 font-mono">
                      {currentDiff.count}
                    </span>
                  </div>
                  <button
                    onClick={() => onHighlightVenn(currentDiff.id)}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Highlight</span>
                  </button>
                </div>
              </div>
            )}

            {/* Resulting users list */}
            {currentDiff && (
              <div className="pt-4">
                <span className="text-xs font-medium text-slate-500 block mb-2">
                  Users matching {currentDiff.symbol} ({currentDiff.users.length}):
                </span>
                {currentDiff.users.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {currentDiff.users.map((u) => (
                      <button
                        key={u}
                        onClick={() => onSelectUser(u)}
                        className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-amber-50 hover:text-amber-800 border border-slate-200 rounded-md transition-colors cursor-pointer"
                      >
                        @{u}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    Empty set (∅) - All users from the first platform also appear in the second.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

import { useState } from 'react';
import type { SetOperationResult } from '../types';
import { Table, Search } from 'lucide-react';

interface ResultTableProps {
  operations: SetOperationResult[];
  onSelectUser: (user: string) => void;
  onHighlightVenn?: (opId: string) => void;
}

export const ResultTable: React.FC<ResultTableProps> = ({
  operations,
  onSelectUser,
  onHighlightVenn,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'union' | 'intersection' | 'difference'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOps = operations.filter((op) => {
    const matchesCategory = filterCategory === 'all' || op.category === filterCategory;
    const matchesSearch =
      op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.users.some((u) => u.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="results-table" className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
              <Table className="w-3.5 h-3.5 text-indigo-600" />
              <span>Step 7: Comprehensive Mathematical Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Set Operations Result Table
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Detailed breakdown of all calculated set operations, formal mathematical symbols, result cardinalities, and elements.
            </p>
          </div>

          {/* Table Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter operations or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
              {(['all', 'union', 'intersection', 'difference'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`flex-1 sm:flex-none px-2.5 py-1 text-xs font-medium rounded-lg capitalize transition-colors cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-3.5 px-4 sm:px-6">Operation Name</th>
                  <th className="py-3.5 px-4">Mathematical Symbol</th>
                  <th className="py-3.5 px-4 text-center">Result Count</th>
                  <th className="py-3.5 px-4 sm:px-6">Users (Set Elements)</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {filteredOps.map((op) => (
                  <tr key={op.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900">
                      <div>
                        <span>{op.name}</span>
                        <span className="block text-[11px] text-slate-400 font-normal">
                          {op.category.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-700 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                        {op.symbol}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 font-mono font-bold text-slate-800 bg-slate-100 rounded-lg">
                        {op.count}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      {op.users.length > 0 ? (
                        <div className="flex flex-wrap gap-1 max-w-lg">
                          {op.users.map((u) => (
                            <button
                              key={u}
                              onClick={() => onSelectUser(u)}
                              className="px-2 py-0.5 text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 rounded text-slate-700 transition-colors cursor-pointer"
                              title="Inspect this user"
                            >
                              @{u}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic font-mono">Empty set (∅)</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {onHighlightVenn && (
                        <button
                          onClick={() => onHighlightVenn(op.id)}
                          type="button"
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                        >
                          View Venn
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

import { Search, CheckCircle2, XCircle, User } from 'lucide-react';
import type { UserPresence } from '../types';

interface UserSearchProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  userPresences: UserPresence[];
  allKnownUsers: string[];
}

export const UserSearch: React.FC<UserSearchProps> = ({
  searchQuery,
  onSearchChange,
  userPresences,
  allKnownUsers,
}) => {
  // Find matching users
  const matches = searchQuery.trim()
    ? userPresences.filter((p) =>
        p.username.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : [];

  return (
    <section id="inspector" className="py-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
            <User className="w-3.5 h-3.5 text-indigo-600" />
            <span>Step 8: Set Membership Inspector</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Search & Inspect User Presence
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Test whether an element belongs to sets A, B, or C (\(x \in A, x \in B, x \in C\)).
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
          {/* Search Input Box */}
          <div className="max-w-xl mb-6">
            <label htmlFor="user-search-input" className="block text-xs font-bold text-slate-700 mb-2">
              Search a username...
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="user-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="e.g. Rahul, Priya, Amit, Sneha..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Pills of all known users */}
            {allKnownUsers.length > 0 && (
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-slate-400">Quick select:</span>
                {allKnownUsers.slice(0, 10).map((u) => (
                  <button
                    key={u}
                    onClick={() => onSearchChange(u)}
                    type="button"
                    className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 transition-colors cursor-pointer"
                  >
                    @{u}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Result Display */}
          {searchQuery.trim() ? (
            matches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map((res) => (
                  <div
                    key={res.username}
                    className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/20 shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-indigo-100/60">
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Username:</span>
                        <h4 className="text-base font-bold text-slate-900">@{res.username}</h4>
                      </div>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                        Present on {res.count} of 3 platforms
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {/* Instagram */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100">
                        <span className="font-medium text-slate-700">Instagram</span>
                        {res.instagram ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-pink-600">
                            <CheckCircle2 className="w-4 h-4" /> Present (∈ A)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-400">
                            <XCircle className="w-4 h-4" /> Absent (∉ A)
                          </span>
                        )}
                      </div>

                      {/* Twitter */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100">
                        <span className="font-medium text-slate-700">Twitter / X</span>
                        {res.twitter ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-sky-600">
                            <CheckCircle2 className="w-4 h-4" /> Present (∈ B)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-400">
                            <XCircle className="w-4 h-4" /> Absent (∉ B)
                          </span>
                        )}
                      </div>

                      {/* Facebook */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100">
                        <span className="font-medium text-slate-700">Facebook</span>
                        {res.facebook ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
                            <CheckCircle2 className="w-4 h-4" /> Present (∈ C)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-400">
                            <XCircle className="w-4 h-4" /> Absent (∉ C)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                User &ldquo;<strong className="text-slate-800">{searchQuery}</strong>&rdquo; does not belong to any platform set (\(x \notin A \cup B \cup C\)).
              </div>
            )
          ) : (
            <div className="text-xs text-slate-400 italic">
              Type a username or click any user badge above to inspect cross-platform presence.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

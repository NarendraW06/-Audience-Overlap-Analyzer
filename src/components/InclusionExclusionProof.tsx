import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface InclusionExclusionProofProps {
  cardA: number; // Instagram
  cardB: number; // Twitter
  cardC: number; // Facebook
  cardAB: number; // I ∩ T
  cardAC: number; // I ∩ F
  cardBC: number; // T ∩ F
  cardABC: number; // I ∩ T ∩ F
  unionCardinality: number; // Actual |I ∪ T ∪ F|
}

export const InclusionExclusionProof: React.FC<InclusionExclusionProofProps> = ({
  cardA,
  cardB,
  cardC,
  cardAB,
  cardAC,
  cardBC,
  cardABC,
  unionCardinality,
}) => {
  // Step 1: Sum of singletons
  const sumSingletons = cardA + cardB + cardC;
  // Step 2: Sum of pairwise intersections
  const sumPairs = cardAB + cardAC + cardBC;
  // Step 3: Triple intersection
  const triple = cardABC;

  // Evaluated RHS: Sum(singletons) - Sum(pairs) + Triple
  const calculatedRHS = sumSingletons - sumPairs + triple;
  const isMatch = unionCardinality === calculatedRHS;

  return (
    <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-lg border border-indigo-800/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-800/80">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
            Mathematical Theorem Verification
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
            Principle of Inclusion-Exclusion (PIE)
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Identity Holds: {isMatch ? 'LHS = RHS (Verified)' : 'Evaluating...'}</span>
        </div>
      </div>

      {/* Formula Display */}
      <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-xs sm:text-sm text-indigo-200 overflow-x-auto text-center">
        |A ∪ B ∪ C| = (|A| + |B| + |C|) - (|A ∩ B| + |A ∩ C| + |B ∩ C|) + |A ∩ B ∩ C|
      </div>

      {/* Live Substitution Breakdown */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        {/* Step 1 */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-slate-400 block font-sans text-[11px] mb-1 font-semibold">
            1. Individual Cardinalities (+)
          </span>
          <div className="text-sm font-bold text-white">
            |A| + |B| + |C|
          </div>
          <div className="mt-1 text-indigo-300">
            {cardA} + {cardB} + {cardC} = <strong className="text-white text-base">{sumSingletons}</strong>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-slate-400 block font-sans text-[11px] mb-1 font-semibold">
            2. Subtract Overcounted Pairs (-)
          </span>
          <div className="text-sm font-bold text-white">
            -(|A ∩ B| + |A ∩ C| + |B ∩ C|)
          </div>
          <div className="mt-1 text-pink-300">
            -({cardAB} + {cardAC} + {cardBC}) = <strong className="text-white text-base">-{sumPairs}</strong>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-slate-400 block font-sans text-[11px] mb-1 font-semibold">
            3. Add Back Triple Center (+)
          </span>
          <div className="text-sm font-bold text-white">
            + |A ∩ B ∩ C|
          </div>
          <div className="mt-1 text-emerald-300">
            +{cardABC} = <strong className="text-white text-base">+{triple}</strong>
          </div>
        </div>
      </div>

      {/* Final Verification Line */}
      <div className="mt-5 pt-4 border-t border-indigo-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-mono">
          <span className="text-indigo-300">Calculated Universe:</span>
          <span className="text-white font-bold bg-white/10 px-2.5 py-1 rounded-md">
            {sumSingletons} - {sumPairs} + {triple} = {calculatedRHS}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-indigo-300">Direct Set Union |U|:</span>
          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            {unionCardinality} users
          </span>
        </div>
      </div>
    </div>
  );
};

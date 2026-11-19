import type { VennRegionId, VennRegionData, OverlapMetric } from '../types';

export const SAMPLE_DATA = {
  instagram: `Rahul
Amit
Priya
Neha
Karan`,
  twitter: `Amit
Priya
Karan
Rohit`,
  facebook: `Rahul
Priya
Rohit
Sneha`,
};

/**
 * Parses raw text input (supports newline and comma separated),
 * trims whitespace, ignores empty lines, and deduplicates case-insensitively
 * while preserving the original casing of the first appearance.
 */
export function parseUserList(raw: string): {
  items: string[];
  canonicalSet: Set<string>;
  displayMap: Map<string, string>;
} {
  const displayMap = new Map<string, string>();
  const canonicalSet = new Set<string>();

  // Split by newline or comma
  const rawEntries = raw.split(/[\n,]+/);

  for (const entry of rawEntries) {
    const cleaned = entry.trim();
    if (cleaned.length === 0) continue;

    const lower = cleaned.toLowerCase();
    if (!canonicalSet.has(lower)) {
      canonicalSet.add(lower);
      displayMap.set(lower, cleaned);
    }
  }

  // Preserve order of canonical elements converted to display names
  const items = Array.from(canonicalSet).map((key) => displayMap.get(key) || key);

  return { items, canonicalSet, displayMap };
}

/**
 * Standard Set Union: A ∪ B
 */
export function union<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>(setA);
  for (const elem of setB) {
    result.add(elem);
  }
  return result;
}

/**
 * Standard Set Intersection: A ∩ B
 */
export function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const elem of setA) {
    if (setB.has(elem)) {
      result.add(elem);
    }
  }
  return result;
}

/**
 * Standard Set Difference: A \ B (or A - B)
 */
export function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const elem of setA) {
    if (!setB.has(elem)) {
      result.add(elem);
    }
  }
  return result;
}

/**
 * Three-set Union: A ∪ B ∪ C
 */
export function unionThree<T>(setA: Set<T>, setB: Set<T>, setC: Set<T>): Set<T> {
  return union(union(setA, setB), setC);
}

/**
 * Three-set Intersection: A ∩ B ∩ C
 */
export function intersectionThree<T>(setA: Set<T>, setB: Set<T>, setC: Set<T>): Set<T> {
  return intersection(intersection(setA, setB), setC);
}

/**
 * Convert a set of lowercase keys back into display strings using the combined mapping
 */
export function setToDisplayList(
  keys: Set<string>,
  combinedMap: Map<string, string>
): string[] {
  return Array.from(keys)
    .map((key) => combinedMap.get(key) || key)
    .sort((a, b) => a.localeCompare(b));
}

/**
 * Calculates overlap percentage: (|A ∩ B| / |A|) * 100
 */
export function calculateOverlapPercentage(
  intersectionSize: number,
  baseSize: number
): number {
  if (baseSize === 0) return 0;
  return Number(((intersectionSize / baseSize) * 100).toFixed(1));
}

/**
 * Compute the 7 mutually disjoint regions of a 3-set Venn diagram
 */
export function calculateVennRegions(
  setA: Set<string>, // Instagram
  setB: Set<string>, // Twitter
  setC: Set<string>, // Facebook
  combinedMap: Map<string, string>
): Record<VennRegionId, VennRegionData> {
  // All three: A ∩ B ∩ C
  const allThree = intersectionThree(setA, setB, setC);

  // Pairwise intersections excluding third set
  const abOnly = difference(intersection(setA, setB), setC);
  const acOnly = difference(intersection(setA, setC), setB);
  const bcOnly = difference(intersection(setB, setC), setA);

  // Exclusive platform users (A \ (B ∪ C))
  const bOrC = union(setB, setC);
  const aOrC = union(setA, setC);
  const aOrB = union(setA, setB);

  const aOnly = difference(setA, bOrC);
  const bOnly = difference(setB, aOrC);
  const cOnly = difference(setC, aOrB);

  return {
    instagram_only: {
      id: 'instagram_only',
      label: 'Instagram Only',
      mathNotation: 'I \\ (T ∪ F)',
      users: setToDisplayList(aOnly, combinedMap),
      count: aOnly.size,
      color: '#ec4899', // Pink
      textColor: 'text-pink-600',
    },
    twitter_only: {
      id: 'twitter_only',
      label: 'Twitter/X Only',
      mathNotation: 'T \\ (I ∪ F)',
      users: setToDisplayList(bOnly, combinedMap),
      count: bOnly.size,
      color: '#0284c7', // Sky
      textColor: 'text-sky-600',
    },
    facebook_only: {
      id: 'facebook_only',
      label: 'Facebook Only',
      mathNotation: 'F \\ (I ∪ T)',
      users: setToDisplayList(cOnly, combinedMap),
      count: cOnly.size,
      color: '#2563eb', // Blue
      textColor: 'text-blue-600',
    },
    instagram_twitter_only: {
      id: 'instagram_twitter_only',
      label: 'Instagram & Twitter Only',
      mathNotation: '(I ∩ T) \\ F',
      users: setToDisplayList(abOnly, combinedMap),
      count: abOnly.size,
      color: '#8b5cf6', // Violet
      textColor: 'text-purple-600',
    },
    instagram_facebook_only: {
      id: 'instagram_facebook_only',
      label: 'Instagram & Facebook Only',
      mathNotation: '(I ∩ F) \\ T',
      users: setToDisplayList(acOnly, combinedMap),
      count: acOnly.size,
      color: '#d946ef', // Fuchsia
      textColor: 'text-fuchsia-600',
    },
    twitter_facebook_only: {
      id: 'twitter_facebook_only',
      label: 'Twitter & Facebook Only',
      mathNotation: '(T ∩ F) \\ I',
      users: setToDisplayList(bcOnly, combinedMap),
      count: bcOnly.size,
      color: '#06b6d4', // Cyan
      textColor: 'text-cyan-600',
    },
    all_three: {
      id: 'all_three',
      label: 'All Three Platforms',
      mathNotation: 'I ∩ T ∩ F',
      users: setToDisplayList(allThree, combinedMap),
      count: allThree.size,
      color: '#10b981', // Emerald
      textColor: 'text-emerald-600',
    },
  };
}

/**
 * Generate pairwise directed overlap metrics
 */
export function calculateAllOverlapMetrics(
  setI: Set<string>,
  setT: Set<string>,
  setF: Set<string>
): OverlapMetric[] {
  const iCapT = intersection(setI, setT).size;
  const iCapF = intersection(setI, setF).size;
  const tCapF = intersection(setT, setF).size;

  return [
    {
      fromPlatform: 'instagram',
      toPlatform: 'twitter',
      fromName: 'Instagram',
      toName: 'Twitter/X',
      intersectionCount: iCapT,
      baseCount: setI.size,
      percentage: calculateOverlapPercentage(iCapT, setI.size),
      formula: '|Instagram ∩ Twitter| / |Instagram| × 100',
      explanation: 'Percentage of Instagram audience that also uses Twitter/X',
    },
    {
      fromPlatform: 'twitter',
      toPlatform: 'instagram',
      fromName: 'Twitter/X',
      toName: 'Instagram',
      intersectionCount: iCapT,
      baseCount: setT.size,
      percentage: calculateOverlapPercentage(iCapT, setT.size),
      formula: '|Instagram ∩ Twitter| / |Twitter| × 100',
      explanation: 'Percentage of Twitter/X audience that also uses Instagram',
    },
    {
      fromPlatform: 'instagram',
      toPlatform: 'facebook',
      fromName: 'Instagram',
      toName: 'Facebook',
      intersectionCount: iCapF,
      baseCount: setI.size,
      percentage: calculateOverlapPercentage(iCapF, setI.size),
      formula: '|Instagram ∩ Facebook| / |Instagram| × 100',
      explanation: 'Percentage of Instagram audience that also uses Facebook',
    },
    {
      fromPlatform: 'facebook',
      toPlatform: 'instagram',
      fromName: 'Facebook',
      toName: 'Instagram',
      intersectionCount: iCapF,
      baseCount: setF.size,
      percentage: calculateOverlapPercentage(iCapF, setF.size),
      formula: '|Instagram ∩ Facebook| / |Facebook| × 100',
      explanation: 'Percentage of Facebook audience that also uses Instagram',
    },
    {
      fromPlatform: 'twitter',
      toPlatform: 'facebook',
      fromName: 'Twitter/X',
      toName: 'Facebook',
      intersectionCount: tCapF,
      baseCount: setT.size,
      percentage: calculateOverlapPercentage(tCapF, setT.size),
      formula: '|Twitter ∩ Facebook| / |Twitter| × 100',
      explanation: 'Percentage of Twitter/X audience that also uses Facebook',
    },
    {
      fromPlatform: 'facebook',
      toPlatform: 'twitter',
      fromName: 'Facebook',
      toName: 'Twitter/X',
      intersectionCount: tCapF,
      baseCount: setF.size,
      percentage: calculateOverlapPercentage(tCapF, setF.size),
      formula: '|Twitter ∩ Facebook| / |Facebook| × 100',
      explanation: 'Percentage of Facebook audience that also uses Twitter/X',
    },
  ];
}

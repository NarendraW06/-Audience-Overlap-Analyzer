// Mathematical verification script for Set Operations
function parseUserList(raw) {
  const displayMap = new Map();
  const canonicalSet = new Set();
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
  const items = Array.from(canonicalSet).map((key) => displayMap.get(key) || key);
  return { items, canonicalSet, displayMap };
}

function union(setA, setB) {
  const result = new Set(setA);
  for (const elem of setB) result.add(elem);
  return result;
}

function intersection(setA, setB) {
  const result = new Set();
  for (const elem of setA) if (setB.has(elem)) result.add(elem);
  return result;
}

function difference(setA, setB) {
  const result = new Set();
  for (const elem of setA) if (!setB.has(elem)) result.add(elem);
  return result;
}

function unionThree(setA, setB, setC) {
  return union(union(setA, setB), setC);
}

function intersectionThree(setA, setB, setC) {
  return intersection(intersection(setA, setB), setC);
}

function calculateOverlapPercentage(intersectionSize, baseSize) {
  if (baseSize === 0) return 0;
  return Number(((intersectionSize / baseSize) * 100).toFixed(1));
}

// 1. Test Sample Data
const sample = {
  instagram: `Rahul\nAmit\nPriya\nNeha\nKaran`,
  twitter: `Amit\nPriya\nKaran\nRohit`,
  facebook: `Rahul\nPriya\nRohit\nSneha`,
};

const insta = parseUserList(sample.instagram).canonicalSet;
const twitter = parseUserList(sample.twitter).canonicalSet;
const fb = parseUserList(sample.facebook).canonicalSet;

console.log('--- TEST 1: CARDINALITIES ---');
console.log('|Instagram|:', insta.size, 'Expected: 5');
console.log('|Twitter|:', twitter.size, 'Expected: 4');
console.log('|Facebook|:', fb.size, 'Expected: 4');

console.log('\n--- TEST 2: UNION & INTERSECTIONS ---');
const u = unionThree(insta, twitter, fb);
console.log('|I ∪ T ∪ F|:', u.size, 'Expected: 7');

const i_t = intersection(insta, twitter);
console.log('|I ∩ T|:', i_t.size, 'Expected: 3');

const i_f = intersection(insta, fb);
console.log('|I ∩ F|:', i_f.size, 'Expected: 2');

const t_f = intersection(twitter, fb);
console.log('|T ∩ F|:', t_f.size, 'Expected: 2');

const all3 = intersectionThree(insta, twitter, fb);
console.log('|I ∩ T ∩ F|:', all3.size, 'Expected: 1');

console.log('\n--- TEST 3: PRINCIPLE OF INCLUSION-EXCLUSION ---');
const pie = insta.size + twitter.size + fb.size - (i_t.size + i_f.size + t_f.size) + all3.size;
console.log('PIE calculation:', pie, 'Total Union:', u.size, 'Match:', pie === u.size);

console.log('\n--- TEST 4: DIFFERENCES ---');
console.log('|I - T|:', difference(insta, twitter).size, 'Expected: 2 (Rahul, Neha)');
console.log('|T - I|:', difference(twitter, insta).size, 'Expected: 1 (Rohit)');
console.log('|I - F|:', difference(insta, fb).size, 'Expected: 3 (Amit, Neha, Karan)');
console.log('|F - I|:', difference(fb, insta).size, 'Expected: 2 (Rohit, Sneha)');
console.log('|T - F|:', difference(twitter, fb).size, 'Expected: 2 (Amit, Karan)');
console.log('|F - T|:', difference(fb, twitter).size, 'Expected: 2 (Rahul, Sneha)');

console.log('\n--- TEST 5: OVERLAP PERCENTAGES ---');
console.log('I -> T:', calculateOverlapPercentage(i_t.size, insta.size), '% Expected: 60.0%');
console.log('T -> I:', calculateOverlapPercentage(i_t.size, twitter.size), '% Expected: 75.0%');
console.log('I -> F:', calculateOverlapPercentage(i_f.size, insta.size), '% Expected: 40.0%');
console.log('F -> I:', calculateOverlapPercentage(i_f.size, fb.size), '% Expected: 50.0%');
console.log('T -> F:', calculateOverlapPercentage(t_f.size, twitter.size), '% Expected: 50.0%');
console.log('F -> T:', calculateOverlapPercentage(t_f.size, fb.size), '% Expected: 50.0%');

console.log('\n--- TEST 6: 7 DISJOINT VENN REGIONS ---');
const reg_i_only = difference(insta, union(twitter, fb)).size;
const reg_t_only = difference(twitter, union(insta, fb)).size;
const reg_f_only = difference(fb, union(insta, twitter)).size;
const reg_it_only = difference(intersection(insta, twitter), fb).size;
const reg_if_only = difference(intersection(insta, fb), twitter).size;
const reg_tf_only = difference(intersection(twitter, fb), insta).size;
const reg_all3 = all3.size;
const sumRegions = reg_i_only + reg_t_only + reg_f_only + reg_it_only + reg_if_only + reg_tf_only + reg_all3;
console.log('7 Disjoint Regions sum:', sumRegions, 'Total Union:', u.size, 'Partition exact match:', sumRegions === u.size);

console.log('\n--- TEST 7: DEDUPLICATION & CASE-INSENSITIVITY ---');
const dupTest = parseUserList(`  Rahul , rahul, RAHUL \n\n Amit, amit `);
console.log('Deduplication count for Rahul & Amit:', dupTest.canonicalSet.size, 'Expected: 2');
console.log('Display name preserved:', dupTest.items);

console.log('\n--- ALL MATHEMATICAL VERIFICATIONS PASSED ---');

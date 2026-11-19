import React, { useState, useMemo } from 'react';
import {
  parseUserList,
  intersection,
  difference,
  unionThree,
  intersectionThree,
  setToDisplayList,
  calculateVennRegions,
  calculateAllOverlapMetrics,
} from './utils/setOperations';
import { SAMPLE_PRESETS } from './utils/samplePresets';
import type { PlatformId, SetOperationResult, UserPresence, SamplePreset } from './types';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AudienceInput } from './components/AudienceInput';
import { StatisticsCards } from './components/StatisticsCards';
import { VennDiagram } from './components/VennDiagram';
import { SetOperations } from './components/SetOperations';
import { OverlapPercentage } from './components/OverlapPercentage';
import { Charts } from './components/Charts';
import { ResultTable } from './components/ResultTable';
import { UserSearch } from './components/UserSearch';
import { InclusionExclusionProof } from './components/InclusionExclusionProof';
import { Concepts } from './components/Concepts';
import { Applications } from './components/Applications';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { SamplePresetModal } from './components/SamplePresetModal';

export const App: React.FC = () => {
  // 1. Raw Input States (prefilled with Default Academic Sample)
  const defaultPreset = SAMPLE_PRESETS[0];
  const [instagramRaw, setInstagramRaw] = useState<string>(defaultPreset.data.instagram);
  const [twitterRaw, setTwitterRaw] = useState<string>(defaultPreset.data.twitter);
  const [facebookRaw, setFacebookRaw] = useState<string>(defaultPreset.data.facebook);
  const [activePresetId, setActivePresetId] = useState<string | null>(defaultPreset.id);

  // 2. Preset Modal state
  const [isPresetModalOpen, setIsPresetModalOpen] = useState<boolean>(false);

  // 3. Interactive Selection States
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 4. Parsed Data (Case-Insensitive Sets, Deduplicated, Preserving Display Format)
  const parsedInsta = useMemo(() => parseUserList(instagramRaw), [instagramRaw]);
  const parsedTwitter = useMemo(() => parseUserList(twitterRaw), [twitterRaw]);
  const parsedFb = useMemo(() => parseUserList(facebookRaw), [facebookRaw]);

  // Combined display map for canonical casing
  const combinedDisplayMap = useMemo(() => {
    const map = new Map<string, string>();
    parsedInsta.displayMap.forEach((val, key) => map.set(key, val));
    parsedTwitter.displayMap.forEach((val, key) => map.set(key, val));
    parsedFb.displayMap.forEach((val, key) => map.set(key, val));
    return map;
  }, [parsedInsta, parsedTwitter, parsedFb]);

  const setI = parsedInsta.canonicalSet;
  const setT = parsedTwitter.canonicalSet;
  const setF = parsedFb.canonicalSet;

  // 5. Fundamental Mathematical Set Operations
  // A. Union
  const unionSet = useMemo(() => unionThree(setI, setT, setF), [setI, setT, setF]);
  const unionUsers = useMemo(
    () => setToDisplayList(unionSet, combinedDisplayMap),
    [unionSet, combinedDisplayMap]
  );

  // B. Pairwise Intersections
  const iCapT = useMemo(() => intersection(setI, setT), [setI, setT]);
  const iCapF = useMemo(() => intersection(setI, setF), [setI, setF]);
  const tCapF = useMemo(() => intersection(setT, setF), [setT, setF]);

  // C. Three-Way Intersection
  const iCapTCapF = useMemo(() => intersectionThree(setI, setT, setF), [setI, setT, setF]);

  // D. Relative Complements (Differences)
  const diffInstaTwitter = useMemo(() => difference(setI, setT), [setI, setT]);
  const diffInstaFb = useMemo(() => difference(setI, setF), [setI, setF]);
  const diffTwitterInsta = useMemo(() => difference(setT, setI), [setT, setI]);
  const diffTwitterFb = useMemo(() => difference(setT, setF), [setT, setF]);
  const diffFbInsta = useMemo(() => difference(setF, setI), [setF, setI]);
  const diffFbTwitter = useMemo(() => difference(setF, setT), [setF, setT]);

  // 6. Packaged Operation Results
  const unionAllOp: SetOperationResult = useMemo(
    () => ({
      id: 'op_union_all',
      name: 'Total Unified Audience',
      symbol: 'Instagram ∪ Twitter ∪ Facebook',
      formula: 'A ∪ B ∪ C',
      description: 'Combines all unique users across all three platforms without duplication.',
      users: unionUsers,
      count: unionSet.size,
      category: 'union',
    }),
    [unionUsers, unionSet.size]
  );

  const pairwiseIntersections: SetOperationResult[] = useMemo(
    () => [
      {
        id: 'op_insta_twitter_inter',
        name: 'Instagram ∩ Twitter/X',
        symbol: 'Instagram ∩ Twitter',
        formula: 'A ∩ B',
        description: 'Users who follow or engage on both Instagram and Twitter/X.',
        users: setToDisplayList(iCapT, combinedDisplayMap),
        count: iCapT.size,
        category: 'intersection',
      },
      {
        id: 'op_insta_fb_inter',
        name: 'Instagram ∩ Facebook',
        symbol: 'Instagram ∩ Facebook',
        formula: 'A ∩ C',
        description: 'Users present simultaneously on Instagram and Facebook.',
        users: setToDisplayList(iCapF, combinedDisplayMap),
        count: iCapF.size,
        category: 'intersection',
      },
      {
        id: 'op_twitter_fb_inter',
        name: 'Twitter/X ∩ Facebook',
        symbol: 'Twitter ∩ Facebook',
        formula: 'B ∩ C',
        description: 'Users active across both Twitter/X and Facebook networks.',
        users: setToDisplayList(tCapF, combinedDisplayMap),
        count: tCapF.size,
        category: 'intersection',
      },
    ],
    [iCapT, iCapF, tCapF, combinedDisplayMap]
  );

  const tripleIntersection: SetOperationResult = useMemo(
    () => ({
      id: 'op_all_three',
      name: 'All Three Platforms',
      symbol: 'Instagram ∩ Twitter ∩ Facebook',
      formula: 'A ∩ B ∩ C',
      description: 'The core audience segment present across all three networks simultaneously.',
      users: setToDisplayList(iCapTCapF, combinedDisplayMap),
      count: iCapTCapF.size,
      category: 'intersection',
    }),
    [iCapTCapF, combinedDisplayMap]
  );

  const differences: Record<string, SetOperationResult> = useMemo(
    () => ({
      diff_insta_minus_twitter: {
        id: 'diff_insta_minus_twitter',
        name: 'Instagram \\ Twitter',
        symbol: 'Instagram - Twitter',
        formula: 'A \\ B',
        description: 'Users on Instagram who do NOT participate on Twitter/X.',
        users: setToDisplayList(diffInstaTwitter, combinedDisplayMap),
        count: diffInstaTwitter.size,
        category: 'difference',
      },
      diff_twitter_minus_insta: {
        id: 'diff_twitter_minus_insta',
        name: 'Twitter \\ Instagram',
        symbol: 'Twitter - Instagram',
        formula: 'B \\ A',
        description: 'Users on Twitter/X who are absent from Instagram.',
        users: setToDisplayList(diffTwitterInsta, combinedDisplayMap),
        count: diffTwitterInsta.size,
        category: 'difference',
      },
      diff_insta_minus_fb: {
        id: 'diff_insta_minus_fb',
        name: 'Instagram \\ Facebook',
        symbol: 'Instagram - Facebook',
        formula: 'A \\ C',
        description: 'Users on Instagram who do not use Facebook.',
        users: setToDisplayList(diffInstaFb, combinedDisplayMap),
        count: diffInstaFb.size,
        category: 'difference',
      },
      diff_fb_minus_insta: {
        id: 'diff_fb_minus_insta',
        name: 'Facebook \\ Instagram',
        symbol: 'Facebook - Instagram',
        formula: 'C \\ A',
        description: 'Users on Facebook who do not have an Instagram profile.',
        users: setToDisplayList(diffFbInsta, combinedDisplayMap),
        count: diffFbInsta.size,
        category: 'difference',
      },
      diff_twitter_minus_fb: {
        id: 'diff_twitter_minus_fb',
        name: 'Twitter \\ Facebook',
        symbol: 'Twitter - Facebook',
        formula: 'B \\ C',
        description: 'Users on Twitter/X who do not participate on Facebook.',
        users: setToDisplayList(diffTwitterFb, combinedDisplayMap),
        count: diffTwitterFb.size,
        category: 'difference',
      },
      diff_fb_minus_twitter: {
        id: 'diff_fb_minus_twitter',
        name: 'Facebook \\ Twitter',
        symbol: 'Facebook - Twitter',
        formula: 'C \\ B',
        description: 'Users on Facebook who do not have a Twitter/X account.',
        users: setToDisplayList(diffFbTwitter, combinedDisplayMap),
        count: diffFbTwitter.size,
        category: 'difference',
      },
    }),
    [
      diffInstaTwitter,
      diffTwitterInsta,
      diffInstaFb,
      diffFbInsta,
      diffTwitterFb,
      diffFbTwitter,
      combinedDisplayMap,
    ]
  );

  // All operations flat array for Result Table
  const allOperationsList: SetOperationResult[] = useMemo(() => {
    return [
      unionAllOp,
      ...pairwiseIntersections,
      tripleIntersection,
      ...Object.values(differences),
    ];
  }, [unionAllOp, pairwiseIntersections, tripleIntersection, differences]);

  // 7. Venn 7 Disjoint Regions
  const vennRegions = useMemo(
    () => calculateVennRegions(setI, setT, setF, combinedDisplayMap),
    [setI, setT, setF, combinedDisplayMap]
  );

  // 8. Overlap Percentage Metrics
  const overlapMetrics = useMemo(
    () => calculateAllOverlapMetrics(setI, setT, setF),
    [setI, setT, setF]
  );

  // 9. User Presences for Search / Inspector
  const userPresences: UserPresence[] = useMemo(() => {
    return unionUsers.map((username) => {
      const lower = username.toLowerCase();
      const inInsta = setI.has(lower);
      const inTwitter = setT.has(lower);
      const inFb = setF.has(lower);
      const count = (inInsta ? 1 : 0) + (inTwitter ? 1 : 0) + (inFb ? 1 : 0);

      return {
        username,
        instagram: inInsta,
        twitter: inTwitter,
        facebook: inFb,
        count,
      };
    });
  }, [unionUsers, setI, setT, setF]);

  // User Actions
  const handleResetAll = () => {
    setInstagramRaw('');
    setTwitterRaw('');
    setFacebookRaw('');
    setActivePresetId(null);
    setSelectedRegionId(null);
    setSearchQuery('');
  };

  const handleLoadPreset = (preset: SamplePreset) => {
    setInstagramRaw(preset.data.instagram);
    setTwitterRaw(preset.data.twitter);
    setFacebookRaw(preset.data.facebook);
    setActivePresetId(preset.id);
    setSelectedRegionId(null);
    setSearchQuery('');
  };

  const handleInstagramChange = (val: string) => {
    setInstagramRaw(val);
    setActivePresetId(null);
  };

  const handleTwitterChange = (val: string) => {
    setTwitterRaw(val);
    setActivePresetId(null);
  };

  const handleFacebookChange = (val: string) => {
    setFacebookRaw(val);
    setActivePresetId(null);
  };

  const handleClearPlatform = (platform: PlatformId) => {
    setActivePresetId(null);
    if (platform === 'instagram') setInstagramRaw('');
    if (platform === 'twitter') setTwitterRaw('');
    if (platform === 'facebook') setFacebookRaw('');
  };

  const handleHighlightVenn = (id: string) => {
    setSelectedRegionId(id);
    const elem = document.querySelector('#visualization');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectUser = (user: string) => {
    setSearchQuery(user);
    const elem = document.querySelector('#inspector');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartAnalyzing = () => {
    const elem = document.querySelector('#analyzer');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* 1. Navigation Header */}
      <Header
        onReset={handleResetAll}
        onOpenPresetModal={() => setIsPresetModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onStartAnalyzing={handleStartAnalyzing}
          onOpenPresetModal={() => setIsPresetModalOpen(true)}
          counts={{
            instagram: setI.size,
            twitter: setT.size,
            facebook: setF.size,
            totalUnique: unionSet.size,
            allThree: iCapTCapF.size,
          }}
        />

        {/* 3. Audience Input Cards with Preset Selectors */}
        <AudienceInput
          instagramRaw={instagramRaw}
          twitterRaw={twitterRaw}
          facebookRaw={facebookRaw}
          onInstagramChange={handleInstagramChange}
          onTwitterChange={handleTwitterChange}
          onFacebookChange={handleFacebookChange}
          onClearPlatform={handleClearPlatform}
          onClearAll={handleResetAll}
          onLoadPreset={handleLoadPreset}
          onOpenPresetModal={() => setIsPresetModalOpen(true)}
          activePresetId={activePresetId}
          parsedCounts={{
            instagram: setI.size,
            twitter: setT.size,
            facebook: setF.size,
          }}
          parsedUsers={{
            instagram: parsedInsta.items,
            twitter: parsedTwitter.items,
            facebook: parsedFb.items,
          }}
        />

        {/* 4. Statistics Dashboard Cards */}
        <StatisticsCards
          counts={{
            instagram: setI.size,
            twitter: setT.size,
            facebook: setF.size,
            totalUnique: unionSet.size,
            allThree: iCapTCapF.size,
          }}
        />

        {/* 5. Set Operations & Difference Dropdown */}
        <SetOperations
          unionAll={unionAllOp}
          pairwiseIntersections={pairwiseIntersections}
          tripleIntersection={tripleIntersection}
          differences={differences}
          onHighlightVenn={handleHighlightVenn}
          onSelectUser={handleSelectUser}
        />

        {/* 6. Interactive Venn Diagram Visualization */}
        <VennDiagram
          regions={vennRegions}
          selectedRegionId={selectedRegionId}
          onSelectRegion={setSelectedRegionId}
          onSelectUser={handleSelectUser}
        />

        {/* Inclusion-Exclusion Theorem Proof Demonstration */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InclusionExclusionProof
            cardA={setI.size}
            cardB={setT.size}
            cardC={setF.size}
            cardAB={iCapT.size}
            cardAC={iCapF.size}
            cardBC={tCapF.size}
            cardABC={iCapTCapF.size}
            unionCardinality={unionSet.size}
          />
        </div>

        {/* 7. Overlap Percentage Section */}
        <OverlapPercentage metrics={overlapMetrics} />

        {/* 8. Recharts Analytics */}
        <Charts
          platformSizes={{
            instagram: setI.size,
            twitter: setT.size,
            facebook: setF.size,
          }}
          overlapSizes={{
            instaTwitter: iCapT.size,
            instaFb: iCapF.size,
            twitterFb: tCapF.size,
            allThree: iCapTCapF.size,
          }}
        />

        {/* 9. Result Table */}
        <ResultTable
          operations={allOperationsList}
          onSelectUser={handleSelectUser}
          onHighlightVenn={handleHighlightVenn}
        />

        {/* 10. User Membership Inspector (Search) */}
        <UserSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          userPresences={userPresences}
          allKnownUsers={unionUsers}
        />

        {/* 11. Set Theory Educational Concepts */}
        <Concepts />

        {/* 12. Real-World Applications */}
        <Applications />

        {/* 13. Problem Statement & About Mini-Project */}
        <About />
      </main>

      {/* 14. Academic Footer */}
      <Footer />

      {/* 15. Sample Preset Selection Modal */}
      <SamplePresetModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onSelectPreset={handleLoadPreset}
        currentPresetId={activePresetId || undefined}
      />
    </div>
  );
};

export default App;

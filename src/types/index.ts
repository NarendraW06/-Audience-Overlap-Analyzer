export type PlatformId = 'instagram' | 'twitter' | 'facebook';

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  shortName: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  lightBg: string;
  textColor: string;
  iconName: string;
}

export interface SetOperationResult {
  id: string;
  name: string;
  symbol: string;
  description: string;
  formula: string;
  users: string[];
  count: number;
  category: 'union' | 'intersection' | 'difference';
  highlightRegions?: VennRegionId[];
}

export type VennRegionId = 
  | 'instagram_only'
  | 'twitter_only'
  | 'facebook_only'
  | 'instagram_twitter_only'
  | 'instagram_facebook_only'
  | 'twitter_facebook_only'
  | 'all_three';

export interface VennRegionData {
  id: VennRegionId;
  label: string;
  mathNotation: string;
  users: string[];
  count: number;
  color: string;
  textColor: string;
}

export interface OverlapMetric {
  fromPlatform: PlatformId;
  toPlatform: PlatformId;
  fromName: string;
  toName: string;
  intersectionCount: number;
  baseCount: number;
  percentage: number;
  formula: string;
  explanation: string;
}

export interface UserPresence {
  username: string;
  instagram: boolean;
  twitter: boolean;
  facebook: boolean;
  count: number;
}

export interface SamplePreset {
  id: string;
  title: string;
  badge: string;
  description: string;
  data: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
}

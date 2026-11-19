import type { SamplePreset } from '../types';

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'academic_standard',
    title: 'Standard Academic Benchmark',
    badge: 'College Default',
    description: 'The standard Discrete Mathematics viva dataset with 7 unique users, balanced intersections, and hand-verifiable results.',
    data: {
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
    },
  },
  {
    id: 'tech_developers',
    title: 'Tech & Open-Source Community',
    badge: 'Developer Overlap',
    description: 'High intersection between Twitter/X and Instagram developers with cloud specialists active on Facebook groups.',
    data: {
      instagram: `alex_coder
dev_sarah
tech_ninja
code_artisan
emily_ux
cloud_dan
neo_matrix`,
      twitter: `alex_coder
dev_sarah
tech_ninja
rust_guru
kernel_dan
open_source_bob
neo_matrix`,
      facebook: `cloud_dan
dev_sarah
legacy_joe
family_bob
tech_events_admin
open_source_bob`,
    },
  },
  {
    id: 'ecommerce_fashion',
    title: 'Fashion & E-Commerce Campaign',
    badge: 'Marketing Use Case',
    description: 'Heavy visual focus on Instagram and community deals on Facebook, with influencers bridging both.',
    data: {
      instagram: `zara_daily
vogue_maya
style_rohit
chic_tanya
aesthetic_kavya
trend_setter_sam
luxe_arjun`,
      twitter: `style_rohit
tech_deals_hub
trend_setter_sam
fashion_critic_leo
zara_daily`,
      facebook: `vogue_maya
chic_tanya
boutique_mom
retro_deals
style_rohit
family_shopper`,
    },
  },
  {
    id: 'campus_council',
    title: 'University Campus Council',
    badge: 'High Triple Overlap',
    description: 'Active student leaders present simultaneously across all three platforms, plus platform-exclusive student factions.',
    data: {
      instagram: `ananya
rishi
vikram
tanvi
kabir
zoya
aayush
simran`,
      twitter: `vikram
tanvi
kabir
dev
meera
rohan
ananya`,
      facebook: `ananya
vikram
kabir
rohan
shalini
deepak
priyanka`,
    },
  },
  {
    id: 'subset_containment',
    title: 'Proper Subset Containment (B ⊂ A)',
    badge: '100% Subset Overlap',
    description: 'All Twitter users also belong to Instagram, demonstrating B \\ A = ∅ and 100.0% directional overlap ratio.',
    data: {
      instagram: `Alice
Bob
Charlie
David
Emma
Frank`,
      twitter: `Alice
Bob
Charlie`,
      facebook: `Bob
Charlie
David
George`,
    },
  },
  {
    id: 'disjoint_edge_case',
    title: 'Disjoint Sets (Zero Overlap Edge Case)',
    badge: '∅ Empty Intersection',
    description: 'Completely separated user bases illustrating pairwise disjoint sets with empty intersections (A ∩ B ∩ C = ∅).',
    data: {
      instagram: `ig_creator_alpha
ig_creator_beta
ig_creator_gamma`,
      twitter: `tw_journalist_one
tw_journalist_two
tw_journalist_three`,
      facebook: `fb_local_member_a
fb_local_member_b
fb_local_member_c`,
    },
  },
];

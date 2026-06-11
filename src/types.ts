export interface FeatureItem {
  id: string;
  iconName: string; // Lucide icon identifier
  title: string;
  description: string;
  badge?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
}

export interface ComparisonBrowser {
  name: string;
  isSway: boolean;
  speedIndex: number; // lower is better or higher is better (we'll define it as Speed multiplier, e.g. 3.2x)
  adBlocker: boolean | string;
  trackerShield: boolean;
  memoryUsage: string; // e.g. "120MB" vs "480MB"
  fingerprintProtection: boolean;
  openSource: boolean;
}

export interface SimulatorSite {
  id: string;
  name: string;
  url: string;
  originalTime: number; // seconds
  swayTime: number; // seconds
  originalTrackers: number;
  swayTrackers: number;
  originalAdsCount: number;
  swayAdsCount: number;
  contentHtml: string;
}

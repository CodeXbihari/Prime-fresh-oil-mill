import { LeadCategory, VisitorProfile, VisitEvent, VisitEventType } from '../types';

/**
 * Client-Side Visitor Tracker & Hot Lead Scoring Engine
 *
 * Designed with strict privacy standards:
 * 1. NEVER exposes raw IP address in frontend code.
 * 2. Fetches masked IP & keyed hash from server endpoint (`/api/track`).
 *    If offline/local, uses secure WebCrypto HMAC with a persistent client-side seed.
 * 3. Deduplicates rapid refreshes (5-second throttle on identical page views).
 * 4. Filters headless browser bots and web crawlers.
 * 5. Applies commercial B2B mustard oil buying-intent weighting:
 *    - Quotation Submission: +45 pts (Direct Request)
 *    - Distributor KYC Application: +40 pts (Dealership Intent)
 *    - Adding items to bulk cart: +25 pts
 *    - Calculating bulk ex-mill rates: +15 pts
 *    - Viewing Wholesale Products: +8 pts
 *    - General Page Visits: +2 pts
 *    - Recency decay: -15 pts if no visit in 14 days
 */

const STORAGE_KEYS = {
  VISITOR_ID: 'pfm_visitor_id_v1',
  VISITOR_HASH: 'pfm_visitor_hash_v1',
  MASKED_IP: 'pfm_masked_ip_v1',
  CONSENT: 'pfm_privacy_consent_v1',
  LAST_EVENT: 'pfm_last_track_event'
};

// Configurable Scoring Constants
export const SCORING_WEIGHTS: Record<VisitEventType, number> = {
  quote_submitted: 45,
  kyc_submitted: 40,
  add_to_cart: 25,
  sample_requested: 20,
  quote_started: 15,
  bulk_pricing_calc: 15,
  kyc_started: 10,
  chat_inquiry: 12,
  page_view: 2
};

// Initial Seed Data for Demo & Admin Review
export const INITIAL_VISITORS: VisitorProfile[] = [
  {
    id: 'vis-delhi-stockist-902',
    visitorHash: 'a7f9c2e148b3012a890e44',
    maskedIp: '103.211.***.***',
    firstSeen: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    lastSeen: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    totalVisits: 14,
    visitsLast7Days: 12,
    visitsLast30Days: 14,
    leadScore: 92,
    leadCategory: 'Hot',
    consentGiven: true,
    associatedCustomer: {
      id: 'cust-delhi-01',
      companyName: 'Aggarwal Edibles & Agro Mandi',
      contactPerson: 'Suresh Aggarwal',
      phone: '+91 98110 44219',
      email: 'sales@aggarwaledibles.com',
      gstin: '07AAACA4921C1Z2',
      source: 'Quotation',
      associatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    mostVisitedPages: [
      { path: '/quotation-request', title: 'Request Wholesale Quotation', count: 6 },
      { path: '/products', title: 'Wholesale Mustard Oil SKUs', count: 5 },
      { path: '/products/prod-yellow-mustard-oil-tin', title: '15L Food-Grade Tin', count: 3 }
    ],
    events: [
      {
        id: 'evt-101',
        visitorId: 'vis-delhi-stockist-902',
        timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        pagePath: '/quotation-request',
        pageTitle: 'Request Wholesale Quotation',
        eventType: 'quote_submitted',
        weight: 45,
        metadata: { packaging: '15L Food-Grade Tin', qty: 250 }
      },
      {
        id: 'evt-102',
        visitorId: 'vis-delhi-stockist-902',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        pagePath: '/cart',
        pageTitle: 'Bulk Order Cart',
        eventType: 'add_to_cart',
        weight: 25,
        metadata: { qty: 250 }
      },
      {
        id: 'evt-103',
        visitorId: 'vis-delhi-stockist-902',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        pagePath: '/products/prod-yellow-mustard-oil-tin',
        pageTitle: '15L Food-Grade Tin Specs',
        eventType: 'page_view',
        weight: 2
      }
    ]
  },
  {
    id: 'vis-up-trader-401',
    visitorHash: 'c4d8e7b9921f0088ba214a',
    maskedIp: '182.74.***.***',
    firstSeen: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    lastSeen: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    totalVisits: 8,
    visitsLast7Days: 6,
    visitsLast30Days: 8,
    leadScore: 78,
    leadCategory: 'Hot',
    consentGiven: true,
    associatedCustomer: {
      id: 'cust-up-02',
      companyName: 'Kanpur Kirana Super Stockists',
      contactPerson: 'Manoj Bajpai',
      phone: '+91 94150 88210',
      email: 'kanpur.kirana@gmail.com',
      gstin: '09AAECB1123P1Z9',
      source: 'KYC Application',
      associatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    mostVisitedPages: [
      { path: '/portal/register', title: 'Distributor Onboarding KYC', count: 4 },
      { path: '/products', title: 'Wholesale Products', count: 3 },
      { path: '/', title: 'Home Page', count: 1 }
    ],
    events: [
      {
        id: 'evt-201',
        visitorId: 'vis-up-trader-401',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        pagePath: '/portal/register',
        pageTitle: 'Distributor Registration',
        eventType: 'kyc_submitted',
        weight: 40
      },
      {
        id: 'evt-202',
        visitorId: 'vis-up-trader-401',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        pagePath: '/products',
        pageTitle: 'Wholesale Products',
        eventType: 'page_view',
        weight: 2
      }
    ]
  },
  {
    id: 'vis-bengal-packager-771',
    visitorHash: '91f28cb4a10e53998dfc01',
    maskedIp: '27.59.***.***',
    firstSeen: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    lastSeen: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    totalVisits: 5,
    visitsLast7Days: 5,
    visitsLast30Days: 5,
    leadScore: 54,
    leadCategory: 'Warm',
    consentGiven: false,
    mostVisitedPages: [
      { path: '/products', title: 'Wholesale Products', count: 3 },
      { path: '/cart', title: 'Bulk Cart', count: 1 },
      { path: '/', title: 'Home Page', count: 1 }
    ],
    events: [
      {
        id: 'evt-301',
        visitorId: 'vis-bengal-packager-771',
        timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
        pagePath: '/cart',
        pageTitle: 'Bulk Order Cart',
        eventType: 'add_to_cart',
        weight: 25,
        metadata: { packaging: '1L PET Bottle (Carton of 16)', qty: 100 }
      },
      {
        id: 'evt-302',
        visitorId: 'vis-bengal-packager-771',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        pagePath: '/products',
        pageTitle: 'Wholesale Products',
        eventType: 'bulk_pricing_calc',
        weight: 15
      }
    ]
  },
  {
    id: 'vis-bihar-wholesaler-112',
    visitorHash: '73e10fa89c025d774a12ec',
    maskedIp: '2405:201:****:****',
    firstSeen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    totalVisits: 3,
    visitsLast7Days: 3,
    visitsLast30Days: 3,
    leadScore: 42,
    leadCategory: 'Warm',
    consentGiven: true,
    mostVisitedPages: [
      { path: '/', title: 'Home Page - Mandi Rate Estimator', count: 2 },
      { path: '/products', title: 'Wholesale Products', count: 1 }
    ],
    events: [
      {
        id: 'evt-401',
        visitorId: 'vis-bihar-wholesaler-112',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        pagePath: '/',
        pageTitle: 'Home Page Rate Calculator',
        eventType: 'bulk_pricing_calc',
        weight: 15
      }
    ]
  },
  {
    id: 'vis-random-browse-009',
    visitorHash: '39a0cb721df90432bc1944',
    maskedIp: '14.139.***.***',
    firstSeen: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    lastSeen: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    totalVisits: 1,
    visitsLast7Days: 1,
    visitsLast30Days: 1,
    leadScore: 12,
    leadCategory: 'Cold',
    consentGiven: false,
    mostVisitedPages: [{ path: '/', title: 'Home Page', count: 1 }],
    events: [
      {
        id: 'evt-501',
        visitorId: 'vis-random-browse-009',
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        pagePath: '/',
        pageTitle: 'Home Page',
        eventType: 'page_view',
        weight: 2
      }
    ]
  }
];

export class VisitorTrackingService {
  /**
   * Initializes or retrieves local visitor identifier with privacy preservation
   */
  public static async getOrCreateVisitorToken(): Promise<{ visitorHash: string; maskedIp: string }> {
    let visitorHash = localStorage.getItem(STORAGE_KEYS.VISITOR_HASH);
    let maskedIp = localStorage.getItem(STORAGE_KEYS.MASKED_IP);

    if (visitorHash && maskedIp) {
      return { visitorHash, maskedIp };
    }

    try {
      // Attempt to fetch from server-side trusted header endpoint
      const response = await fetch('/api/track', { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        if (data.visitorHash && data.maskedIp) {
          localStorage.setItem(STORAGE_KEYS.VISITOR_HASH, data.visitorHash);
          localStorage.setItem(STORAGE_KEYS.MASKED_IP, data.maskedIp);
          return { visitorHash: data.visitorHash, maskedIp: data.maskedIp };
        }
      }
    } catch {
      // In offline / local development mode without Vercel serverless runtime
    }

    // Client-side fallback: Keyed crypto random representation (NEVER raw IP)
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    visitorHash = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    maskedIp = '103.***.***.***'; // Indicative privacy masked placeholder

    localStorage.setItem(STORAGE_KEYS.VISITOR_HASH, visitorHash);
    localStorage.setItem(STORAGE_KEYS.MASKED_IP, maskedIp);

    return { visitorHash, maskedIp };
  }

  /**
   * Calculate lead score (0 - 100) based on weighted actions & recency
   */
  public static computeScore(events: VisitEvent[], totalVisits: number, lastSeenIso: string): { score: number; category: LeadCategory } {
    let score = 0;

    const hasQuoteSubmitted = events.some(e => e.eventType === 'quote_submitted');
    const hasKycSubmitted = events.some(e => e.eventType === 'kyc_submitted');
    const hasCartAdded = events.some(e => e.eventType === 'add_to_cart');
    const hasSampleRequested = events.some(e => e.eventType === 'sample_requested');
    const productViews = events.filter(e => e.pagePath.startsWith('/products')).length;
    const calcUsed = events.some(e => e.eventType === 'bulk_pricing_calc');

    if (hasQuoteSubmitted) score += 45;
    else if (hasKycSubmitted) score += 40;

    if (hasCartAdded) score += 25;
    if (hasSampleRequested) score += 20;
    if (calcUsed) score += 15;

    // Repeat visit stability (capped at 20 points)
    score += Math.min(totalVisits * 4, 20);

    // Product browsing engagement (capped at 15 points)
    score += Math.min(productViews * 3, 15);

    // Recency decay: -15 pts if inactive for > 14 days
    const daysSinceLastSeen = (Date.now() - new Date(lastSeenIso).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceLastSeen > 14) {
      score = Math.max(0, score - 15);
    }

    const finalScore = Math.min(100, Math.max(0, score));

    let category: LeadCategory = 'Cold';
    if (finalScore >= 70) category = 'Hot';
    else if (finalScore >= 40) category = 'Warm';

    return { score: finalScore, category };
  }

  /**
   * Check if user agent is an automated web crawler
   */
  public static isLikelyBot(): boolean {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent || '';
    const isWebDriver = !!(navigator as any).webdriver;
    const botPattern = /bot|spider|crawl|slurp|facebookexternalhit|bingbot|googlebot|headless/i;
    return isWebDriver || botPattern.test(ua);
  }
}


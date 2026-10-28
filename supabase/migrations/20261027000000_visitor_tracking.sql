-- ==============================================================================
-- Prime Fresh Oil Mills: Visitor Analytics & Hot Lead Tracking Schema
-- ==============================================================================

-- 1. Create table for Privacy-Preserving Visitors
CREATE TABLE IF NOT EXISTS visitor_identities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_hash VARCHAR(64) UNIQUE NOT NULL, -- Keyed HMAC-SHA256 of IP
  masked_ip VARCHAR(45) NOT NULL,           -- e.g. "192.168.***.***" or "2001:db8:****::"
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  total_visits INT NOT NULL DEFAULT 1,
  lead_score INT NOT NULL DEFAULT 10,
  lead_category VARCHAR(10) NOT NULL DEFAULT 'Cold', -- 'Hot', 'Warm', 'Cold'
  
  -- Associated customer if legitimate identification occurs (login, quotation, KYC submission)
  associated_customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  associated_company_name TEXT,
  associated_contact_person TEXT,
  associated_phone TEXT,
  consent_given BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on visitor_hash for fast lookups
CREATE INDEX IF NOT EXISTS idx_visitor_hash ON visitor_identities(visitor_hash);
CREATE INDEX IF NOT EXISTS idx_visitor_lead_category ON visitor_identities(lead_category);
CREATE INDEX IF NOT EXISTS idx_visitor_last_seen ON visitor_identities(last_seen_at DESC);

-- 2. Create table for Page & Action Visit Events
CREATE TABLE IF NOT EXISTS visit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID NOT NULL REFERENCES visitor_identities(id) ON DELETE CASCADE,
  page_path TEXT NOT NULL,                  -- e.g. "/products", "/quotation-request"
  page_title TEXT NOT NULL,
  event_type VARCHAR(32) NOT NULL DEFAULT 'page_view', -- 'page_view', 'add_to_cart', 'quote_started', 'quote_submitted', 'kyc_submitted'
  weight INT NOT NULL DEFAULT 5,            -- Score weight contributed by this action
  metadata JSONB,                           -- e.g. { productId: "prod-1", sku: "15L Tin", qty: 50 }
  is_bot BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visit_events_visitor_id ON visit_events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visit_events_created_at ON visit_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visit_events_page_path ON visit_events(page_path);

-- 3. Row Level Security (RLS) Configuration
-- Only authenticated Mill Owners & Admins can read visitor analytics
ALTER TABLE visitor_identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_events ENABLE ROW LEVEL SECURITY;

-- Policy: Mill Admins have full access
CREATE POLICY "Admins full access on visitor identities" 
ON visitor_identities
FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' LIKE '%@primefreshoil.com');

CREATE POLICY "Admins full access on visit events" 
ON visit_events
FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' LIKE '%@primefreshoil.com');

-- 4. Server-Side Lead Score Calculation Function
CREATE OR REPLACE FUNCTION calculate_lead_score(v_id UUID) 
RETURNS INT AS $$
DECLARE
  v_score INT := 0;
  v_visits INT := 0;
  v_days_since_last_seen INT := 0;
  v_has_quote_submitted BOOLEAN := FALSE;
  v_has_kyc_submitted BOOLEAN := FALSE;
  v_has_cart_added BOOLEAN := FALSE;
  v_product_views INT := 0;
  v_category VARCHAR(10) := 'Cold';
BEGIN
  -- Total events count & unique page categories
  SELECT total_visits, EXTRACT(DAY FROM (NOW() - last_seen_at))
  INTO v_visits, v_days_since_last_since
  FROM visitor_identities WHERE id = v_id;

  -- High intent events
  SELECT 
    EXISTS(SELECT 1 FROM visit_events WHERE visitor_id = v_id AND event_type = 'quote_submitted'),
    EXISTS(SELECT 1 FROM visit_events WHERE visitor_id = v_id AND event_type = 'kyc_submitted'),
    EXISTS(SELECT 1 FROM visit_events WHERE visitor_id = v_id AND event_type = 'add_to_cart'),
    COUNT(*) FILTER (WHERE page_path LIKE '/products%')
  INTO 
    v_has_quote_submitted,
    v_has_kyc_submitted,
    v_has_cart_added,
    v_product_views
  FROM visit_events WHERE visitor_id = v_id;

  -- Intent Weighting Formula (0 to 100)
  IF v_has_quote_submitted THEN
    v_score := v_score + 45;
  ELSIF v_has_kyc_submitted THEN
    v_score := v_score + 40;
  END IF;

  IF v_has_cart_added THEN
    v_score := v_score + 25;
  END IF;

  -- Repeat visits weighting (up to 20 pts)
  v_score := v_score + LEAST(v_visits * 5, 20);

  -- Product viewing depth (up to 15 pts)
  v_score := v_score + LEAST(v_product_views * 3, 15);

  -- Recency factor: Reduce score if inactive for > 14 days
  IF v_days_since_last_seen > 14 THEN
    v_score := GREATEST(0, v_score - 15);
  END IF;

  v_score := LEAST(100, GREATEST(0, v_score));

  -- Classify category
  IF v_score >= 70 THEN
    v_category := 'Hot';
  ELSIF v_score >= 40 THEN
    v_category := 'Warm';
  ELSE
    v_category := 'Cold';
  END IF;

  UPDATE visitor_identities
  SET lead_score = v_score, lead_category = v_category, updated_at = NOW()
  WHERE id = v_id;

  RETURN v_score;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Data Retention Cleanup Job (Configurable: default 90 days)
CREATE OR REPLACE FUNCTION purge_stale_visitor_logs(days_retention INT DEFAULT 90)
RETURNS VOID AS $$
BEGIN
  -- Delete unassociated visitor events older than retention period
  DELETE FROM visit_events 
  WHERE created_at < NOW() - (days_retention || ' days')::INTERVAL
    AND visitor_id IN (
      SELECT id FROM visitor_identities WHERE associated_customer_id IS NULL
    );

  -- Delete anonymous visitors inactive for over retention period
  DELETE FROM visitor_identities
  WHERE last_seen_at < NOW() - (days_retention || ' days')::INTERVAL
    AND associated_customer_id IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


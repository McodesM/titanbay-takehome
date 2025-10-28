CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS funds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    vintage_year INT NOT NULL,
    target_size_usd NUMERIC(18, 2) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Fundraising', 'Investing', 'Closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  investor_type VARCHAR(50) NOT NULL CHECK (investor_type IN ('Individual', 'Institution', 'Family Office')),
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE IF NOT EXISTS investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  fund_id UUID NOT NULL REFERENCES funds(id) ON DELETE CASCADE,
  amount_usd NUMERIC(18, 2) NOT NULL,
  investment_date DATE NOT NULL
);
-- Multi-Tenant Database Schema for Loyalify SaaS

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES / USERS
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'admin', 'customer')),
  business_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. BUSINESSES
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  city TEXT NOT NULL,
  logo_url TEXT,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add foreign key back to profiles for business_id
ALTER TABLE public.profiles
  ADD CONSTRAINT fk_profiles_business
  FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE SET NULL;

-- 3. CUSTOMERS
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(business_id, phone)
);

-- 4. LOYALTY PROGRAMS
CREATE TABLE IF NOT EXISTS public.loyalty_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE UNIQUE,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'points' CHECK (type IN ('points', 'stamps')),
  points_required INT NOT NULL DEFAULT 10,
  conditions TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. LOYALTY CARDS
CREATE TABLE IF NOT EXISTS public.loyalty_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  points INT NOT NULL DEFAULT 0,
  visits INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(business_id, customer_id)
);

-- 6. REWARDS
CREATE TABLE IF NOT EXISTS public.rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  required_points INT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('earn_points', 'redeem_reward', 'visit')),
  points INT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS HELPER FUNCTION TO GET CURRENT USER'S BUSINESS_ID
CREATE OR REPLACE FUNCTION public.get_auth_business_id()
RETURNS UUID AS $$
  SELECT business_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- RLS POLICIES FOR PROFILES
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS POLICIES FOR BUSINESSES
CREATE POLICY "Owners can view their own business"
  ON public.businesses FOR SELECT
  USING (owner_id = auth.uid() OR id = public.get_auth_business_id());

CREATE POLICY "Public can view basic business details for customer registration"
  ON public.businesses FOR SELECT
  USING (true);

CREATE POLICY "Owners can update their business"
  ON public.businesses FOR UPDATE
  USING (owner_id = auth.uid());

-- RLS POLICIES FOR CUSTOMERS
CREATE POLICY "Businesses can view their own customers"
  ON public.customers FOR SELECT
  USING (business_id = public.get_auth_business_id());

CREATE POLICY "Businesses can insert customers"
  ON public.customers FOR INSERT
  WITH CHECK (true); -- Allow public QR signups to insert

CREATE POLICY "Businesses can update their own customers"
  ON public.customers FOR UPDATE
  USING (business_id = public.get_auth_business_id());

CREATE POLICY "Businesses can delete their own customers"
  ON public.customers FOR DELETE
  USING (business_id = public.get_auth_business_id());

-- RLS POLICIES FOR LOYALTY PROGRAMS
CREATE POLICY "Businesses can view loyalty program"
  ON public.loyalty_programs FOR SELECT
  USING (true);

CREATE POLICY "Businesses can update loyalty program"
  ON public.loyalty_programs FOR ALL
  USING (business_id = public.get_auth_business_id());

-- RLS POLICIES FOR LOYALTY CARDS
CREATE POLICY "Businesses can manage loyalty cards"
  ON public.loyalty_cards FOR ALL
  USING (business_id = public.get_auth_business_id());

CREATE POLICY "Public customer card access"
  ON public.loyalty_cards FOR SELECT
  USING (true);

-- RLS POLICIES FOR REWARDS
CREATE POLICY "Everyone can view active rewards for a business"
  ON public.rewards FOR SELECT
  USING (true);

CREATE POLICY "Businesses can manage rewards"
  ON public.rewards FOR ALL
  USING (business_id = public.get_auth_business_id());

-- RLS POLICIES FOR TRANSACTIONS
CREATE POLICY "Businesses can manage transactions"
  ON public.transactions FOR ALL
  USING (business_id = public.get_auth_business_id());

CREATE POLICY "Public transaction view"
  ON public.transactions FOR SELECT
  USING (true);

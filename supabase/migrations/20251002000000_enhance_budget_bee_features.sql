-- Add currency support to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'USD';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS theme_preference VARCHAR(20) DEFAULT 'light';

-- Add currency to expenses
ALTER TABLE public.expenses ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'USD';
ALTER TABLE public.expenses ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.expenses ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50);
ALTER TABLE public.expenses ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT false;
ALTER TABLE public.expenses ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Enhance budgets with time periods
ALTER TABLE public.budgets ADD COLUMN IF NOT EXISTS period_type VARCHAR(20) DEFAULT 'monthly';
ALTER TABLE public.budgets ADD COLUMN IF NOT EXISTS start_date DATE;
ALTER TABLE public.budgets ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE public.budgets ADD COLUMN IF NOT EXISTS alert_threshold INTEGER DEFAULT 80;
ALTER TABLE public.budgets ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Create financial goals table
CREATE TABLE IF NOT EXISTS public.financial_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  target_amount DECIMAL(10,2) NOT NULL,
  current_amount DECIMAL(10,2) DEFAULT 0,
  target_date DATE,
  category TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create insights cache table
CREATE TABLE IF NOT EXISTS public.ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  insight_type VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS public.budget_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  budget_id UUID REFERENCES public.budgets(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.financial_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for financial_goals
CREATE POLICY "Users can view their own goals"
  ON public.financial_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goals"
  ON public.financial_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON public.financial_goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals"
  ON public.financial_goals FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for ai_insights
CREATE POLICY "Users can view their own insights"
  ON public.ai_insights FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own insights"
  ON public.ai_insights FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own insights"
  ON public.ai_insights FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for budget_alerts
CREATE POLICY "Users can view their own alerts"
  ON public.budget_alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts"
  ON public.budget_alerts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alerts"
  ON public.budget_alerts FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for financial_goals
CREATE TRIGGER update_financial_goals_updated_at BEFORE UPDATE ON public.financial_goals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_expenses_user_date ON public.expenses(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON public.expenses(category);
CREATE INDEX IF NOT EXISTS idx_budgets_user_active ON public.budgets(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_goals_user ON public.financial_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_insights_user_expires ON public.ai_insights(user_id, expires_at);
CREATE INDEX IF NOT EXISTS idx_alerts_user_read ON public.budget_alerts(user_id, is_read);


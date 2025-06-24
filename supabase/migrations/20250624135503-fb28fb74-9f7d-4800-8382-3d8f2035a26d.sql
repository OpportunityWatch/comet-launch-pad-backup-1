
-- Create orders table to track purchases
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  amount INTEGER NOT NULL, -- Amount in cents
  discount_code TEXT,
  discount_amount INTEGER DEFAULT 0,
  final_amount INTEGER NOT NULL,
  payment_method TEXT NOT NULL, -- 'stripe', 'venmo', 'cashapp', 'paypal'
  stripe_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'completed'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert orders (for guest purchases)
CREATE POLICY "allow_insert_orders" ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow users to view orders by email
CREATE POLICY "view_orders_by_email" ON public.orders
  FOR SELECT
  USING (true);

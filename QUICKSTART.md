# 🚀 Budget Bee - Quick Start Guide

Get Budget Bee running on your local machine in 5 minutes!

## Prerequisites

Make sure you have:
- ✅ Node.js 18+ ([Download](https://nodejs.org/))
- ✅ npm or yarn
- ✅ Git
- ✅ A Supabase account ([Sign up free](https://supabase.com))

## Step 1: Clone the Repository

```bash
git clone https://github.com/Sri-Gowtham/pocket-pollinator.git
cd pocket-pollinator
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React, TypeScript, Vite
- Tailwind CSS, Shadcn/ui
- Supabase client
- Recharts, date-fns
- And more...

## Step 3: Set Up Supabase

### 3.1 Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: Budget Bee
   - **Database Password**: (save this!)
   - **Region**: Choose closest to you
4. Wait 2-3 minutes for project creation

### 3.2 Get Your API Keys

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### 3.3 Create Environment File

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace with your actual values from step 3.2.

## Step 4: Set Up Database

### 4.1 Run Migration

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/migrations/20251002000000_enhance_budget_bee_features.sql`
4. Paste into the SQL Editor
5. Click **Run** (bottom right)
6. Wait for "Success" message

### 4.2 Verify Tables

In SQL Editor, run:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

You should see:
- profiles
- expenses
- budgets
- financial_goals
- ai_insights
- budget_alerts

## Step 5: Set Up Edge Functions (Optional but Recommended)

### 5.1 Install Supabase CLI

```bash
npm install -g supabase
```

### 5.2 Login

```bash
supabase login
```

### 5.3 Link Project

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

Get your project ref from the Supabase URL:
`https://YOUR_PROJECT_REF.supabase.co`

### 5.4 Deploy Functions

```bash
supabase functions deploy generate-insights
supabase functions deploy categorize-expense
supabase functions deploy analyze-spending
```

### 5.5 Set Environment Variable

In Supabase Dashboard → **Edge Functions** → **Settings**:

Add secret:
- **Name**: `LOVABLE_API_KEY`
- **Value**: Your Lovable API key

> **Note**: If you don't have a Lovable API key, AI features won't work, but the rest of the app will function normally.

## Step 6: Start Development Server

```bash
npm run dev
```

You should see:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 7: Open the App

1. Open your browser
2. Navigate to `http://localhost:5173`
3. You should see the Budget Bee login page! 🎉

## Step 8: Create Your First Account

1. Click **Sign Up** tab
2. Enter:
   - **Email**: your@email.com
   - **Password**: (at least 6 characters)
3. Click **Sign Up**
4. You'll be logged in automatically!

## Step 9: Add Your First Expense

1. You'll land on the **Dashboard**
2. Click **Add Expense** or navigate to **Expenses** page
3. Fill in:
   - **Title**: "Coffee"
   - **Amount**: 5.50
   - **Category**: Food
   - **Date**: Today
   - **Payment Method**: Cash
4. Click **Add Expense**
5. See your expense appear! ✅

## Step 10: Create Your First Budget

1. Navigate to **Budget** page
2. Click **Add Budget**
3. Fill in:
   - **Category**: Food
   - **Limit**: 500
   - **Period**: Monthly
   - **Alert Threshold**: 80
4. Click **Add Budget**
5. See your budget with progress bar! ✅

## Step 11: Generate AI Insights

1. Add at least 5-10 expenses (for better insights)
2. Navigate to **Insights** page
3. Click **Refresh Analysis**
4. Wait a few seconds
5. Explore all tabs:
   - Overview
   - Patterns
   - Recommendations
   - Fraud Alerts
   - Tax Insights

## Troubleshooting

### Issue: "Failed to fetch"

**Solution**: Check your `.env` file has correct Supabase URL and key.

### Issue: "Authentication error"

**Solution**: 
1. Verify Supabase project is active
2. Check RLS policies are enabled (migration should handle this)
3. Try signing out and back in

### Issue: "Edge function error"

**Solution**:
1. Verify functions are deployed: `supabase functions list`
2. Check function logs in Supabase Dashboard
3. Ensure `LOVABLE_API_KEY` is set

### Issue: "Database error"

**Solution**:
1. Verify migration ran successfully
2. Check table exists: Run `\dt` in SQL Editor
3. Re-run migration if needed

### Issue: Port 5173 already in use

**Solution**:
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

## Next Steps

Now that you're up and running:

1. **Explore Features**: Try all pages and features
2. **Customize**: Modify colors, add features
3. **Read Docs**: Check `FEATURES.md` for complete feature list
4. **Deploy**: Follow `DEPLOYMENT.md` to go live
5. **Test**: Use `TESTING.md` for comprehensive testing

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Deploy edge functions
supabase functions deploy <function-name>

# View function logs
supabase functions logs <function-name>

# Reset database (careful!)
supabase db reset
```

## Project Structure

```
pocket-pollinator/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── integrations/   # Supabase integration
│   ├── hooks/          # Custom hooks
│   └── lib/            # Utilities
├── supabase/
│   ├── functions/      # Edge functions
│   └── migrations/     # Database migrations
├── public/             # Static assets
└── package.json        # Dependencies
```

## Key Files

- `src/App.tsx` - Main app component with routes
- `src/pages/Dashboard.tsx` - Dashboard page
- `src/pages/Expenses.tsx` - Expense management
- `src/pages/Budget.tsx` - Budget management
- `src/pages/Insights.tsx` - AI insights
- `src/pages/Profile.tsx` - User profile
- `src/index.css` - Global styles and theme
- `supabase/migrations/*.sql` - Database schema

## Resources

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Shadcn/ui**: https://ui.shadcn.com
- **Recharts**: https://recharts.org

## Getting Help

- Check `TESTING.md` for testing procedures
- Check `DEPLOYMENT.md` for deployment help
- Check `FEATURES.md` for feature documentation
- Open an issue on GitHub
- Check Supabase community forums

---

🎉 **Congratulations!** You're now ready to use Budget Bee!

Happy budgeting! 🍯🐝


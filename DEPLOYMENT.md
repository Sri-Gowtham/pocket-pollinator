# 🚀 Budget Bee Deployment Guide

This guide will help you deploy Budget Bee to production.

## Prerequisites

Before deploying, ensure you have:
- ✅ Supabase account and project
- ✅ Lovable API key (for AI features)
- ✅ Node.js 18+ installed
- ✅ Git installed

## Step 1: Database Setup

### 1.1 Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details:
   - Name: Budget Bee
   - Database Password: (save this securely)
   - Region: Choose closest to your users
4. Wait for project to be created

### 1.2 Run Database Migrations

1. Navigate to SQL Editor in Supabase Dashboard
2. Copy the contents of `supabase/migrations/20251002000000_enhance_budget_bee_features.sql`
3. Paste into SQL Editor and click "Run"
4. Verify all tables are created:
   - profiles
   - expenses
   - budgets
   - financial_goals
   - ai_insights
   - budget_alerts

### 1.3 Verify Row Level Security (RLS)

Check that RLS is enabled on all tables:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

All tables should have `rowsecurity = true`.

## Step 2: Edge Functions Setup

### 2.1 Install Supabase CLI

```bash
npm install -g supabase
```

### 2.2 Login to Supabase

```bash
supabase login
```

### 2.3 Link Your Project

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

### 2.4 Deploy Edge Functions

```bash
# Deploy all functions
supabase functions deploy generate-insights
supabase functions deploy categorize-expense
supabase functions deploy analyze-spending
```

### 2.5 Set Environment Variables for Edge Functions

In Supabase Dashboard → Edge Functions → Settings:

```
LOVABLE_API_KEY=your_lovable_api_key_here
```

## Step 3: Frontend Configuration

### 3.1 Update Environment Variables

Create `.env.production` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Get these values from:
- Supabase Dashboard → Settings → API

### 3.2 Build the Application

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Step 4: Deployment Options

### Option A: Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Set environment variables in Vercel Dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Option B: Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

3. Set environment variables in Netlify Dashboard

### Option C: Deploy to Lovable

1. Open [Lovable Project](https://lovable.dev/projects/5dd211e9-1e26-487b-ba7a-49bb6bfc1e8e)
2. Click Share → Publish
3. Your app will be live at `https://your-app.lovable.app`

## Step 5: Post-Deployment Verification

### 5.1 Test Authentication

1. Visit your deployed URL
2. Click "Sign Up"
3. Create a test account
4. Verify email confirmation works

### 5.2 Test Core Features

- [ ] Add an expense
- [ ] Edit an expense
- [ ] Delete an expense
- [ ] Create a budget
- [ ] Set budget alerts
- [ ] Generate AI insights
- [ ] Create a financial goal
- [ ] Export expenses to CSV
- [ ] Update profile settings

### 5.3 Test AI Features

1. Add at least 10 expenses
2. Go to Insights page
3. Click "Refresh Analysis"
4. Verify all tabs load:
   - Overview
   - Patterns
   - Recommendations
   - Fraud Alerts
   - Tax Insights

## Step 6: Performance Optimization

### 6.1 Enable Caching

Add caching headers in your hosting platform:

```
Cache-Control: public, max-age=31536000, immutable
```

For static assets (JS, CSS, images).

### 6.2 Enable Compression

Ensure gzip/brotli compression is enabled on your hosting platform.

### 6.3 Monitor Performance

Use tools like:
- Google Lighthouse
- WebPageTest
- Vercel Analytics

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

## Step 7: Security Checklist

- [ ] RLS policies enabled on all tables
- [ ] API keys stored in environment variables (not in code)
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting enabled on Edge Functions
- [ ] User data isolated by user_id
- [ ] SQL injection prevention (using parameterized queries)
- [ ] XSS prevention (React handles this by default)

## Step 8: Monitoring & Maintenance

### 8.1 Set Up Error Tracking

Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage tracking

### 8.2 Database Backups

Supabase automatically backs up your database daily. Verify:
- Supabase Dashboard → Database → Backups

### 8.3 Monitor Edge Function Usage

Check:
- Supabase Dashboard → Edge Functions → Logs
- Monitor for errors and performance issues

## Troubleshooting

### Issue: Edge Functions Not Working

**Solution:**
1. Check function logs in Supabase Dashboard
2. Verify LOVABLE_API_KEY is set
3. Test function directly:
```bash
curl -X POST https://your-project.supabase.co/functions/v1/analyze-spending \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json"
```

### Issue: Authentication Errors

**Solution:**
1. Verify Supabase URL and keys are correct
2. Check RLS policies are properly configured
3. Ensure email confirmation is set up in Supabase Auth settings

### Issue: Slow Performance

**Solution:**
1. Check database indexes are created (migration should handle this)
2. Enable caching on hosting platform
3. Optimize images and assets
4. Use React.lazy() for code splitting

## Rollback Procedure

If deployment fails:

1. Revert to previous version:
```bash
vercel rollback  # or netlify rollback
```

2. Check error logs
3. Fix issues locally
4. Test thoroughly
5. Redeploy

## Support

For issues or questions:
- Check [Supabase Documentation](https://supabase.com/docs)
- Check [React Documentation](https://react.dev)
- Open an issue on GitHub

---

🎉 Congratulations! Your Budget Bee app is now live!


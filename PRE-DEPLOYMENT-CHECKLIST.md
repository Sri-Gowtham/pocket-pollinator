# ✅ Budget Bee - Pre-Deployment Checklist

Complete this checklist before deploying to production.

---

## 📋 Database Setup

### 1. Supabase Project
- [ ] Supabase project created
- [ ] Project URL obtained
- [ ] Anon key obtained
- [ ] Service role key obtained (keep secret!)

### 2. Database Migration
- [ ] Migration file reviewed: `supabase/migrations/20251002000000_enhance_budget_bee_features.sql`
- [ ] Migration applied via SQL Editor
- [ ] All tables created successfully:
  - [ ] profiles (with new columns)
  - [ ] expenses (with new columns)
  - [ ] budgets (with new columns)
  - [ ] financial_goals
  - [ ] ai_insights
  - [ ] budget_alerts
- [ ] RLS policies enabled on all tables
- [ ] Indexes created successfully

### 3. Verify Database Schema
Run this query in SQL Editor:
```sql
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
ORDER BY table_name, ordinal_position;
```
- [ ] All expected columns present

### 4. Test RLS Policies
- [ ] Create test user
- [ ] Verify user can only see their own data
- [ ] Verify user cannot access other users' data

---

## 🔧 Edge Functions Setup

### 1. Supabase CLI
- [ ] Supabase CLI installed: `npm install -g supabase`
- [ ] Logged in: `supabase login`
- [ ] Project linked: `supabase link --project-ref YOUR_REF`

### 2. Deploy Functions
- [ ] `generate-insights` deployed
- [ ] `categorize-expense` deployed
- [ ] `analyze-spending` deployed

Commands:
```bash
supabase functions deploy generate-insights
supabase functions deploy categorize-expense
supabase functions deploy analyze-spending
```

### 3. Environment Variables
- [ ] `LOVABLE_API_KEY` set in Supabase Dashboard
  - Location: Edge Functions → Settings → Secrets

### 4. Test Functions
Test each function:
```bash
# Test generate-insights
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/generate-insights \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json"

# Test categorize-expense
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/categorize-expense \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"Coffee at Starbucks","amount":5.50}'

# Test analyze-spending
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/analyze-spending \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json"
```

- [ ] All functions return 200 OK
- [ ] No error messages in function logs

---

## 🎨 Frontend Setup

### 1. Environment Variables
Create `.env.production`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

- [ ] `.env.production` created
- [ ] Correct Supabase URL
- [ ] Correct anon key
- [ ] `.env` files in `.gitignore`

### 2. Build Application
```bash
npm run build
```

- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] `dist/` folder created

### 3. Test Production Build Locally
```bash
npm run preview
```

- [ ] Application runs on preview server
- [ ] All pages load correctly
- [ ] No console errors

---

## 🧪 Testing

### 1. Manual Testing
Follow `tests/manual-test-checklist.md`:

- [ ] Authentication (sign up, sign in, sign out)
- [ ] Expense management (add, edit, delete, search, filter, export)
- [ ] Budget management (add, edit, delete, periods, alerts)
- [ ] AI insights (generate, view all tabs)
- [ ] Profile management (update, currency, goals)
- [ ] Dashboard (stats, charts)
- [ ] Responsive design (desktop, tablet, mobile)

### 2. Browser Testing
Test on multiple browsers:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### 3. Performance Testing
- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 95 (Accessibility)
- [ ] Lighthouse score > 95 (Best Practices)
- [ ] Lighthouse score > 90 (SEO)

Run Lighthouse:
```bash
# In Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Click "Analyze page load"
```

### 4. Security Testing
- [ ] RLS policies tested
- [ ] No API keys in client code
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities

---

## 📚 Documentation

### 1. README
- [ ] README.md updated with:
  - [ ] Project description
  - [ ] Features list
  - [ ] Tech stack
  - [ ] Installation instructions
  - [ ] Deployment instructions

### 2. Additional Docs
- [ ] QUICKSTART.md created
- [ ] DEPLOYMENT.md created
- [ ] TESTING.md created
- [ ] FEATURES.md created
- [ ] Known issues documented

### 3. Code Comments
- [ ] Complex logic commented
- [ ] Function purposes documented
- [ ] TODO items tracked

---

## 🚀 Deployment

### Choose Deployment Platform

#### Option A: Vercel
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Environment variables set in Vercel Dashboard
- [ ] Deploy triggered
- [ ] Custom domain configured (optional)

#### Option B: Netlify
- [ ] Netlify account created
- [ ] Project imported from GitHub
- [ ] Environment variables set in Netlify Dashboard
- [ ] Deploy triggered
- [ ] Custom domain configured (optional)

#### Option C: Lovable
- [ ] Open Lovable project
- [ ] Click Share → Publish
- [ ] Verify deployment URL

### Post-Deployment
- [ ] Application accessible at production URL
- [ ] All features working
- [ ] No console errors
- [ ] Analytics configured (optional)
- [ ] Error tracking configured (optional)

---

## 🔒 Security Checklist

- [ ] Environment variables not committed to Git
- [ ] Service role key kept secret
- [ ] RLS enabled on all tables
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Rate limiting enabled (Supabase default)
- [ ] No sensitive data in logs
- [ ] User data encrypted at rest (Supabase default)

---

## 📊 Monitoring Setup (Optional)

### 1. Error Tracking
- [ ] Sentry integrated (optional)
- [ ] Error alerts configured

### 2. Analytics
- [ ] Google Analytics integrated (optional)
- [ ] User flow tracking configured

### 3. Performance Monitoring
- [ ] Vercel Analytics enabled (if using Vercel)
- [ ] Core Web Vitals tracked

### 4. Database Monitoring
- [ ] Supabase Dashboard bookmarked
- [ ] Database usage monitored
- [ ] Backup schedule verified

---

## 🎯 Go-Live Checklist

### Final Checks
- [ ] All above sections completed
- [ ] Test user account created
- [ ] Sample data added for demo
- [ ] Team members have access
- [ ] Support email configured
- [ ] Feedback mechanism in place

### Communication
- [ ] Stakeholders notified
- [ ] Launch announcement prepared
- [ ] User guide shared (if applicable)

### Rollback Plan
- [ ] Previous version tagged in Git
- [ ] Rollback procedure documented
- [ ] Database backup created

---

## ✅ Sign-Off

**Checklist Completed By**: _______________
**Date**: _______________
**Deployment URL**: _______________

**Ready for Production**: [ ] YES [ ] NO

**Notes**:
_______________________________________________
_______________________________________________
_______________________________________________

---

## 🆘 Emergency Contacts

**Technical Issues**:
- Supabase Support: https://supabase.com/support
- Vercel Support: https://vercel.com/support
- Netlify Support: https://www.netlify.com/support/

**Database Issues**:
- Check Supabase Dashboard → Database → Logs
- Check Supabase Dashboard → Database → Backups

**Function Issues**:
- Check Supabase Dashboard → Edge Functions → Logs
- Verify LOVABLE_API_KEY is set

**Frontend Issues**:
- Check browser console for errors
- Check deployment logs in hosting platform
- Verify environment variables are set

---

**Last Updated**: 2025-10-02


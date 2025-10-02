# 🧪 Budget Bee Testing Guide

This guide provides comprehensive testing instructions for Budget Bee.

## Prerequisites

Before testing, ensure:
- ✅ Application is running locally (`npm run dev`)
- ✅ Database migrations are applied
- ✅ Edge functions are deployed
- ✅ Environment variables are set

## Test User Setup

Create a test account:
- Email: test@budgetbee.com
- Password: TestPassword123!

## Manual Testing Checklist

### 1. Authentication Tests

#### 1.1 Sign Up
- [ ] Navigate to `/auth`
- [ ] Click "Sign Up" tab
- [ ] Enter email and password
- [ ] Click "Sign Up"
- [ ] Verify success message
- [ ] Check email for confirmation (if enabled)

#### 1.2 Sign In
- [ ] Navigate to `/auth`
- [ ] Enter credentials
- [ ] Click "Sign In"
- [ ] Verify redirect to dashboard

#### 1.3 Sign Out
- [ ] Click profile icon in navbar
- [ ] Navigate to Profile page
- [ ] Click "Sign Out"
- [ ] Verify redirect to auth page

### 2. Dashboard Tests

#### 2.1 Stats Cards
- [ ] Verify "Total Expenses" shows correct sum
- [ ] Verify "Monthly Budget" shows correct total
- [ ] Verify "Remaining Budget" calculates correctly
- [ ] Verify "AI Insights" shows count or "Generate"

#### 2.2 Charts
- [ ] Verify pie chart shows expense categories
- [ ] Verify line chart shows spending trends
- [ ] Hover over chart elements to see tooltips
- [ ] Verify colors match theme

#### 2.3 Quick Actions
- [ ] Click "Add Expense" button
- [ ] Click "Generate Insights" button
- [ ] Verify navigation works

### 3. Expense Management Tests

#### 3.1 Add Expense
- [ ] Navigate to `/expenses`
- [ ] Click "Add Expense" button
- [ ] Fill in all fields:
  - Title: "Test Grocery Shopping"
  - Amount: 125.50
  - Category: Food
  - Date: Today
  - Payment Method: Credit Card
  - Description: "Weekly groceries"
- [ ] Click "Add Expense"
- [ ] Verify success toast
- [ ] Verify expense appears in list

#### 3.2 Edit Expense
- [ ] Click edit icon on an expense
- [ ] Modify title to "Updated Grocery Shopping"
- [ ] Change amount to 150.00
- [ ] Click "Update Expense"
- [ ] Verify success toast
- [ ] Verify changes are reflected

#### 3.3 Delete Expense
- [ ] Click delete icon on an expense
- [ ] Confirm deletion
- [ ] Verify success toast
- [ ] Verify expense is removed from list

#### 3.4 Search Expenses
- [ ] Enter search term in search box
- [ ] Verify filtered results
- [ ] Clear search
- [ ] Verify all expenses shown

#### 3.5 Filter by Category
- [ ] Select "Food" from category filter
- [ ] Verify only food expenses shown
- [ ] Select "All Categories"
- [ ] Verify all expenses shown

#### 3.6 Export to CSV
- [ ] Click "Export CSV" button
- [ ] Verify file downloads
- [ ] Open CSV file
- [ ] Verify all expense data is present
- [ ] Verify headers are correct

### 4. Budget Management Tests

#### 4.1 Create Budget
- [ ] Navigate to `/budget`
- [ ] Click "Add Budget" button
- [ ] Fill in fields:
  - Category: Food
  - Limit: 500
  - Period: Monthly
  - Alert Threshold: 80
- [ ] Click "Add Budget"
- [ ] Verify success toast
- [ ] Verify budget appears in list

#### 4.2 Edit Budget
- [ ] Click edit icon on a budget
- [ ] Change limit to 600
- [ ] Change period to Weekly
- [ ] Click "Update Budget"
- [ ] Verify success toast
- [ ] Verify changes are reflected

#### 4.3 Delete Budget
- [ ] Click delete icon on a budget
- [ ] Confirm deletion
- [ ] Verify success toast
- [ ] Verify budget is removed

#### 4.4 Budget Alerts
- [ ] Create a budget with low limit (e.g., $10)
- [ ] Add expenses exceeding 80% of limit
- [ ] Verify alert bell icon appears
- [ ] Verify progress bar turns orange/red

#### 4.5 Budget Periods
Test each period type:
- [ ] Weekly budget
- [ ] Monthly budget
- [ ] Quarterly budget
- [ ] Yearly budget
- [ ] Custom period with date range

### 5. AI Insights Tests

#### 5.1 Generate Insights
- [ ] Navigate to `/insights`
- [ ] Click "Refresh Analysis"
- [ ] Wait for loading to complete
- [ ] Verify insights are generated

#### 5.2 Overview Tab
- [ ] Verify statistics cards show correct data
- [ ] Verify category breakdown chart
- [ ] Verify percentages add up to 100%

#### 5.3 Patterns Tab
- [ ] Verify spending patterns text
- [ ] Verify budget analysis (if budgets exist)
- [ ] Check for meaningful insights

#### 5.4 Recommendations Tab
- [ ] Verify list of recommendations
- [ ] Verify recommendations are actionable
- [ ] Verify savings opportunities section

#### 5.5 Fraud Alerts Tab
- [ ] Add an unusually large expense (3x average)
- [ ] Refresh analysis
- [ ] Verify fraud alert appears
- [ ] Verify alert details are correct

#### 5.6 Tax Insights Tab
- [ ] Verify tax insights text
- [ ] Verify disclaimer is shown
- [ ] Check for relevant tax tips

### 6. Profile & Settings Tests

#### 6.1 Profile Tab
- [ ] Navigate to `/profile`
- [ ] Verify email is displayed (disabled)
- [ ] Update full name
- [ ] Click "Save Changes"
- [ ] Verify success toast

#### 6.2 Settings Tab
- [ ] Select different currency (e.g., EUR)
- [ ] Click "Save Preferences"
- [ ] Verify success toast
- [ ] Navigate to expenses
- [ ] Verify currency symbol updates (future feature)

#### 6.3 Financial Goals
- [ ] Click "Financial Goals" tab
- [ ] Click "Create Goal"
- [ ] Fill in fields:
  - Title: "Emergency Fund"
  - Target Amount: 10000
  - Target Date: 6 months from now
  - Category: Emergency Fund
  - Description: "Save for emergencies"
- [ ] Click "Create Goal"
- [ ] Verify success toast
- [ ] Verify goal appears in list
- [ ] Verify progress bar shows 0%

#### 6.4 Delete Goal
- [ ] Click delete icon on a goal
- [ ] Verify success toast
- [ ] Verify goal is removed

### 7. UI/UX Tests

#### 7.1 Responsive Design
Test on different screen sizes:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

Verify:
- [ ] Sidebar collapses on mobile
- [ ] Cards stack properly
- [ ] Forms are usable
- [ ] Charts resize correctly

#### 7.2 Animations
- [ ] Hover over cards (should scale up)
- [ ] Click buttons (should have feedback)
- [ ] Page transitions are smooth
- [ ] Loading states are visible

#### 7.3 Accessibility
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators are visible
- [ ] Test with screen reader (if available)
- [ ] Verify color contrast is sufficient

#### 7.4 Theme
- [ ] Verify bee theme colors throughout
- [ ] Verify honey gradients on buttons
- [ ] Verify honeycomb patterns (if visible)
- [ ] Verify consistent styling

### 8. Edge Cases & Error Handling

#### 8.1 Empty States
- [ ] View expenses page with no expenses
- [ ] View budgets page with no budgets
- [ ] View insights with no data
- [ ] View goals with no goals

#### 8.2 Invalid Input
- [ ] Try to add expense with negative amount
- [ ] Try to add expense with empty title
- [ ] Try to create budget with 0 limit
- [ ] Try to create goal with past date

#### 8.3 Network Errors
- [ ] Disconnect internet
- [ ] Try to add expense
- [ ] Verify error message
- [ ] Reconnect internet
- [ ] Verify retry works

#### 8.4 Large Data Sets
- [ ] Add 100+ expenses
- [ ] Verify pagination/scrolling works
- [ ] Verify performance is acceptable
- [ ] Verify charts still render

### 9. Performance Tests

#### 9.1 Page Load Times
Measure load times for each page:
- [ ] Dashboard: < 2 seconds
- [ ] Expenses: < 2 seconds
- [ ] Budget: < 2 seconds
- [ ] Insights: < 3 seconds (AI processing)
- [ ] Profile: < 2 seconds

#### 9.2 Lighthouse Scores
Run Lighthouse audit:
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 90+

### 10. Security Tests

#### 10.1 Authentication
- [ ] Try to access `/expenses` without login
- [ ] Verify redirect to auth page
- [ ] Try to access another user's data
- [ ] Verify RLS prevents access

#### 10.2 Input Validation
- [ ] Try SQL injection in expense title
- [ ] Try XSS in expense description
- [ ] Verify inputs are sanitized

## Automated Testing (Future)

Consider adding:
- Unit tests with Vitest
- Integration tests with React Testing Library
- E2E tests with Playwright or Cypress

## Bug Reporting

When you find a bug, report:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Screenshots/videos
5. Browser and OS
6. Console errors (if any)

## Test Results Template

```
Date: YYYY-MM-DD
Tester: [Name]
Environment: [Local/Staging/Production]

✅ Passed: X tests
❌ Failed: Y tests
⚠️ Warnings: Z issues

Critical Issues:
- [List any critical bugs]

Minor Issues:
- [List any minor bugs]

Notes:
- [Any additional observations]
```

---

Happy Testing! 🐝


# 🧪 Budget Bee - Manual Test Checklist

## Test Environment
- **Date**: 2025-10-02
- **Tester**: _____________
- **Browser**: _____________
- **URL**: http://localhost:8080

---

## ✅ Test Results Legend
- ✅ PASS - Feature works as expected
- ❌ FAIL - Feature has issues
- ⚠️ PARTIAL - Feature partially works
- ⏭️ SKIP - Test skipped

---

## 1. Authentication Tests

### 1.1 Sign Up Flow
- [ ] Navigate to `/auth`
- [ ] Click "Sign Up" tab
- [ ] Enter email: `test@budgetbee.com`
- [ ] Enter password: `TestPass123!`
- [ ] Click "Sign Up" button
- [ ] **Expected**: Success message, redirect to dashboard
- [ ] **Result**: _______________

### 1.2 Sign In Flow
- [ ] Navigate to `/auth`
- [ ] Enter credentials from 1.1
- [ ] Click "Sign In" button
- [ ] **Expected**: Redirect to dashboard
- [ ] **Result**: _______________

### 1.3 Sign Out Flow
- [ ] Click profile icon in navbar
- [ ] Navigate to `/profile`
- [ ] Click "Sign Out" button
- [ ] **Expected**: Redirect to `/auth`
- [ ] **Result**: _______________

---

## 2. Expense Management Tests

### 2.1 Add Expense
- [ ] Navigate to `/expenses`
- [ ] Click "Add Expense" button
- [ ] Fill in form:
  - Title: "Test Grocery"
  - Amount: 125.50
  - Category: Food
  - Date: Today
  - Payment Method: Credit Card
  - Description: "Weekly groceries"
- [ ] Click "Add Expense"
- [ ] **Expected**: Success toast, expense appears in list
- [ ] **Result**: _______________

### 2.2 Edit Expense
- [ ] Click edit icon on the expense created in 2.1
- [ ] Change title to "Updated Grocery"
- [ ] Change amount to 150.00
- [ ] Click "Update Expense"
- [ ] **Expected**: Success toast, changes reflected
- [ ] **Result**: _______________

### 2.3 Delete Expense
- [ ] Click delete icon on an expense
- [ ] **Expected**: Expense removed, success toast
- [ ] **Result**: _______________

### 2.4 Search Expenses
- [ ] Add 3 expenses with different titles
- [ ] Enter search term in search box
- [ ] **Expected**: Filtered results shown
- [ ] Clear search
- [ ] **Expected**: All expenses shown
- [ ] **Result**: _______________

### 2.5 Filter by Category
- [ ] Add expenses in different categories
- [ ] Select "Food" from filter dropdown
- [ ] **Expected**: Only food expenses shown
- [ ] Select "All Categories"
- [ ] **Expected**: All expenses shown
- [ ] **Result**: _______________

### 2.6 Export to CSV
- [ ] Add at least 5 expenses
- [ ] Click "Export CSV" button
- [ ] **Expected**: CSV file downloads
- [ ] Open CSV file
- [ ] **Expected**: All expense data present with headers
- [ ] **Result**: _______________

### 2.7 Empty State
- [ ] Delete all expenses
- [ ] **Expected**: "No expenses yet" message shown
- [ ] **Result**: _______________

---

## 3. Budget Management Tests

### 3.1 Create Monthly Budget
- [ ] Navigate to `/budget`
- [ ] Click "Add Budget" button
- [ ] Fill in form:
  - Category: Food
  - Limit: 500
  - Period: Monthly
  - Alert Threshold: 80
- [ ] Click "Add Budget"
- [ ] **Expected**: Success toast, budget appears
- [ ] **Result**: _______________

### 3.2 Create Weekly Budget
- [ ] Click "Add Budget"
- [ ] Fill in:
  - Category: Transport
  - Limit: 100
  - Period: Weekly
  - Alert Threshold: 75
- [ ] Click "Add Budget"
- [ ] **Expected**: Budget created with weekly period
- [ ] **Result**: _______________

### 3.3 Create Custom Period Budget
- [ ] Click "Add Budget"
- [ ] Fill in:
  - Category: Entertainment
  - Limit: 200
  - Period: Custom
  - Start Date: Today
  - End Date: 30 days from today
  - Alert Threshold: 90
- [ ] Click "Add Budget"
- [ ] **Expected**: Budget created with custom dates
- [ ] **Result**: _______________

### 3.4 Edit Budget
- [ ] Click edit icon on a budget
- [ ] Change limit to 600
- [ ] Change alert threshold to 85
- [ ] Click "Update Budget"
- [ ] **Expected**: Success toast, changes reflected
- [ ] **Result**: _______________

### 3.5 Delete Budget
- [ ] Click delete icon on a budget
- [ ] **Expected**: Budget removed, success toast
- [ ] **Result**: _______________

### 3.6 Budget Progress Calculation
- [ ] Create a Food budget with limit 100
- [ ] Add Food expenses totaling 50
- [ ] Navigate to `/budget`
- [ ] **Expected**: Progress bar shows 50%
- [ ] Add more Food expenses totaling 30
- [ ] Refresh page
- [ ] **Expected**: Progress bar shows 80%
- [ ] **Result**: _______________

### 3.7 Budget Alert Threshold
- [ ] Create budget with 80% threshold
- [ ] Add expenses exceeding 80%
- [ ] **Expected**: Progress bar turns orange/red
- [ ] **Expected**: Alert bell icon appears
- [ ] **Result**: _______________

### 3.8 Budget Over Limit
- [ ] Create budget with limit 50
- [ ] Add expenses totaling 60
- [ ] **Expected**: Progress bar shows 120% in red
- [ ] **Expected**: "Over budget" indicator
- [ ] **Result**: _______________

---

## 4. Dashboard Tests

### 4.1 Stats Cards
- [ ] Navigate to `/` (dashboard)
- [ ] **Expected**: 4 stat cards visible
- [ ] Verify "Total Expenses" shows correct sum
- [ ] Verify "Monthly Budget" shows correct total
- [ ] Verify "Remaining Budget" calculates correctly
- [ ] Verify "AI Insights" shows count or "Generate"
- [ ] **Result**: _______________

### 4.2 Expense Pie Chart
- [ ] Add expenses in multiple categories
- [ ] **Expected**: Pie chart shows category breakdown
- [ ] Hover over chart segments
- [ ] **Expected**: Tooltips show category and amount
- [ ] **Result**: _______________

### 4.3 Spending Trend Chart
- [ ] Add expenses on different dates
- [ ] **Expected**: Line chart shows spending over time
- [ ] Hover over data points
- [ ] **Expected**: Tooltips show date and amount
- [ ] **Result**: _______________

### 4.4 Quick Actions
- [ ] Click "Add Expense" button
- [ ] **Expected**: Navigate to expenses page
- [ ] Go back to dashboard
- [ ] Click "Generate Insights" button
- [ ] **Expected**: Navigate to insights page
- [ ] **Result**: _______________

---

## 5. AI Insights Tests

### 5.1 Generate Insights (With Data)
- [ ] Add at least 10 expenses across categories
- [ ] Create 2-3 budgets
- [ ] Navigate to `/insights`
- [ ] Click "Refresh Analysis" button
- [ ] **Expected**: Loading indicator shown
- [ ] Wait for completion
- [ ] **Expected**: Insights generated successfully
- [ ] **Result**: _______________

### 5.2 Overview Tab
- [ ] Click "Overview" tab
- [ ] **Expected**: Statistics cards show:
  - Total Spent
  - Average Expense
  - Categories count
- [ ] **Expected**: Category breakdown with percentages
- [ ] Verify percentages add up to ~100%
- [ ] **Result**: _______________

### 5.3 Patterns Tab
- [ ] Click "Patterns" tab
- [ ] **Expected**: Spending patterns text displayed
- [ ] **Expected**: Budget analysis section (if budgets exist)
- [ ] Verify insights are meaningful
- [ ] **Result**: _______________

### 5.4 Recommendations Tab
- [ ] Click "Recommendations" tab
- [ ] **Expected**: List of AI recommendations
- [ ] Verify recommendations are actionable
- [ ] **Expected**: Savings opportunities section
- [ ] **Result**: _______________

### 5.5 Fraud Alerts Tab
- [ ] Add an unusually large expense (e.g., $1000 when average is $50)
- [ ] Refresh analysis
- [ ] Click "Fraud Alerts" tab
- [ ] **Expected**: Alert shown for unusual transaction
- [ ] Verify alert details (amount, date, reason)
- [ ] **Result**: _______________

### 5.6 Tax Insights Tab
- [ ] Click "Tax Insights" tab
- [ ] **Expected**: Tax-related information displayed
- [ ] **Expected**: Disclaimer about consulting professionals
- [ ] **Result**: _______________

### 5.7 Empty State
- [ ] Delete all expenses
- [ ] Navigate to `/insights`
- [ ] **Expected**: "No Data Yet" message
- [ ] **Expected**: Button to add first expense
- [ ] **Result**: _______________

---

## 6. Profile & Settings Tests

### 6.1 View Profile
- [ ] Navigate to `/profile`
- [ ] **Expected**: Profile tab shows user info
- [ ] Verify email is displayed (disabled field)
- [ ] **Result**: _______________

### 6.2 Update Profile Name
- [ ] Enter full name: "John Doe"
- [ ] Click "Save Changes"
- [ ] **Expected**: Success toast
- [ ] Refresh page
- [ ] **Expected**: Name persisted
- [ ] **Result**: _______________

### 6.3 Change Currency
- [ ] Click "Settings" tab
- [ ] Select "EUR" from currency dropdown
- [ ] Click "Save Preferences"
- [ ] **Expected**: Success toast
- [ ] **Result**: _______________

### 6.4 Create Financial Goal
- [ ] Click "Financial Goals" tab
- [ ] Fill in form:
  - Title: "Emergency Fund"
  - Target Amount: 10000
  - Target Date: 6 months from now
  - Category: Emergency Fund
  - Description: "Save for emergencies"
- [ ] Click "Create Goal"
- [ ] **Expected**: Success toast, goal appears
- [ ] **Expected**: Progress bar shows 0%
- [ ] **Result**: _______________

### 6.5 Delete Financial Goal
- [ ] Click delete icon on a goal
- [ ] **Expected**: Goal removed, success toast
- [ ] **Result**: _______________

---

## 7. UI/UX Tests

### 7.1 Responsive Design - Desktop
- [ ] Test on 1920x1080 resolution
- [ ] **Expected**: All elements properly sized
- [ ] **Expected**: Sidebar visible
- [ ] **Expected**: Charts render correctly
- [ ] **Result**: _______________

### 7.2 Responsive Design - Tablet
- [ ] Test on 768x1024 resolution
- [ ] **Expected**: Layout adapts
- [ ] **Expected**: Sidebar collapsible
- [ ] **Expected**: Cards stack properly
- [ ] **Result**: _______________

### 7.3 Responsive Design - Mobile
- [ ] Test on 375x667 resolution
- [ ] **Expected**: Mobile-friendly layout
- [ ] **Expected**: Hamburger menu works
- [ ] **Expected**: Forms are usable
- [ ] **Expected**: Charts resize
- [ ] **Result**: _______________

### 7.4 Animations
- [ ] Hover over cards
- [ ] **Expected**: Scale up animation
- [ ] Click buttons
- [ ] **Expected**: Visual feedback
- [ ] Navigate between pages
- [ ] **Expected**: Smooth transitions
- [ ] **Result**: _______________

### 7.5 Theme Colors
- [ ] Verify honey/amber color scheme throughout
- [ ] Check gradient backgrounds on buttons
- [ ] Verify consistent styling
- [ ] **Result**: _______________

---

## 8. Error Handling Tests

### 8.1 Invalid Expense Input
- [ ] Try to add expense with empty title
- [ ] **Expected**: Validation error or disabled button
- [ ] Try negative amount
- [ ] **Expected**: Validation error
- [ ] **Result**: _______________

### 8.2 Invalid Budget Input
- [ ] Try to create budget with 0 limit
- [ ] **Expected**: Validation error
- [ ] Try alert threshold > 100
- [ ] **Expected**: Validation error or capped at 100
- [ ] **Result**: _______________

### 8.3 Network Error Simulation
- [ ] Open browser DevTools
- [ ] Go to Network tab, set to "Offline"
- [ ] Try to add expense
- [ ] **Expected**: Error toast with message
- [ ] Set back to "Online"
- [ ] **Expected**: Retry works
- [ ] **Result**: _______________

---

## 9. Performance Tests

### 9.1 Page Load Times
- [ ] Measure Dashboard load time: _____ seconds
- [ ] Measure Expenses load time: _____ seconds
- [ ] Measure Budget load time: _____ seconds
- [ ] Measure Insights load time: _____ seconds
- [ ] **Expected**: All < 3 seconds
- [ ] **Result**: _______________

### 9.2 Large Data Set
- [ ] Add 50+ expenses
- [ ] Navigate to expenses page
- [ ] **Expected**: Page loads smoothly
- [ ] Scroll through list
- [ ] **Expected**: No lag
- [ ] **Result**: _______________

---

## 10. Integration Tests

### 10.1 Expense-Budget Integration
- [ ] Create Food budget: $100
- [ ] Add Food expense: $50
- [ ] Check budget page
- [ ] **Expected**: Budget shows $50 spent
- [ ] Add another Food expense: $30
- [ ] Refresh budget page
- [ ] **Expected**: Budget shows $80 spent
- [ ] **Result**: _______________

### 10.2 Dashboard-Expense Integration
- [ ] Note total on dashboard
- [ ] Add new expense
- [ ] Return to dashboard
- [ ] **Expected**: Total updated
- [ ] **Result**: _______________

### 10.3 Multi-Tab Sync
- [ ] Open app in two browser tabs
- [ ] Add expense in tab 1
- [ ] Refresh tab 2
- [ ] **Expected**: Expense appears in tab 2
- [ ] **Result**: _______________

---

## Summary

**Total Tests**: 60+
**Passed**: _____
**Failed**: _____
**Partial**: _____
**Skipped**: _____

**Pass Rate**: _____%

## Critical Issues Found
1. _______________
2. _______________
3. _______________

## Minor Issues Found
1. _______________
2. _______________
3. _______________

## Recommendations
1. _______________
2. _______________
3. _______________

---

**Tester Signature**: _______________
**Date Completed**: _______________


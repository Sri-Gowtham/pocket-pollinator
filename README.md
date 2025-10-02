# 🍯 Budget Bee - Smart Expense Tracker

Budget Bee is a comprehensive expense tracking and budget management application powered by AI. Track your spending, set budgets, get intelligent insights, and achieve your financial goals with ease.

## Project info

**URL**: https://lovable.dev/projects/5dd211e9-1e26-487b-ba7a-49bb6bfc1e8e

## ✨ Features

### Core Functionalities

#### 📊 Expense Tracking
- ✅ Add, edit, and delete expenses with full CRUD operations
- ✅ Categorize expenses (Food, Transport, Entertainment, Shopping, Bills, Health, Education, Other)
- ✅ Add descriptions, payment methods, and dates to expenses
- ✅ Search and filter expenses by category
- ✅ Export expenses to CSV format
- ✅ Real-time expense tracking with Supabase backend

#### 💰 Budget Management
- ✅ Create budgets with custom time periods (Weekly, Monthly, Quarterly, Yearly, Custom)
- ✅ Set alert thresholds for budget warnings
- ✅ Visual progress bars showing budget usage
- ✅ Edit and delete budgets
- ✅ Automatic calculation of spent amounts from expenses
- ✅ Budget alerts when approaching or exceeding limits

#### 🤖 AI-Powered Insights
- ✅ **Automatic Expense Categorization**: AI suggests categories based on expense descriptions
- ✅ **Fraud Detection**: Identifies unusual transactions that deviate from spending patterns
- ✅ **Spending Pattern Analysis**: Detects trends and patterns in your expenses
- ✅ **Financial Recommendations**: Personalized tips to improve financial health
- ✅ **Tax Insights**: Identifies potential deductions and tax-saving opportunities
- ✅ **Savings Opportunities**: Suggests areas where you can reduce costs
- ✅ **Budget Analysis**: Evaluates how well you're adhering to your budgets

#### 👤 User Profile & Personalization
- ✅ Profile management (name, email)
- ✅ Multi-currency support (USD, EUR, GBP, INR, JPY, AUD, CAD)
- ✅ Financial goals tracking with progress visualization
- ✅ Create and manage savings goals, investment targets, debt payoff plans
- ✅ Secure authentication with Supabase Auth

#### 📈 Dashboard & Visualizations
- ✅ Summary cards showing total expenses, budgets, and remaining amounts
- ✅ Interactive pie charts for category breakdown
- ✅ Line charts for spending trends
- ✅ Real-time statistics and metrics
- ✅ Color-coded alerts and warnings
- ✅ Responsive design for all screen sizes

#### 🎨 UI/UX Enhancements
- ✅ Beautiful bee-themed design with honey gradients
- ✅ Smooth animations and transitions
- ✅ Hover effects and interactive elements
- ✅ Custom scrollbar styling
- ✅ Loading states and skeletons
- ✅ Toast notifications for user feedback
- ✅ Honeycomb pattern backgrounds
- ✅ Mobile-responsive layout

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **Recharts** for data visualization
- **React Router** for navigation
- **React Query** for data fetching
- **date-fns** for date formatting

### Backend
- **Supabase** (PostgreSQL database)
- **Supabase Auth** for authentication
- **Supabase Edge Functions** (Deno) for serverless functions
- **Row Level Security (RLS)** for data protection

### AI Integration
- **Google Gemini 2.5 Flash** via Lovable AI Gateway
- Custom AI functions for:
  - Expense categorization
  - Spending analysis
  - Fraud detection
  - Financial insights generation

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/5dd211e9-1e26-487b-ba7a-49bb6bfc1e8e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/5dd211e9-1e26-487b-ba7a-49bb6bfc1e8e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

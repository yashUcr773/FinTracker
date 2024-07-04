# FinTracker App

Demo - [FinTracker.uk](https://FinTracker.uk/)

Test Account
- Email - demouser@mailsac.com
- Password - demo_user_1

## Introduction
The Budget Tracker and Financial Manager App is designed to help users manage their personal finances effectively. The app allows users to track expenses and generate reports to better understand their financial status.

## Features
- User authentication and authorization
- Add Transactions.
- Add Categories and Accounts to better classify the transactions.
- Generate graphs to visualize the spendings.
- Bulk upload Transactions.

## Tech Stack

- **Next.js 14**: Powering the frontend and server-side rendering.
- **Backend**: Backend Powered by Hono for better type safety.
- **Form Validation**: Implemented using Zod and React Hook Form.
- **Toasts**: Utilizing Sonner from shadcn-ui for feedback messages.
- **Authentication**: Managed by Clerk, supporting Google OAuth.
- **Components**: Shadcn
- **Database**: PostgresSQL from Neon.tech
- **Data Fetching** - React Query
- **CSS**: Styled with Tailwind CSS.
- **Icons**: Leveraging Lucide React and react-icons.
- **Database ORM**: Drizzle for database operations.
- **State Management**: Utilizing Zustand for state management.

## Running Locally

To run the project locally, follow these steps:

1. Clone the repository: `https://github.com/yashUcr773/FinTracker.git`.
2. Navigate to the project directory: `cd FinTracker`.
3. Install dependencies: `npm install`.
4. Run the development server: `npm run dev`.
5. The application will be accessible at `http://localhost:3000` by default.

## Environment Variables

The Discord Clone application relies on the following environment variables. Ensure these variables are properly set up before running the application.

- **`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`**: Public key provided by Clerk for client-side authentication.
- **`CLERK_PUBLISHABLE_KEY`**: Public key provided by Clerk for client-side authentication.
- **`CLERK_SECRET_KEY`**: Secret key provided by Clerk for server-side authentication.
- **`NEXT_PUBLIC_CLERK_SIGN_IN_URL`**: 
- **`NEXT_PUBLIC_CLERK_SIGN_UP_URL`**: 
- **`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`**: 
- **`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`**: 
- **`DRIZZLE_DATABASE_URL`**: 
- **`NEXT_PUBLIC_APP_URL`**: 


## Attribution

- The project idea was inspired by [Code with Antonio](https://www.youtube.com/watch?v=N_uNKAus0II).

## Planned Features

- [x] Bulk upload
- [x] Add categories and accounts
- [] Bulk Edit
- [] Subscription Tracker
- [] Set Budgets
- [] Set Finance Goals
- [] Set Custom Currency
- [] Allow multiple currencies?


Feel free to contribute and enhance the project!

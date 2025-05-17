# Mini Dashboard

A Next.js application with authentication, protected routes, and a clean coffee-milk UI theme.

## Features

- User authentication (register, login, logout)
- Protected routes with middleware
- Public and private pages
- REST API endpoints
- Prisma ORM with SQLite database
- Coffee-milk color theme UI

## Technologies Used

- Next.js 15 with App Router
- NextAuth.js for authentication
- Prisma ORM
- SQLite database
- Tailwind CSS for styling
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Wladyslaw13/Mini-Dashboard.git
   cd Mini-Dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a .env file in the root directory with:
   ```dotenv
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```
4. Initialize the database:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser

## Deployment

- This project is deployed on Vercel. You can view the live demo here (LINK).

## License

- This project is licensed under the MIT License - see the LICENSE file for details.

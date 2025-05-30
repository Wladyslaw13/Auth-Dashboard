<p align="center">
  <img src="assets/preview.gif" alt="Auth Dashboard Preview" />
</p>

<p align="center">
  <a href="https://github.com/Wladyslaw13/Auth-Dashboard/actions">
    <img src="https://github.com/Wladyslaw13/Auth-Dashboard/actions/workflows/ci.yml/badge.svg?cache_buster=123" alt="CI Status" />
  </a>
  <a href="https://coveralls.io/github/Wladyslaw13/Auth-Dashboard?branch=main">
    <img src="https://coveralls.io/repos/github/Wladyslaw13/Auth-Dashboard/badge.svg?branch=main&cache_buster=123" alt="Coverage Status" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" />
  </a>
</p>

---

# Auth Dashboard <img src="src/app/icon.png" height="40" />

A responsive admin panel application built with **Next.js**, **NextAuth**, **Prisma**, and **Tailwind CSS**.  
Includes modern features like OAuth authentication, dark/light/coffee theme toggle, i18n, and state management via Zustand.

---

## 🚀 Features

- 🔐 OAuth login with **Google** and **GitHub**
- 🌙 **Dark/light/coffee mode** switch
- 🌍 **Internationalization** support (i18n)
- 🔒 Protected routes with middleware
- 🧠 Global state management with **Zustand**
- 🔧 REST API endpoints with Prisma
- 💅 Fully responsive UI built with **Tailwind CSS**

---

## 🛠 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [i18next](https://www.i18next.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (local or cloud-hosted)

---

### 1. Clone the repository

```bash
git clone https://github.com/Wladyslaw13/Auth-Dashboard.git
cd Auth-Dashboard
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

> You can use services like **Railway**, **Neon**, **Render** or **Supabase** if you don’t want to set up a PostgreSQL server locally.

---

### 4. Set up the database

```bash
npx prisma migrate dev --name init
```

---

### 5. Start the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌍 Live Demo

This project is deployed on **Vercel**:  
👉 [View live](https://auth-dashboard-site.vercel.app/)

---

## 🧪 Development Notes

To maintain or contribute to this project, a working PostgreSQL database is required. For ease of setup, you can opt for managed cloud databases (e.g., [Supabase](https://supabase.com/), [Render](https://render.com/), [Railway](https://railway.app/), [Neon](https://neon.tech/)).

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to check [issues page](https://github.com/Wladyslaw13/Auth-Dashboard/issues).

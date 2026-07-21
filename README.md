# 🚀 Vordlabs

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-orange)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)

A modern AI-powered content automation platform built with **TanStack Start**, **React 19**, **Tailwind CSS**, and **Supabase**.

🌐 **Live Demo:** https://vordlabs.vercel.app/

---

# ✨ Features

- 🤖 AI-powered content generation
- 📅 Smart scheduling
- 🌍 Multi-platform publishing
- 🔥 AI content curation
- 📊 Analytics dashboard
- 🔐 Email & Google Authentication
- 📩 Contact form with database storage
- ⚡ Fast SSR using TanStack Start

---

# 🛠 Tech Stack

| Category | Technology |
|-----------|------------|
| Framework | TanStack Start |
| Frontend | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Routing | TanStack Router |
| Data Fetching | TanStack Query |
| Backend | Server Functions |
| Database | Supabase |
| Authentication | Supabase Auth |
| Validation | React Hook Form + Zod |
| Icons | Lucide React |
| Deployment | Vercel |

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/Nuelsti/vordlabs.git
cd vordlabs
```

Install dependencies

```bash
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file.

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=

SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_PROJECT_ID=
```

---

# 🚀 Running Locally

Development

```bash
npm run dev
```

Production Build

```bash
npm run build
```

Preview Production Build

```bash
npm run preview
```

Lint

```bash
npm run lint
```

Format

```bash
npm run format
```

---

# 📁 Project Structure

```
vordlabs
│
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── integrations/
│   ├── lib/
│   ├── routes/
│   ├── router.tsx
│   ├── routeTree.gen.ts
│   └── styles.css
│
├── supabase/
│   ├── migrations/
│   └── config.toml
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

# 🔐 Authentication

Supports:

- Email & Password
- Google OAuth
- Protected routes
- Session persistence

Powered by **Supabase Auth**.

---

# 🗄 Database

Current tables include:

- `contact_messages`
- `user_roles`

Database migrations are stored in:

```
supabase/migrations
```

---

# 📜 Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production application |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code using Prettier |

---

# 🚀 Deployment

The application is deployed on **Vercel**.

Production URL

https://vordlabs.vercel.app/

For Vercel deployment:

- Framework Preset: **TanStack Start**
- Build Command:

```bash
npm run build
```

- Install Command

```bash
npm install
```

No custom `vercel.json` configuration is required for the current deployment.

---

# 🎨 Design System

- Olive Green Brand Palette
- Warm Canvas Background
- Instrument Sans
- Instrument Serif
- Editorial / Organic Design Language

---

# 📈 Future Improvements

- AI-assisted content generation
- Social media integrations
- Analytics improvements
- Team collaboration
- Subscription billing
- Admin dashboard

---

# 📄 License

MIT License

© 2026 Vordlabs

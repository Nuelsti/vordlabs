# Vordlabs

A modern, scalable SaaS landing page and application built with TanStack Start, React, and Tailwind CSS. Features a content automation platform with AI-powered scheduling, multi-platform publishing, and smart content curation.

## Features

- **AI-Powered Content Generation** — Create months of content in minutes
- **Smart Scheduling** — Auto-optimised posting times across platforms
- **Multi-Platform Publishing** — One click to publish everywhere
- **Content Curation** — AI-suggested trending topics
- **Analytics Dashboard** — Track engagement and growth
- **User Authentication** — Secure signup/login with email/password and Google OAuth
- **Contact Form** — Reach out to the team with message storage

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7)
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **State & Data:** TanStack Query + TanStack Router
- **Backend:** Server functions via `createServerFn`
- **Auth & Database:** Lovable Cloud (Supabase)
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

## Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- A Lovable Cloud / Supabase project (for auth & database)

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd vordlabs
```

### 2. Install dependencies

Using **Bun** (recommended):

```bash
bun install
```

Or using **npm**:

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root with the following variables:

```env
# Supabase / Lovable Cloud
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id

# Server-side (same values)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_PROJECT_ID=your-project-id
```

> Replace the placeholder values with your actual Supabase project credentials. You can find these in your Lovable Cloud / Supabase dashboard under **Project Settings > API**.

## Running the App

### Development server

```bash
bun dev
```

Or with npm:

```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or the port shown in your terminal).

### Build for production

```bash
bun run build
```

Or:

```bash
npm run build
```

### Preview production build

```bash
bun run preview
```

Or:

```bash
npm run preview
```

### Lint & format

```bash
# Run ESLint
bun run lint

# Format with Prettier
bun run format
```

## Project Structure

```
vordlabs/
├── public/                  # Static assets (images, favicon, etc.)
├── src/
│   ├── components/          # Reusable UI components (shadcn/ui + custom)
│   ├── hooks/               # Custom React hooks (useAuth, etc.)
│   ├── integrations/        # Third-party integrations
│   │   ├── lovable/         # Lovable Cloud helpers
│   │   └── supabase/        # Supabase client, auth middleware, types
│   ├── lib/                 # Utility functions
│   ├── routes/              # TanStack Start file-based routes
│   │   ├── index.tsx        # Home / landing page
│   │   ├── about.tsx        # About page
│   │   ├── features.tsx     # Features page
│   │   ├── how-it-works.tsx # How it works page
│   │   ├── pricing.tsx      # Pricing page
│   │   ├── contact.tsx      # Contact page
│   │   ├── auth.tsx         # Authentication (login/signup)
│   │   └── api/             # Server API routes
│   ├── router.tsx           # TanStack Router configuration
│   ├── server.ts            # Server entry configuration
│   ├── start.ts             # Start instance with middleware
│   ├── routeTree.gen.ts     # Auto-generated route tree
│   └── styles.css           # Global styles + Tailwind CSS
├── supabase/
│   ├── migrations/            # Database migrations
│   └── config.toml          # Supabase local config
├── .env                     # Environment variables (not committed)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Database Setup

This project uses Lovable Cloud (Supabase) with the following tables:

- **`contact_messages`** — Stores messages from the contact form
- **`user_roles`** — Stores user roles (admin, user) for access control

Migrations are located in `supabase/migrations/`. To apply them:

1. Install the Supabase CLI
2. Link your project: `supabase link --project-ref your-project-id`
3. Push migrations: `supabase db push`

## Authentication

The app supports:

- **Email/Password** — Standard registration and login
- **Google OAuth** — One-click sign-in with Google

Auth pages are at `/auth`. Protected routes use the `requireSupabaseAuth` middleware.

## Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start the Vite development server |
| `build` | Build for production |
| `build:dev` | Build in development mode |
| `preview` | Preview the production build locally |
| `lint` | Run ESLint across the project |
| `format` | Format all files with Prettier |

## Design Tokens

The project follows an **organic utility** design direction:

- **Primary brand:** Olive green (`#3f6212`)
- **Background:** Warm canvas (`#fcfcf9`)
- **Typography:** Instrument Sans + Instrument Serif (italic accents)
- **Aesthetic:** Editorial desk planner — paper grain, soft botanical tones

## SEO

Each route has unique `head()` metadata (title, description, OG tags). The sitemap is auto-generated at `/sitemap.xml`.

## Deployment

This project is designed to deploy on platforms supporting TanStack Start / Vite SSR:

- **Lovable** — One-click publish from the editor
- **Vercel** — Add `adapter-vercel` configuration
- **Cloudflare Pages** — Native Worker support via `nodejs_compat`

## License

[MIT](LICENSE) — © Vordlabs
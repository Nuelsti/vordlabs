# 🚀 VORDLABS

<div align="center">

![VORDLABS Logo](https://img.shields.io/badge/VORDLABS-AI%20Content%20Platform-3A943F)

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-orange)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-black?logo=vercel)](https://vercel.com)

**AI-powered content planning and publishing platform for businesses.**

Generate a complete content calendar, create branded content with AI, review every post, and publish to multiple social media platforms from one workspace.

🌍 **Live Demo:** https://vordlabs.vercel.app/

</div>

---

# 📖 About VORDLABS

VORDLABS is an AI-powered content management platform designed for businesses that struggle to remain active online.

Instead of asking users to generate one post at a time, VORDLABS helps businesses create an entire content strategy in minutes.

Users simply answer a few questions about their business, and VORDLABS automatically generates:

- 📅 A complete content calendar
- ✍️ AI-written captions
- 🎨 Branded flyer designs
- 🖼️ Marketing visuals
- 📲 Social media-ready posts

Every post can be reviewed, edited, and manually published to connected social media platforms.

---

# ✨ MVP Features

## 🤖 AI Content Calendar

Generate weeks or months of business content using AI.

- Weekly content planning
- Monthly content planning
- Business-specific content ideas
- Platform-specific captions

---

## 🎨 AI Design Generation

Generate marketing creatives using:

- Business branding
- AI-generated captions
- Editable templates
- Brand colors

---

## 📅 Smart Content Calendar

Organize all generated content in one place.

Features include:

- Monthly calendar
- Weekly calendar
- Scheduled drafts
- Ready-to-publish content
- Published content history

---

## 🌐 Multi-Platform Publishing

Connect social media accounts and publish directly from VORDLABS.

Supported workflow:

- Review generated content
- Click **Post**
- Publish through Buffer API
- Receive reminders before scheduled publishing

---

## 📊 Dashboard Analytics

Track content activity including:

- Posts scheduled
- Drafts
- Published posts
- Ready-to-publish content
- Calendar overview

---

## 🔐 Authentication

- Email & Password
- Google OAuth
- Secure Sessions
- Protected Routes

Powered by Supabase Authentication.

---

# 🛠 Tech Stack

| Category | Technology |
|-----------|------------|
| Framework | TanStack Start |
| Frontend | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Routing | TanStack Router |
| Data Fetching | TanStack Query |
| Backend | TanStack Server Functions |
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

Preview

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

# 📂 Project Structure

```
vordlabs
│
├── public/
│
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

# 🗄 Database

Current database includes:

- contact_messages
- user_roles

Future tables:

- users
- brands
- social_accounts
- content_calendar
- posts
- designs
- analytics
- subscriptions

---

# 📅 Roadmap

### Phase 1 (Current MVP)

- Authentication
- Landing Page
- Dashboard
- Content Calendar
- Contact Form
- Brand Profile

---

### Phase 2

- AI Content Generator
- AI Flyer Generation
- Calendar Automation
- Brand Voice Training

---

### Phase 3

- Buffer Integration
- Social Publishing
- Multi-platform Scheduling
- Notifications

---

### Phase 4

- Analytics
- Team Collaboration
- Workspaces
- Client Management

---

### Phase 5

- Subscription Billing
- Admin Dashboard
- AI Brand Assistant
- API Access

---

# 🎨 Design System

Brand Identity

- Primary Color: Olive Green (#3A943F)
- Warm Canvas Background
- Instrument Sans
- Instrument Serif
- Minimal Editorial Design
- Soft Rounded Components

---

# 📈 Vision

Our vision is to become the operating system for AI-powered business marketing.

Instead of helping businesses create individual posts, VORDLABS aims to manage the entire content lifecycle—from planning and design to publishing and performance tracking—within one intelligent platform.

---

# 📜 License

MIT License

© 2026 VORDLABS. All rights reserved.
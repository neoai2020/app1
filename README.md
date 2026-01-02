# Robinhood

*Advanced AI-Powered YouTube Engagement Platform*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

## Overview

Robinhood is a neural engagement system that helps creators discover trending YouTube Shorts and generate authentic, high-quality comment packs using advanced AI. Built for creators who want to maximize engagement while maintaining authenticity.

## Features

- 🤖 **AI Content Scout**: Discovers trending YouTube Shorts in real-time
- ✨ **Neural Comment Generator**: Creates natural, human-like engagement comments
- 📦 **Pack Management**: Save and organize your generated comment packs
- 🎯 **Smart Distribution**: Tools to help you deploy comments strategically
- 📊 **Analytics Dashboard**: Track your engagement metrics
- 🔒 **Secure Authentication**: Built on Supabase Auth

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database & Auth**: Supabase
- **AI**: OpenAI GPT-4
- **Video API**: YouTube Data API v3
- **Styling**: Tailwind CSS with custom neumorphic design system
- **Deployment**: Vercel

## Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `env.example` → `.env.local` and configure:

#### Required (Supabase):
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for admin functions)

Get these from: Supabase Dashboard → Project Settings → API

#### Optional (AI & Video):
- `OPENAI_API_KEY` - Enables real AI comment generation (falls back to templates if not set)
- `OPENAI_MODEL` - Defaults to `gpt-4o`
- `YOUTUBE_API_KEY` - Enables real trending Shorts discovery (falls back to samples if not set)

### 3. Set Up Database

Run these SQL scripts in your Supabase SQL Editor (in order):

1. `scripts/001_create_schema.sql` - Creates tables and RLS policies
2. `scripts/003_user_trigger.sql` - Auto-creates user profiles
3. `scripts/007_make_offer_id_nullable.sql` - Schema updates
4. `scripts/009_create_system_offer_fixed.sql` - System defaults
5. (Optional) `scripts/002_seed_data.sql` - Demo data
6. (Optional) `scripts/006_unlock_all_upgrades.sql` - Auto-unlock all features

### 4. Run Development Server

```bash
NEXT_DISABLE_TURBOPACK=1 npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Design System

Robinhood uses a futuristic neumorphic design with:

- **Primary**: Purple (#a855f7) - Main UI elements
- **Secondary**: Magenta (#d946ef) - Accents and highlights
- **Accent**: Gold (#fbbf24) - Premium features and CTAs
- **Background**: Deep space (#0d0a1a) - Base layer
- **Typography**: Plus Jakarta Sans - Modern, premium feel

## Project Structure

```
p55account/
├── app/                    # Next.js app directory
│   ├── (protected)/       # Protected routes (require auth)
│   ├── actions/           # Server actions
│   ├── api/               # API routes
│   └── auth/              # Authentication pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utilities
│   └── supabase/         # Supabase client helpers
└── scripts/              # Database migrations
```

## Environment Variables Reference

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# OpenAI (Optional - enables AI generation)
OPENAI_API_KEY=sk-xxxxx
OPENAI_MODEL=gpt-4o

# YouTube (Optional - enables real trending data)
YOUTUBE_API_KEY=AIzaSyxxxxx
```

## Deployment

1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## License

Proprietary - All rights reserved

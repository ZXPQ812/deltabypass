# BypassHub starter project

This folder preserves the filenames and project structure from the supplied Markdown.
The third-party Platoboost checkpoint/key-bypass implementation is intentionally not included;
`app/api/bypass/route.ts` is a safe placeholder.

## Setup
1. Copy `.env.local.example` to `.env.local` and fill in your own credentials.
2. Run `npm install`.
3. Run `npm run dev`.

Configure Google OAuth and Supabase using their official documentation before deployment.
Keep service-role secrets server-side and never commit `.env.local`.

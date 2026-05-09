# BeatFlow Sanity CMS Integration

## What was added
- Sanity Studio config: `sanity.config.ts`, `sanity.cli.ts`
- Schema definitions: `sanity/schemas/schemaTypes.js`
- Reusable client: `lib/sanity/client.js`
- GROQ query map: `lib/sanity/queries.js`
- CMS service layer: `services/cms/contentService.js`
- Dynamic CMS API routes:
  - `/api/cms/featured-tracks`
  - `/api/cms/trending-playlists`
  - `/api/cms/homepage-sections`
  - `/api/cms/creator-spotlights`
  - `/api/cms/announcements`
  - `/api/cms/blogs-news`
  - `/api/cms/recommendations`
- Client hook for consumption: `hooks/useSanity/useSanityQuery.js`

## Covered content models
- Artists, tracks, albums, featured releases, playlists, genres
- Blog posts, announcements, homepage content, creator spotlights
- Platform banners, FAQ, category/tags
- AI vocal showcases, remix battles, admin recommendations

## Setup
1. Install dependencies:
   - `npm install --prefix frontend`
2. Copy env:
   - `cp frontend/.env.sanity.example frontend/.env.local` (or set vars manually on Windows)
3. Set values:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`
4. Run app:
   - `npm run dev --prefix frontend`

## GROQ/API usage examples
- Featured tracks:
  - `GET /api/cms/featured-tracks?limit=8`
- Homepage sections:
  - `GET /api/cms/homepage-sections`
- Announcements:
  - `GET /api/cms/announcements?limit=5`

## Architecture notes
- Sanity: editorial/campaign/media content
- PostgreSQL/Prisma: transactional and user data
- IPFS/Filecoin: decentralized audio payloads
- Redis: cache API responses where needed
- Existing Solana auth, ElevenLabs, and stream/tip APIs stay compatible

## Security and admin notes
- Keep `SANITY_API_TOKEN` server-only; never expose to client.
- Use Sanity dataset and role permissions for editor/admin separation.
- Prefer protected routes/middleware for admin actions in production.

## Deployment
- Add Sanity env vars to hosting provider (Vercel/Render/etc).
- Keep CDN enabled for read-heavy production traffic.
- Use Next ISR/revalidation (`revalidate` in service fetch calls).

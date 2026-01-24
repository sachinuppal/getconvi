# Deployment Guide: Getconvi v2

This application is a **Next.js 15 (App Router)** project using a **Virtual CMS** (JSON-based persistence) and **Tailwind CSS v4**.

## 1. Prerequisites
- Node.js 18+ installed.
- `npm` or `pnpm`.

## 2. Local Development
```bash
npm install
npm run dev
```
Access the site at `http://localhost:3000`.
Access the Admin Dashboard at `http://localhost:3000/admin`.

## 3. The "Virtual CMS" Architecture
Unlike a traditional CMS (Contentful, Sanity) that hosts content in the cloud, Getconvi v2 stores content **directly in the Git repository** as JSON files.

**Location:** `getconvi/content/*.json`
**Admin UI:** Changes made in `/admin` are written to these JSON files on your local disk.

### ⚠️ Important: Production Behavior
When you deploy to Vercel/Netlify, the file system is **read-only** at runtime.
*   **Reading Content**: Works perfectly (fast, cached).
*   **Editing Content**: The `/admin` dashboard **will not stick** in production because standard serverless functions cannot write back to the repo.

**Recommended Workflow:**
1.  Run the app locally (`npm run dev`).
2.  Use `/admin` to edit traffic, add studios, or generate AI assets.
3.  The changes are saved to your local `content/` JSON files.
4.  **Commit and Push** these changes to GitHub.
5.  Vercel/Netlify will auto-deploy the update.

*(Future Upgrade: To enable editing directly in production, connect a headless CMS like Sanity or use a Vercel Blob adapter in `api/cms`.)*

## 4. Environment Variables
Create a `.env.local` file for keys (needed for AI Studio):

```env
# Required for AI Asset Studio
GOOGLE_API_KEY=your_gemini_api_key_here

# Optional: Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
```

## 5. Deployment (Vercel)
1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Framework Preset: **Next.js**.
4.  Root Directory: `getconvi` (since the app is in a subfolder).
5.  Build Command: `npm run build`.
6.  Deploy.

## 6. Project Structure
*   `app/` - Pages and Routes.
*   `components/` - React UI components.
*   `content/` - **The Content Database (JSON)**.
*   `lib/data/` - TypeScript accessors for the content.
*   `types/` - TS Interfaces (`cms.ts`).
*   `public/` - Static assets (images, fonts).

## 7. Troubleshooting
*   **Build Error (Module not found)**: Ensure you aren't importing from `lib/data/studios.ts` (legacy). Use `lib/data/platforms.ts`.
*   **Admin writes failing**: Ensure `fs-extra` is installed and you are running locally.

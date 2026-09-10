# Vape Street BD — Problem & Fix Report (v2: In-Place Fix, Keep Supabase)

**Repo:** https://github.com/tanvirxmahtab-creator/vape-street-bd
**Approach:** fix the existing codebase in place — keep Next.js/React (as a build tool only) and keep Supabase — rather than rewrite from scratch. Target output: a static export that uploads directly to Hostinger Premium with zero Node.js running on the server.

This replaces the earlier recommendation to switch to Firebase and do a full vanilla rewrite. That version is still valid if you ever want it, but given Supabase is already fully configured, this is less work for the same fix.

---

## The key idea this fix depends on

Hostinger Premium not supporting Node.js means **no Node.js process running on the server.** It does not mean the code can't be *built* with Next.js and React. `next build` with `output: 'export'` (already partially set in your `next.config.mjs`) produces a plain folder of HTML, CSS, JS, and assets — no server involved once it's built. That exported folder is what gets uploaded to Hostinger. Node.js is only needed on the machine (or in Antigravity) doing the build, never on the host.

So the actual fix isn't "throw away Next.js" — it's "remove everything in this codebase that assumes a live server exists after that export," because right now several things do.

---

## What's actually broken (recap, same root causes as before)

1. **Cloud Run assumptions baked in.** `.env.example` shows this was scaffolded for Google Cloud Run — runtime-injected secrets, a self-referential `APP_URL` for "OAuth callbacks and API endpoints." None of that exists in a static export.
2. **Mixed Vite + Next.js tooling.** Both configs and dependency sets exist in one repo — unnecessary and a likely source of inconsistent builds.
3. **`express` as a dependency.** If admin/upload logic runs through it, it's dead on Hostinger — no Node process to run it.
4. **A hand-written `sync-export.js`** patched onto `next build` — fragile, and likely the source of missing/broken assets after export.
5. **Two lockfiles (`bun.lock` + `package-lock.json`)** — dependency drift risk.
6. **`@google/genai` / `GEMINI_API_KEY`** — needs a live server to call safely; can't survive in a static export regardless of anything else.
7. **Product upload calls a server route that won't exist** — this is the direct cause of the admin panel not working, and the fix is to make it call Supabase directly instead.

---

## The fix, concretely

- **Remove:** any Next.js API routes under `app/api/` or `pages/api/`, the Express server and its dependency, `@google/genai`/`GEMINI_API_KEY` and anything using it, `vite.config.ts` and its associated dependencies (`@vitejs/plugin-react`, `@tailwindcss/vite`), `sync-export.js` (replace with the standard `next build` export output unless part of it turns out to be doing something genuinely necessary), and one of the two lockfiles (keep `package-lock.json`, delete `bun.lock`, reinstall clean with npm).
- **Rewire:** wherever the admin product-upload form currently calls a server route, point it instead at direct `@supabase/supabase-js` client calls (insert/update/delete on the `products` table, upload to Supabase Storage) — the SDK is already a dependency, this is a calling-pattern fix, not a new integration.
- **Secure it:** since there's no server to gate writes anymore, security has to live in **Supabase Row Level Security (RLS) policies** — public read on `products`, insert/update/delete restricted to authenticated users only. This is the non-negotiable replacement for whatever server-side check used to (or was supposed to) protect writes.
- **Fix the assets:** compress `hero.mp4` and `scroll-animation.mp4`, and if `scroll-frames` is an uncompressed image sequence, re-encode and lazy-load it. This is independent of the backend/framework fix and needed either way.
- **Verify the export is actually complete:** after the fixes, `next build` should produce a self-contained `out/` folder with no leftover references to removed server routes — that folder is exactly what gets uploaded to Hostinger.

See **`vape-street-bd-antigravity-fix-prompt.md`** for the prompt to feed Antigravity, written to work directly against your existing repo.

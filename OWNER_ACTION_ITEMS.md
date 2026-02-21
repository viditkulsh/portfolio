# Portfolio — Owner Action Items (YOUR TO-DO List)

> This document lists everything **you** need to do manually that the code changes couldn't handle automatically. Each item has clear instructions.

---

## 🔴 PRIORITY 1 — Must Do Before Deploy

### 1. Set Up Resend (Contact Form)

The contact form sends emails via **Resend** — a free transactional email API. No SMTP, no Gmail App Passwords, works with any Google account type.

**Free tier:** 3,000 emails/month, 100/day — more than enough for a portfolio.

**Steps:**
1. Go to [https://resend.com](https://resend.com) and create a free account
2. Go to **API Keys** → **Create API Key** → give it a name → copy the key
3. **Set environment variables in Vercel Dashboard:**
   - Go to your project on [vercel.com](https://vercel.com) → **Settings** → **Environment Variables**
   - Add these two variables (apply to Production + Preview + Development):
     ```
     RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
     CONTACT_EMAIL  = your_email@gmail.com
     ```
4. **Redeploy** the project for changes to take effect.

> **Note on sender address:** When testing without a custom domain, Resend sends from `onboarding@resend.dev`. To send from a custom `@yourdomain.com` address, verify your domain in Resend → Domains → Add Domain.

> **If Resend is unreachable:** The form falls back to opening the user's email client with a pre-filled mailto link.

---

### 2. Set Up Gemini AI Key (AI Assistant)

If not already done:
1. Go to [https://ai.google.dev/](https://ai.google.dev/)
2. Create an API key
3. Add to `.env`:
   ```env
   REACT_APP_GEMINI_API_KEY=your_key_here
   ```

> **Without the key**: The AI assistant uses fallback keyword-matching responses. Still functional, just less intelligent.

---

### ~~3. Update OG Image URL~~ ✅ DONE

OG image and twitter:image now point to `https://vidit-kulshrestha.vercel.app/Logo/Icon1.jpg`. og:url is set to `https://vidit-kulshrestha.vercel.app/`.

---

### ~~4. Update Sitemap & Robots.txt Domain~~ ✅ DONE

Both `public/sitemap.xml` and `public/robots.txt` now use `vidit-kulshrestha.vercel.app`.

---

## 🟠 PRIORITY 2 — Should Do Before Going Live

### 5. Verify All Certificate Images

Your portfolio lists 19+ certificates in `src/data/portfolioData.js`. Each references an image in `public/images/certificates/`.

**Check that every image file exists:**
```
public/images/certificates/
├── coursera-blockchain-platforms.jpg
├── coursera-blockchain-basics.jpg
├── coursera-bits-bytes-networking.jpg
├── credly-aws-academy-cloud-foundations.jpg
├── ... (check all cert entries in portfolioData.js)
```

Any missing images will show as broken image icons. Either:
- Add the actual certificate screenshots, OR
- Remove the `image` field from certificates that don't have images

---

### 6. Verify All Project Images

Same check for `public/images/projects/`. Each project in `src/data/sections/projectsData.js` may reference images here. Missing images gracefully fall back to icon display, but real screenshots look much better.

**Recommended**: Take clean screenshots of each project and save them at the referenced paths.

---

### 7. Update Resume PDFs

Three resume PDFs exist in `public/resumes/`:
```
✅ Vidit Kulsh CV Blockchain.pdf
✅ Vidit Kulsh CV Full Stack.pdf
✅ Vidit Kulsh CV Software Eng.pdf
```

**Make sure these are current** — they may be outdated if your experience/projects have changed since they were last generated.

---

### 8. Favicon

Currently using `public/Logo/Icon1.jpg` as favicon. For best cross-browser support:
1. Convert `Icon1.jpg` to `.ico` format at [https://favicon.io/](https://favicon.io/)
2. Replace `public/favicon.ico` with your converted icon
3. Optionally generate PNG versions (192x192, 512x512) for PWA manifest

---

## 🟡 PRIORITY 3 — Nice to Have

### 9. Custom Domain (Optional)

Currently deployed at `vidit-kulshrestha.vercel.app`. If you later set up a custom domain (e.g., `viditkulshrestha.com`), update:
- `public/sitemap.xml` URLs
- `public/robots.txt` sitemap URL
- `public/index.html` OG meta URLs (`og:image`, `twitter:image`, `og:url`)

### 10. Performance Testing

After deploying, run these checks:
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) — Aim for 90+ on all categories
- [GTmetrix](https://gtmetrix.com/) — Check page load time
- [OG Meta Validator](https://www.opengraph.xyz/) — Verify social preview cards look correct
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) — Ensure mobile compatibility

### 11. Analytics Dashboard

Google Analytics is already integrated (tag `G-SV50M6BGWY` in `index.html`). Set up:
- A dashboard at [analytics.google.com](https://analytics.google.com) to track which modes (Story/Explore/Recruiter) visitors use most
- Custom events for mode switches, resume downloads, and contact form submissions

### 12. Image Optimization (Optional)

For better performance:
1. Convert all `.jpg`/`.png` images in `public/images/` to WebP format
2. Use tools like [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/)
3. Keep originals as fallbacks, update image paths in data files

---

## ✅ What Was Already Implemented

| Change | Status |
|--------|--------|
| Removed duplicate AI Assistant (`src/components/AI/`) | ✅ Done |
| Contact form with Resend API + mailto fallback | ✅ Done |
| OG meta tags (title, description, image, twitter cards) | ✅ Done |
| 404 Not Found page with glassmorphism UI | ✅ Done |
| Lazy loading for StoryMode, ExploreMode, RecruiterMode | ✅ Done |
| Suspense fallback with loading animation | ✅ Done |
| Enhanced ErrorBoundary with dark glassmorphism UI | ✅ Done |
| ScrollToTop on route changes | ✅ Done |
| Updated `manifest.json` (name, theme, icons) | ✅ Done |
| Added `robots.txt` and `sitemap.xml` | ✅ Done |
| Updated `.env.example` with Resend keys | ✅ Done |
| Image lazy loading (`loading="lazy"`) on project images | ✅ Done |
| Aria-labels on icon-only buttons (accessibility) | ✅ Done |
| RecruiterMode "Schedule Interview" → mailto link | ✅ Done |
| Twitter/OG meta tags for social sharing | ✅ Done |
| Self-hosted SMTP via Vercel serverless (`api/contact.js`) | ✅ Done |
| OG/meta URLs updated to `vidit-kulshrestha.vercel.app` | ✅ Done |
| Sitemap & robots.txt updated to actual domain | ✅ Done |

---

## Quick Start After Changes

```bash
# 1. Copy env file and fill in your keys
cp .env.example .env

# 2. Install dependencies (if needed)
npm install

# 3. Start dev server
npm start

# 4. Build for production
npm run build
```

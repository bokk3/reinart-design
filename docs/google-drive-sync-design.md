# Google Drive Dynamic Gallery Sync — Lean Design Plan

## 1. Objective & Vision
Allow the client (Rein) to simply drag-and-drop new project photos into a Google Drive folder from their phone or computer. The website automatically:
1. Scans the Drive folder for photos.
2. Organizes them into categories based on folder names (e.g. `Tafels`, `Kasten`, `Interieur`).
3. Serves the gallery data via a fast edge API (`/api/projects`).
4. Dynamically renders the masonry grid and lightbox on the website.

---

## 2. Why Previous Implementations Feel "Bloated" (Pitfalls to Avoid)

| Common Mistake | Why It Causes Bloat | The Lean Solution |
| :--- | :--- | :--- |
| **Installing `googleapis` NPM package** | 30MB+ package, relies on heavy Node.js core modules (`stream`, `http2`, `crypto`), incompatible with edge workers without heavy polyfills. | **Zero-dependency REST API**: Generate a Google Service Account JWT using native `crypto.subtle` (standard Web Crypto), then call `https://www.googleapis.com/drive/v3/files` directly via `fetch`. |
| **Querying Drive on every page load** | Slow latency (300–800ms TTFB), risks Google Drive API rate limits (1,000 queries/100s). | **Cloudflare Edge Caching (Cache API or Cloudflare KV)**: Cache the API response for 15–60 minutes. Visitors get ~20ms response times. |
| **External database (Supabase/Firebase/Prisma)** | Introduces a 3rd service, connection pools, schema migrations, and sync daemons. | **No database needed**: Google Drive is the single source of truth. Cloudflare KV or in-memory Cache acts as the cache layer. |
| **Direct hotlinking to raw Drive download URLs** | Raw `drive.google.com/uc?id=...` redirects multiple times, has strict rate-limiting, and can fail on high traffic. | **Use Google's CDN thumbnail endpoint** (`https://lh3.googleusercontent.com/d/{FILE_ID}=s1600` or `=w1200`) or proxy/cache images via Cloudflare CDN. |

---

## 3. Recommended Architecture

```mermaid
flowchart TD
    Client[Rein / Admin] -->|Drops photos| GDriveFolder[Google Drive: 'Rein Art Design Projects']
    
    subgraph Google Drive
        GDriveFolder --> Cat1[Subfolder: 'Tafels']
        GDriveFolder --> Cat2[Subfolder: 'Kasten']
        GDriveFolder --> Cat3[Subfolder: 'Interieur']
    end

    subgraph Cloudflare Pages Edge
        APIEndpoint["/api/projects (Pages Function)"]
        EdgeCache[(Cloudflare KV / Cache API)]
        
        APIEndpoint <-->|Check / Store Cache| EdgeCache
    end
    
    GDriveFolder -.->|Periodic fetch / on-demand sync| APIEndpoint
    
    subgraph Frontend (React + Vite)
        FrontendGallery[ProjectsSection.tsx] -->|fetch /api/projects| APIEndpoint
        FrontendGallery -->|Renders images with CDN urls| CDN[Google CDN / Cloudflare CDN]
    end
```

---

## 4. Google Drive Folder Convention (Zero Client Friction)

To make it effortless for the client:
- **Root Folder**: `Rein Art Design — Website Portfolio` (Shared with the Google Service Account as `Viewer`).
- **Subfolders = Categories**:
  - 📁 `Tafels`
  - 📁 `Kasten`
  - 📁 `Interieur`
  - 📁 `Archief` *(Optional: folders starting with `_` or `Archief` are ignored)*
- **File Naming Convention (Optional / Flexible)**:
  - If filename is `Eiken Eettafel Zoniënwoud.jpg`, the title defaults to `Eiken Eettafel Zoniënwoud`.
  - Alternatively, the image description field in Google Drive can be used for extra metadata if needed, but simple file titles work out-of-the-box.

---

## 5. Implementation Components

### A. Authentication & Drive Fetcher (Pure Web Standards)
- **Google Service Account**:
  - Store `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` in Cloudflare Pages Environment Variables / Secrets.
  - Generate standard signed RS256 JWT using standard `crypto.subtle` (built into Cloudflare Workers).
  - Exchange JWT for a 1-hour Google OAuth access token:
    `POST https://oauth2.googleapis.com/token`

### B. Cloudflare Pages Function (`app/functions/api/projects.ts`)
- Calls `GET https://www.googleapis.com/drive/v3/files`:
  - Lists subfolders to discover categories.
  - Lists images (`mimeType contains 'image/'`) inside each subfolder.
- Normalizes output to clean JSON:
  ```json
  [
    {
      "id": "1abc...",
      "title": "Tafel Es (Zoniënwoud)",
      "category": "Tafels",
      "imageUrl": "https://lh3.googleusercontent.com/d/1abc...=s1600",
      "thumbnailUrl": "https://lh3.googleusercontent.com/d/1abc...=s600",
      "modifiedTime": "2026-06-15T12:00:00Z"
    }
  ]
  ```

### C. Caching Strategy
1. **Passive Edge Cache**:
   - Return standard `Cache-Control: public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400`.
   - Cloudflare CDN automatically serves cached responses to visitors.
2. **On-Demand Cache Invalidation (Optional)**:
   - Provide `/api/projects?refresh=1&key=SECRET` to force-refresh when the client uploads new projects without waiting for cache expiry.

### D. Frontend Integration (`ProjectsSection.tsx`)
- Fetch from `/api/projects` with fallback to static portfolio items if offline/error.
- Keep the existing category filtering ("Alles", "Tafels", "Kasten", "Interieur") and masonry layout.
- Smooth skeleton loading or fade-in using existing GSAP animations.

---

## 6. Next Steps to Build It
1. Create a Google Cloud Project & Service Account (get JSON key).
2. Create Google Drive folder structure & share with the service account.
3. Add `app/functions/api/projects.ts` in this repo.
4. Add environment secrets to Cloudflare Pages.
5. Connect `ProjectsSection.tsx` to the API.

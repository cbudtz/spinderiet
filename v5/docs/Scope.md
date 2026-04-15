# Project scope — Lægerne i Spinderiet (v5)

## Purpose

Reimplement the existing public clinic website as a **SvelteKit app in `v5/`**, replacing the **root Next.js frontend** and **Strapi** with a **single stack**: SvelteKit, PostgreSQL, Drizzle (repository pattern), and Better Auth where staff-only features are needed. The experience and information set should match **[laegerneispinderiet.dk](https://laegerneispinderiet.dk)** and the current Next.js information architecture, without depending on an external headless CMS. The system should be extensible as a CMS system - using predefined Building blocks - E.g. Jumbotrons, Picture+Text blocks.

## Background

- **Legacy app**: Next.js (root `pages/`, `components/`) loads page JSON from Strapi via `NEXT_PUBLIC_API_URL` (`api/api.js` → `apiGetStaticProps("<slug>")`). Each route expects a `content` array (Strapi dynamic zone).
- **Legacy blocks** (`PageContent.js`): `jumbo` (responsive hero image), `col2` (two-column markdown, optional titles, optional `big` left/right), `fullwidth` (markdown), `table` (markdown cells; `|` / `;` delimiters). Markdown supports raw HTML, Strapi upload URLs, image sizing via alt text, iframes.
- **Legacy admin**: `/admin` only redirects to hosted Strapi admin — **not** a product feature of the public site.
- **Analytics**: `_app.js` loads **Umami** (`umami.4a4b.dk`). v5 scope: **keep the same snippet** (see Dependencies); retiring it is a separate product change.

## In scope

### Information architecture (routes)

Mirror the legacy primary navigation (see `components/TopBar.js`):

| Route | Legacy Strapi slug | Intent |
|--------|-------------------|--------|
| `/` | `frontpage` | Forside |
| `/laegerne` | `laegerne` | Lægerne |
| `/personale` | `personale` | Personale |
| `/om` | `om` | Om klinikken |
| `/speciallaeger` | `speciallaeger` | Speciallæger |
| `/priserpatient` | `priserpatient` | Priser for patienter |
| `/vagtring` | `vagtring` | Vagtring |
| `/oevelser` | `oevelser` | Øvelser og vejledninger |
| `/priserattester` | `priserattester` | Priser på attester |
| `/problemer` | `problemer` | Problemer med e-konsultation / receptfornyelse / tidsbestilling |
Possibly other routes on demand - system should be extensible.

### Navigation (TopBar)

- The **TopBar** is built from a persisted **menu config** (ordered items, labels, optional parent group for dropdowns such as “Praktisk information”) — not by inferring the tree solely from `SitePage` rows. Links point at public paths / slug-backed routes as configured.

### Forside (`/`) and slugs

- The **frontpage** is **slug-driven** like other pages: default canonical slug **`frontpage`** maps to `/` (implementation may support an ordered **list of slugs** whose blocks are concatenated for `/` if product needs multiple sources).
- No special-case hardcoded React/Svelte page body for production home: **compose from DB** like the rest of the IA.

### Content parity with the live site

The production homepage at [laegerneispinderiet.dk](https://laegerneispinderiet.dk) should be covered in v5 (exact copy can be migrated from Strapi export or manual transfer):

- **Velkomst**: clinic name, doctors (Laura Lundby, Johannes Sandgaard, Sune Tybjerg), specialty line.
- **Aktuelt**: e.g. videokonsultation notice; **Noteless** patient information (bullets on no audio retention, 24h deletion, EU storage, GDPR, MitID for staff) — structured or markdown as needed.
- **Bestil tid / kontakt**: prominent link to **Patientportalen** (e.g. Min Læge / EG Clinea — legacy pattern: external URL with clinic id).
- **Praktisk**: **Adresse** (Valby Torvegade 13, 2500 Valby, indgang ved Søstrene Grene), **telefon** (72 13 60 13).
- **Åbningstider**: **Konsultation** and **Telefontid** schedules (including shared Valby vagttelefon notes where applicable).

### Presentation

- Responsive layout; hero imagery where the legacy `jumbo` block was used (responsive image formats equivalent to Strapi’s `formats.small` … `xlarge` behavior).
- Two-column sections with mobile-friendly behavior (legacy: tab-style jump links under ~992px when both titles exist).
- Tables and rich text from markdown where legacy used `CMSTable` / `MarkDown`.
- **Raw HTML** in authored body content remains **in scope** (legacy used HTML inside markdown / WYSIWYG output). Apply a **clear trust/sanitization policy** in implementation (e.g. staff-only authoring + allowlist); application chrome still uses shared components per Requirements.

### Technical (v5)

- Content served without Strapi: **database-backed pages**
 — **no runtime dependency on Strapi**.
- **Legacy content migration** is performed by a **one-off script** (not a standing sync to Strapi); see [Requirements.md](./Requirements.md) § Content migration.
- **First staff user** is provisioned from environment variables (**`ADMIN_USER`**, **`ADMIN_PASS`**) via an **idempotent** seed step; see Requirements § Staff bootstrap.
- Align with [Requirements.md](./Requirements.md): SvelteKit `+server.ts` for APIs, onion-style layering, Drizzle + repositories, shared UI components, Better Auth for any protected flows.

## Out of scope (initial)

- **Strapi** (and `/admin` redirect to `spinderietapi.4a4b.dk`): removed; no requirement to replicate Strapi Admin UI in v1 unless explicitly added later.
- **Patient booking inside v5**: booking remains via external patient portal; v5 only links/embeds as today.
- **Noteless / journal systems**: informational copy only; no integration with Noteless APIs.

## Dependencies & integrations

- **External**: Patient portal URL (preserve current production link pattern).
- **External**: Umami analytics snippet - Use same snippet.

## Acceptance criteria (high level)

- All routes in the information-architecture table exist and render without Strapi; no `NEXT_PUBLIC_API_URL` equivalent required for normal operation.
- Public content on `/` matches the intent and coverage of [laegerneispinderiet.dk](https://laegerneispinderiet.dk) (welcome, aktuelt, Noteless info, booking CTA, address, phone, hours).
- Navigation matches legacy structure; internal links work; external patient links open correctly.
- Layout works on mobile and desktop; images and markdown behave reasonably (including large images and tables).
- Stack and patterns conform to **Requirements.md** (Drizzle + repo, UI components, Better Auth when needed).
- **Staff-only area**: Instead of having to use strapi for site updates - it should be possible to login and edit pages with a wysiwyg editor using building blocks.

## Constraints

- Stated in [Requirements.md](./Requirements.md) (tech stack, architecture, UI rules).
- Danish language content for all public copy unless stakeholders request bilingual later.
- Existing content must be migrated to new site.

## Open decisions

- **WYSIWYG stack**: editor/library and how it maps to the persisted block schema ([Requirements.md](./Requirements.md) § Staff authoring).
- **Strapi → v5 migration script**: export format (e.g. Strapi REST/JSON dump), ordering, media file copy into upload dir, and per-slug validation checklist — implementation detail of the **one-off** script.

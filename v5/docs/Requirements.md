# Functional requirements

Scope and intent: [Scope.md](./Scope.md).

## Use cases

Numbering: **major.minor** — major actor area (1 public, 2 staff, 3 maintainer); minor for future splits (e.g. 1.2, 2.2). Full narratives live under `docs/use-cases/`.

| ID | Summary | Document |
|----|---------|----------|
| **UC 1.1** | Public visitor: browse IA, view blocks, use patient portal link (no in-app booking). | [UseCase1.1.md](./use-cases/UseCase1.1.md) |
| **UC 2.1** | Staff editor: Better Auth login, WYSIWYG page edit using same building blocks as public site. | [UseCase2.1.md](./use-cases/UseCase2.1.md) |
| **UC 3.1** | Maintainer: add routes/slugs and evolve IA without redesigning the core block/page model. | [UseCase3.1.md](./use-cases/UseCase3.1.md) |

## Extracted features

### Routing & IA

- Provide all routes listed in Scope (forside, lægerne, personale, om, speciallæger, priser patient, vagtring, øvelser, priser attester, problemer). Routes should be dynamic — e.g. from the DB.
- Support **adding further public routes** without redesigning the core model (extensible IA).

### Navigation menu (TopBar)

- The **TopBar** is driven by a persisted **menu configuration** (items with label, target path or slug reference, optional parent for nested/dropdown groups, sort order). Staff or migration seeds the initial structure to match legacy TopBar; edits go through staff tooling or controlled config as implemented.
- Menu config is **separate** from automatic inference from all `SitePage` rows (pages can exist without appearing in the menu).

### Forside / live-site parity (`/`)

- **`/`** is resolved like other public pages: content comes from **`SitePage`** row(s) by **slug** — canonical slug **`frontpage`**. If an **ordered list of slugs** is configured for `/`, **concatenate** each page’s `PageBlockInstance` sequence in that order (single-slug list is the default case).
- **Velkomst**: clinic branding, named doctors (Laura Lundby, Johannes Sandgaard, Sune Tybjerg), specialty line (speciallæger i almen medicin).
- **Aktuelt**: time-sensitive notices (e.g. videokonsultation); **Noteless** patient-facing information (no audio stored, 24h deletion, EU storage, GDPR, MitID for staff access) — as structured blocks and/or markdown as appropriate.
- **Bestil tid / kontakt**: clear call-to-action and link to **Patientportalen** (preserve production URL pattern, e.g. Min Læge / EG Clinea with clinic id).
- **Praktisk**: address (Valby Torvegade 13, 2500 Valby, indgang ved Søstrene Grene), phone (72 13 60 13).
- **Åbningstider**: consultation hours and phone hours, including shared Valby vagttelefon notes where applicable.

### Building blocks (CMS)

- Pages are **database-backed**; **no runtime dependency on Strapi** or other external headless CMS.
- Content is composed from a **fixed, predefined set of building blocks**, extensible over time, including at minimum parity with legacy: **hero / jumbotron**, **two-column markdown** (optional titles, optional emphasis left/right), **full-width markdown**, **table** (markdown-capable cells; support legacy-style row/column delimiters or equivalent rendering).
- **Raw HTML** in block payloads (**`bodyHtml`**, HTML fields inside **`componentConfig`**, migrated legacy copy) is **explicitly allowed** — parity with legacy `react-markdown` + `rehype-raw` style content. Define and document **sanitization or trust boundaries** (e.g. staff-only authoring, tag allowlist) so XSS risk is controlled; do not strip HTML by default if it would break migration.
- Rendering supports **responsive images** (multiple widths / `srcset` or server-side variant selection equivalent to legacy Strapi format steps), **iframes** where allowed by policy, sensible **large vs inline images**.
- **Responsive layout**: two-column blocks switch to a **mobile-friendly** pattern (legacy: jump links / stacked sections under ~992px when both column titles exist).

### Staff authoring

- **Better Auth** (or equivalent per tech stack) protects the **staff-only** editing area.
- Staff can **edit pages** via a **WYSIWYG** workflow that maps to the same **building blocks** as the public site (what you edit is what visitors see).
- Staff (or equivalent) can maintain the **menu config** used by the TopBar (items, groups, order, targets).
- Replacing Strapi for routine site updates is **in scope** (no dependency on Strapi Admin).

### Staff bootstrap (first user, idempotent)

- The **first** staff account is created from environment variables **`ADMIN_USER`** (e.g. email/login identifier) and **`ADMIN_PASS`** (initial password).
- Provisioning runs as an **idempotent** seed: **re-running must not fail** and **must not create duplicate users** for the same `ADMIN_USER` (if the account already exists, skip or no-op).
- Document variables in [`.env.example`](../.env.example); production should inject secrets via the host’s secret mechanism, not commit real passwords.

### Integrations

- **Umami**: include the **same analytics snippet** as legacy (`umami.4a4b.dk`, existing website id) unless explicitly retired later.
- **Patient portal**: external link only; **no** in-app booking engine.

### Content migration

- **Existing content** from the current site / Strapi **must be migrated** into the new database-backed model so v5 can replace production without manual re-entry of full site copy.
- Migration is implemented as a **one-off script** (CLI under the repo, e.g. `npm run migrate:strapi` or `tsx scripts/migrate-strapi.ts`): read Strapi export or API snapshot, map slugs → `SitePage` + `PageBlockInstance` rows (HTML + `componentConfig`), copy media into the **upload** directory, then exit. **No** ongoing Strapi sync in production.

### Explicit exclusions

- Strapi and legacy `/admin` redirect; **no** Noteless/journal API integration (informational copy only).

---

# Non-functional requirements / Constraints

## Tech-stack

- **Runtime / app**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5), TypeScript, Vite; deploy target `@sveltejs/adapter-node`.
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`).
- **Data**: PostgreSQL (`postgres` driver), [Drizzle ORM](https://orm.drizzle.team/) with **repository pattern** — domain/application code talks to repos; repos encapsulate Drizzle queries, schema, and block/page persistence.
- **Auth**: [Better Auth](https://www.better-auth.com/) for staff sign-in/session (CLI schema generation into `auth.schema.ts` as in project scripts).
- **API / server data**: Use SvelteKit’s built-in **[server routes / API endpoints](https://svelte.dev/docs/kit/routing#server)** (`+server.ts` with `GET`/`POST`/… handlers) for server endpoints and data access; **do not** use `load` functions (`+layout.server.ts` / `+page.server.ts` `load`) as the primary pattern for fetching app data — keep loads minimal or absent where the API layer covers it.
- **Architecture**: **Onion / clean-ish layering** — inner domain/use-cases stay free of framework and DB details; outer layers (HTTP/API, persistence) depend inward; direction of dependencies points toward the core.
- **UI convention**: **Always use shared UI components** for **application chrome** (shell, TopBar, staff UI, forms, layout primitives). **Exception:** **CMS-authored HTML** inside block payloads may be injected via a controlled renderer (e.g. Svelte `{@html …}` behind sanitization/trust policy) — that is not “ad-hoc feature-page HTML”; it is **stored content**.
- **Quality**: ESLint, Prettier, Vitest (incl. browser mode), Playwright for e2e.

## Locale & copy

- **Danish** for all public-facing copy unless stakeholders later request bilingual content.

## Acceptance alignment

- Satisfy the acceptance criteria in [Scope.md](./Scope.md) (routes without Strapi, forside parity, navigation, responsive/markdown behavior, stack conformity, staff editing with blocks).

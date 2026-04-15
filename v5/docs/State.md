# Project state (for humans & agents)

**Purpose:** Single place to record what is implemented vs planned. **Update this file** when you finish a slice of work so the next session starts from facts, not guesses.

**Specs (read first):** [Scope.md](./Scope.md) (what we build), [Requirements.md](./Requirements.md) (how), [use-cases/](./use-cases/) (UC narratives), [Domain.puml](./Domain.puml) (entities).

**Legend (use consistently):** `[]` not started · `[~]` in progress · `[?]` coded, not fully tested · `[x]` done / verified in dev or CI

---

## 1. Public site — routes, menu config & frontpage

*(Production routes under `src/routes/`; exclude `demo/` unless promoted. **TopBar** = persisted **menu config** (`MenuConfig` / `NavMenuItem`). **`/`** = **slug-backed** pages, default `frontpage`, optional ordered multi-slug merge per Requirements.)*

## 2. Content model — pages & building blocks

*(Drizzle schema, repos, block types, migration from Strapi.)*

## 3. Staff area — auth & WYSIWYG editing

*(Better Auth gates, editor UI, save pipeline → same blocks as public.)*

## 4. HTTP API — `+server.ts` & contracts

*(Public/staff JSON endpoints; no `load()`-as-primary-data pattern per Requirements.)*

## 5. Media — uploads & responsive images

*(Storage, variants, alignment with legacy jumbo/table/markdown images.)*

## 6. Shared UI — design-system components

*(Reusable components; feature pages should compose these, not raw HTML.)*

## 7. Integrations — analytics & external links

*(Umami snippet, patient portal URLs, env/config.)*

## 8. Tests, lint, and deployment notes

*(Vitest, Playwright, adapter-node, anything CI/deploy-specific.)*

## 9. Known issues, risks, and open questions

*(Blockers, tech debt, decisions pending.)*

---

# Planned next actions (priority backlog)
- If this section is empty, derive tasks from [Requirements.md](./Requirements.md) and [Scope.md](./Scope.md).
- Make separate feature TODO.md in /features
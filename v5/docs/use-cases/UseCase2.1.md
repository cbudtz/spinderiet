# UC 2.1 — Staff editor: sign in and edit pages with building blocks

| Field | Value |
|--------|--------|
| **ID** | UC 2.1 |
| **Actor** | Staff editor (klinikkens redaktør/admin) |
| **Priority** | Must |

## Goal

Godkendt personale kan logge ind i et **staff-only** område og opdatere websidens indhold via en **WYSIWYG**-arbejdsgang, der bygger sider af de samme **foruddefinerede building blocks**, som den offentlige side renderer — uden Strapi.

## Preconditions

- Mindst én staff-konto findes (første bruger oprettes via **idempotent** seed fra **`ADMIN_USER`** / **`ADMIN_PASS`** i miljøet; se [Requirements.md](../Requirements.md) § Staff bootstrap).
- Bruger har gyldig staff-session (Better Auth).
- Sider og blokke findes i databasen (evt. efter **one-off** Strapi-migrationsscript).

## Main success scenario

1. Editor navigerer til staff-login.
2. Editor autentificerer sig (Better Auth).
3. Editor vælger en side (slug) at redigere.
4. Editor tilføjer, fjerner eller ændrer blokke i WYSIWYG, der mapper til domænebloktyper (hero, to kolonner, fuld bredde, tabel m.m.).
5. Editor gemmer ændringer.
6. Offentlige besøgende ser opdateret indhold ved næste fetch (jf. public read path).

## Extensions / alternate flows

- **A1 — Uautoriseret**: Adgang til staff-område uden session afvises (403/redirect til login).
- **A2 — Validering**: Ugyldig blok-data afvises med fejl, eksisterende public version forbliver uændret eller versioning-strategi følges (implementationsvalg).

## Postconditions

- Opdateret sideindhold er persistet i DB og konsistent med block-schemaet.

## Non-goals (for denne UC)

- Strapi Admin eller ekstern CMS.
- Rollemodel ud over “staff kan redigere” (finere roller kan komme senere).

## Traceability

- [Requirements.md](../Requirements.md) — § Staff authoring, § Staff bootstrap, § Building blocks, § Content migration, Auth (Better Auth), Tech-stack.
- [Scope.md](../Scope.md) — Acceptance: staff-only area, WYSIWYG, building blocks.
- [Domain.puml](../Domain.puml) — `PageComposition`, `BlockContentEditing`, `SitePage`, `PageBlockInstance`.

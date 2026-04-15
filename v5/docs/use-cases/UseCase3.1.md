# UC 3.1 — Maintainer: extend information architecture without breaking the block model

| Field | Value |
|--------|--------|
| **ID** | UC 3.1 |
| **Actor** | Maintainer (udvikler/drift med adgang til deployment/DB) |
| **Priority** | Should |

## Goal

Nye offentlige routes/sider kan tilføjes over tid (jf. Scope: “possibly other routes on demand”) **uden** at omdesigne kernen i content-modellen: sider forbliver **database-backed** lister af **building blocks** med stabile typer og persistensmønster.

## Preconditions

- Eksisterende `SitePage` / slug-model og block-typer er på plads eller udvides bagudkompatibelt.

## Main success scenario

1. Maintainer (eller migration/seed) opretter ny `SitePage` med unikt slug og evt. navigationsmetadata.
2. Maintainer tilknytter initial blok-sekvens (kan være tom eller fra skabelon).
3. Public routing resolver slug til sideindhold via samme pipeline som eksisterende sider.
4. Navigation/opdatering af menu kan inkludere den nye side uden ændring af block-kontrakten for eksisterende sider.

## Extensions / alternate flows

- **A1 — Ny block-type**: Introduktion af en **ny** block-type sker som udvidelse af enum/schema + renderer + editor — eksisterende sider påvirkes ikke.
- **A2 — Migration fra legacy**: Engangs-migration fra Strapi til DB bevarer semantik per side/slug (relateret separat krav, men ofte maintainer-drevet).

## Postconditions

- Ny side er tilgængelig for [UC 1.1](./UseCase1.1.md) og kan redigeres under [UC 2.1](./UseCase2.1.md).

## Non-goals (for denne UC)

- Selvbetjent “opret ny side” i WYSIWYG uden teknisk skridt (medmindre senere krav tilføjes).

## Traceability

- [Requirements.md](../Requirements.md) — § Routing & IA (dynamic routes, extensible IA), § Building blocks (DB-backed, extensible block set).
- [Scope.md](../Scope.md) — IA-tabel, extensibility note.
- [Domain.puml](../Domain.puml) — `SitePage`, `PageBlockInstance`, block catalog.

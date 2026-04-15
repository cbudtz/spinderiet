# UC 1.1 — Public visitor: informational site and booking handoff

| Field | Value |
|--------|--------|
| **ID** | UC 1.1 |
| **Actor** | Public visitor (patient, pårørende, andre) |
| **Priority** | Must |

## Goal

Besøgende kan finde klinikkens praktiske informationer, åbningstider og kontakt, og komme videre til **ekstern patientportal** for tidsbestilling — uden login på v5-sitet.

## Scope notes

- Dækker hele den offentlige informations-IA fra [Scope.md](../Scope.md) (forside, lægerne, personale, om, speciallæger, priser, vagt, øvelser, attester, problemer).
- Forsideindhold jf. [laegerneispinderiet.dk](https://laegerneispinderiet.dk): velkomst, aktuelt, Noteless-information, tydelig CTA til patientportal, adresse, telefon, konsultations- og telefontider.

## Preconditions

- Ingen.

## Main success scenario

1. Besøgende åbner sitet (typisk `/` — indhold fra **slug(s)**, standard **`frontpage`**, jf. Requirements).
2. Besøgende bruger **TopBar** bygget fra **menu config** til at finde relevant side (slug/DB-styret route).
3. Sider vises med korrekt **building blocks**-layout (markdown, tabeller, hero, to kolonner m.m.).
4. Besøgende finder link til patientportal og forlader sitet til booking hos tredjepart.

## Extensions / alternate flows

- **A1 — Mobil**: Samme indhold; to-kolonne-blokke skifter til mobilvenlig visning (jf. Requirements, ~992px).
- **A2 — Analytics**: Sidevisninger kan måles via Umami (jf. integrationskrav).

## Postconditions

- Ingen persistent tilstand på v5 ud over evt. analytics-session hos tredjepart.

## Non-goals (for denne UC)

- Booking eller login i v5.
- Integration til Noteless API (kun informationscopy).

## Traceability

- [Requirements.md](../Requirements.md) — § Extracted features (Routing, Forside parity, Building blocks, Presentation, Integrations: patient portal), § Content migration (one-off script).
- [Scope.md](../Scope.md) — IA-tabel, content parity, out of scope booking.

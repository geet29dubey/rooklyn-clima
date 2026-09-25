# Responsive and policy audit — 24 September 2026

## Scope

Updated the existing landing page without replacing its branding, font family, sales copy, contact forms, demo destinations or tracking configuration. Added local legal, privacy and cookie pages for English, Spanish and Italian. Spanish content comes from the three supplied Word-exported HTML documents; English and Italian retain every paragraph and table. NIF/NIE is Z0680759X throughout, as confirmed by the owner. Source documents were not edited.

## Browser verification

Tested the production static export at localhost:3010 in all three languages at each width below (30 combinations). No page-level horizontal overflow or overlapping header groups was found after correcting the Spanish tablet header and translated tagline sizing.

| Widths | Header height including border | Navigation | Hero heading |
| --- | --- | --- | --- |
| 320, 360, 375, 390, 430 | 67px | Compact logo, language, hamburger; contact inside menu | 34–38px |
| 768 | 77px | Language, demo, hamburger; contact inside menu | 48px |
| 1024 | 87px | Desktop links, language, demo and contact | 52px |
| 1280, 1440 | 87px | Full desktop navigation | 58px |
| 1920 | 87px | Full desktop navigation | 64px |

- Visually reviewed desktop, Spanish tablet and mobile heroes, mobile footer and policy layout. Tablet hero columns stack; mobile buttons remain reachable before supporting copy.
- Mobile sections use 60px vertical padding and cards use 22px with natural heights. Tablet sections use 80px; desktop sections use 96px. The container caps at 1480px.
- Mobile demo button is 48px high with approximately 8px wrapper padding and safe-area support. Footer visibility hides it; page bottom padding keeps final content reachable.
- Footer uses 44px mobile / 64px desktop vertical padding, a compact logo and 44px legal-link touch targets.
- Opened mobile navigation and followed contact to its section. Checked keyboard language opening, Escape dismissal, switching between localized policy routes, and preservation of campaign query and section hash.
- Cookie preferences still open. Policy pages render full document content and have no mobile sales CTA. Tables scroll inside their own region on narrow screens.
- Mouse-hover opening is implemented via pointer enter/leave handlers; the browser automation API did not expose a hover action, so no automated pointer-hover claim is made.

## Automated checks

- Production Next.js build: pass; 20 generated routes, including nine policy routes.
- TypeScript (`tsc --noEmit`): pass.
- Existing `qa/verify.mjs`: pass, including locale content, destinations, consent and static deployment checks.
- Existing `qa/contact-events.mjs`: pass, including localized submission redirect validation, deduplication and listener cleanup.
- New `qa/policies-and-language.mjs`: pass for policy routes, footer links, translation structure, identifier consistency, English default, saved preference and unavailable local storage.
- `git diff --check`: pass (repository line-ending warnings only).
- Lint: unavailable; the project has no lint script or configured linter.

No real lead was submitted, no deployment was performed, and external GHL form internals were not changed. CSS safe-area handling was checked in source; physical iPhone hardware was not used.

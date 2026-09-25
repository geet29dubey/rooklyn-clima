# Rooklyn HVAC landing page

Next.js App Router, TypeScript, Tailwind CSS, statically generated Server Components, with small Client Components for navigation, dialogs, consent and analytics. Spanish (Spain), international English and Italian share the same page components and central dictionaries. Manrope is self-hosted via `next/font/local` (no browser requests to Google).

## Run and deploy

### Start on this Windows computer

Double-click `start-dev.cmd` in the project root, or run it from Command Prompt. It selects the existing compatible Windows Node runtime, checks the Node version, and starts Next.js from the correct directory. Open the local URL printed in the terminal; Next.js may choose another port if 3000 is occupied by the static preview. Keep that terminal open while developing.

If your prompt starts with `/mnt/c/`, you are in WSL. Run `exit` to return to Windows before using this launcher. Node 18 in WSL cannot run this Next.js version. The Windows dependencies were installed with pnpm; use the same package manager and environment for this checkout rather than running `npm install` over that dependency tree. The `app/` directory contains routes; the project root is `C:\Users\lenovo\Desktop\AUREACLIMA`.

### Standard commands

Requires Node.js 20.9+ and pnpm. The committed pnpm lockfile fixes package versions.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm build
pnpm verify
pnpm start
```

The build creates `out/`. Deploy that complete directory to a static host. Route `/es/`, `/en/` and `/it/` and their policy/thank-you paths to their `index.html`; serve `out/404.html` for missing paths with HTTP 404 status. Do not configure a single-page catch-all to `index.html`. `/` redirects in the browser to the saved language, defaulting to English, and includes language links without JavaScript. Each language page is fully rendered without JavaScript. The global 404 uses the URL locale or saved language on hydration, with English as its static fallback.

This delivery is prepared for deployment only. No DNS or custom-domain publishing has been performed. Publish `clima.rooklyn.co` only after the owner's approval. `robots.txt`, canonical URLs, hreflang, sitemap and Open Graph metadata use `NEXT_PUBLIC_SITE_URL`. No social image was supplied or requested, so no image URL is fabricated.

`pnpm start` previews the static export at `http://localhost:3000`, bound to the local computer. Rebuild before previewing changes.

## Revenue and customer lifecycle update

The established Next.js components, visual identity and interactions are retained. The page now connects capture, qualification, booking, estimate follow-up, equipment records, maintenance and reactivation. The five capability panels, four-stage process, equipment record, replacement example, maintenance timeline and three business examples share translated content in `lib/lifecycle.ts`. Supporting layouts live in `components/lifecycle.tsx` and `app/lifecycle.css`.

The Carlos García equipment record, Vaillant replacement candidate, maintenance timeline and €6,500 estimate are clearly labelled illustrations. They do not represent customer data, measured revenue or a guaranteed outcome. Technical replacement decisions remain with the HVAC business. All demo calls to action lead to aureaclima.rooklyn.co; optional WhatsApp/assistant integrations and the other lifecycle examples are not presented as live demo functionality.

## Values required before launch

Copy `.env.example` to `.env.local`, enter verified values, and rebuild after changes.

| Value | Location |
| --- | --- |
| Rooklyn logo | Shared rook emblem and gold wordmark in `components/brand.tsx` and `public/favicon.svg`, recreated as vectors from the supplied reference. |
| Localized assessment forms | Exact English, Spanish and Italian form IDs and embed heights in `lib/contact.ts`. The legacy single-form environment variable does not override these. |
| Contact section | Contact and assessment actions link to `/{locale}/#contact`. |
| GHL External Tracking snippet | `NEXT_PUBLIC_GHL_TRACKING_SCRIPT_URL` plus the verified script attributes, adapter and cleanup in `lib/tracking-config.ts`. |
| Privacy policy | `/{locale}/privacy/`, supplied text in `lib/policies/`. |
| Cookie policy | `/{locale}/cookies/`, supplied text in `lib/policies/`. |
| Legal notice | `/{locale}/legal/`, supplied text in `lib/policies/`. |
| Contact email | `NEXT_PUBLIC_CONTACT_EMAIL`. Omitted until provided. |

Footer and cookie-banner policy links open the local document in the current language. The supplied Spanish documents dated 21 September 2026 are preserved as structured content, with English and Italian translations. All three use NIF/NIE Z0680759X, confirmed by the owner on 24 September 2026. Original source files are unchanged. The old optional external policy URL variables are no longer used by these links.

## GHL form integration

The inline contact section embeds the supplied form for the selected language: EN `FCNLI4nmuarnHRxtPVWi`, ES `uwp62aex2J0loVy7nxpZ`, IT `3txWuv6hLddQ9Gxy9pFe`. Contact actions scroll to this section. The two adjacent links open the HVAC demo and Rooklyn website. The GHL helper handles responsive iframe sizing; the embed retains the supplied cookie-consent attributes and forwards only language and UTM parameters. Field labels, validation and internal form typography remain controlled in GHL.

Successful submissions redirect to `/en/thank-you/`, `/es/thank-you/` or `/it/thank-you/`. The listener validates the GHL origin, exact iframe window and form-specific `set-sticky-contacts` message emitted by the provider's successful submission handler (verified against its public client bundle on 2026-09-20). Load events and generic contact-sync messages do not redirect. No contact values are read or included in analytics. Thank-you pages are excluded from search indexing. The external fallback opens GHL directly and follows the provider's own success behavior.

Run `node qa/contact-events.mjs` to verify the redirect boundary without submitting a real lead. The production export checks include all three forms and thank-you pages. A live submission was not made during implementation.

## Tracking and consent

All event names are typed in `lib/tracking.ts`: `hvac_sales_page_viewed`, `hvac_demo_started`, `hvac_repair_demo_clicked`, `hvac_installation_demo_clicked`, `hvac_business_case_viewed`, `hvac_consultation_clicked`, `hvac_lead_form_opened`, `hvac_lead_form_submitted`, `language_changed`.

Tracking is inert until affirmative consent and a real adapter are configured. There is no fabricated GHL API or default third-party script. Add the exact public script URL and attributes from the account's actual GHL snippet, then implement `trackingConfig.adapter` using the verified event API. It must handle the script's asynchronous readiness (queue after consent only, or wait for readiness); no events or personal data are stored by this page. Only event name, language, selected destination language and UTM parameters are passed. Keep personal data out of campaign query strings. Exceptions are caught so analytics never block the visitor.

Implement `trackingConfig.dispose` to stop the real integration and remove its documented cookies/storage when consent is withdrawn. The page also removes its script and reloads after revocation to stop already-loaded script execution. A GHL script must not be configured until its cleanup and consent behaviour have been verified.

Submission tracking is handled by the verified inline-form listener in `components/contact.tsx` and remains subject to analytics consent. The legacy `trackingConfig.matchSubmission` hook is no longer used.

The cookie banner offers equally prominent necessary-only and analytics choices, with an unchecked optional-analytics preference. Preferences can always be reopened in the footer. Language and consent are stored locally; consent expires after 180 days. Optional analytics scripts and events remain gated by consent. The inline GHL form loads separately and retains its supplied provider cookie-consent attributes. The page-view event is emitted when analytics consent is first granted; prior interactions are not replayed. The business-case event fires once on visibility when consent is present.

## URL and language behaviour

Every demo link opens in the same tab and is built from a single central destination in `lib/config.ts`. All `utm_*` parameters and the selected `lang` are carried to Áurea Clima and its repair/installation journeys. Other query values are not transmitted. Changing language keeps the current query and section hash, and the choice persists locally. External demo language support depends on those destinations; the sales page passes the selected language but does not claim to control their translations.

## Accessibility and content

Semantic sections, heading hierarchy, native accordion/dialog controls, focus outlines, skip link, reduced-motion support and a mobile CTA with reserved bottom space. The language disclosure supports mouse hover, touch/click, ArrowDown, Tab and Escape, and preserves the current page, query and section. Native modal behaviour traps focus, supports Escape and restores focus to its opener. All main content is Server Component rendered. There are no fake clients, testimonials, statistics, fixed implementation promises, financial calculators or fabricated contractor details. WhatsApp and virtual-assistant integration is always optional. Deliverables are presented as possible scope, not a universal package.

## Responsive and policy verification

`app/responsive.css` refines the existing styles at mobile (<768px), tablet (768–1023px), compact desktop (1024–1279px) and larger desktop widths. The header remains in normal flow with sticky positioning. Mobile navigation contains the contact action; the compact mobile demo CTA respects safe-area insets and hides when the footer enters view. Policy pages omit that sales CTA and the sales-page view event.

After building, run `node qa/verify.mjs`, `node qa/contact-events.mjs` and `node qa/policies-and-language.mjs`. The last check covers all nine policy routes, translation block/table coverage, footer links, the confirmed identifier and default-language behavior. No lint script or linter is configured. See `qa/RESPONSIVE-2026-09-24.md` for the responsive browser audit.

See `qa/REPORT.md` for verification and remaining launch dependencies.


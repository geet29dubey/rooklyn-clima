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

The build creates `out/`. Deploy that complete directory to a static host. Route `/es/`, `/en/` and `/it/` to their `index.html`; serve `out/404.html` for missing paths with HTTP 404 status. Do not configure a single-page catch-all to `index.html`. `/` redirects in the browser to the saved language, defaulting to Spanish, and includes language links without JavaScript. Each language page is fully rendered without JavaScript. The global 404 uses the URL locale or saved language on hydration, with Spanish as its static fallback.

This delivery is prepared for deployment only. No DNS or custom-domain publishing has been performed. Publish `clima.rooklyn.co` only after the owner's approval. `robots.txt`, canonical URLs, hreflang, sitemap and Open Graph metadata use `NEXT_PUBLIC_SITE_URL`. No social image was supplied or requested, so no image URL is fabricated.

`pnpm start` previews the static export at `http://localhost:3000`, bound to the local computer. Rebuild before previewing changes.

## Revenue and customer lifecycle update

The established Next.js components, visual identity and interactions are retained. The page now connects capture, qualification, booking, estimate follow-up, equipment records, maintenance and reactivation. The five capability panels, four-stage process, equipment record, replacement example, maintenance timeline and three business examples share translated content in `lib/lifecycle.ts`. Supporting layouts live in `components/lifecycle.tsx` and `app/lifecycle.css`.

The Carlos García equipment record, Vaillant replacement candidate, maintenance timeline and €6,500 estimate are clearly labelled illustrations. They do not represent customer data, measured revenue or a guaranteed outcome. Technical replacement decisions remain with the HVAC business. The existing external demo links cover repair and installation; optional WhatsApp/assistant integrations and the other lifecycle examples are not presented as live demo functionality.

## Values required before launch

Copy `.env.example` to `.env.local`, enter verified values, and rebuild after changes.

| Value | Location |
| --- | --- |
| Rooklyn logo | Replace the temporary text mark in `components/brand.tsx` and update `public/favicon.svg` if appropriate. |
| GHL form embed URL | `NEXT_PUBLIC_GHL_FORM_EMBED_URL`, read only through `config.ghlFormEmbedUrl` in `lib/config.ts`. |
| Consultation calendar URL | `NEXT_PUBLIC_CONSULTATION_CALENDAR_URL`. A link appears inside the consultation modal when supplied. |
| GHL External Tracking snippet | `NEXT_PUBLIC_GHL_TRACKING_SCRIPT_URL` plus the verified script attributes, adapter, cleanup and success-message matcher in `lib/tracking-config.ts`. |
| Privacy Policy URL | `NEXT_PUBLIC_PRIVACY_URL`. |
| Cookie Policy URL | `NEXT_PUBLIC_COOKIE_URL`. |
| Legal Notice URL | `NEXT_PUBLIC_LEGAL_URL`. |
| Contact email | `NEXT_PUBLIC_CONTACT_EMAIL`. Omitted until provided. |

Legal controls open an honest pending-information dialog until their URLs are provided. They do not link to fabricated policies. The consultation placeholder displays the required field layout in a disabled fieldset, explains availability, and provides a working free-demo link. It cannot collect, store, send or simulate submitting any form data. No local backend or submission endpoint exists.

## GHL form integration

The supplied assessment form (`uwp62aex2J0loVy7nxpZ`) is configured as the default and in the local `.env` through `NEXT_PUBLIC_GHL_FORM_EMBED_URL`. Talk to Rooklyn and the existing assessment buttons open it inside the existing native dialog. The supplied GHL `form_embed.js` helper loads on the first consultation opening. The iframe uses `INLINE` layout inside that dialog, preserving the supplied cookie-consent attributes; its original automatic popup trigger and hidden style are intentionally omitted so it does not open on page load or create a second popup. The iframe is removed on close, and Next.js loads the helper only once. The existing dialog styling, close controls, language/UTM forwarding and consent-gated site analytics are retained.

Enter the actual HTTPS embed URL once in the environment setting above. That switches the placeholder to the GHL iframe; no invented ID is used. The iframe is only mounted when the visitor opens the consultation dialog and is removed when closed. It receives `lang` plus all current `utm_*` parameters. The fallback link opens the same GHL form if embedding is unavailable. Ensure the provider permits this site in its frame policy.

Configure these fields in GHL: name, company, work email or WhatsApp, primary problem dropdown (missed calls, slow response, scheduling, estimate follow-up, maintenance recalls, other), and privacy consent. The complete translated labels, options, consent and validation text are in `lib/content.ts`. Configure required-field, valid email/international phone and consent validation in GHL. Confirm that the actual embed honours `lang` in all three languages; if it needs a different locale mechanism, adapt the single embed URL builder. Set translated success and error messages there too. Do not enable non-essential GHL embed tracking before analytics consent; verify the supplied embed's cookie behaviour before launch. Submission and calendar availability cannot be tested until those integrations are supplied.

## Tracking and consent

All event names are typed in `lib/tracking.ts`: `hvac_sales_page_viewed`, `hvac_demo_started`, `hvac_repair_demo_clicked`, `hvac_installation_demo_clicked`, `hvac_business_case_viewed`, `hvac_consultation_clicked`, `hvac_lead_form_opened`, `hvac_lead_form_submitted`, `language_changed`.

Tracking is inert until affirmative consent and a real adapter are configured. There is no fabricated GHL API or default third-party script. Add the exact public script URL and attributes from the account's actual GHL snippet, then implement `trackingConfig.adapter` using the verified event API. It must handle the script's asynchronous readiness (queue after consent only, or wait for readiness); no events or personal data are stored by this page. Only event name, language, selected destination language and UTM parameters are passed. Keep personal data out of campaign query strings. Exceptions are caught so analytics never block the visitor.

Implement `trackingConfig.dispose` to stop the real integration and remove its documented cookies/storage when consent is withdrawn. The page also removes its script and reloads after revocation to stop already-loaded script execution. A GHL script must not be configured until its cleanup and consent behaviour have been verified.

Implement `trackingConfig.matchSubmission` only after inspecting the actual GHL success-message contract; it must match a verified successful submission for the supplied form ID. The listener also requires both the configured iframe's window and exact origin. Never count opening or clicking the form as a submitted lead. The matcher is intentionally null until the integration exists.

The cookie banner offers equally prominent necessary-only and analytics choices, with an unchecked optional-analytics preference. Preferences can always be reopened in the footer. Language and consent are stored locally; consent expires after 180 days. No analytics script, network event or iframe loads before consent/opening. The page-view event is emitted when analytics consent is first granted; prior interactions are not replayed. The business-case event fires once on visibility when consent is present.

## URL and language behaviour

Every demo link opens in the same tab and is built from a single central destination in `lib/config.ts`. All `utm_*` parameters and the selected `lang` are carried to Áurea Clima and its repair/installation journeys. Other query values are not transmitted. Changing language keeps the current query and section hash, and the choice persists locally. External demo language support depends on those destinations; the sales page passes the selected language but does not claim to control their translations.

## Accessibility and content

Semantic sections, heading hierarchy, native select/accordion/dialog controls, focus outlines, skip link, reduced-motion support and a mobile CTA with reserved footer space. Native modal behaviour traps focus, supports Escape and restores focus to its opener. All main content is Server Component rendered. There are no fake clients, testimonials, statistics, fixed implementation promises, financial calculators or fabricated contractor details. WhatsApp and virtual-assistant integration is always optional. Deliverables are presented as possible scope, not a universal package.

See `qa/REPORT.md` for verification and remaining launch dependencies.


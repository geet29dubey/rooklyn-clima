# Rooklyn Clima verification

Verified locally on 15 September 2026. No deployment or DNS change was made.

## Delivered update

- Retained the existing Next.js application, navy/teal/gold identity, shared components, locale routes, demos, consultation dialog, consent controls and footer.
- Repositioned the page around revenue and the customer lifecycle in Spanish, English and Italian, including translated metadata.
- Added five capabilities, a four-stage process, an equipment record, replacement opportunity, maintenance timeline, three business examples, a value comparison and supporting channels/reviews.
- Clearly labelled all example equipment records, dates and the €6,500 estimate as illustrative. Replacement decisions remain subject to human technical assessment. Optional channels are explicitly absent from the current demo.

## Automated checks

- Production `next build`: passed; all three locale pages and deployment files generated in `out/`.
- TypeScript `tsc --noEmit`: passed.
- `node qa/verify.mjs`: passed. Checks complete locale content structures, rendered lifecycle examples and scope notes, canonical/hreflang/Open Graph metadata, one H1, ten FAQs, destination language/UTM propagation, static deployment assets, and analytics consent boundaries.
- Consent checks cover absent/declined/expired consent, allowed script loading, UTM-only event payloads, safe adapter failure and withdrawal. These use a test adapter, not a live GHL account.

## Browser verification

Checked the production static preview in the in-app browser, with representative desktop (1440 and 1280 px), small desktop (1024 px), tablet (768 px) and mobile (390 px) layouts.

- Reviewed the revised hero, capabilities, process, equipment record, replacement example, maintenance timeline, value comparison and supporting-channel layouts. English, Spanish and Italian render correctly; tested layouts had no horizontal page overflow.
- Five-item desktop/mobile navigation resolves to the intended sections. Selecting Lifecycle in the mobile menu closes it and navigates correctly.
- Language selection retains campaign parameters and the section hash. Root routing restores the saved language; localized 404 behavior was checked.
- All supplied demo links open in the same tab and carry the selected language and `utm_*` values. Free demo access remains ungated.
- The revised Talk to Rooklyn button opens the consultation dialog. Escape closes it and restores focus. The unconfigured form is disabled and cannot submit data.
- Cookie preferences can be reopened and changed; optional analytics begins unchecked. No external analytics script was present in the configured preview.
- Keyboard FAQ interaction, native modal focus behavior and mobile sticky-CTA footer clearance were checked during the retained-functionality review.

## Launch dependencies and limits

The local site is ready for review, not a live integration certification. The supplied repair-demo navigation reached a domain-resolution error during the live endpoint check. Confirm the Áurea Clima and booking destinations, including their language support, before launch. Their URLs have been preserved.

Still required: final logo, GHL form embed, consultation calendar, GHL tracking snippet/verified adapter, Privacy Policy URL, Cookie Policy URL, Legal Notice URL and contact email. Exact settings and integration steps are documented in `README.md` and `.env.example`.

Live GHL submission, calendar availability, provider iframe consent behavior and production analytics cannot be verified until the actual integration values are supplied. The page deliberately does not simulate successful lead submission or invent credentials, policies or endpoint behavior.

Publish and change DNS only after the owner's approval.

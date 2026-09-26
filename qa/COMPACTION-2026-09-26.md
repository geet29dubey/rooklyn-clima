# Second compaction and alignment pass

## Scope

Implementation changes are confined to `app/responsive.css`. The existing markup, copy, font family, palette, navigation behavior, locale routes, CTA destinations, GHL mappings and Cloudflare configuration are unchanged. The decorative fourth process circle now uses the same existing colors as the other steps.

The spacing density of https://aureaclima.rooklyn.co/en was inspected in the browser. Its visual design was not copied.

## Changes

- Page sections explicitly use `height: auto` and `min-height: 0`. No active sales section had a viewport-height minimum to remove. Full-height entry, error and thank-you pages are intentionally untouched, as are touch-target minimums and provider-required iframe sizing.
- Desktop section spacing now distinguishes the asset section (72px), normal sections (64px), process section (68px/56px), contact (60px) and secondary sections (52px). Adjacent supporting sections retain zero top padding. Existing mobile section spacing is preserved.
- At widths of at least 1024px and heights up to 850px, section padding is reduced by approximately 10–15%, hero padding is 24px per side, and workflow internals use smaller padding and connectors.
- Desktop hero headings use a responsive 44–60px scale; short desktops use 42–54px. Supporting text, service labels and benefit ticks remain visible. Internal illustration dimensions target a natural height of about 575px normally and 543px on short desktops. No transform scaling, cropping, forced scrollbars or hard height cap is used; translated content can grow naturally.
- How It Works uses four equal columns with shared CSS subgrid rows for numbers, headings and descriptions. Connectors remain absolutely positioned through circle centers. Tablet layouts use two columns; mobile retains the existing vertical process. The heading region and lower process strip have reduced spacing.
- Contact columns are approximately 43%/57%, with the left copy vertically centered. Tablets now stack the contact columns. Wrapper padding is 8px instead of 16px, and fallback-link spacing is reduced. Initial iframe heights remain EN 718px, ES 618px, IT 632px; GHL can still resize them after loading. Contact height remains content/provider-driven.
- The desktop footer places legal links on one compact row while preserving 44px hit targets. Its measured height is about 176px at the requested laptop and desktop sizes, down from about 194px. Longer Italian content at 1024px wraps naturally to about 195px.
- Shared desktop container gutters are now 32–48px per side, centered at a maximum content width of 1480px. Existing 28px tablet and 20px mobile gutters are retained. Navigation breakpoints are unchanged.

## Measurements

At 1366x768 in English, the main hero grid decreased from about 752px to 591px and the workflow from 676px to 543px. The complete hero proposition and illustration fit within the viewport. The same visibility check passes for all three locales at 1366x768, 1440x800, 1536x864 and 1920x1080.

The final process section measures about 577–578px on the two short laptop viewports across EN/ES/IT. At larger sizes it ranges from 566–593px depending on wrapping. Number circles, heading tops and description starts align within one pixel across each grid row.

## Validation

- Production build passed in the project's WSL environment: all 20 routes generated.
- TypeScript passed using `node node_modules/typescript/bin/tsc --noEmit` after restoring the build-generated `next-env.d.ts` change. Windows npm cannot resolve the WSL-installed `tsc` launcher, so the compiler was invoked directly.
- `qa/verify.mjs`, `qa/contact-events.mjs` and `qa/policies-and-language.mjs` passed.
- Git whitespace check passed.
- Lint was attempted: the repository has no lint script or lint configuration. No lint dependencies or configuration were added.
- All three locales were checked at 320x568, 360x800, 375x812, 390x844, 430x932, 768x1024, 820x1180, 1366x768, 1440x800, 1536x864 and 1920x1080. Actual viewport dimensions were verified during measurement. No document overflow or header-control overlap was found; contact stacks at mobile/tablet sizes and process rows align.
- Additional EN/ES/IT checks at 1024, 1099, 1100 and 1280px passed overflow and navigation-overlap checks.
- The Spanish mobile menu opens and closes when its Contact link is selected.
- No real lead was submitted, and no deployment or Git commit was performed.

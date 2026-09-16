export const locales = ['es', 'en', 'it'] as const;
export type Locale = typeof locales[number];
export const isLocale = (v: string): v is Locale => locales.includes(v as Locale);
/** Public deployment settings only. Never add secrets here. See .env.example and README.md. */
export const config = {
  origin: process.env.NEXT_PUBLIC_SITE_URL || 'https://clima.rooklyn.co',
  demo: 'https://aureaclima.rooklyn.co',
  repair: process.env.NEXT_PUBLIC_GHL_REPAIR_URL || 'https://citas-aureaclima.rooklyn.co/reparacion-page',
  installation: process.env.NEXT_PUBLIC_GHL_INSTALLATION_URL || 'https://citas-aureaclima.rooklyn.co/instalacion',
  ghlFormEmbedUrl: process.env.NEXT_PUBLIC_GHL_FORM_EMBED_URL || 'https://api.leadconnectorhq.com/widget/form/uwp62aex2J0loVy7nxpZ',
  consultationCalendarUrl: process.env.NEXT_PUBLIC_CONSULTATION_CALENDAR_URL || '',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  privacyUrl: process.env.NEXT_PUBLIC_PRIVACY_URL || '',
  cookieUrl: process.env.NEXT_PUBLIC_COOKIE_URL || '',
  legalUrl: process.env.NEXT_PUBLIC_LEGAL_URL || '',
};
export function externalUrl(base: string, locale: Locale, query = '') {
  const url = new URL(base);
  new URLSearchParams(query).forEach((value, key) => { if (key.toLowerCase().startsWith('utm_')) url.searchParams.set(key, value); });
  url.searchParams.set('lang', locale);
  return url.toString();
}

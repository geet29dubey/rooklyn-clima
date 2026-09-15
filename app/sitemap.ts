import type { MetadataRoute } from 'next';
import { config, locales } from '@/lib/config';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return locales.map(locale=>({url:`${config.origin}/${locale}/`,alternates:{languages:{es:`${config.origin}/es/`,en:`${config.origin}/en/`,it:`${config.origin}/it/`}}}))}

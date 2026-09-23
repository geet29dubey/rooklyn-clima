import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { isLocale, locales } from '@/lib/config';

import '../../globals.css';
import '../../lifecycle.css';

const manrope = localFont({
  src: '../../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  variable: '--font-manrope',
  display: 'swap',
});

/**
 * Because this project uses:
 *
 * output: "export"
 *
 * Next/Vinext must know all possible values for [locale]
 * during the build.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

/**
 * Prevent Next.js from accepting locale values other than
 * the ones generated above.
 */
export const dynamicParams = false;

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}


/* import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { isLocale, locales } from '@/lib/config';
import '../../globals.css';
import '../../lifecycle.css';
const manrope=localFont({src:'../../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', variable:'--font-manrope',display:'swap'});
//export function generateStaticParams(){return locales.map(locale=>({locale}));}
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "es" },
    { locale: "it" },
  ];
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
export default async function Layout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <html lang={locale}><body className={manrope.variable}>{children}</body></html>}

 */
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { isLocale, locales } from '@/lib/config';

import '../../globals.css';
import '../../lifecycle.css';
import '../../responsive.css';

const manrope = localFont({
  src: '../../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  variable: '--font-manrope',
  display: 'swap',
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

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
      <body className={manrope.variable}>
        {children}
      </body>
    </html>
  );
}
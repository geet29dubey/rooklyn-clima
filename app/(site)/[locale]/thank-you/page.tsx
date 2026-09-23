import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

import { isLocale, locales } from '@/lib/config';
import { contactCopy } from '@/lib/contact';
import { lifecycle } from '@/lib/lifecycle';
import { Logo } from '@/components/brand';
import { DemoLink } from '@/components/actions';
import { ExploreLink } from '@/components/contact';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: isLocale(locale)
      ? `${contactCopy[locale].thanks} | Rooklyn`
      : 'Rooklyn',

    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function ThankYou({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const c = contactCopy[locale];

  return (
    <main className="thank-you-page">
      <a href={`/${locale}/`} aria-label="Rooklyn">
        <Logo />
      </a>

      <div className="thank-you-card">
        <CheckCircle2
          size={48}
          aria-hidden="true"
        />

        <h1>{c.thanks}</h1>

        <p>{c.received}</p>

        <div className="cta-row">
          <DemoLink locale={locale}>
            {lifecycle[locale].headerCta}
          </DemoLink>

          <ExploreLink locale={locale} />
        </div>

        <a
          className="text-link"
          href={`/${locale}/`}
        >
          <ArrowLeft size={17} />
          {c.back}
        </a>
      </div>
    </main>
  );
}
'use client';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { ArrowUpRight } from 'lucide-react';
import { externalUrl, type Locale } from '@/lib/config';
import { assessmentForms, contactCopy, isAssessmentSubmission } from '@/lib/contact';
import { content } from '@/lib/content';
import { lifecycle } from '@/lib/lifecycle';
import { track } from '@/lib/tracking';
import { DemoLink } from './actions';

export function ExploreLink({ locale }: { locale: Locale }) {
  return <a className="button secondary" href={externalUrl('https://rooklyn.co', locale)}>{contactCopy[locale].explore}<ArrowUpRight size={17}/></a>;
}

export function ContactSection({ locale }: { locale: Locale }) {
  const copy = contactCopy[locale], form = assessmentForms[locale], c = content[locale];
  const iframe = useRef<HTMLIFrameElement>(null);
  const [query, setQuery] = useState('');
  const [ready, setReady] = useState(false);
  const id = `inline-${form.id}`;
  const src = `https://api.leadconnectorhq.com/widget/form/${form.id}`;
  useEffect(() => {
    setQuery(window.location.search);
    let submitted = false;
    function onMessage(event: MessageEvent) {
      if (submitted || event.origin !== 'https://api.leadconnectorhq.com' || event.source !== iframe.current?.contentWindow) return;
      if (Array.isArray(event.data) && ['iframeLoaded', 'fetch-query-params'].includes(event.data[0])) setReady(true);
      if (!isAssessmentSubmission(event.data, id)) return;
      submitted = true;
      track('hvac_lead_form_submitted', locale);
      window.location.assign(`/${locale}/thank-you/`);
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [id, locale]);
  return <section className="section contact-section" id="contact" aria-labelledby="contact-title">
    <div className="container contact-grid">
      <div className="contact-copy"><p className="section-tag">{copy.label}</p><h2 id="contact-title" tabIndex={-1}>{copy.title}</h2><p className="section-lead">{copy.lead}</p><div className="cta-row"><DemoLink locale={locale}>{lifecycle[locale].headerCta}</DemoLink><ExploreLink locale={locale}/></div></div>
      <div className="contact-form-card">
        {!ready && <p className="form-loading" role="status">{c.formLoading}</p>}
        <a className="text-link form-fallback" href={externalUrl(src, locale, query)} target="_blank" rel="noopener noreferrer">{c.formFallback}<ArrowUpRight size={16}/></a>
        <div className="contact-embed" style={{ minHeight: form.height }}><iframe ref={iframe} id={id} title={`Rooklyn | HVAC | Request Assessment ${locale.toUpperCase()}`} src={externalUrl(src, locale, query)}
          style={{ width: '100%', height: form.height, border: 'none', borderRadius: 8 }}
          data-layout='{"id":"INLINE"}' data-trigger-type="alwaysShow" data-trigger-value=""
          data-activation-type="alwaysActivated" data-activation-value="" data-deactivation-type="neverDeactivate" data-deactivation-value=""
          data-form-name={`Rooklyn | HVAC | Request Assessment ${locale.toUpperCase()}`} data-height={form.height}
          data-layout-iframe-id={id} data-form-id={form.id} data-cookie-consent="true" data-cookie-consent-provider="auto"
          onLoad={() => setReady(true)} referrerPolicy="strict-origin-when-cross-origin"/></div>
      </div>
    </div>
    <Script id="rooklyn-ghl-form-embed" src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive"/>
  </section>;
}

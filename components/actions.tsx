'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Globe2 } from 'lucide-react';
import { config, externalUrl, type Locale } from '@/lib/config';
import { dictionaries } from '@/lib/dictionaries';
import { track } from '@/lib/tracking';
export function DemoLink({locale, children, kind = 'demo', className = 'button primary'}: {locale: Locale; children: React.ReactNode; kind?: 'demo'|'repair'|'installation'; className?: string}) {
  const [query, setQuery] = useState('');
  useEffect(() => setQuery(window.location.search), []);
  return <a className={className} href={externalUrl(config[kind], locale, query)} onClick={()=>track(kind==='demo'?'hvac_demo_started':kind==='repair'?'hvac_repair_demo_clicked':'hvac_installation_demo_clicked',locale)}>{children}<ArrowUpRight size={17}/></a>;
}
export function ConsultButton({locale, children, className='button secondary', onClick}: {locale: Locale; children: React.ReactNode; className?: string; onClick?:()=>void}) {
  return <a className={className} href={`/${locale}/#contact`} onClick={() => {onClick?.();track('hvac_consultation_clicked',locale);track('hvac_lead_form_opened',locale)}}>{children}<ArrowRight size={17}/></a>;
}
export function LanguageSelector({locale}: {locale: Locale}) {
  return <label className="language"><Globe2 size={15}/><span className="sr-only">{dictionaries[locale].language}</span><select value={locale} onChange={e=>{track('language_changed',locale,{to_locale:e.target.value});try{localStorage.setItem('rooklyn-language',e.target.value)}catch{} window.location.assign(`/${e.target.value}/${window.location.search}${window.location.hash}`)}}><option value="es">Español</option><option value="en">English</option><option value="it">Italiano</option></select></label>;
}

import { ArrowRight, Check, MessageSquare, SlidersHorizontal, Wrench, Layers3, CalendarDays, Workflow, ArrowDown, RotateCcw } from 'lucide-react';
import { Logo } from './brand';
import { Sections, Footer } from './sections';
import { MobileMenu } from './interactions';
import { dictionaries } from '@/lib/dictionaries';
import { lifecycle, navigationSections } from '@/lib/lifecycle';
import type { Locale } from '@/lib/config';
import { ConsultButton, DemoLink, LanguageSelector } from './actions';

export function Journey({locale}: {locale: Locale}) {
  const d = dictionaries[locale].diagram;
  const l = lifecycle[locale];
  return <div className="journey revenue-journey">
    <div className="journey-top"><span className="tiny-square"/>{l.positioning}<span className="workflow-menu" aria-hidden="true">•••</span></div>
    <div className="journey-body">
      <div className="journey-label"><span>{d.badge}</span><Workflow size={14}/></div>
      <div className="flow-card enquiry"><div className="flow-icon"><MessageSquare size={20}/></div><div><strong>{d.enquiry}</strong><small>{d.time}</small></div><span className="enquiry-dot"/><p>“{d.message}”</p></div>
      <div className="connector"><ArrowDown size={15}/></div>
      <div className="qualify"><SlidersHorizontal size={18}/><div><strong>{d.qualify}</strong><small>{d.qualified}</small></div><Check size={15}/></div>
      <div className="branch-lines" aria-hidden="true"/>
      <div className="branch service-branches"><div><Wrench size={15}/>{d.repair}</div><div><Layers3 size={15}/>{d.install}</div><div><RotateCcw size={15}/>{l.diagramLabels.maintenance}</div></div>
      <div className="merge-lines" aria-hidden="true"/>
      <div className="flow-card booking"><div className="flow-icon"><CalendarDays size={22}/></div><div><strong>{d.appointment}</strong><small>{d.calendar}</small></div><span className="check-circle"><Check size={15}/></span></div>
      <div className="connector"><ArrowDown size={15}/></div>
      <div className="crm"><Workflow size={18}/><div><strong>{l.diagramLabels.job}</strong><small>{l.diagramLabels.jobSub}</small></div><Check size={15}/></div>
      <div className="lifecycle-tail">{l.diagramTail.map((label,i)=><div key={label}><span>{i===1?<RotateCcw size={14}/>:<ArrowDown size={13}/>}</span>{label}</div>)}</div>
    </div>
    <div className="journey-footer"><RotateCcw size={12}/>{l.fullJourney.at(-1)}</div>
  </div>;
}

export default function Landing({locale}: {locale: Locale}) {
  const d = dictionaries[locale];
  const l = lifecycle[locale];
  return <>
    <a className="skip" href="#main">{d.skip}</a>
    <header><div className="header-inner">
      <a href={`/${locale}/`} aria-label="Rooklyn"><Logo/><span className="brand-label">{d.label}</span></a>
      <nav aria-label={d.label}>{d.nav.map((label,i)=><a key={label} href={`#${navigationSections[i]}`}>{label}</a>)}</nav>
      <div className="header-actions"><LanguageSelector locale={locale}/><DemoLink locale={locale} className="button header-cta">{l.headerCta}</DemoLink><MobileMenu locale={locale}/></div>
    </div></header>
    <main id="main">
      <section className="hero">
        <div className="airflow" aria-hidden="true"/>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span/>{d.eyebrow}</div>
            <h1>{d.hero}</h1><p className="hero-lead">{d.heroLead}</p>
            <ul className="hero-services">{l.microcopy.map(label=><li key={label}>{label}</li>)}</ul>
            <div className="cta-row"><DemoLink locale={locale}>{d.demoCta}</DemoLink><ConsultButton locale={locale}>{d.want}</ConsultButton></div>
            <p className="hero-value">{l.heroValue}</p>
            <div className="trust">{d.trust.map(t=><span key={t}><Check size={13}/>{t}</span>)}</div>
          </div>
          <Journey locale={locale}/>
        </div>
        <div className="container system-strip"><span className="strip-label">ROOKLYN CLIMA</span><div>{d.strip.map((label,i)=><span key={label}>{i>0&&<ArrowRight size={14}/>}<span>{label}</span></span>)}</div><RotateCcw size={16}/></div>
      </section>
      <Sections locale={locale}/>
    </main>
    <Footer locale={locale}/>
  </>;
}

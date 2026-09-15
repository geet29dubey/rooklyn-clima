import { Check, PhoneMissed, Shuffle, FileClock, RotateCcw, Wrench, Layers3, ArrowUpRight, ShieldCheck, CircleHelp, Plus, ArrowRight } from 'lucide-react';
import { content } from '@/lib/content';
import { dictionaries } from '@/lib/dictionaries';
import { lifecycle } from '@/lib/lifecycle';
import { config, type Locale } from '@/lib/config';
import { ConsultButton, DemoLink, LanguageSelector } from './actions';
import { LegalLink, PreferencesButton, Interactions } from './interactions';
import { Logo } from './brand';
import { SectionHead } from './section-head';
import { RevenueCapabilities, AssetLifecycle, GrowthJourneys, ValueComparison, SupportingCapabilities, WorkflowSteps } from './lifecycle';

const problemIcons=[PhoneMissed,Shuffle,FileClock,RotateCcw,Wrench];
export function Sections({locale}:{locale:Locale}) {
  const c=content[locale],d=dictionaries[locale],l=lifecycle[locale];
  return <>
    <section className="section problems-section" id="problems"><div className="container">
      <SectionHead tag={c.problemTag} title={c.problemTitle} lead={c.problemLead}/>
      <div className="problem-grid">{c.problems.map(([title,text],i)=>{const Icon=problemIcons[i];return <article className="problem-card" key={title}><div className="problem-card-top"><Icon size={22}/><span>0{i+1}</span></div><h3>{title}</h3><p>{text}</p></article>})}</div>
      <p className="problem-conclusion"><RotateCcw size={18}/>{l.problemClose}</p>
    </div></section>
    <RevenueCapabilities locale={locale}/>
    <section className="section process-section" id="process"><div className="container">
      <SectionHead tag={c.processTag} title={c.processTitle} lead={c.processLead} center/>
      <ol className="process-grid four-stage-process">{c.steps.map(([title,desc],i)=><li key={title}><span className="step-number">0{i+1}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol>
      <WorkflowSteps steps={d.strip} className="lifecycle-stage-strip"/>
    </div></section>
    <AssetLifecycle locale={locale}/>
    <GrowthJourneys locale={locale}/>
    <section className="section demo-section" id="demo"><div className="container">
      <div className="demo-heading"><SectionHead tag={c.demoTag} title={c.demoTitle} lead={c.demoLead}/><div className="demo-seal"><span className="aurea-mark">á</span><span>áurea clima<small>{c.demoBadge}</small></span></div></div>
      <div className="demo-cards">{[{title:c.repairTitle,desc:c.repairDesc,cta:c.repairCta,steps:c.demoSteps,kind:'repair' as const,Icon:Wrench},{title:c.installationTitle,desc:c.installationDesc,cta:c.installationCta,steps:c.installSteps,kind:'installation' as const,Icon:Layers3}].map(({title,desc,cta,steps,kind,Icon},i)=><article key={kind} className={`demo-card ${kind}`}><div className="demo-card-top"><div className="demo-icon"><Icon size={28}/></div><span>0{i+1} / ÁUREA CLIMA</span><ArrowUpRight size={21}/></div><h3>{title}</h3><p>{desc}</p><div className="demo-mini-flow">{steps.map((s,j)=><span key={s}>{j>0&&<ArrowRight size={14}/>}<span>{s}</span></span>)}</div><DemoLink locale={locale} kind={kind} className="button demo-button">{cta}</DemoLink></article>)}</div>
      <div className="demo-bottom"><span><ShieldCheck size={16}/>{c.free}</span><p>{c.disclaimer}</p></div>
    </div></section>
    <section className="section impact-section" id="impact"><div className="container">
      <SectionHead tag={c.impactTag} title={c.impactTitle}/>
      <div className="business-examples">{l.businessExamples.map(([title,description],i)=><article key={title}><span className="example-number">0{i+1}</span><span className="example-caption">{l.example}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      <div className="business-closing"><div><h3>{l.businessClose}</h3><p>{c.impactNote}</p></div><ConsultButton locale={locale} className="button teal-button">{c.assess}</ConsultButton></div>
    </div></section>
    <ValueComparison locale={locale}/>
    <SupportingCapabilities locale={locale}/>
    <section className="audience-section"><div className="container audience-grid"><SectionHead title={c.audienceTitle} lead={c.audienceLead}/><ul>{c.audience.map(s=><li key={s}><Check size={17}/>{s}</li>)}</ul></div></section>
    <section className="section delivery-section"><div className="container delivery-grid"><SectionHead tag={c.deliveryTag} title={c.deliveryTitle} lead={c.deliveryLead}/><div><ul className="delivery-list">{c.deliveries.map(s=><li key={s}><Check size={15}/>{s}</li>)}</ul><div className="delivery-optional"><Plus size={16}/>{c.optional}</div></div></div></section>
    <section className="section faq-section" id="faq"><div className="container faq-grid"><div><SectionHead tag={c.faqTag} title={c.faqTitle}/><span className="faq-icon"><CircleHelp size={38}/></span></div><div className="faq-list">{c.faqs.map(([q,a],i)=><details key={q} name="faq"><summary><span className="faq-number">{String(i+1).padStart(2,'0')}</span><span>{q}</span><Plus size={18}/></summary><p>{a}</p></details>)}</div></div></section>
    <section className="final-section"><div className="container final-grid"><div><p className="section-tag">ROOKLYN CLIMA</p><h2>{c.finalTitle}</h2><p>{c.finalText}</p></div><div className="final-actions"><DemoLink locale={locale}>{c.explore}</DemoLink><ConsultButton locale={locale}>{d.want}</ConsultButton><p className="final-note">{l.finalNote}</p></div></div></section>
  </>;
}

export function Footer({locale}:{locale:Locale}) {
  const c=content[locale];
  return <><footer><div className="container"><div className="footer-top"><div><a href={`/${locale}/`} aria-label="Rooklyn"><Logo/></a><p>{c.footerTag}</p>{config.contactEmail&&<a className="contact-email" href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>}</div><div className="footer-links"><LegalLink locale={locale} kind="privacy"/><LegalLink locale={locale} kind="cookies"/><LegalLink locale={locale} kind="legal"/><PreferencesButton locale={locale}/></div><LanguageSelector locale={locale}/></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {c.rights}</span><p>{c.disclaimer}</p></div></div></footer><Interactions locale={locale}/></>;
}

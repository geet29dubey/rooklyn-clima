import { ArrowRight, Check, MousePointer2, GitBranch, CalendarDays, FileClock, RotateCcw, UserRound, Layers3, Wrench, MessageCircle, Star, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/lib/config';
import { lifecycle } from '@/lib/lifecycle';
import { SectionHead } from './section-head';

/** Static workflow geometry shared across equipment, quote and service examples. */
export function WorkflowSteps({steps,className=''}:{steps:string[];className?:string}) {
  return <ol className={`workflow-steps ${className}`}>{steps.map((step,i)=><li key={step}><span>{step}</span>{i<steps.length-1&&<ArrowRight size={14} aria-hidden="true"/>}</li>)}</ol>;
}

const capabilityIcons=[MousePointer2,GitBranch,CalendarDays,FileClock,RotateCcw];
export function RevenueCapabilities({locale}:{locale:Locale}) {
  const l=lifecycle[locale];
  return <section className="section capabilities-section" id="solution"><div className="container">
    <SectionHead tag={l.capabilitiesTag} title={l.capabilitiesTitle} lead={l.capabilitiesLead}/>
    <div className="capability-grid">
      {l.capabilities.map((card,i)=>{const Icon=capabilityIcons[i];return <article className={`capability-card ${i===4?'retain-card':''}`} key={card.stage}>
        <div className="capability-top"><span className="capability-icon"><Icon size={24}/></span><span>0{i+1} / {card.stage}</span></div>
        <div className="capability-content"><div><h3>{card.title}</h3><p>{card.copy}</p></div>
          <ul className="capability-features">{card.features.map(feature=><li key={feature}><Check size={14}/>{feature}</li>)}</ul>
        </div>
        {i===1&&<><div className="routing-preview">{l.routes.map(([from,to])=><div key={from}><span>{from}</span><ArrowRight size={14}/><strong>{to}</strong></div>)}</div><p className="feature-footnote">{l.qualifyOptional}</p></>}
        {i===3&&<div className="estimate-preview"><div><span>{l.example}</span><strong>{l.estimateValue}</strong></div><h4>{l.estimateTitle}</h4><WorkflowSteps steps={l.estimateFlow}/><p>{l.estimateNote}</p></div>}
        {i===4&&<WorkflowSteps steps={l.fullJourney} className="retain-flow"/>}
      </article>})}
    </div>
    <p className="scope-note"><ShieldCheck size={16}/>{l.scopeNote}</p>
  </div></section>;
}

export function AssetLifecycle({locale}:{locale:Locale}) {
  const l=lifecycle[locale];
  return <section className="section asset-section" id="lifecycle"><div className="container">
    <div className="asset-grid">
      <div className="asset-copy"><SectionHead tag={l.assetTag} title={l.assetTitle} lead={l.assetLead}/><p>{l.assetText}</p><div className="asset-loop-caption"><RotateCcw size={24}/><strong>{l.positioning}</strong></div></div>
      <div className="asset-record">
        <div className="record-top"><span>{l.example}</span><Layers3 size={18}/></div>
        <div className="customer-record"><span className="customer-avatar"><UserRound size={23}/></span><div><small>{l.customer}</small><strong>{l.customerName}</strong></div><span className="record-connection" aria-hidden="true"/></div>
        <div className="equipment-record"><small>{l.equipment}</small><h3>{l.equipmentName}</h3><dl>{l.assetFields.map(([name,value],i)=><div key={name} className={i===2?'next-service':''}><dt>{name}</dt><dd>{value}{i===2&&<CalendarDays size={15}/>}</dd></div>)}</dl></div>
      </div>
    </div>
    <div className="asset-recall"><RotateCcw size={22}/><WorkflowSteps steps={l.assetFlow}/></div>
    <div className="lifecycle-comparison"><div><p>{l.shortJourneyLabel}</p><WorkflowSteps steps={l.shortJourney}/></div><div><p>{l.fullJourneyLabel}</p><WorkflowSteps steps={l.fullJourney}/></div></div>
  </div></section>;
}

export function GrowthJourneys({locale}:{locale:Locale}) {
  const l=lifecycle[locale];
  return <>
    <section className="section replacement-section" id="replacement"><div className="container">
      <div className="replacement-grid"><div><SectionHead tag={l.replacementTag} title={l.replacementTitle} lead={l.replacementText}/><p className="technical-note">{l.replacementNote}</p></div>
        <div className="replacement-record"><div className="record-top"><span>{l.example}</span><Wrench size={18}/></div><h3>{l.replacementEquipment}</h3><dl>{l.replacementFields.map(([name,value])=><div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl><div className="candidate-chip"><span>{l.candidate}</span><strong>{l.candidateValue}</strong></div></div>
      </div><WorkflowSteps steps={l.replacementFlow} className="replacement-flow"/>
    </div></section>
    <section className="section maintenance-section" id="maintenance"><div className="container">
      <SectionHead tag={l.maintenanceTag} title={l.maintenanceTitle} lead={l.maintenanceText}/>
      <div className="timeline-label"><RotateCcw size={16}/>{l.example}</div>
      <ol className="maintenance-timeline">{l.maintenanceTimeline.map(([date,event],i)=><li key={date}><span className="timeline-dot">{i===4?<RotateCcw size={16}/>:<Check size={14}/>}</span><time>{date}</time><strong>{event}</strong></li>)}</ol>
      <p className="timeline-note">{l.maintenanceNote}</p>
      <ul className="maintenance-features">{l.maintenanceFeatures.map(feature=><li key={feature}><Check size={14}/>{feature}</li>)}</ul>
    </div></section>
  </>;
}

export function ValueComparison({locale}:{locale:Locale}) {
  const l=lifecycle[locale];
  return <section className="section value-section" id="value"><div className="container">
    <SectionHead title={l.comparisonTitle} lead={l.comparisonLead}/>
    <div className="value-grid"><div className="basic-value"><CalendarDays size={23}/><h3>{l.basicLabel}</h3><ul>{l.basicFeatures.map(f=><li key={f}><Check size={15}/>{f}</li>)}</ul></div><div className="rooklyn-value"><div className="value-heading"><span className="logo">rooklyn<span className="logo-dot">.</span></span><span>{l.rooklynLabel}</span></div><ul>{l.valueFeatures.map(f=><li key={f}><Check size={15}/>{f}</li>)}</ul></div></div>
    <p className="scope-note">{l.scopeNote}</p>
  </div></section>;
}

export function SupportingCapabilities({locale}:{locale:Locale}) {
  const l=lifecycle[locale];
  return <section className="section supporting-section" id="channels"><div className="container supporting-grid">
    <article className="channels-card"><MessageCircle size={27}/><p className="supporting-label">{l.page.optional}</p><h3>{l.channelsTitle}</h3><p>{l.channelsText}</p><ul>{l.channelsFeatures.map(f=><li key={f}><Check size={13}/>{f}</li>)}</ul><p className="feature-footnote">{l.channelsNote}</p></article>
    <article className="reputation-card"><Star size={27}/><h3>{l.reputationTitle}</h3><p>{l.reputationText}</p><WorkflowSteps steps={l.reputationFlow} className="reputation-flow"/><div className="support-path"><MessageCircle size={16}/>{l.reputationSupport}</div><p className="feature-footnote">{l.reputationNote}</p></article>
  </div></section>;
}

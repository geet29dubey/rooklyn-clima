'use client';
import { useEffect, useRef, useState } from 'react';
import { X, ShieldCheck, ArrowRight, Menu } from 'lucide-react';
import { config, externalUrl, type Locale } from '@/lib/config';
import { dictionaries } from '@/lib/dictionaries';
import { content } from '@/lib/content';
import { navigationSections } from '@/lib/lifecycle';
import { consentKey, disableTracking, enableTracking, hasConsent, track } from '@/lib/tracking';
import { trackingConfig } from '@/lib/tracking-config';
import { ConsultButton, DemoLink } from './actions';
export function MobileMenu({locale}:{locale:Locale}){const [open,setOpen]=useState(false);const d=dictionaries[locale];return <div className="mobile-menu"><button className="icon-button" aria-label={open?d.close:d.menu} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button>{open&&<nav id="mobile-nav" aria-label={d.label}>{d.nav.map((n,i)=><a key={n} href={`#${navigationSections[i]}`} onClick={()=>setOpen(false)}>{n}<ArrowRight size={16}/></a>)}<ConsultButton locale={locale} className="button secondary mobile-contact" onClick={()=>setOpen(false)}>{d.want}</ConsultButton></nav>}</div>}
export function LegalLink({locale,kind}:{locale:Locale;kind:'privacy'|'cookies'|'legal'}){const c=content[locale];const url={privacy:config.privacyUrl,cookies:config.cookieUrl,legal:config.legalUrl}[kind];return url?<a href={url}>{c[kind]}</a>:<button onClick={()=>window.dispatchEvent(new CustomEvent('open-legal',{detail:kind}))}>{c[kind]}</button>}
export function PreferencesButton({locale}:{locale:Locale}){return <button onClick={()=>window.dispatchEvent(new CustomEvent('open-cookies'))}>{content[locale].preferences}</button>}
export function Interactions({locale}:{locale:Locale}) {
 const d=dictionaries[locale],c=content[locale];const dialog=useRef<HTMLDialogElement>(null);
 const [modal,setModal]=useState<'cookies'|'privacy'|'legal'|'policy'|null>(null);const [banner,setBanner]=useState(false);const [analytics,setAnalytics]=useState(false);
 useEffect(()=>{try{localStorage.setItem('rooklyn-language',locale);const saved=JSON.parse(localStorage.getItem(consentKey)||'null');setBanner(!saved||Date.now()-saved.timestamp>180*86400000)}catch{setBanner(true)}setAnalytics(hasConsent());enableTracking();track('hvac_sales_page_viewed',locale);
 const cookies=()=>{setAnalytics(hasConsent());setModal('cookies')};const legal=(event:Event)=>{const kind=(event as CustomEvent).detail;setModal(kind==='cookies'?'policy':kind)};
 window.addEventListener('open-cookies',cookies);window.addEventListener('open-legal',legal);
 const target=document.getElementById('impact');let viewed=false;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&!viewed){viewed=true;track('hvac_business_case_viewed',locale)}},{threshold:.2});if(target)observer.observe(target);
 return()=>{window.removeEventListener('open-cookies',cookies);window.removeEventListener('open-legal',legal);observer.disconnect()};
 },[locale]);
 useEffect(()=>{document.body.dataset.cookieBanner=String(banner);return()=>{delete document.body.dataset.cookieBanner}},[banner]);
 useEffect(()=>{if(modal){dialog.current?.showModal();document.body.style.overflow='hidden'}else{dialog.current?.close();document.body.style.overflow=''}return()=>{document.body.style.overflow=''}},[modal]);
 function saveConsent(value:boolean){const was=hasConsent();try{localStorage.setItem(consentKey,JSON.stringify({analytics:value,timestamp:Date.now()}))}catch{}setBanner(false);setModal(null);setAnalytics(value);if(value){enableTracking();if(!was)track('hvac_sales_page_viewed',locale)}else{disableTracking();if(was&&trackingConfig.scriptUrl)window.location.reload()}}
 return <>{banner&&<aside className="cookie-banner" aria-label={c.cookieTitle}><div className="cookie-copy"><ShieldCheck size={22}/><div><strong>{c.cookieTitle}</strong><p>{c.cookieText} <LegalLink locale={locale} kind="cookies"/></p></div></div><div className="cookie-actions"><button onClick={()=>saveConsent(false)}>{c.reject}</button><button onClick={()=>saveConsent(true)}>{c.accept}</button><button className="cookie-config" onClick={()=>setModal('cookies')}>{c.customize}</button></div></aside>}
 <div className="mobile-sticky"><DemoLink locale={locale}>{d.demoCta}</DemoLink></div>
 <dialog ref={dialog} className="modal" aria-labelledby="modal-title" onCancel={()=>setModal(null)} onClick={e=>{if(e.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)setModal(null)}}}>
 <button className="modal-close icon-button" aria-label={d.close} onClick={()=>setModal(null)}><X size={22}/></button>
 {modal==='cookies'?<><span className="modal-symbol"><ShieldCheck size={25}/></span><h2 id="modal-title">{c.cookieTitle}</h2><p>{c.cookieText}</p><div className="preference-row"><div><strong>{c.essential}</strong><p>{c.essentialDesc}</p></div><span>{c.always}</span></div><label className="preference-row"><div><strong>{c.analytics}</strong><p>{c.analyticsDesc}</p></div><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></label><button className="button teal-button" onClick={()=>saveConsent(analytics)}>{c.save}</button></>:<><span className="modal-symbol"><ShieldCheck size={25}/></span><h2 id="modal-title">{modal==='privacy'?c.privacy:modal==='policy'?c.cookies:c.legal}</h2><p>{c.legalPending}</p><button className="button teal-button" onClick={()=>setModal(null)}>{d.close}</button></>}
 </dialog></>
}



const cardSelector = '.journey, .problem-card, .capability-card, .asset-record, .replacement-record, .demo-card, .business-examples article, .basic-value, .rooklyn-value, .supporting-grid article';

/** Cards remain visible without JavaScript and animate only on their first entry. */
export function CardMotion() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(cardSelector));
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;

    function clear() {
      observer?.disconnect();
      cards.forEach(card => {
        card.classList.remove('motion-card', 'card-pop-in');
        card.style.removeProperty('--card-delay');
      });
    }

    function setup() {
      clear();
      if (preference.matches || !('IntersectionObserver' in window)) return;
      const siblingCounts = new Map<Element | null, number>();
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('card-pop-in');
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.08 });

      cards.forEach(card => {
        const index = siblingCounts.get(card.parentElement) ?? 0;
        siblingCounts.set(card.parentElement, index + 1);
        card.style.setProperty('--card-delay', `${Math.min(index, 3) * 55}ms`);
        card.classList.add('motion-card');
        observer?.observe(card);
      });
    }

    setup();
    preference.addEventListener('change', setup);
    return () => {
      clear();
      preference.removeEventListener('change', setup);
    };
  }, []);

  return null;
}

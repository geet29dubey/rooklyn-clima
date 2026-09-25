'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Globe2, ChevronDown } from 'lucide-react';
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
export function LanguageSelector({locale, path = ''}: {locale: Locale; path?: string}) {
  const names = {en:'English',es:'Español',it:'Italiano'};
  const [open,setOpen] = useState(false);
  const [suffix,setSuffix] = useState(path);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(()=>{
    const sync = () => setSuffix(window.location.pathname.replace(/^\/(es|en|it)\/?/, '') + window.location.search + window.location.hash);
    sync(); window.addEventListener('hashchange',sync);
    const dismiss = (event:PointerEvent) => {if(!root.current?.contains(event.target as Node))setOpen(false)};
    document.addEventListener('pointerdown',dismiss);
    return()=>{window.removeEventListener('hashchange',sync);document.removeEventListener('pointerdown',dismiss)};
  },[]);
  return <div ref={root} className="language language-switcher" data-open={open}
    onPointerEnter={e=>{if(e.pointerType==='mouse')setOpen(true)}}
    onPointerLeave={()=>{if(!root.current?.contains(document.activeElement))setOpen(false)}}
    onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false)}}
    onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();setOpen(false);trigger.current?.focus()}}}>
    <button ref={trigger} type="button" className="language-trigger" aria-label={`${dictionaries[locale].language}: ${names[locale]}`} aria-expanded={open} aria-controls={id}
      onClick={()=>setOpen(value=>!value)} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setOpen(true);requestAnimationFrame(()=>root.current?.querySelector<HTMLAnchorElement>('a')?.focus())}}}>
      <Globe2 size={15}/><span>{names[locale]}</span><ChevronDown size={14}/>
    </button>
    <ul id={id} className="language-options" hidden={!open} aria-label={dictionaries[locale].language}>
      {(['en','es','it'] as const).map(code=><li key={code}><a href={`/${code}/${suffix}`} lang={code} hrefLang={code} aria-current={code===locale?'true':undefined}
        onClick={()=>{track('language_changed',locale,{to_locale:code});try{localStorage.setItem('rooklyn-language',code)}catch{}setOpen(false)}}>{names[code]}</a></li>)}
    </ul>
  </div>;
}

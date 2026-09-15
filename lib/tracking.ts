import { trackingConfig } from './tracking-config';
import type { Locale } from './config';
export type TrackingEvent = 'hvac_sales_page_viewed'|'hvac_demo_started'|'hvac_repair_demo_clicked'|'hvac_installation_demo_clicked'|'hvac_business_case_viewed'|'hvac_consultation_clicked'|'hvac_lead_form_opened'|'hvac_lead_form_submitted'|'language_changed';
export const consentKey='rooklyn-consent-v1';
export function hasConsent(){try{const c=JSON.parse(localStorage.getItem(consentKey)||'null');return c?.analytics===true&&Date.now()-c.timestamp<180*86400000}catch{return false}}
let script: HTMLScriptElement|null=null;
export function enableTracking(){if(!hasConsent()||!trackingConfig.scriptUrl||script)return;try{const url=new URL(trackingConfig.scriptUrl);if(url.protocol!=='https:')return;script=document.createElement('script');script.src=url.href;script.async=true;Object.entries(trackingConfig.scriptAttributes).forEach(([k,v])=>script!.setAttribute(k,v));script.dataset.rooklynAnalytics='true';document.head.appendChild(script)}catch{/* Optional tracking must never prevent navigation. */}}
export function disableTracking(){try{trackingConfig.dispose?.()}catch{}script?.remove();script=null;}
export function track(event:TrackingEvent,locale:Locale,extra:Record<string,string>={}){if(!hasConsent()||!trackingConfig.adapter)return;try{const properties:Record<string,string>={locale,...extra};new URLSearchParams(location.search).forEach((v,k)=>{if(k.startsWith('utm_'))properties[k]=v});trackingConfig.adapter(event,properties)}catch{/* Analytics must fail safely. */}}

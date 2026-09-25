import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { config, isLocale } from '@/lib/config';
import { dictionaries } from '@/lib/dictionaries';
import Landing from '@/components/landing';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return {};const d=dictionaries[locale];return {title:d.seoTitle,description:d.seoDescription,metadataBase:new URL(config.origin),alternates:{canonical:`/${locale}/`,languages:{es:'/es/',en:'/en/',it:'/it/','x-default':'/en/'}},openGraph:{type:'website',siteName:'Rooklyn',title:d.seoTitle,description:d.seoDescription,url:`/${locale}/`,locale:{es:'es_ES',en:'en_GB',it:'it_IT'}[locale],alternateLocale:['es_ES','en_GB','it_IT'].filter(l=>l!=={es:'es_ES',en:'en_GB',it:'it_IT'}[locale])},icons:{icon:'/favicon.svg'}}}
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <Landing locale={locale}/>}

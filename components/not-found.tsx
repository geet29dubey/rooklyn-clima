'use client';
import { useEffect, useState } from 'react';
import { isLocale, type Locale } from '@/lib/config';
import { content } from '@/lib/content';
import { LanguageSelector } from './actions';
import { Logo } from './brand';
export function NotFoundContent(){const [locale,setLocale]=useState<Locale>('en');useEffect(()=>{const pathLocale=location.pathname.split('/')[1];let resolved:Locale='en';if(isLocale(pathLocale))resolved=pathLocale;else{try{const saved=localStorage.getItem('rooklyn-language');if(saved&&isLocale(saved))resolved=saved}catch{}}setLocale(resolved);document.documentElement.lang=resolved;document.title=`404 · ${content[resolved].notFoundTitle} | Rooklyn`},[]);const c=content[locale];return <main className="error-page"><Logo/><strong>404</strong><h1>{c.notFoundTitle}</h1><p>{c.notFoundText}</p><a className="button primary" href={`/${locale}/`}>{c.back}</a><LanguageSelector locale={locale}/></main>}

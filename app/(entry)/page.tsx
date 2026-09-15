'use client';
import { useEffect } from 'react';
export default function Entry(){useEffect(()=>{let locale='es';try{const saved=localStorage.getItem('rooklyn-language');if(saved&&['es','en','it'].includes(saved))locale=saved}catch{}window.location.replace(`/${locale}/${window.location.search}${window.location.hash}`)},[]);return <main className="entry"><a href="/es/">Rooklyn · Español</a><a href="/en/">English</a><a href="/it/">Italiano</a></main>}

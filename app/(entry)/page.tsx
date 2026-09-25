'use client';
import { useEffect } from 'react';
export default function Entry(){useEffect(()=>{let locale='en';try{const saved=localStorage.getItem('rooklyn-language');if(saved&&['es','en','it'].includes(saved))locale=saved}catch{}window.location.replace(`/${locale}/${window.location.search}${window.location.hash}`)},[]);return <main className="entry"><a href="/en/">Rooklyn · English</a><a href="/es/">Español</a><a href="/it/">Italiano</a></main>}

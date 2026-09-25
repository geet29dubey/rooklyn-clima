import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/not-found';
import './globals.css';
import './lifecycle.css';
import './responsive.css';
export const metadata:Metadata={title:'404 | Rooklyn',robots:{index:false,follow:false}};
export default function NotFound(){return <html lang="en"><body><NotFoundContent/></body></html>}

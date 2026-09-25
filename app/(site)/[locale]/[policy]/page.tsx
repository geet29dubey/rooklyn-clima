import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { config, isLocale } from '@/lib/config';
import { getPolicy, policyKinds, type PolicyBlock, type PolicyKind } from '@/lib/policies';
import { content } from '@/lib/content';
import { Logo } from '@/components/brand';
import { LanguageSelector } from '@/components/actions';
import { Footer } from '@/components/sections';

type Params = Promise<{locale:string;policy:string}>;
export function generateStaticParams(){return policyKinds.map(policy=>({policy}));}
export const dynamicParams = false;
export async function generateMetadata({params}:{params:Params}):Promise<Metadata>{
  const {locale,policy}=await params;
  if(!isLocale(locale)||!policyKinds.includes(policy as PolicyKind))return {};
  return {title:`${getPolicy(locale,policy as PolicyKind).title} | Rooklyn`,metadataBase:new URL(config.origin),alternates:{canonical:`/${locale}/${policy}/`,languages:{en:`/en/${policy}/`,es:`/es/${policy}/`,it:`/it/${policy}/`,'x-default':`/en/${policy}/`}}};
}
function PolicyText({text}:{text:string}){
  return <>{text.split(/(https:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]+)/g).map((part,index)=>{
    const url=part.replace(/[.,;]$/,'');
    return part.startsWith('https://')?<span key={index}><a href={url}>{url}</a>{part.slice(url.length)}</span>:part.includes('@')?<a key={index} href={`mailto:${part}`}>{part}</a>:part;
  })}</>;
}
function Blocks({blocks}:{blocks:PolicyBlock[]}){
  const output:React.ReactNode[]=[];
  for(let i=0;i<blocks.length;i++){
    const block=blocks[i];
    if(block.type==='li'){
      const items:React.ReactNode[]=[];const key=i;
      while(i<blocks.length&&blocks[i].type==='li'){const item=blocks[i] as {type:'li';text:string};items.push(<li key={i}><PolicyText text={item.text}/></li>);i++}i--;
      output.push(<ul key={key}>{items}</ul>);
    }else if(block.type==='table'){
      const headings=block.rows[0].length>2;
      output.push(<div className="policy-table" key={i} tabIndex={0} role="region" aria-label={block.rows[0].join(' / ')}><table>
        {headings&&<thead><tr>{block.rows[0].map((cell,k)=><th key={k} scope="col">{cell}</th>)}</tr></thead>}
        <tbody>{block.rows.slice(headings?1:0).map((row,r)=><tr key={r}>{row.map((cell,c)=>c===0?<th key={c} scope="row"><PolicyText text={cell}/></th>:<td key={c}><PolicyText text={cell}/></td>)}</tr>)}</tbody>
      </table></div>);
    }else if(block.type==='h2')output.push(<h2 key={i}>{block.text}</h2>);
    else if(block.type==='h3')output.push(<h3 key={i}>{block.text}</h3>);
    else output.push(<p key={i}><PolicyText text={block.text}/></p>);
  }
  return output;
}
export default async function PolicyPage({params}:{params:Params}){
  const {locale,policy}=await params;
  if(!isLocale(locale)||!policyKinds.includes(policy as PolicyKind))notFound();
  const document=getPolicy(locale,policy as PolicyKind);
  return <><header className="policy-header"><div className="header-inner"><a href={`/${locale}/`} aria-label="Rooklyn"><Logo/></a><LanguageSelector locale={locale} path={`${policy}/`}/></div></header>
    <main className="container policy-content"><a className="text-link" href={`/${locale}/`}><ArrowLeft size={16}/>{content[locale].back}</a><h1>{document.title}</h1><p className="policy-date">{document.date}</p><Blocks blocks={document.blocks}/></main>
    <Footer locale={locale} salesPage={false}/></>;
}

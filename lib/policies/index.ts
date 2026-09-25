import source from './es.json';
import enLegal from './en-legal.json';
import enPrivacy from './en-privacy.json';
import enCookies from './en-cookies.json';
import itLegal from './it-legal.json';
import itPrivacy from './it-privacy.json';
import itCookies from './it-cookies.json';
import type { Locale } from '../config';

export const policyKinds = ['privacy', 'cookies', 'legal'] as const;
export type PolicyKind = typeof policyKinds[number];
export type PolicyBlock = { type: 'p'|'h2'|'h3'|'li'; text: string } | { type: 'table'; rows: string[][] };
export type PolicyDocument = { title: string; date: string; blocks: PolicyBlock[] };
const spanish = source as Record<PolicyKind, PolicyDocument>;
const translations = {en:{legal:enLegal,privacy:enPrivacy,cookies:enCookies},it:{legal:itLegal,privacy:itPrivacy,cookies:itCookies}};

export function getPolicy(locale: Locale, kind: PolicyKind): PolicyDocument {
  if (locale === 'es') return spanish[kind];
  const [title,date,...values] = translations[locale][kind];
  if (values.length !== spanish[kind].blocks.length) throw new Error(`Incomplete ${locale} ${kind} policy`);
  return { title: title as string, date: date as string, blocks: spanish[kind].blocks.map((block,index) => block.type === 'table'
    ? {type:'table',rows:values[index] as string[][]}
    : {type:block.type,text:values[index] as string}) };
}

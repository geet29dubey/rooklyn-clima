// Focused deployment and consent-boundary checks. Run: node qa/verify.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
const cache = new Map();
const storage = new Map();
const scripts = [];
const context = { process: {env:{}}, URL, URLSearchParams, Date, localStorage: {getItem:k=>storage.get(k)??null}, location:{search:'?utm_source=verification&private=excluded'}, document:{createElement:()=>({dataset:{},setAttribute(){},remove(){this.removed=true}}),head:{appendChild:s=>scripts.push(s)}} };
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file);const module={exports:{}};cache.set(file,module.exports);const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;const fn=vm.runInNewContext(`(function(require,module,exports){${code}\n})`,context);fn(name=>load(path.resolve(path.dirname(file),`${name}.ts`)),module,module.exports);return module.exports;}
const {config,externalUrl,locales}=load('lib/config.ts');
const {content}=load('lib/content.ts');
const {dictionaries}=load('lib/dictionaries.ts');
const {lifecycle}=load('lib/lifecycle.ts');
const {assessmentForms, contactCopy, isAssessmentSubmission}=load('lib/contact.ts');
for(const locale of locales){
  const id=`inline-${assessmentForms[locale].id}`;
  assert.equal(isAssessmentSubmission(['set-sticky-contacts',`embedded_iframe_${id}`,id],id),true);
  for(const invalid of [null,{},['iframeLoaded'],['set-sticky-contacts','_ud','{}'],['set-sticky-contacts','embedded_iframe_other','other'],['set-sticky-contacts',`embedded_iframe_${id}`,'other']])assert.equal(isAssessmentSubmission(invalid,id),false);
  const html=fs.readFileSync(`out/${locale}/index.html`,'utf8');
  assert.ok(html.includes(`data-form-id="${assessmentForms[locale].id}"`));
  assert.ok(html.includes('id="contact"'));
  assert.ok(!html.includes('id="demo"'));
  assert.ok(!html.includes('href="#demo"')&&!html.includes('href="#undefined"'));
  assert.ok(html.includes(`href="/${locale}/#contact"`));
  const thanks=fs.readFileSync(`out/${locale}/thank-you/index.html`,'utf8');
  assert.ok(thanks.includes(contactCopy[locale].thanks));
  assert.ok(thanks.includes('noindex'));
}
console.log('PASS localized inline contact forms, contact navigation, thank-you routes and success-message filtering');
function structure(value){if(Array.isArray(value))return value.map(structure);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,structure(v)]));assert.equal(typeof value,'string');assert.ok(value.length>0);return 'string'}
for (const locale of locales) {
  assert.deepEqual(structure(lifecycle[locale]), structure(lifecycle.es));
  const html = fs.readFileSync(`out/${locale}/index.html`, 'utf8');
  for (const field of ['assetTitle', 'replacementTitle', 'maintenanceTitle', 'estimateNote', 'replacementNote', 'channelsNote']) {
    assert.ok(html.includes(lifecycle[locale][field]), `${locale}: missing translated lifecycle content ${field}`);
  }
  assert.equal((html.match(/class="capability-card /g) || []).length, 5);
  assert.equal(lifecycle[locale].page.steps.length, 4);
  assert.equal(lifecycle[locale].businessExamples.length, 3);
}
console.log('PASS lifecycle: complete ES/EN/IT translations, rendered examples and scope labels');
for(const locale of locales){assert.deepEqual(structure(content[locale]),structure(content.es));assert.deepEqual(structure(dictionaries[locale]),structure(dictionaries.es));assert.equal(content[locale].faqs.length,10);const html=fs.readFileSync(`out/${locale}/index.html`,'utf8');assert.ok(html.includes(`<html lang="${locale}"`));assert.ok(html.includes(`rel="canonical" href="${config.origin}/${locale}/"`));for(const alternate of locales)assert.ok(html.includes(`hrefLang="${alternate}"`));assert.ok(html.includes('property="og:title"'));assert.ok(html.includes(dictionaries[locale].hero));assert.ok(html.includes(content[locale].optional));assert.ok(html.includes(content[locale].disclaimer));assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.equal((html.match(/<details\b/g)||[]).length,10);for(const kind of ['demo','repair','installation']){const url=new URL(externalUrl(config[kind],locale,'?utm_source=ads&utm_medium=cpc&utm_campaign=hvac&utm_content=a%26b&email=private'));assert.equal(url.searchParams.get('lang'),locale);assert.equal(url.searchParams.get('utm_content'),'a&b');assert.equal(url.searchParams.get('utm_campaign'),'hvac');assert.equal(url.searchParams.has('email'),false)}console.log(`PASS ${locale}: copy shape, metadata, content and URL propagation`)}
const {trackingConfig}=load('lib/tracking-config.ts');const tracking=load('lib/tracking.ts');const events=[];trackingConfig.adapter=(...args)=>events.push(args);trackingConfig.scriptUrl='https://example.invalid/test-only-script.js';tracking.enableTracking();tracking.track('hvac_sales_page_viewed','es');assert.equal(scripts.length,0);assert.equal(events.length,0);storage.set(tracking.consentKey,JSON.stringify({analytics:false,timestamp:Date.now()}));tracking.enableTracking();tracking.track('hvac_demo_started','es');assert.equal(scripts.length,0);assert.equal(events.length,0);storage.set(tracking.consentKey,JSON.stringify({analytics:true,timestamp:Date.now()}));tracking.enableTracking();tracking.track('hvac_demo_started','es');assert.equal(scripts.length,1);assert.equal(events.length,1);assert.equal(events[0][1].utm_source,'verification');assert.equal(events[0][1].private,undefined);trackingConfig.adapter=()=>{throw Error('integration unavailable')};assert.doesNotThrow(()=>tracking.track('hvac_demo_started','it'));storage.set(tracking.consentKey,JSON.stringify({analytics:false,timestamp:Date.now()}));tracking.disableTracking();assert.equal(scripts[0].removed,true);storage.set(tracking.consentKey,JSON.stringify({analytics:true,timestamp:Date.now()-181*86400000}));assert.equal(tracking.hasConsent(),false);console.log('PASS analytics: default/declined/expired consent, allowed loading, UTM-only event data, safe adapter failure and revocation');
for(const file of ['out/robots.txt','out/sitemap.xml','out/404.html','out/favicon.svg'])assert.ok(fs.existsSync(file));assert.ok(fs.readFileSync('out/sitemap.xml','utf8').includes('hreflang="it"'));console.log('PASS static deployment files');

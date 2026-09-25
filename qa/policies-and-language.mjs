import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source=JSON.parse(fs.readFileSync('lib/policies/es.json','utf8'));
for(const locale of ['en','es','it']){
  const page=fs.readFileSync(`out/${locale}/index.html`,'utf8');
  for(const kind of ['privacy','cookies','legal']){
    assert.ok(page.includes(`href="/${locale}/${kind}/"`));
    const html=fs.readFileSync(`out/${locale}/${kind}/index.html`,'utf8');
    assert.ok(html.includes(`<html lang="${locale}"`));
    assert.ok(html.includes('Z0680759X')&&!html.includes('Z0680759Z'));
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.ok(!html.includes('class="mobile-sticky"'));
    if(locale==='es')continue;
    const values=JSON.parse(fs.readFileSync(`lib/policies/${locale}-${kind}.json`,'utf8')).slice(2);
    assert.equal(values.length,source[kind].blocks.length);
    source[kind].blocks.forEach((block,index)=>{
      if(block.type==='table')assert.deepEqual(values[index].map(row=>row.length),block.rows.map(row=>row.length));
      else assert.equal(typeof values[index],'string');
    });
  }
}
console.log('PASS nine localized policies, matching footer links, translated paragraph/table coverage and confirmed identifier');

const entry=ts.transpileModule(fs.readFileSync('app/(entry)/page.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
for(const [saved,expected] of [[null,'en'],['invalid','en'],['es','es'],['it','it'],['blocked','en']]){
  const redirects=[];const module={exports:{}};
  const window={location:{search:'?utm_source=qa',hash:'#contact',replace:url=>redirects.push(url)}};
  const localStorage={getItem:()=>{if(saved==='blocked')throw Error('unavailable');return saved}};
  const require=name=>name==='react'?{useEffect:fn=>fn()}:{jsx:()=>null,jsxs:()=>null};
  vm.runInNewContext(`(function(require,module,exports){${entry}\n})`,{window,localStorage})(require,module,module.exports);
  module.exports.default();
  assert.deepEqual(redirects,[`/${expected}/?utm_source=qa#contact`]);
}
console.log('PASS English default, saved-language preference, unavailable storage, query and section preservation');

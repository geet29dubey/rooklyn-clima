// Exercise the embed's redirect boundary without creating a real GHL lead.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const compile = file => ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
function evaluate(file, dependencies, globals = {}) {
  const module = { exports: {} };
  vm.runInNewContext(`(function(require,module,exports){${compile(file)}\n})`, globals)(name => dependencies[name], module, module.exports);
  return module.exports;
}
const contact = evaluate('lib/contact.ts', {});
for (const locale of ['en', 'es', 'it']) {
  const listeners = new Map(), redirects = [], tracked = [], cleanups = [];
  const source = {}, id = `inline-${contact.assessmentForms[locale].id}`;
  const window = { location: { search: '', assign: url => redirects.push(url) }, addEventListener: (type, fn) => listeners.set(type, fn), removeEventListener: type => listeners.delete(type) };
  const dependencies = {
    react: { useRef: () => ({ current: { contentWindow: source } }), useState: value => [value, () => {}], useEffect: fn => cleanups.push(fn()) },
    'react/jsx-runtime': { jsx: () => null, jsxs: () => null },
    'next/script': {}, 'lucide-react': {}, './actions': {},
    '@/lib/config': { externalUrl: value => value }, '@/lib/contact': contact,
    '@/lib/content': { content: { [locale]: {} } }, '@/lib/lifecycle': { lifecycle: { [locale]: {} } },
    '@/lib/tracking': { track: (...args) => tracked.push(args) },
  };
  evaluate('components/contact.tsx', dependencies, { window }).ContactSection({ locale });
  const send = (data, origin = 'https://api.leadconnectorhq.com', sender = source) => listeners.get('message')({ data, origin, source: sender });
  const success = ['set-sticky-contacts', `embedded_iframe_${id}`, id];
  send(['iframeLoaded']);
  send(['set-sticky-contacts', '_ud', '{}']);
  send(['set-sticky-contacts', 'embedded_iframe_other', 'other']);
  send(success, 'https://untrusted.invalid');
  send(success, undefined, {});
  assert.equal(redirects.length, 0, 'Loads, contact-sync and unrelated senders must not redirect');
  send(success); send(success);
  assert.deepEqual(redirects, [`/${locale}/thank-you/`]);
  assert.deepEqual(tracked, [['hvac_lead_form_submitted', locale]]);
  cleanups.forEach(fn => fn?.());
  assert.equal(listeners.size, 0);
}
console.log('PASS EN/ES/IT submission redirects, origin/source/form validation, deduplication and listener cleanup');

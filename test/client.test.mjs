/**
 * Functional harness for the Client module: loads client.js with stub
 * window/document/React, runs apply(ctx), and exercises selection,
 * restore and external theme changes.
 */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(here, '..', 'client.js');
let spec;
const storage = new Map();
const fetchCalls = [];

globalThis.window = {
  __ModuleLoader__: { load(value) { spec = value; } },
  localStorage: {
    getItem: (key) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, value),
  },
  __DSH_VISUAL_THEMES__: null,
};

const head = { children: [], append(node) { this.children.push(node); } };
globalThis.document = {
  documentElement: { dataset: {} },
  head,
  createElement() {
    const node = { dataset: {}, textContent: '' };
    node.remove = () => { head.children = head.children.filter((child) => child !== node); };
    return node;
  },
};

globalThis.fetch = async (url, init) => {
  fetchCalls.push({ url, body: init?.body });
  return { ok: true };
};

const React = {
  createElement: (type, props, ...children) => ({ type, props, children }),
  useSyncExternalStore: (subscribe, get) => get(),
};
const requireStub = (id) => {
  if (id === 'react') return React;
  throw new Error(`unexpected require(${id})`);
};

await import(`${pathToFileURL(file)}?t=${Date.now()}`);
assert.ok(spec, 'module loader received the module');
assert.equal(spec.id, '@surenkh/dsh-visual-themes');
const module = spec.factory(requireStub);

let preference = 'light';
const changeListeners = [];
const registered = [];
const effects = [];
const slotRegistrations = [];

const ctx = {
  effect(fn) { const cleanup = fn(); effects.push(cleanup); return cleanup; },
  on(event, cb) { if (event === 'theme/change') changeListeners.push(cb); },
  locale: {
    register() { return () => {}; },
    bind() { return (key) => key; },
  },
  theme: {
    getTheme() { return { preference, themes: registered }; },
    setTheme(id) {
      preference = id;
      for (const listener of changeListeners) listener({ preference: id });
    },
    register(definition) { registered.push(definition); return () => {}; },
  },
  slots: {
    inject(name, callback) { callback(); },
    register(options, component) {
      slotRegistrations.push({ options, component });
      return () => {};
    },
  },
};

module.apply(ctx);

/* registration: eleven single-scheme themes */
assert.equal(registered.length, 11, 'eleven theme definitions');
for (const definition of registered) {
  assert.ok(definition.id.startsWith('vt-'));
  for (const [name, value] of Object.entries(definition.tokens)) {
    assert.ok(name.startsWith('--'), `token name ${name} is a custom property`);
    assert.equal(typeof value, 'string', `token ${name} is a string`);
  }
}

/* untouched original appearance */
assert.equal(document.documentElement.dataset.vt, undefined);
assert.equal(preference, 'light');

/* picker and sidebar entry */
assert.equal(slotRegistrations.length, 2);
const main = slotRegistrations.find((r) => r.options.key === 'visual-themes');
const rail = slotRegistrations.find((r) => r.options.id === 'visual-themes');
assert.ok(main && rail);
assert.equal(rail.options.order, 20);

const face = main.options.inject().vt;
assert.equal(typeof face.select, 'function');

/* select */
face.select('deep-space');
assert.equal(document.documentElement.dataset.vt, 'deep-space');
assert.equal(document.documentElement.dataset.vtKind, 'modern');
assert.equal(preference, 'vt-deep-space');
assert.equal(JSON.parse(storage.get('dsh-visual-themes/state/v1')).theme, 'deep-space');
assert.equal(fetchCalls.at(-1).url, '/visual-themes/state');
assert.equal(JSON.parse(fetchCalls.at(-1).body).theme, 'deep-space');

face.select('retro-desktop');
assert.equal(preference, 'vt-retro-desktop');
assert.equal(document.documentElement.dataset.vtMode, 'light');

/* render the panel and both icons without throwing */
const store = face.store;
const tree = main.component({
  vt: face,
  t: (key) => key,
  useSyncExternalStore: React.useSyncExternalStore,
});
assert.equal(tree.type, 'div');
assert.equal(tree.props.className, 'vt-page');
const grid = tree.children.find((child) => child?.props?.className === 'vt-grid');
const cards = grid.children[0];
assert.equal(cards.length, 11, 'eleven cards');
const partsOf = (card) => (Array.isArray(card.children[0]) ? card.children[0] : card.children);
const names = cards.map((card) => partsOf(card).find((c) => c?.props?.className === 'vt-card-body').children[0].children[0]);
assert.deepEqual(names, [
  'Deep Space', 'Sage Studio', 'Ember Terminal', 'Neon Pulse', 'Swiss Studio', 'Retro Desktop',
  'Aurora Glass', 'Ivory & Plum', 'Ivory & Navy', 'Y2K Aqua', 'Retro Mint Desktop',
]);
rail.component({ size: 16, active: false });
main.component({ vt: face, t: (key) => key });

/* restore */
face.restore();
assert.equal(document.documentElement.dataset.vt, undefined);
assert.equal(preference, 'light');
assert.equal(JSON.parse(storage.get('dsh-visual-themes/state/v1')).theme, null);
assert.equal(store.get().theme, null);

/* an external preference change ends the plugin theme */
face.select('ember-terminal');
assert.equal(document.documentElement.dataset.vt, 'ember-terminal');
preference = 'dark';
for (const listener of changeListeners) listener({ preference: 'dark' });
assert.equal(store.get().theme, null);
assert.equal(document.documentElement.dataset.vt, undefined);

/* every theme applies through one uniform path */
const keys = [
  'deep-space', 'sage-studio', 'ember-terminal', 'neon-pulse', 'swiss-studio', 'retro-desktop',
  'aurora-glass', 'ivory-plum', 'ivory-navy', 'y2k-aqua', 'retro-mint',
];
for (const key of keys) {
  face.select(key);
  assert.equal(document.documentElement.dataset.vt, key, `apply ${key}`);
  assert.equal(JSON.parse(storage.get('dsh-visual-themes/state/v1')).theme, key);
  const definition = JSON.parse(fetchCalls.at(-1).body);
  assert.equal(definition.theme, key);
}
face.restore();
assert.equal(document.documentElement.dataset.vt, undefined);
/* disposal removes the stylesheet node and attributes */
face.select('neon-pulse');
for (const cleanup of effects.reverse()) if (typeof cleanup === 'function') cleanup();
assert.equal(head.children.length, 0);
assert.equal(document.documentElement.dataset.vt, undefined);

console.log('client harness: all assertions passed');

function pathToFileURL(target) {
  return new URL(`file:///${target.replaceAll('\\', '/')}`).href;
}

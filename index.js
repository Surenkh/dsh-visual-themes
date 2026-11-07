/**
 * Host half of the Visual Themes bundle.
 *
 * The plugin's rendering, theme registry and picker live in the Client module.
 * This half only does what a browser page cannot: it keeps the selected theme
 * in the user's DSH data directory so the choice survives an application
 * restart even when the GUI origin (and therefore browser storage) changes, and
 * it hands that value to the page before the Client boot script runs.
 *
 * The route is deliberately tiny and same-origin only: GET returns the stored
 * value, POST validates and stores a new one.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const FILE_NAME = 'visual-themes.json';
const ROUTE = '/visual-themes/state';
const MAX_BODY_BYTES = 4096;
const THEME_KEY = /^[a-z0-9][a-z0-9-]{0,39}$/;

/** Absolute path of the durable selection document. */
function statePath() {
  const home = typeof process.env.DSH_HOME === 'string' && process.env.DSH_HOME !== ''
    ? process.env.DSH_HOME
    : path.join(os.homedir(), '.dsh');
  return path.join(home, FILE_NAME);
}

/**
 * Accept only the shape the Client understands; anything else is dropped.
 * @param {unknown} value - decoded JSON or an injected page value.
 * @returns {{ theme: string | null, mode: 'light' | 'dark', at: number } | null}
 */
function sanitize(value) {
  if (value === null || typeof value !== 'object') return null;
  const theme = typeof value.theme === 'string' && THEME_KEY.test(value.theme) ? value.theme : null;
  const mode = value.mode === 'dark' ? 'dark' : 'light';
  const at = Number.isFinite(value.at) ? Math.max(0, Math.floor(value.at)) : 0;
  if (at <= 0) return null; // a document without our write timestamp is not ours
  if (theme === null && value.theme !== null && value.theme !== undefined) return null;
  return { theme, mode, at };
}

/** Read the durable selection, treating any unreadable document as "no theme". */
function readState() {
  try {
    const raw = fs.readFileSync(statePath(), 'utf8');
    return sanitize(JSON.parse(raw));
  } catch {
    return null;
  }
}

/**
 * Write the selection atomically so a crash cannot leave half a JSON document.
 * @param {{ theme: string | null, mode: 'light' | 'dark', at: number }} next
 */
function writeState(next) {
  const file = statePath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(next), 'utf8');
  fs.renameSync(temporary, file);
}

/** Read a small request body without letting a client grow it without bound. */
async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error('body too large');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

function send(res, status, value) {
  const body = value === undefined ? '' : JSON.stringify(value);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(body);
}

/**
 * Host plugin entry.
 * @param {import('@deepseek-ai/cordis').Context} ctx - plugin context.
 */
export function apply(ctx) {
  ctx.inject(['webServer'], (scope) => {
    scope.effect(
      () => {
        try {
          return scope.webServer.register({
            kind: 'exact',
            path: ROUTE,
            handler: async (req, res) => {
              try {
                if (req.method === 'GET') {
                  send(res, 200, readState());
                  return;
                }
                if (req.method !== 'POST') {
                  res.writeHead(405, { allow: 'GET, POST' });
                  res.end();
                  return;
                }
                const next = sanitize(JSON.parse(await readBody(req)));
                if (next === null) {
                  send(res, 400, { error: 'invalid state' });
                  return;
                }
                writeState(next);
                send(res, 200, next);
              } catch {
                send(res, 400, { error: 'invalid request' });
              }
            },
          });
        } catch {
          // A reload can race the previous generation's route; the new one is
          // equivalent, so keep the plugin active with browser storage only.
          return () => {};
        }
      },
      'visual-themes: persisted selection route',
    );
  });

  // The page must know the durable choice before its Client module runs, so the
  // theme is applied on the first paint instead of after a network round trip.
  ctx.on('webserver/index-inject', (table) => {
    const state = readState();
    table.push({
      kind: 'script',
      placement: 'head',
      text: `window.__DSH_VISUAL_THEMES__=${JSON.stringify(state)};`,
    });
  }, { prepend: true });
}

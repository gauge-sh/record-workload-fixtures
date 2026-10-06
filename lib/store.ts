import { readFileSync } from 'node:fs';
import type { Entry, Kind } from './models';
const state = globalThis as typeof globalThis & { recordStore?: Record<Kind, Entry[]> };
state.recordStore ??= {
  catalog: JSON.parse(readFileSync(process.cwd() + '/fixtures/catalog.json', 'utf8')),
  content: JSON.parse(readFileSync(process.cwd() + '/fixtures/content.json', 'utf8')),
};
export const store = state.recordStore;
export function save(kind: Kind, entry: Entry) {
  const index = store[kind].findIndex(row => row.id === entry.id);
  if (index < 0) store[kind].push(entry); else store[kind][index] = entry;
  return entry;
}

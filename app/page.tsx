'use client';
import { useState } from 'react';
type Row = { id: string; title: string; [key: string]: unknown };
export default function App() {
  const [kind, setKind] = useState('catalog');
  const [rows, setRows] = useState<Row[]>([]);
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState('Choose a collection and load records.');
  async function load() {
    try { const r = await fetch('/api/' + kind); if (!r.ok) throw Error('Load failed'); setRows(await r.json()); setMessage('Records loaded.'); }
    catch (e) { setMessage(String(e)); }
  }
  async function save() {
    try {
      const entry = JSON.parse(draft) as Row;
      const r = await fetch('/api/' + kind + '/' + encodeURIComponent(entry.id), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry) });
      if (!r.ok) throw Error('Save failed: ' + r.status);
      await load(); setMessage('Saved.');
    } catch (e) { setMessage(String(e)); }
  }
  return <main style={{ maxWidth: 900, margin: '32px auto', fontFamily: 'sans-serif' }}>
    <h1>Records workspace</h1>
    <label>Collection <select value={kind} onChange={e => { setKind(e.target.value); setRows([]); setDraft(''); }}>
      <option value="catalog">Catalog</option><option value="content">Content</option>
    </select></label>{' '}<button onClick={load}>Load records</button>
    <p role="status">{message}</p>
    <ul>{rows.map(row => <li key={row.id}><button onClick={() => setDraft(JSON.stringify(row, null, 2))}>{row.title}</button></li>)}</ul>
    <label htmlFor="recordPayload">Record JSON</label><br />
    <textarea id="recordPayload" value={draft} onChange={e => setDraft(e.target.value)} rows={22} style={{ width: '100%', fontFamily: 'monospace' }} /><br />
    <button onClick={save} disabled={!draft}>Save record</button>
  </main>;
}

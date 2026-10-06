import express from 'express';
import { isKind, isEntry } from './lib/models';
import { store, save } from './lib/store';
const app = express();
app.use(express.json());
app.get('/health', (_req, res) => { res.json({ status: 'ok' }); });
app.get('/api/:kind', (req, res) => {
  const kind = req.params.kind;
  if (!isKind(kind)) { res.sendStatus(404); return; }
  res.json(store[kind]);
});
app.get('/api/:kind/:id', (req, res) => {
  const kind = req.params.kind;
  if (!isKind(kind)) { res.sendStatus(404); return; }
  const row = store[kind].find(r => r.id === req.params.id);
  if (!row) { res.sendStatus(404); return; }
  res.json(row);
});
app.put('/api/:kind/:id', (req, res) => {
  const kind = req.params.kind;
  if (!isKind(kind)) { res.sendStatus(404); return; }
  if (!isEntry(req.body) || req.body.id !== req.params.id) { res.sendStatus(400); return; }
  res.json(save(kind, req.body));
});
app.listen(Number(process.env.PORT || 8000), '127.0.0.1');

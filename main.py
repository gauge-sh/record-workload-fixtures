import json
from pathlib import Path
from fastapi import FastAPI, HTTPException
from models import Entry

app = FastAPI()
store = {kind: json.loads((Path(__file__).parent / 'fixtures' / f'{kind}.json').read_text()) for kind in ('catalog', 'content')}

def records(kind: str):
    if kind not in store: raise HTTPException(404)
    return store[kind]

@app.get('/health')
def health(): return {'status': 'ok'}

@app.get('/api/{kind}')
def list_records(kind: str): return records(kind)

@app.get('/api/{kind}/{record_id}')
def get_record(kind: str, record_id: str):
    row = next((r for r in records(kind) if r['id'] == record_id), None)
    if row is None: raise HTTPException(404)
    return row

@app.put('/api/{kind}/{record_id}')
def save_record(kind: str, record_id: str, entry: Entry):
    rows = records(kind)
    if entry.id != record_id: raise HTTPException(400, 'ID mismatch')
    value = entry.model_dump(exclude_none=True)
    for i, row in enumerate(rows):
        if row['id'] == record_id:
            rows[i] = value
            return value
    rows.append(value)
    return value

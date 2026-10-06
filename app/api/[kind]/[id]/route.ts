import { isKind, isEntry } from '../../../../lib/models';
import { store, save } from '../../../../lib/store';
type Context = { params: Promise<{ kind: string; id: string }> };
export async function GET(_request: Request, context: Context) {
  const { kind, id } = await context.params;
  const row = isKind(kind) ? store[kind].find(r => r.id === id) : undefined;
  return row ? Response.json(row) : new Response(null, { status: 404 });
}
export async function PUT(request: Request, context: Context) {
  const { kind, id } = await context.params;
  if (!isKind(kind)) return new Response(null, { status: 404 });
  let body: unknown;
  try { body = await request.json(); } catch { return new Response(null, { status: 400 }); }
  if (!isEntry(body) || body.id !== id) return new Response(null, { status: 400 });
  return Response.json(save(kind, body));
}

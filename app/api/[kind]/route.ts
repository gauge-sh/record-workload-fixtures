import { isKind } from '../../../lib/models';
import { store } from '../../../lib/store';
export async function GET(_request: Request, context: { params: Promise<{ kind: string }> }) {
  const { kind } = await context.params;
  return isKind(kind) ? Response.json(store[kind]) : new Response(null, { status: 404 });
}

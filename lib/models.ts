export type Variant = { sku: string; attributes: Record<string, unknown>; stock: number };
export type Block = { id: string; type: string; data: Record<string, unknown> };
export type Entry = {
  id: string; ownerId: string; status: string; createdAt: string; title: string;
  attributes: Record<string, unknown>; category?: string; variants?: Variant[];
  schemaVersion?: number; blocks?: Block[];
};
export type Kind = 'catalog' | 'content';
export function isKind(value: string): value is Kind { return value === 'catalog' || value === 'content'; }
export function isEntry(value: unknown): value is Entry {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return ['id', 'ownerId', 'status', 'createdAt', 'title'].every(k => typeof v[k] === 'string' && v[k] !== '')
    && !!v.attributes && typeof v.attributes === 'object' && !Array.isArray(v.attributes);
}

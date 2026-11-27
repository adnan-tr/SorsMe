import { categories, products } from '@/lib/sorsme';

export const adminSections = [
  { key: 'dashboard', label: 'Dashboard', path: '/admin' },
  { key: 'suppliers', label: 'Suppliers', path: '/admin/suppliers' },
  { key: 'products', label: 'Products', path: '/admin/products' },
  { key: 'categories', label: 'Categories', path: '/admin/categories' },
  { key: 'customers', label: 'Customers', path: '/admin/customers' },
  { key: 'subscriptions', label: 'Subscriptions', path: '/admin/subscriptions' },
  { key: 'audit-logs', label: 'Audit Logs', path: '/admin/audit-logs' },
  { key: 'settings', label: 'Settings', path: '/admin/settings' },
] as const;
export type SectionKey = (typeof adminSections)[number]['key'];

export const productVisibility = ['Public', 'Database Subscriber', 'Internal'] as const;
export type Visibility = (typeof productVisibility)[number];
export const recordStatuses = ['Active', 'Inactive'] as const;
export type RecordStatus = (typeof recordStatuses)[number];
export type Viewer = 'visitor' | 'subscriber' | 'staff';

/** Who may see a product: Public → everyone, Database Subscriber → subscribers and staff, Internal → staff only. Inactive → staff only. */
export function canViewProduct(p: { visibility: Visibility; status: RecordStatus }, viewer: Viewer) {
  if (viewer === 'staff') return true;
  if (p.status !== 'Active') return false;
  if (p.visibility === 'Public') return true;
  if (p.visibility === 'Database Subscriber') return viewer === 'subscriber';
  return false;
}

export type SubscriptionStatus = 'Active' | 'Cancelled' | 'Expired';
/** A cancelled but paid-through subscription keeps access until the paid period ends. */
export function hasDatabaseAccess(s: { status: SubscriptionStatus; paidThrough: Date }, now: Date) {
  if (s.status === 'Expired') return false;
  return now.getTime() <= s.paidThrough.getTime();
}

export type CatalogueRow = { id: string; name: string; image: string; category: string; categoryId: string; description: string; slug: string; count: number };
export const categoryRows: CatalogueRow[] = categories.map((c) => ({ ...c, category: c.name, categoryId: c.id, slug: c.id, count: products.filter((p) => p.category === c.id).length }));
export const productRows: CatalogueRow[] = products.map((p) => ({ ...p, categoryId: p.category, category: categories.find((c) => c.id === p.category)?.name ?? p.category, slug: p.id, count: 0 }));

export function filterCatalogue(rows: CatalogueRow[], search: string, categoryId: string, direction: 'asc' | 'desc') {
  const q = search.trim().toLowerCase();
  return rows
    .filter((r) => `${r.name} ${r.slug} ${r.description}`.toLowerCase().includes(q) && (!categoryId || r.categoryId === categoryId))
    .sort((a, b) => (direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
}
export function paginate<T>(rows: T[], page: number, pageSize: number) {
  const p = Math.max(1, page);
  return rows.slice((p - 1) * pageSize, p * pageSize);
}
export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export type Errors = Record<string, string>;
const req = (e: Errors, k: string, v: string, label: string) => { if (!v.trim()) e[k] = `${label} is required.`; };
const slugOk = (e: Errors, v: string) => { if (v && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(v)) e['slug'] = 'Use lowercase letters, numbers and hyphens.'; };

export type ProductDraft = { name: string; sku: string; slug: string; description: string; categoryId: string; supplier: string; origin: string; packaging: string; moq: string; leadTime: string; specs: { name: string; value: string }[]; visibility: Visibility; status: RecordStatus };
export function validateProduct(d: ProductDraft): Errors {
  const e: Errors = {};
  req(e, 'name', d.name, 'Product name'); req(e, 'sku', d.sku, 'SKU'); req(e, 'slug', d.slug, 'Slug'); req(e, 'description', d.description, 'Description');
  slugOk(e, d.slug);
  if (d.description.length > 1000) e['description'] = 'Description must be 1,000 characters or fewer.';
  if (!categories.some((c) => c.id === d.categoryId)) e['categoryId'] = 'Choose a category.';
  if (d.specs.some((s) => !s.name.trim() || !s.value.trim())) e['specs'] = 'Each specification needs a name and value.';
  return e;
}
export type CategoryDraft = { name: string; slug: string; description: string; status: RecordStatus };
export function validateCategory(d: CategoryDraft): Errors {
  const e: Errors = {};
  req(e, 'name', d.name, 'Category name'); req(e, 'slug', d.slug, 'Slug'); req(e, 'description', d.description, 'Description');
  slugOk(e, d.slug);
  if (d.description.length > 500) e['description'] = 'Description must be 500 characters or fewer.';
  return e;
}
export type SupplierDraft = { company: string; legalEntity: string; taxNumber: string; city: string; country: string; website: string; contactName: string; contactEmail: string; categoryIds: string[] };
export function validateSupplier(d: SupplierDraft): Errors {
  const e: Errors = {};
  req(e, 'company', d.company, 'Company name'); req(e, 'city', d.city, 'City'); req(e, 'country', d.country, 'Country'); req(e, 'contactName', d.contactName, 'Contact name');
  if (!/^\S+@\S+\.\S+$/.test(d.contactEmail)) e['contactEmail'] = 'Enter a valid email address.';
  if (d.website && !/^https?:\/\/\S+\.\S+/.test(d.website)) e['website'] = 'Website must start with http:// or https://.';
  if (d.categoryIds.length === 0) e['categoryIds'] = 'Assign at least one category.';
  return e;
}

export function downloadDraft(kind: string, data: unknown) {
  const blob = new Blob([JSON.stringify({ kind, savedAt: new Date().toISOString(), status: 'draft-not-saved', data }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `sorsme-${kind}-draft.json`; a.click();
  URL.revokeObjectURL(url);
}

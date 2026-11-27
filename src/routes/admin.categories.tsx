import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { z } from 'zod';
import { Download, Pencil, Plus, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectionNotice, Field, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { categoryRows, downloadDraft, filterCatalogue, recordStatuses, slugify, validateCategory, type CategoryDraft, type Errors } from '@/lib/admin';

export const Route = createFileRoute('/admin/categories')({ validateSearch: z.object({ add: z.boolean().optional() }), component: Categories });
const blank: CategoryDraft = { name: '', slug: '', description: '', status: 'Active' };

function Categories() {
  const { add } = Route.useSearch();
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<CategoryDraft | null>(add ? blank : null);
  const [editKey, setEditKey] = useState('new');
  const rows = filterCatalogue(categoryRows, q, '', 'asc');
  return (
    <>
      <PageTitle title="Category Management" subtitle="Organise your products into categories for better sourcing and discoverability." crumbs={['Categories']}>
        <Button onClick={() => { setEditKey('new'); setEditing(blank); }}><Plus />Add Category</Button>
      </PageTitle>
      <ConnectionNotice compact />
      <div className={editing ? 'admin-split' : undefined}>
        <Panel title={`Categories (${rows.length})`}>
          <div className="admin-filters"><div className="admin-input-icon"><Search size={15} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search categories by name or slug…" aria-label="Search categories" /></div></div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Category</th><th>Slug</th><th>Description</th><th>Public products</th><th>Status</th><th /></tr></thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id}>
                    <td><div className="admin-cell-media"><img src={c.image} alt="" /><strong>{c.name}</strong></div></td>
                    <td className="mono">{c.slug}</td>
                    <td className="muted clamp">{c.description}</td>
                    <td>{c.count}</td>
                    <td><Tag tone="success">Active</Tag></td>
                    <td><button className="admin-icon-btn" aria-label={`Edit ${c.name}`} onClick={() => { setEditKey(c.id); setEditing({ name: c.name, slug: c.slug, description: c.description, status: 'Active' }); }}><Pencil size={15} /></button></td>
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan={6} className="admin-empty-row">No categories match.</td></tr>}
              </tbody>
            </table>
          </div>
        </Panel>
        {editing && <CategoryForm key={editKey} initial={editing} isNew={editKey === 'new'} onClose={() => setEditing(null)} />}
      </div>
    </>
  );
}

function CategoryForm({ initial, isNew, onClose }: { initial: CategoryDraft; isNew: boolean; onClose: () => void }) {
  const [d, setD] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateCategory(d); setErrors(errs); setDone(false);
    if (Object.keys(errs).length === 0) { downloadDraft('category', d); setDone(true); }
  };
  return (
    <form className="admin-panel admin-drawer" onSubmit={submit} noValidate>
      <header><h2>{isNew ? 'Add Category' : 'Edit Category'}</h2><button type="button" className="admin-icon-btn" aria-label="Close" onClick={onClose}><X size={16} /></button></header>
      <div className="admin-panel-body">
        {done && <p className="admin-success" role="status">Draft downloaded. It hasn't been saved to SorsMe yet.</p>}
        <Field label="Category name" required error={errors['name']}><input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value, slug: isNew ? slugify(e.target.value) : d.slug })} /></Field>
        <Field label="Slug" required error={errors['slug']}><input value={d.slug} onChange={(e) => setD({ ...d, slug: e.target.value })} /></Field>
        <Field label="Description" required error={errors['description']} hint={`${d.description.length} / 500`}><textarea rows={4} value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} /></Field>
        <div className="admin-radios">{recordStatuses.map((v) => <label key={v} className={d.status === v ? 'is-on' : undefined}><input type="radio" name="cat-status" checked={d.status === v} onChange={() => setD({ ...d, status: v })} /><span><strong>{v}</strong><small>{v === 'Active' ? 'Category is visible and can be used for products.' : 'Category is hidden and unavailable for selection.'}</small></span></label>)}</div>
        <div className="admin-form-actions"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit"><Download />Validate & download draft</Button></div>
      </div>
    </form>
  );
}

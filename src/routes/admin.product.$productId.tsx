import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Download, GripVertical, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackLink, ConnectionNotice, Field, PageTitle, Panel, Unavailable } from '@/components/admin/primitives';
import { categories, products } from '@/lib/sorsme';
import { downloadDraft, productVisibility, recordStatuses, slugify, validateProduct, type Errors, type ProductDraft } from '@/lib/admin';

export const Route = createFileRoute('/admin/product/$productId')({ component: ProductPage });

const visText: Record<string, string> = { Public: 'Visible to all visitors on the SorsMe website.', 'Database Subscriber': 'Visible only to active Sourcing Database subscribers.', Internal: 'Visible only to SorsMe staff (not published).' };

function ProductPage() {
  const { productId } = Route.useParams();
  const existing = products.find((p) => p.id === productId);
  if (productId !== 'new' && !existing) return <><BackLink to="/admin/products" label="Back to Products" /><Unavailable title="Product not found" text="This product isn't in the catalogue." /></>;
  const initial: ProductDraft = existing
    ? { name: existing.name, sku: '', slug: existing.id, description: existing.description, categoryId: existing.category, supplier: '', origin: 'Türkiye', packaging: existing.material, moq: '', leadTime: '', specs: [{ name: 'Type', value: existing.type }, { name: 'Application', value: existing.application }], visibility: 'Public', status: 'Active' }
    : { name: '', sku: '', slug: '', description: '', categoryId: '', supplier: '', origin: 'Türkiye', packaging: '', moq: '', leadTime: '', specs: [], visibility: 'Public', status: 'Active' };
  return <ProductForm key={productId} initial={initial} isNew={!existing} image={existing?.image} />;
}

function ProductForm({ initial, isNew, image }: { initial: ProductDraft; isNew: boolean; image?: string | undefined }) {
  const [d, setD] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const set = <K extends keyof ProductDraft>(k: K, v: ProductDraft[K]) => setD((p) => ({ ...p, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateProduct(d); setErrors(errs); setDone(false);
    if (Object.keys(errs).length === 0) { downloadDraft('product', d); setDone(true); }
  };
  return (
    <form onSubmit={submit} noValidate>
      <BackLink to="/admin/products" label="Back to Products" />
      <PageTitle title={isNew ? 'Add Product' : 'Edit Product'} subtitle="Update product information, specifications, visibility and publication status." crumbs={['Products', isNew ? 'Add Product' : 'Edit Product']} />
      <ConnectionNotice compact />
      {done && <p className="admin-success" role="status">Draft downloaded. It hasn't been saved to SorsMe, because admin services aren't connected yet.</p>}
      <div className="admin-edit-layout">
        <div>
          <Panel title="Basic Information">
            <div className="admin-form-grid">
              <Field label="Product name" required error={errors['name']}><input value={d.name} onChange={(e) => { set('name', e.target.value); if (!slugTouched) set('slug', slugify(e.target.value)); }} /></Field>
              <Field label="SKU" required error={errors['sku']}><input value={d.sku} onChange={(e) => set('sku', e.target.value.toUpperCase())} placeholder="e.g. FUR-001" /></Field>
              <Field label="Slug" required error={errors['slug']}><input value={d.slug} onChange={(e) => { setSlugTouched(true); set('slug', e.target.value); }} /></Field>
              <Field label="Category" required error={errors['categoryId']}><select value={d.categoryId} onChange={(e) => set('categoryId', e.target.value)}><option value="">Choose a category</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
              <Field label="Description" required error={errors['description']} hint={`${d.description.length} / 1,000`}><textarea rows={4} value={d.description} onChange={(e) => set('description', e.target.value)} /></Field>
              <Field label="Supplier" hint="Supplier list loads once admin services are connected."><select disabled><option>No suppliers available</option></select></Field>
            </div>
          </Panel>
          <Panel title="Product Information">
            <div className="admin-form-grid">
              <Field label="Origin"><input value={d.origin} onChange={(e) => set('origin', e.target.value)} /></Field>
              <Field label="Packaging / material"><input value={d.packaging} onChange={(e) => set('packaging', e.target.value)} /></Field>
              <Field label="Minimum order (MOQ)"><input value={d.moq} onChange={(e) => set('moq', e.target.value)} /></Field>
              <Field label="Lead time"><input value={d.leadTime} onChange={(e) => set('leadTime', e.target.value)} /></Field>
            </div>
          </Panel>
          <Panel title="Specifications">
            {d.specs.map((s, i) => (
              <div className="admin-spec-row" key={i}>
                <GripVertical size={15} className="muted" />
                <input aria-label="Specification" placeholder="Specification" value={s.name} onChange={(e) => set('specs', d.specs.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
                <input aria-label="Value" placeholder="Value" value={s.value} onChange={(e) => set('specs', d.specs.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} />
                <button type="button" className="admin-icon-btn danger" aria-label="Remove specification" onClick={() => set('specs', d.specs.filter((_, j) => j !== i))}><Trash2 size={15} /></button>
              </div>
            ))}
            {errors['specs'] && <small className="admin-error">{errors['specs']}</small>}
            <Button type="button" variant="outline" size="sm" onClick={() => set('specs', [...d.specs, { name: '', value: '' }])}><Plus />Add specification</Button>
          </Panel>
        </div>
        <div>
          <Panel title="Product Images">{image ? <img className="admin-main-image" src={image} alt="" /> : <Unavailable title="Uploads unavailable" text="Image uploads need admin services." />}</Panel>
          <Panel title="Visibility">
            <div className="admin-radios">{productVisibility.map((v) => <label key={v} className={d.visibility === v ? 'is-on' : undefined}><input type="radio" name="visibility" checked={d.visibility === v} onChange={() => set('visibility', v)} /><span><strong>{v}</strong><small>{visText[v]}</small></span></label>)}</div>
          </Panel>
          <Panel title="Status">
            <div className="admin-radios">{recordStatuses.map((v) => <label key={v} className={d.status === v ? 'is-on' : undefined}><input type="radio" name="status" checked={d.status === v} onChange={() => set('status', v)} /><span><strong>{v}</strong><small>{v === 'Active' ? 'Product is published and available.' : 'Product is hidden from customers.'}</small></span></label>)}</div>
          </Panel>
          <div className="admin-form-actions"><Button type="submit"><Download />Validate & download draft</Button></div>
        </div>
      </div>
    </form>
  );
}

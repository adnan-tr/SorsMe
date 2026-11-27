import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Building2, Download, FileText, ShieldCheck, StickyNote, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackLink, ConnectionNotice, Field, PageTitle, Panel, Unavailable } from '@/components/admin/primitives';
import { categories } from '@/lib/sorsme';
import { downloadDraft, validateSupplier, type Errors, type SupplierDraft } from '@/lib/admin';

export const Route = createFileRoute('/admin/supplier/$supplierId')({ component: SupplierPage });

const empty: SupplierDraft = { company: '', legalEntity: '', taxNumber: '', city: '', country: 'Türkiye', website: '', contactName: '', contactEmail: '', categoryIds: [] };

function SupplierPage() {
  const { supplierId } = Route.useParams();
  if (supplierId !== 'new') {
    return (
      <>
        <BackLink to="/admin/suppliers" label="Back to Suppliers" />
        <PageTitle title="Supplier Detail" subtitle={`Record ${supplierId}`} crumbs={['Suppliers', supplierId]} />
        <Unavailable title="Supplier record unavailable" text="Supplier details, documents, verification history and notes load once admin services are connected." />
      </>
    );
  }
  return <SupplierForm />;
}

function SupplierForm() {
  const [d, setD] = useState(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const set = (k: keyof SupplierDraft) => (e: React.ChangeEvent<HTMLInputElement>) => setD({ ...d, [k]: e.target.value });
  const toggle = (id: string) => setD({ ...d, categoryIds: d.categoryIds.includes(id) ? d.categoryIds.filter((x) => x !== id) : [...d.categoryIds, id] });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateSupplier(d); setErrors(errs); setDone(false);
    if (Object.keys(errs).length === 0) { downloadDraft('supplier', d); setDone(true); }
  };
  return (
    <form onSubmit={submit} noValidate>
      <BackLink to="/admin/suppliers" label="Back to Suppliers" />
      <PageTitle title="Add Supplier" subtitle="Register a new supplier. Contact details stay private to SorsMe staff." crumbs={['Suppliers', 'Add Supplier']}>
        <Button type="submit"><Download />Validate & download draft</Button>
      </PageTitle>
      <ConnectionNotice compact />
      {done && <p className="admin-success" role="status">Draft downloaded. It hasn't been saved to SorsMe, because admin services aren't connected yet.</p>}
      <div className="admin-grid two">
        <Panel title="Company Information" icon={<Building2 size={16} />}>
          <div className="admin-form-grid">
            <Field label="Company name" required error={errors['company']}><input value={d.company} onChange={set('company')} /></Field>
            <Field label="Legal entity type"><input value={d.legalEntity} onChange={set('legalEntity')} placeholder="e.g. Joint Stock Company (A.Ş.)" /></Field>
            <Field label="Tax number (VKN)"><input value={d.taxNumber} onChange={set('taxNumber')} /></Field>
            <Field label="Website" error={errors['website']}><input value={d.website} onChange={set('website')} placeholder="https://" /></Field>
            <Field label="City" required error={errors['city']}><input value={d.city} onChange={set('city')} /></Field>
            <Field label="Country" required error={errors['country']}><input value={d.country} onChange={set('country')} /></Field>
          </div>
        </Panel>
        <Panel title="Primary Contact (private)" icon={<UserRound size={16} />}>
          <div className="admin-form-grid">
            <Field label="Contact name" required error={errors['contactName']}><input value={d.contactName} onChange={set('contactName')} /></Field>
            <Field label="Contact email" required error={errors['contactEmail']}><input type="email" value={d.contactEmail} onChange={set('contactEmail')} /></Field>
          </div>
        </Panel>
      </div>
      <Panel title="Assigned Product Categories" icon={<ShieldCheck size={16} />}>
        <div className="admin-chips">
          {categories.map((c) => <button type="button" key={c.id} className={d.categoryIds.includes(c.id) ? 'admin-chip is-on' : 'admin-chip'} aria-pressed={d.categoryIds.includes(c.id)} onClick={() => toggle(c.id)}>{c.name}</button>)}
        </div>
        {errors['categoryIds'] && <small className="admin-error">{errors['categoryIds']}</small>}
      </Panel>
      <div className="admin-grid two">
        <Panel title="Supplier Documents" icon={<FileText size={16} />}><Unavailable title="Uploads unavailable" text="Document storage needs admin services." /></Panel>
        <Panel title="Internal Notes" icon={<StickyNote size={16} />}><Unavailable title="Notes unavailable" text="Notes are saved with the supplier record." /></Panel>
      </div>
    </form>
  );
}

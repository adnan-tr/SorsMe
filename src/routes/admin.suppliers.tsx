import { createFileRoute, Link } from '@tanstack/react-router';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectionNotice, PageTitle, Panel, Unavailable } from '@/components/admin/primitives';
import { categories } from '@/lib/sorsme';

export const Route = createFileRoute('/admin/suppliers')({ component: Suppliers });

function Suppliers() {
  return (
    <>
      <PageTitle title="Supplier Management" subtitle="Manage your supplier network, verification status and company information." crumbs={['Suppliers']}>
        <Button asChild><Link to="/admin/supplier/$supplierId" params={{ supplierId: 'new' }}><Plus />Add Supplier</Link></Button>
      </PageTitle>
      <ConnectionNotice compact />
      <Panel title="Suppliers">
        <div className="admin-filters">
          <div className="admin-input-icon"><Search size={15} /><input placeholder="Search suppliers by name, company or VAT number…" disabled /></div>
          <select disabled aria-label="Status"><option>All statuses</option></select>
          <select disabled aria-label="Verification"><option>All verification</option></select>
          <select disabled aria-label="Category"><option>All categories</option>{categories.map((c) => <option key={c.id}>{c.name}</option>)}</select>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Supplier</th><th>Company</th><th>Location</th><th>Categories</th><th>Products</th><th>Verification</th><th>Status</th><th>Created</th><th /></tr></thead>
          </table>
        </div>
        <Unavailable title="No supplier records" text="Supplier identities and private contacts are kept off the public site. They'll load here once admin services and sign-in are connected." />
      </Panel>
    </>
  );
}

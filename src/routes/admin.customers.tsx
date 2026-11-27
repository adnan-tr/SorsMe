import { createFileRoute } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { ConnectionNotice, PageTitle, Panel, Unavailable } from '@/components/admin/primitives';

export const Route = createFileRoute('/admin/customers')({ component: () => (
  <>
    <PageTitle title="Customer Management" subtitle="Manage customer accounts, database access and subscription details." crumbs={['Customers']} />
    <ConnectionNotice compact />
    <Panel title="Customers">
      <div className="admin-filters"><div className="admin-input-icon"><Search size={15} /><input disabled placeholder="Search customers (name, company, email)…" /></div><select disabled aria-label="Country"><option>All countries</option></select><select disabled aria-label="Status"><option>All statuses</option></select><select disabled aria-label="Plan"><option>All plans</option></select></div>
      <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Customer</th><th>Company</th><th>Email</th><th>Country</th><th>Registered</th><th>Status</th><th /></tr></thead></table></div>
      <Unavailable title="No customer accounts" text="Customer sign-up isn't connected yet, so there are no accounts to manage." />
    </Panel>
  </>
) });

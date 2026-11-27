import { createFileRoute, Link } from '@tanstack/react-router';
import { Boxes, CreditCard, FolderTree, Plus, Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectionNotice, PageTitle, Panel, Stat, Unavailable } from '@/components/admin/primitives';
import { categoryRows, productRows } from '@/lib/admin';

export const Route = createFileRoute('/admin/')({ component: Dashboard });

function Dashboard() {
  const total = productRows.length;
  return (
    <>
      <PageTitle title="Dashboard Overview" subtitle="SorsMe operational overview, supplier network, products and recent activity." crumbs={['Dashboard']}>
        <Button asChild><Link to="/admin/supplier/$supplierId" params={{ supplierId: 'new' }}><Plus />Add Supplier</Link></Button>
        <Button asChild variant="outline"><Link to="/admin/product/$productId" params={{ productId: 'new' }}><Plus />Add Product</Link></Button>
        <Button asChild variant="outline"><Link to="/admin/categories" search={{ add: true }}><Plus />Add Category</Link></Button>
      </PageTitle>
      <ConnectionNotice />
      <div className="admin-stats">
        <Stat icon={<Truck />} label="Total Suppliers" value="—" note="Not connected" />
        <Stat icon={<Boxes />} label="Catalogue Products" value={String(total)} note="Public examples" />
        <Stat icon={<FolderTree />} label="Categories" value={String(categoryRows.length)} note="All active" />
        <Stat icon={<Users />} label="Registered Customers" value="—" note="Not connected" />
        <Stat icon={<CreditCard />} label="Active Subscriptions" value="—" note="Not connected" />
      </div>
      <div className="admin-grid three">
        <Panel title="Supplier Verification Status"><Unavailable title="No supplier records" /></Panel>
        <Panel title="Product Distribution by Category">
          <ul className="admin-bars">
            {categoryRows.map((c) => (
              <li key={c.id}><span>{c.name}</span><div><i style={{ width: `${(c.count / Math.max(1, total)) * 100}%` }} /></div><b>{c.count}</b></li>
            ))}
          </ul>
        </Panel>
        <Panel title="Recent Sourcing / Customer Activity"><Unavailable title="No activity yet" /></Panel>
      </div>
      <div className="admin-grid two">
        <Panel title="Recent Supplier Registrations" action={<Link to="/admin/suppliers" className="admin-link">View all →</Link>}><Unavailable /></Panel>
        <Panel title="Recent Administrative Actions" action={<Link to="/admin/audit-logs" className="admin-link">View all →</Link>}><Unavailable title="No audit records" /></Panel>
      </div>
    </>
  );
}

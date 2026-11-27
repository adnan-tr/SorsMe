import { createFileRoute } from '@tanstack/react-router';
import { ConnectionNotice, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { SampleNotice, DataTable, money } from '@/components/admin/records';
import { requests, quotations, shipments, customers, statusTone } from '@/lib/sample-data';

export const Route = createFileRoute('/admin/reports')({ component: Reports });

function Reports() {
  const totalRevenue = quotations.reduce((sum, q) => sum + q.lines.reduce((s, l) => s + l.qty * l.unitPrice, 0), 0);
  const deliveredCount = shipments.filter(s => s.status === 'Delivered').length;

  return (
    <>
      <PageTitle title="Reports & Analytics" subtitle="Performance metrics and business intelligence." crumbs={['Reports & Analytics']} />
      <ConnectionNotice compact />
      <SampleNotice />
      <Panel title="Key Metrics">
        <div className="admin-grid two">
          <div><strong>Total Requests</strong><br /><small>{requests.length}</small></div>
          <div><strong>Total Quotations</strong><br /><small>{quotations.length}</small></div>
          <div><strong>Total Shipments</strong><br /><small>{shipments.length}</small></div>
          <div><strong>Active Revenue</strong><br /><small>{money(totalRevenue)}</small></div>
        </div>
      </Panel>
      <Panel title="Recent Activity">
        <DataTable
          rows={requests}
          search={(r) => `${r.id} ${r.categories.join(' ')}`}
          columns={[
            { key: 'id', label: 'Ref', render: (r) => <strong className="mono">{r.id}</strong>, sort: (r) => r.id },
            { key: 'customer', label: 'Customer', render: (r) => <span>{customers.find(c => c.id === r.customerId)?.company ?? 'Guest'}</span> },
            { key: 'status', label: 'Status', render: (r) => <Tag tone={statusTone(r.status)}>{r.status}</Tag>, sort: (r) => r.status },
            { key: 'date', label: 'Date', render: (r) => <span>{r.date}</span>, sort: (r) => r.date },
          ]}
          pageSize={8}
          placeholder="Search requests…"
        />
      </Panel>
    </>
  );
}

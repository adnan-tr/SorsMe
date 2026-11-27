import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ConnectionNotice, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { SampleNotice, DataTable, money } from '@/components/admin/records';
import { orders, customers, statusTone } from '@/lib/sample-data';

export const Route = createFileRoute('/admin/orders')({ component: Orders });

function Orders() {
  const navigate = useNavigate();
  return (
    <>
      <PageTitle title="Orders" subtitle="Manage fulfilled orders and shipment tracking." crumbs={['Orders']} />
      <ConnectionNotice compact />
      <SampleNotice />
      <Panel title={`All Orders (${orders.length})`}>
        <DataTable
          rows={orders}
          search={(r) => `${r.id} ${r.customerId} ${customers.find(c => c.id === r.customerId)?.company ?? ''}`}
          columns={[
            { key: 'id', label: 'Reference', render: (r) => <strong className="mono">{r.id}</strong>, sort: (r) => r.id },
            { key: 'customer', label: 'Customer', render: (r) => { const c = customers.find(c => c.id === r.customerId); return <span>{c?.company ?? 'Guest'}</span>; } },
            { key: 'amount', label: 'Total', render: (r) => <strong>{money(r.total)}</strong> },
            { key: 'date', label: 'Date', render: (r) => <span>{r.date}</span>, sort: (r) => r.date },
            { key: 'status', label: 'Status', render: (r) => <Tag tone={statusTone(r.status)}>{r.status}</Tag>, sort: (r) => r.status },
            { key: 'payment', label: 'Payment', render: () => <Tag tone="info">Service fee</Tag> },
          ]}
          filters={[
            { label: 'Status', options: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], get: (r) => r.status },
          ]}
          pageSize={8}
          placeholder="Search orders by reference, customer…"
          onOpen={(r) => navigate({ to: '/admin/order/$orderId', params: { orderId: r.id } })}
        />
      </Panel>
    </>
  );
}

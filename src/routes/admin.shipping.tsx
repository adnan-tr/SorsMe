import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ConnectionNotice, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { SampleNotice, DataTable } from '@/components/admin/records';
import { shipments, customers, statusTone } from '@/lib/sample-data';

const statusOptions = ['Pending', 'In transit', 'Out for delivery', 'Delivered', 'Exception'] as const;

export const Route = createFileRoute('/admin/shipping')({ component: Shipping });

function Shipping() {
  const navigate = useNavigate();
  return (
    <>
      <PageTitle title="Shipping & Logistics" subtitle="Track shipments and manage delivery status." crumbs={['Shipping & Logistics']} />
      <ConnectionNotice compact />
      <SampleNotice />
      <Panel title={`All Shipments (${shipments.length})`}>
        <DataTable
          rows={shipments}
          search={(r) => `${r.id} ${r.trackingNumber} ${r.destination}`}
          columns={[
            { key: 'id', label: 'Reference', render: (r) => <strong className="mono">{r.id}</strong>, sort: (r) => r.id },
            { key: 'date', label: 'Shipped', render: (r) => <span>{r.date}</span>, sort: (r) => r.date },
            { key: 'customer', label: 'Customer', render: (r) => <span>{customers.find(c => c.id === r.customerId)?.company ?? 'Guest'}</span> },
            { key: 'destination', label: 'Destination', render: (r) => <span>{r.destination}</span>, sort: (r) => r.destination },
            { key: 'status', label: 'Status', render: (r) => <Tag tone={statusTone(r.status)}>{r.status}</Tag>, sort: (r) => r.status },
            { key: 'origin', label: 'Origin', render: (r) => <span>{r.origin}</span>, sort: (r) => r.origin },
            { key: 'tracking', label: 'Tracking', render: (r) => <span>{r.trackingNumber || '—'}</span> },
          ]}
          filters={[
            { label: 'Status', options: statusOptions, get: (r) => r.status },
          ]}
          pageSize={8}
          placeholder="Search shipments by reference, customer, destination…"
          onOpen={(r) => navigate({ to: '/admin/shipment/$shipmentId', params: { shipmentId: r.id } })}
        />
      </Panel>
    </>
  );
}

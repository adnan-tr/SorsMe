import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ConnectionNotice, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { SampleNotice, DataTable, money } from '@/components/admin/records';
import { quotations, requests, customers, statusTone } from '@/lib/sample-data';

const statusOptions = ['Draft', 'Sent', 'Accepted', 'Rejected', 'Expired'] as const;

export const Route = createFileRoute('/admin/quotations')({ component: Quotations });

function Quotations() {
  const navigate = useNavigate();
  return (
    <>
      <PageTitle title="Quotations" subtitle="Prepare, review and manage sourcing quotations for customers." crumbs={['Quotations']} />
      <ConnectionNotice compact />
      <SampleNotice />
      <Panel title={`All Quotations (${quotations.length})`}>
        <DataTable
          rows={quotations}
          search={(r) => `${r.id} ${r.requestId} ${customers.find(c => c.id === r.customerId)?.company ?? ''}`}
          columns={[
            { key: 'id', label: 'Reference', render: (r) => <strong className="mono">{r.id}</strong>, sort: (r) => r.id },
            { key: 'request', label: 'Request', render: (r) => <span className="mono">{r.requestId}</span>, sort: (r) => r.requestId },
            { key: 'customer', label: 'Customer', render: (r) => <span>{customers.find(c => c.id === r.customerId)?.company ?? r.customerId}</span> },
            { key: 'amount', label: 'Goods Value', render: (r) => <strong>{money(r.lines.reduce((s, l) => s + l.qty * l.unitPrice, 0))}</strong> },
            { key: 'fee', label: 'Service Fee', render: (r) => { const req = requests.find(x => x.id === r.requestId); const fee = req ? (req.count <= 50 ? 20 : 45) : 0; return <strong>${fee}</strong>; } },
            { key: 'status', label: 'Status', render: (r) => <Tag tone={statusTone(r.status)}>{r.status}</Tag>, sort: (r) => r.status },
            { key: 'created', label: 'Created', render: (r) => <span>{r.created}</span>, sort: (r) => r.created },
            { key: 'validUntil', label: 'Valid Until', render: (r) => <span>{r.validUntil}</span>, sort: (r) => r.validUntil },
            { key: 'revision', label: 'Revision', render: (r) => <span>v{r.revision}</span> },
          ]}
          filters={[
            { label: 'Status', options: statusOptions, get: (r) => r.status },
          ]}
          pageSize={8}
          placeholder="Search quotations by reference, request, customer…"
          onOpen={(r) => navigate({ to: '/admin/quotation/$quotationId', params: { quotationId: r.id } })}
        />
      </Panel>
    </>
  );
}

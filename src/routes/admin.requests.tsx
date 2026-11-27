import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ConnectionNotice, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { SampleNotice, DataTable } from '@/components/admin/records';
import { requests, type SourcingRequest, type RequestStatus, customers, statusTone } from '@/lib/sample-data';
import { categories } from '@/lib/sorsme';

const statusOptions: RequestStatus[] = ['New', 'Under review', 'Clarification needed', 'Feasible', 'Not feasible', 'Quotation in preparation', 'Quoted', 'Accepted', 'Declined by customer'];
const priorityOptions = ['High', 'Medium', 'Low'] as const;
const feasibilityOptions = ['Pending', 'Feasible', 'Partially feasible', 'Not feasible'] as const;

export const Route = createFileRoute('/admin/requests')({ component: Requests });

function Requests() {
  const navigate = useNavigate();
  return (
    <>
      <PageTitle title="Sourcing Requests" subtitle="Review and manage incoming sourcing requests from customers and guests." crumbs={['Sourcing Requests']} />
      <ConnectionNotice compact />
      <SampleNotice />
      <Panel title={`All Requests (${requests.length})`}>
        <DataTable<SourcingRequest>
          rows={requests}
          search={(r) => `${r.id} ${r.products} ${r.categories.join(' ')}`}
          columns={[
            { key: 'id', label: 'Reference', render: (r) => <strong className="mono">{r.id}</strong>, sort: (r) => r.id },
            { key: 'customer', label: 'Customer', render: (r) => <span>{customers.find(c => c.id === r.customerId)?.company ?? r.guestName ?? 'Guest'}</span> },
            { key: 'products', label: 'Products', render: (r) => <span>{r.products} ({r.count})</span>, sort: (r) => r.products },
            { key: 'date', label: 'Date', render: (r) => <span>{r.date}</span>, sort: (r) => r.date },
            { key: 'status', label: 'Status', render: (r) => <Tag tone={statusTone(r.status)}>{r.status}</Tag>, sort: (r) => r.status },
            { key: 'priority', label: 'Priority', render: (r) => <Tag tone={statusTone(r.priority)}>{r.priority}</Tag>, sort: (r) => r.priority },
            { key: 'feasibility', label: 'Feasibility', render: (r) => <Tag tone={statusTone(r.feasibility)}>{r.feasibility}</Tag>, sort: (r) => r.feasibility },
            { key: 'assignee', label: 'Assignee', render: (r) => <span>{r.assignee}</span>, sort: (r) => r.assignee },
          ]}
          filters={[
            { label: 'Status', options: statusOptions, get: (r) => r.status },
            { label: 'Priority', options: priorityOptions, get: (r) => r.priority },
            { label: 'Feasibility', options: feasibilityOptions, get: (r) => r.feasibility },
            { label: 'Assignee', options: ['Elif Kaya', 'Murat Demir', 'Selin Aydın', 'Unassigned'], get: (r) => r.assignee },
          ]}
          pageSize={8}
          placeholder="Search requests by reference, products, customer…"
          onOpen={(r) => navigate({ to: '/admin/request/$requestId', params: { requestId: r.id } })}
        />
      </Panel>
    </>
  );
}

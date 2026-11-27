import { createFileRoute } from '@tanstack/react-router';
import { FileText, User, Calendar, Tag as TagIcon, Clock, Package, AlertCircle } from 'lucide-react';
import { BackLink, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { Facts, Section, Timeline, Notes, SampleNotice } from '@/components/admin/records';
import { requests, customers, statusTone, customerName } from '@/lib/sample-data';
import { categories } from '@/lib/sorsme';

export const Route = createFileRoute('/admin/request/$requestId')({ component: RequestDetail });

function RequestDetail() {
  const { requestId } = Route.useParams();
  const req = requests.find((r) => r.id === requestId);

  if (!req) {
    return (
      <>
        <BackLink to="/admin/requests" label="Back to Requests" />
        <PageTitle title="Request not found" subtitle={`No request matches ID ${requestId}`} crumbs={['Requests', 'Not found']} />
      </>
    );
  }

  const customer = req.customerId ? customers.find((c) => c.id === req.customerId) : null;

  return (
    <>
      <BackLink to="/admin/requests" label="Back to Requests" />
      <PageTitle
        title={`Request ${req.id}`}
        subtitle={`${req.products} · ${req.count} products`}
        crumbs={['Sourcing Requests', req.id]}
      >
        <Tag tone={statusTone(req.status)}>{req.status}</Tag>
        <Tag tone={statusTone(req.priority)}>{req.priority} priority</Tag>
      </PageTitle>
      <SampleNotice />

      <div className="admin-grid two">
        <Panel title="Request Details" icon={<FileText size={16} />}>
          <Facts
            items={[
              ['Reference', req.id],
              ['Customer', customer ? customer.company : (req.guestName ?? 'Guest')],
              ['Email', customer ? customer.email : '—'],
              ['Products', req.products],
              ['Product count', String(req.count)],
              ['Categories', req.categories.map((c) => categories.find((cat) => cat.id === c)?.name ?? c).join(', ')],
              ['Date submitted', req.date],
              ['Assigned to', req.assignee],
            ]}
          />
        </Panel>

        <Panel title="Status & Feasibility" icon={<TagIcon size={16} />}>
          <Facts
            items={[
              ['Status', <Tag tone={statusTone(req.status)}>{req.status}</Tag>],
              ['Priority', <Tag tone={statusTone(req.priority)}>{req.priority}</Tag>],
              ['Feasibility', <Tag tone={statusTone(req.feasibility)}>{req.feasibility}</Tag>],
              ['Assignee', req.assignee],
            ]}
          />
        </Panel>
      </div>

      <Panel title="Customer Requirements" icon={<AlertCircle size={16} />}>
        <p className="text-muted-foreground">{req.details}</p>
      </Panel>

      <div className="admin-grid two">
        <Panel title="Timeline" icon={<Clock size={16} />}>
          <Timeline items={req.timeline} />
        </Panel>

        <Panel title="Internal Notes" icon={<User size={16} />}>
          <Notes initial={req.notes} />
        </Panel>
      </div>
    </>
  );
}

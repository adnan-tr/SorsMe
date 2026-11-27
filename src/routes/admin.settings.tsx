import { createFileRoute } from '@tanstack/react-router';
import { ConnectionNotice, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { plans } from '@/lib/sorsme';
import { productVisibility, recordStatuses } from '@/lib/admin';

export const Route = createFileRoute('/admin/settings')({ component: () => (
  <>
    <PageTitle title="Settings" subtitle="Approved platform rules and service connection status." crumbs={['Settings']} />
    <ConnectionNotice compact />
    <div className="admin-grid two">
      <Panel title="Service Fees">
        <ul className="admin-plan-list">{plans.map((p) => <li key={p.id}><strong>{p.name}</strong><span>${p.price} / {p.unit}</span></li>)}</ul>
        <p className="admin-note">Standard quotation: up to 50 products. Large quotation: 51–200 products.</p>
      </Panel>
      <Panel title="Catalogue Options">
        <p className="admin-label">Product visibility</p><div className="admin-chips">{productVisibility.map((v) => <Tag key={v}>{v}</Tag>)}</div>
        <p className="admin-label">Product status</p><div className="admin-chips">{recordStatuses.map((v) => <Tag key={v}>{v}</Tag>)}</div>
      </Panel>
      <Panel title="Connections">
        <ul className="admin-plan-list">
          <li><strong>Admin sign-in & permissions</strong><Tag tone="warning">Not connected</Tag></li>
          <li><strong>Record storage & audit history</strong><Tag tone="warning">Not connected</Tag></li>
          <li><strong>Payments</strong><Tag>Paused</Tag></li>
        </ul>
      </Panel>
      <Panel title="Privacy">
        <p className="admin-note">Supplier identities and private contact details are never shown on the public website.</p>
      </Panel>
    </div>
  </>
) });

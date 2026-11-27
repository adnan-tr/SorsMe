import { createFileRoute } from '@tanstack/react-router';
import { ConnectionNotice, PageTitle, Panel, Unavailable } from '@/components/admin/primitives';

export const Route = createFileRoute('/admin/audit-logs')({ component: () => (
  <>
    <PageTitle title="Audit Logs" subtitle="View and search administrative activities and system changes." crumbs={['Audit Logs']} />
    <ConnectionNotice compact />
    <Panel title="Activity">
      <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Timestamp</th><th>Administrator</th><th>Action</th><th>Entity type</th><th>Entity ID</th><th>Description</th></tr></thead></table></div>
      <Unavailable title="No audit records" text="Changes are recorded here once admins can sign in and save. Downloaded drafts aren't logged." />
    </Panel>
  </>
) });

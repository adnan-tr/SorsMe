import { createFileRoute } from '@tanstack/react-router';
import { CircleX, Clock, Layers, Play } from 'lucide-react';
import { ConnectionNotice, PageTitle, Panel, Stat, Unavailable } from '@/components/admin/primitives';
import { plans } from '@/lib/sorsme';

export const Route = createFileRoute('/admin/subscriptions')({ component: Subscriptions });

function Subscriptions() {
  return (
    <>
      <PageTitle title="Subscription Management" subtitle="Manage customer subscriptions, plan access and renewal settings." crumbs={['Subscriptions']} />
      <ConnectionNotice compact />
      <div className="admin-grid two">
        <Panel title="Plan Types & Pricing">
          <ul className="admin-plan-list">{plans.map((p) => <li key={p.id}><strong>{p.name}</strong><span>${p.price} / {p.unit}</span></li>)}</ul>
          <p className="admin-note">Customers pay SorsMe these service fees and pay suppliers directly for goods.</p>
        </Panel>
        <Panel title="Access Rules">
          <ul className="admin-rules">
            <li>Active subscriptions have database access until their paid-through date.</li>
            <li>A cancelled but paid-through subscription keeps access until the paid period ends.</li>
            <li>Expired subscriptions have no database access.</li>
          </ul>
        </Panel>
      </div>
      <div className="admin-stats">
        <Stat icon={<Layers />} label="Total" value="—" /><Stat icon={<Play />} label="Active" value="—" /><Stat icon={<CircleX />} label="Cancelled" value="—" /><Stat icon={<Clock />} label="Expired" value="—" />
      </div>
      <Panel title="Subscriptions"><Unavailable title="No subscriptions" text="Payments are currently paused, so no subscriptions exist yet." /></Panel>
    </>
  );
}

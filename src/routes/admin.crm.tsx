import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Plus, Search, User, Mail, Phone, MapPin, Target, Star, MoreHorizontal, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectionNotice, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { SampleNotice, DataTable } from '@/components/admin/records';
import { leads, type Lead, type TimelineEntry, statusTone } from '@/lib/sample-data';
import { categories } from '@/lib/sorsme';

const statusOptions = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'] as const;
const priorityOptions = ['High', 'Medium', 'Low'] as const;

export const Route = createFileRoute('/admin/crm')({ component: CRM });

function CRM() {
  const navigate = useNavigate();
  return (
    <>
      <PageTitle title="CRM & Leads" subtitle="Manage leads, track opportunities and schedule follow-ups." crumbs={['CRM & Leads']}>
        <Button><Plus />Add Lead</Button>
      </PageTitle>
      <ConnectionNotice compact />
      <SampleNotice />
      <div className="admin-grid two">
        <Panel title="Lead Pipeline">
          <DataTable<Lead>
            rows={leads}
            search={(r) => `${r.company} ${r.contact} ${r.email} ${r.country} ${r.source}`}
            columns={[
              { key: 'company', label: 'Company', render: (r) => <strong>{r.company}</strong>, sort: (r) => r.company },
              { key: 'contact', label: 'Contact', render: (r) => <>{r.contact}<br /><small className="muted">{r.email}</small></>, sort: (r) => r.contact },
              { key: 'market', label: 'Market', render: (r) => <span>{r.market}</span>, sort: (r) => r.market },
              { key: 'source', label: 'Source', render: (r) => <Tag tone="info">{r.source}</Tag>, sort: (r) => r.source },
              { key: 'status', label: 'Status', render: (r) => <Tag tone={statusTone(r.status)}>{r.status}</Tag>, sort: (r) => r.status },
              { key: 'priority', label: 'Priority', render: (r) => <Tag tone={statusTone(r.priority)}>{r.priority}</Tag>, sort: (r) => r.priority },
              { key: 'followUp', label: 'Follow-up', render: (r) => <span>{r.followUp}</span>, sort: (r) => r.followUp },
            ]}
            filters={[
              { label: 'Status', options: statusOptions, get: (r) => r.status },
              { label: 'Priority', options: priorityOptions, get: (r) => r.priority },
              { label: 'Market', options: ['Latin America', 'MENA', 'CIS', 'Other'], get: (r) => r.market },
              { label: 'Source', options: ['Website form', 'Trade fair', 'Referral', 'LinkedIn', 'Other'], get: (r) => r.source },
            ]}
            pageSize={8}
            placeholder="Search leads by company, contact, email…"
            onOpen={(r) => navigate({ to: '/admin/lead/$leadId', params: { leadId: r.id } })}
          />
        </Panel>
        <Panel title="Lead Summary">
          <div className="admin-stats">
            <Stat icon={<User />} label="Total Leads" value={String(leads.length)} />
            <Stat icon={<Target />} label="Qualified" value={String(leads.filter(l => l.status === 'Qualified' || l.status === 'Proposal').length)} />
            <Stat icon={<Star />} label="High Priority" value={String(leads.filter(l => l.priority === 'High').length)} />
            <Stat icon={<AlertCircle />} label="Overdue Follow-up" value={String(leads.filter(l => l.followUp !== '—' && new Date(l.followUp) < new Date()).length)} />
          </div>
          <div className="admin-bars">
            {statusOptions.map(s => (
              <li key={s}><span>{s}</span><div><i style={{ width: `${(leads.filter(l => l.status === s).length / Math.max(1, leads.length)) * 100}%` }} /></div><b>{leads.filter(l => l.status === s).length}</b></li>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="admin-stat">{icon}<span>{label}</span><strong>{value}</strong></div>;
}
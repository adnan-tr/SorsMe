import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Mail, Phone, MapPin, Calendar, Tag as TagIcon, Building2, Clock, User } from 'lucide-react';
import { BackLink, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { Facts, Section, Timeline, Notes, SampleNotice } from '@/components/admin/records';
import { leads, statusTone } from '@/lib/sample-data';
import { categories } from '@/lib/sorsme';

export const Route = createFileRoute('/admin/lead/$leadId')({ component: LeadDetail });

function LeadDetail() {
  const { leadId } = Route.useParams();
  const navigate = useNavigate();
  const lead = leads.find((l) => l.id === leadId);

  if (!lead) {
    return (
      <>
        <BackLink to="/admin/crm" label="Back to CRM" />
        <PageTitle title="Lead not found" subtitle={`No lead matches ID ${leadId}`} crumbs={['CRM', 'Not found']} />
      </>
    );
  }

  return (
    <>
      <BackLink to="/admin/crm" label="Back to CRM" />
      <PageTitle
        title={lead.company}
        subtitle={`${lead.contact} · ${lead.market} · ${lead.source}`}
        crumbs={['CRM & Leads', lead.id]}
      >
        <Tag tone={statusTone(lead.status)}>{lead.status}</Tag>
        <Tag tone={statusTone(lead.priority)}>{lead.priority} priority</Tag>
      </PageTitle>
      <SampleNotice />

      <div className="admin-grid two">
        <Panel title="Contact Information" icon={<Building2 size={16} />}>
          <Facts
            items={[
              ['Company', lead.company],
              ['Contact', lead.contact],
              ['Email', <a href={`mailto:${lead.email}`} className="text-primary underline">{lead.email}</a>],
              ['Phone', lead.phone],
              ['Country', lead.country],
              ['Market', lead.market],
              ['Source', lead.source],
            ]}
          />
        </Panel>

        <Panel title="Lead Status" icon={<TagIcon size={16} />}>
          <Facts
            items={[
              ['Status', <Tag tone={statusTone(lead.status)}>{lead.status}</Tag>],
              ['Priority', <Tag tone={statusTone(lead.priority)}>{lead.priority}</Tag>],
              ['Follow-up', lead.followUp],
              ['Categories', lead.categories.map((c) => categories.find((cat) => cat.id === c)?.name ?? c).join(', ')],
            ]}
          />
        </Panel>
      </div>

      <div className="admin-grid two">
        <Panel title="Activity Timeline" icon={<Clock size={16} />}>
          <Timeline items={lead.activity} />
        </Panel>

        <Panel title="Internal Notes" icon={<User size={16} />}>
          <Notes initial={lead.notes} />
        </Panel>
      </div>
    </>
  );
}

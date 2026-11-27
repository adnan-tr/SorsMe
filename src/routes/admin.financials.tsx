import { createFileRoute } from '@tanstack/react-router';
import { DollarSign, ClipboardList, BarChart3, TrendingUp, Calendar, Mail, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectionNotice, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { SampleNotice, DataTable } from '@/components/admin/records';
import { quotations, customers, statusTone } from '@/lib/sample-data';

export const Route = createFileRoute('/admin/financials')({ component: Financials });

function Financials() {
  const totalServiceFees = quotations.reduce((sum, q) => sum + (20 + Math.max(0, q.lines.length - 50)), 0);
  const totalGoodsValue = quotations.reduce((sum, q) => sum + q.lines.reduce((s, l) => s + l.qty * l.unitPrice, 0), 0);

  return (
    <>
      <PageTitle title="Financials" subtitle="Revenue overview, invoicing and transaction history." crumbs={['Financials']} />
      <ConnectionNotice compact />
      <SampleNotice />
      <Panel title="Revenue Summary" className="admin-grid two">
        <div><strong>Total Service Fees</strong><br /><small>${totalServiceFees}</small></div>
        <div><strong>Total Goods Value</strong><br /><small>${totalGoodsValue}</small></div>
        <div><strong>Total Quotations</strong><br /><small>${quotations.length}</small></div>
      </Panel>
      <Panel title="Recent Activity">
        <DataTable
          rows={quotations}
          search={(r) => `${r.id} ${r.customerId ?? ''}`}
          columns={[
            { key: 'id', label: 'Ref', render: (r) => <strong className="mono">{r.id}</strong>, sort: (r) => r.id },
            { key: 'customer', label: 'Customer', render: (r) => <span>{customers.find(c => c.id === r.customerId)?.company ?? '—'}</span> },
            { key: 'amount', label: 'Fee', render: (r) => <strong>${r.lines.reduce((s, l) => s + l.qty * l.unitPrice, 0) || 0}</strong> },
            { key: 'status', label: 'Status', render: (r) => <Tag tone={statusTone(r.status)}>{r.status}</Tag>, sort: (r) => r.status },
            { key: 'date', label: 'Created', render: (r) => <span>{r.created}</span>, sort: (r) => r.date },
          ]}
          filters={[
            { label: 'Status', options: ['Draft', 'Sent', 'Accepted', 'Rejected', 'Expired'], get: (r) => r.status },
          ]}
          pageSize={8}
          placeholder="Search financial transactions…"
        />
      </Panel>
    </>
  );
}
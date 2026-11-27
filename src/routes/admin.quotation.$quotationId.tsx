import { createFileRoute } from '@tanstack/react-router';
import { FileText, DollarSign, Clock, Package, User, Building2 } from 'lucide-react';
import { BackLink, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { Facts, Section, Timeline, Notes, SampleNotice, money } from '@/components/admin/records';
import { quotations, requests, customers, suppliers, statusTone, customerName, supplierName, goodsTotal, quotationFee } from '@/lib/sample-data';

export const Route = createFileRoute('/admin/quotation/$quotationId')({ component: QuotationDetail });

function QuotationDetail() {
  const { quotationId } = Route.useParams();
  const q = quotations.find((x) => x.id === quotationId);

  if (!q) {
    return (
      <>
        <BackLink to="/admin/quotations" label="Back to Quotations" />
        <PageTitle title="Quotation not found" subtitle={`No quotation matches ID ${quotationId}`} crumbs={['Quotations', 'Not found']} />
      </>
    );
  }

  const req = requests.find((r) => r.id === q.requestId);
  const customer = customers.find((c) => c.id === q.customerId);
  const goods = goodsTotal(q.lines);
  const fee = quotationFee(q);

  return (
    <>
      <BackLink to="/admin/quotations" label="Back to Quotations" />
      <PageTitle
        title={`Quotation ${q.id}`}
        subtitle={`${customerName(q.customerId)} · Request ${q.requestId} · Revision ${q.revision}`}
        crumbs={['Quotations', q.id]}
      >
        <Tag tone={statusTone(q.status)}>{q.status}</Tag>
      </PageTitle>
      <SampleNotice />

      <div className="admin-grid two">
        <Panel title="Quotation Info" icon={<FileText size={16} />}>
          <Facts
            items={[
              ['Reference', q.id],
              ['Customer', customerName(q.customerId)],
              ['Request', q.requestId],
              ['Status', <Tag tone={statusTone(q.status)}>{q.status}</Tag>],
              ['Created', q.created],
              ['Valid until', q.validUntil],
              ['Revision', `v${q.revision}`],
            ]}
          />
        </Panel>

        <Panel title="Financial Summary" icon={<DollarSign size={16} />}>
          <Facts
            items={[
              ['Goods value', <strong>{money(goods)}</strong>],
              ['SorsMe service fee', <strong>{money(fee)}</strong>],
              ['Total', <strong>{money(goods + fee)}</strong>],
              ['Payment note', 'Service fee → SorsMe · Goods → Supplier directly'],
            ]}
          />
        </Panel>
      </div>

      <Panel title={`Quotation Lines (${q.lines.length})`} icon={<Package size={16} />}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit price</th>
                <th>Lead time</th>
                <th>Supplier</th>
              </tr>
            </thead>
            <tbody>
              {q.lines.map((line, i) => (
                <tr key={i}>
                  <td><strong>{line.product}</strong></td>
                  <td>{line.qty.toLocaleString()} {line.unit}</td>
                  <td>{money(line.unitPrice)}</td>
                  <td>{line.leadTime}</td>
                  <td>
                    <div>
                      <strong>{supplierName(line.supplierId)}</strong>
                      <br />
                      <small className="muted">{line.supplierContact}</small>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="admin-grid two">
        <Panel title="Revision History" icon={<Clock size={16} />}>
          <Timeline items={q.revisions} />
        </Panel>
      </div>
    </>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { Package, Truck, Clock, User, Building2, FileText } from 'lucide-react';
import { BackLink, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { Facts, Section, Timeline, Notes, SampleNotice, money } from '@/components/admin/records';
import { orders, quotations, customers, suppliers, shipments, statusTone, customerName, supplierName, goodsTotal } from '@/lib/sample-data';

export const Route = createFileRoute('/admin/order/$orderId')({ component: OrderDetail });

function OrderDetail() {
  const { orderId } = Route.useParams();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <>
        <BackLink to="/admin/orders" label="Back to Orders" />
        <PageTitle title="Order not found" subtitle={`No order matches ID ${orderId}`} crumbs={['Orders', 'Not found']} />
      </>
    );
  }

  const quotation = quotations.find((q) => q.id === order.quotationId);
  const shipment = shipments.find((s) => s.orderId === order.id);
  const goods = quotation ? goodsTotal(quotation.lines) : 0;

  return (
    <>
      <BackLink to="/admin/orders" label="Back to Orders" />
      <PageTitle
        title={`Order ${order.id}`}
        subtitle={`${customerName(order.customerId)} · ${order.summary}`}
        crumbs={['Orders', order.id]}
      >
        <Tag tone={statusTone(order.status)}>{order.status}</Tag>
      </PageTitle>
      <SampleNotice />

      <div className="admin-grid two">
        <Panel title="Order Details" icon={<Package size={16} />}>
          <Facts
            items={[
              ['Reference', order.id],
              ['Customer', customerName(order.customerId)],
              ['Quotation', order.quotationId],
              ['Supplier', supplierName(order.supplierId)],
              ['Date', order.date],
              ['Status', <Tag tone={statusTone(order.status)}>{order.status}</Tag>],
              ['Goods value', quotation ? money(goods) : '—'],
            ]}
          />
        </Panel>

        <Panel title="Shipment" icon={<Truck size={16} />}>
          {shipment ? (
            <Facts
              items={[
                ['Shipment', shipment.id],
                ['Origin', shipment.origin],
                ['Destination', shipment.destination],
                ['Method', shipment.method],
                ['Provider', shipment.provider],
                ['Tracking', shipment.tracking],
                ['Status', <Tag tone={statusTone(shipment.status)}>{shipment.status}</Tag>],
                ['ETA', shipment.eta],
              ]}
            />
          ) : (
            <p className="text-muted-foreground">No shipment created yet for this order.</p>
          )}
        </Panel>
      </div>

      <div className="admin-grid two">
        <Panel title="Order Timeline" icon={<Clock size={16} />}>
          <Timeline items={order.timeline} />
        </Panel>

        <Panel title="Internal Notes" icon={<User size={16} />}>
          <Notes initial={order.notes} />
        </Panel>
      </div>
    </>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { Truck, MapPin, Clock, Package, Building2, Globe } from 'lucide-react';
import { BackLink, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { Facts, Section, Timeline, SampleNotice } from '@/components/admin/records';
import { shipments, orders, customers, statusTone, customerName } from '@/lib/sample-data';

export const Route = createFileRoute('/admin/shipment/$shipmentId')({ component: ShipmentDetail });

function ShipmentDetail() {
  const { shipmentId } = Route.useParams();
  const shipment = shipments.find((s) => s.id === shipmentId);

  if (!shipment) {
    return (
      <>
        <BackLink to="/admin/shipping" label="Back to Shipping" />
        <PageTitle title="Shipment not found" subtitle={`No shipment matches ID ${shipmentId}`} crumbs={['Shipping', 'Not found']} />
      </>
    );
  }

  const order = orders.find((o) => o.id === shipment.orderId);

  return (
    <>
      <BackLink to="/admin/shipping" label="Back to Shipping" />
      <PageTitle
        title={`Shipment ${shipment.id}`}
        subtitle={`${shipment.origin} → ${shipment.destination} · ${shipment.method}`}
        crumbs={['Shipping & Logistics', shipment.id]}
      >
        <Tag tone={statusTone(shipment.status)}>{shipment.status}</Tag>
      </PageTitle>
      <SampleNotice />

      <div className="admin-grid two">
        <Panel title="Shipment Details" icon={<Truck size={16} />}>
          <Facts
            items={[
              ['Reference', shipment.id],
              ['Order', shipment.orderId],
              ['Customer', customerName(shipment.customerId)],
              ['Origin', shipment.origin],
              ['Destination', shipment.destination],
              ['Method', shipment.method],
              ['Provider', shipment.provider],
              ['Tracking', shipment.tracking],
              ['Status', <Tag tone={statusTone(shipment.status)}>{shipment.status}</Tag>],
              ['ETA', shipment.eta],
            ]}
          />
        </Panel>

        <Panel title="Related Order" icon={<Package size={16} />}>
          {order ? (
            <Facts
              items={[
                ['Order', order.id],
                ['Summary', order.summary],
                ['Date', order.date],
                ['Status', <Tag tone={statusTone(order.status)}>{order.status}</Tag>],
              ]}
            />
          ) : (
            <p className="text-muted-foreground">Order record not found.</p>
          )}
        </Panel>
      </div>

      {shipment.notes && (
        <Panel title="Notes" icon={<Clock size={16} />}>
          <p className="text-muted-foreground">{shipment.notes}</p>
        </Panel>
      )}

      <Panel title="Tracking Timeline" icon={<Clock size={16} />}>
        <Timeline items={shipment.timeline} />
      </Panel>
    </>
  );
}

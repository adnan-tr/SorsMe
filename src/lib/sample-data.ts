/**
 * ILLUSTRATIVE SAMPLE DATA — frontend preview only.
 * No backend is connected; nothing here is a real customer, supplier, order or payment.
 */
import { quotationPrice } from '@/lib/sorsme';

export type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
export type TimelineEntry = { date: string; label: string; by?: string };

export type Lead = { id: string; company: string; contact: string; email: string; phone: string; country: string; market: string; source: string; categories: string[]; status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost'; priority: 'High' | 'Medium' | 'Low'; followUp: string; notes: string[]; activity: TimelineEntry[] };
export type Customer = { id: string; name: string; company: string; email: string; phone: string; country: string; status: 'Active' | 'Pending verification' | 'Suspended'; registered: string; notes: string[] };
export type RequestStatus = 'New' | 'Under review' | 'Clarification needed' | 'Feasible' | 'Not feasible' | 'Quotation in preparation' | 'Quoted' | 'Accepted' | 'Declined by customer';
export type SourcingRequest = { id: string; customerId: string | null; guestName?: string; products: string; categories: string[]; count: number; date: string; status: RequestStatus; assignee: string; priority: 'High' | 'Medium' | 'Low'; feasibility: 'Pending' | 'Feasible' | 'Partially feasible' | 'Not feasible'; details: string; notes: string[]; timeline: TimelineEntry[] };
export type QuoteLine = { product: string; qty: number; unit: string; unitPrice: number; leadTime: string; supplierId: string; supplierContact: string };
export type QuotationStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
export type Quotation = { id: string; requestId: string; customerId: string; status: QuotationStatus; created: string; validUntil: string; revision: number; lines: QuoteLine[]; revisions: TimelineEntry[] };
export type OrderStatus = 'Confirmed' | 'In production' | 'Quality inspection' | 'Ready to ship' | 'Shipped' | 'Delivered';
export type Order = { id: string; quotationId: string; customerId: string; date: string; status: OrderStatus; summary: string; supplierId: string; notes: string[]; timeline: TimelineEntry[] };
export type ShipmentStatus = 'Booked' | 'In transit' | 'Customs' | 'Out for delivery' | 'Delivered';
export type Shipment = { id: string; orderId: string; customerId: string; origin: string; destination: string; method: 'Sea freight' | 'Air freight' | 'Road freight'; provider: string; tracking: string; status: ShipmentStatus; eta: string; notes: string; timeline: TimelineEntry[] };
export type Supplier = { id: string; company: string; city: string; country: string; categories: string[]; products: number; verification: 'Verified' | 'Pending' | 'Documents requested'; status: 'Active' | 'Inactive'; contact: string; email: string; website: string; salesManager: string; documents: string[]; created: string };
export type Transaction = { id: string; date: string; customerId: string; type: 'Quotation fee' | 'Database subscription' | 'Refund'; reference: string; amount: number; status: 'Paid' | 'Pending' | 'Refunded' | 'Failed' };
export type Subscription = { id: string; customerId: string; plan: 'Sourcing Database'; price: number; status: 'Active' | 'Cancelled' | 'Expired'; start: string; renewal: string; paidThrough: string; history: TimelineEntry[] };
export type AuditEntry = { id: string; admin: string; ts: string; action: 'Created' | 'Updated' | 'Deleted' | 'Status changed' | 'Signed in' | 'Sent'; entity: string; entityId: string; description: string; ip: string };
export type Ticket = { id: string; subject: string; status: 'Open' | 'Awaiting reply' | 'Resolved'; updated: string; messages: { from: 'You' | 'SorsMe'; date: string; text: string }[] };
export type Notice = { id: string; kind: 'Request' | 'Quotation' | 'Order' | 'Shipment' | 'Subscription'; title: string; text: string; date: string; read: boolean };

export const admins = ['Elif Kaya', 'Murat Demir', 'Selin Aydın'];

export const suppliers: Supplier[] = [
  { id: 'SUP-1001', company: 'Anatolia Hospitality Furniture', city: 'İnegöl', country: 'Türkiye', categories: ['furniture', 'horeca'], products: 46, verification: 'Verified', status: 'Active', contact: 'Info desk', email: 'info@anatolia-furniture.example', website: 'https://anatolia-furniture.example', salesManager: 'Kemal Arslan · +90 532 000 1101', documents: ['Trade registry', 'Tax certificate', 'ISO 9001'], created: '2026-03-14' },
  { id: 'SUP-1002', company: 'Denizli Cotton Mills', city: 'Denizli', country: 'Türkiye', categories: ['textiles'], products: 32, verification: 'Verified', status: 'Active', contact: 'Export office', email: 'export@denizli-cotton.example', website: 'https://denizli-cotton.example', salesManager: 'Ayşe Yılmaz · +90 533 000 2202', documents: ['Trade registry', 'OEKO-TEX'], created: '2026-04-02' },
  { id: 'SUP-1003', company: 'Ege Olive Group', city: 'İzmir', country: 'Türkiye', categories: ['food'], products: 18, verification: 'Pending', status: 'Active', contact: 'Sales team', email: 'sales@egeolive.example', website: 'https://egeolive.example', salesManager: 'Hakan Çelik · +90 534 000 3303', documents: ['Trade registry'], created: '2026-06-21' },
  { id: 'SUP-1004', company: 'Kapadokya Ceramics', city: 'Kütahya', country: 'Türkiye', categories: ['horeca', 'construction'], products: 57, verification: 'Verified', status: 'Active', contact: 'Customer service', email: 'hello@kapadokya-ceramics.example', website: 'https://kapadokya-ceramics.example', salesManager: 'Deniz Öztürk · +90 535 000 4404', documents: ['Trade registry', 'Tax certificate', 'CE marking'], created: '2026-02-09' },
  { id: 'SUP-1005', company: 'Marmara Pack Solutions', city: 'Kocaeli', country: 'Türkiye', categories: ['packaging'], products: 24, verification: 'Documents requested', status: 'Inactive', contact: 'Info desk', email: 'info@marmarapack.example', website: 'https://marmarapack.example', salesManager: 'Burak Şahin · +90 536 000 5505', documents: [], created: '2026-08-30' },
  { id: 'SUP-1006', company: 'Bursa Industrial Parts', city: 'Bursa', country: 'Türkiye', categories: ['industrial'], products: 63, verification: 'Verified', status: 'Active', contact: 'Export office', email: 'export@bursaparts.example', website: 'https://bursaparts.example', salesManager: 'Can Koç · +90 537 000 6606', documents: ['Trade registry', 'ISO 9001', 'ISO 14001'], created: '2026-01-18' },
];

export const customers: Customer[] = [
  { id: 'CUS-2041', name: 'Lucía Fernández', company: 'Hotel Costa Azul', email: 'lucia@costa-azul.example', phone: '+52 55 0000 1201', country: 'Mexico', status: 'Active', registered: '2026-05-11', notes: ['Prefers WhatsApp for quick updates.'] },
  { id: 'CUS-2042', name: 'Omar Haddad', company: 'Haddad Trading LLC', email: 'omar@haddad.example', phone: '+971 50 000 2302', country: 'United Arab Emirates', status: 'Active', registered: '2026-06-03', notes: [] },
  { id: 'CUS-2043', name: 'Aigerim Nurlanovna', company: 'Steppe Interiors', email: 'aigerim@steppe.example', phone: '+7 701 000 3403', country: 'Kazakhstan', status: 'Pending verification', registered: '2026-10-19', notes: [] },
  { id: 'CUS-2044', name: 'Carlos Mendes', company: 'Mendes Food Distribution', email: 'carlos@mendesfood.example', phone: '+55 11 0000 4504', country: 'Brazil', status: 'Active', registered: '2026-07-22', notes: ['Large recurring olive-oil buyer.'] },
  { id: 'CUS-2045', name: 'Yasmin Farouk', company: 'Nile Café Group', email: 'yasmin@nilecafe.example', phone: '+20 10 0000 5605', country: 'Egypt', status: 'Suspended', registered: '2026-03-28', notes: ['Account paused at customer request.'] },
  { id: 'CUS-2046', name: 'Diego Rojas', company: 'Andes Build Supply', email: 'diego@andesbuild.example', phone: '+56 9 0000 6706', country: 'Chile', status: 'Active', registered: '2026-09-05', notes: [] },
];

export const leads: Lead[] = [
  { id: 'LD-301', company: 'Grupo Mar Caribe', contact: 'Valentina Ortiz', email: 'v.ortiz@marcaribe.example', phone: '+57 300 000 0101', country: 'Colombia', market: 'Latin America', source: 'Website form', categories: ['horeca', 'furniture'], status: 'Qualified', priority: 'High', followUp: '2026-12-02', notes: ['Opening two beach hotels in 2027.'], activity: [{ date: '2026-11-20', label: 'Discovery call held', by: 'Elif Kaya' }, { date: '2026-11-14', label: 'Lead created from website form' }] },
  { id: 'LD-302', company: 'Al Noor Supermarkets', contact: 'Khalid Mansour', email: 'khalid@alnoor.example', phone: '+966 50 000 0202', country: 'Saudi Arabia', market: 'MENA', source: 'Trade fair', categories: ['food', 'packaging'], status: 'Contacted', priority: 'Medium', followUp: '2026-12-05', notes: [], activity: [{ date: '2026-11-18', label: 'Intro email sent', by: 'Murat Demir' }] },
  { id: 'LD-303', company: 'Tashkent Textile House', contact: 'Rustam Karimov', email: 'rustam@tth.example', phone: '+998 90 000 0303', country: 'Uzbekistan', market: 'CIS', source: 'Referral', categories: ['textiles'], status: 'New', priority: 'Low', followUp: '2026-12-10', notes: [], activity: [{ date: '2026-11-25', label: 'Referral received' }] },
  { id: 'LD-304', company: 'Lima Gastro Co.', contact: 'Sofía Paredes', email: 'sofia@limagastro.example', phone: '+51 900 000 0404', country: 'Peru', market: 'Latin America', source: 'LinkedIn', categories: ['horeca'], status: 'Proposal', priority: 'High', followUp: '2026-11-29', notes: ['Asked for tableware samples.'], activity: [{ date: '2026-11-22', label: 'Package options shared', by: 'Selin Aydın' }] },
  { id: 'LD-305', company: 'Baku Build Group', contact: 'Elvin Mammadov', email: 'elvin@bakubuild.example', phone: '+994 50 000 0505', country: 'Azerbaijan', market: 'CIS', source: 'Website form', categories: ['construction'], status: 'Lost', priority: 'Medium', followUp: '—', notes: ['Chose a local supplier.'], activity: [{ date: '2026-10-30', label: 'Marked as lost', by: 'Murat Demir' }] },
];

export const requests: SourcingRequest[] = [
  { id: 'SR-2026-0148', customerId: 'CUS-2041', products: 'Banquet chairs, round tables, bath towels', categories: ['furniture', 'textiles'], count: 34, date: '2026-11-24', status: 'Under review', assignee: 'Elif Kaya', priority: 'High', feasibility: 'Pending', details: 'Furnishing for a 120-room hotel extension. Stackable chairs, 1.8 m round tables, 600 gsm towels.', notes: [], timeline: [{ date: '2026-11-24', label: 'Request submitted' }, { date: '2026-11-25', label: 'Assigned to Elif Kaya' }] },
  { id: 'SR-2026-0147', customerId: null, guestName: 'Ahmed Saleh (guest)', products: 'Paper cups, takeaway boxes', categories: ['packaging'], count: 8, date: '2026-11-23', status: 'New', assignee: 'Unassigned', priority: 'Medium', feasibility: 'Pending', details: 'Branded paper cups 8oz/12oz and kraft takeaway boxes for a café chain.', notes: [], timeline: [{ date: '2026-11-23', label: 'Guest request submitted — no account, no payment yet' }] },
  { id: 'SR-2026-0145', customerId: 'CUS-2044', products: 'Extra virgin olive oil, table olives', categories: ['food'], count: 6, date: '2026-11-18', status: 'Quoted', assignee: 'Murat Demir', priority: 'Medium', feasibility: 'Feasible', details: '5L tins and 750ml glass bottles, private label.', notes: ['Customer confirmed private label artwork.'], timeline: [{ date: '2026-11-18', label: 'Request submitted' }, { date: '2026-11-19', label: 'Marked feasible' }, { date: '2026-11-22', label: 'Quotation QT-2026-0091 sent' }] },
  { id: 'SR-2026-0142', customerId: 'CUS-2042', products: 'Hotel tableware set, glassware, ceramic tiles', categories: ['horeca', 'construction'], count: 72, date: '2026-11-10', status: 'Accepted', assignee: 'Selin Aydın', priority: 'High', feasibility: 'Feasible', details: 'Complete tableware for 3 restaurants plus lobby floor tiles.', notes: [], timeline: [{ date: '2026-11-10', label: 'Request submitted' }, { date: '2026-11-12', label: 'Marked feasible' }, { date: '2026-11-15', label: 'Quotation sent' }, { date: '2026-11-17', label: 'Customer accepted quotation' }] },
  { id: 'SR-2026-0139', customerId: 'CUS-2043', products: 'Custom upholstered sofas', categories: ['furniture', 'custom'], count: 3, date: '2026-11-04', status: 'Clarification needed', assignee: 'Elif Kaya', priority: 'Low', feasibility: 'Partially feasible', details: 'Velvet sofas, custom dimensions — awaiting drawings.', notes: ['Asked customer for dimension drawings.'], timeline: [{ date: '2026-11-04', label: 'Request submitted' }, { date: '2026-11-06', label: 'Clarification requested' }] },
  { id: 'SR-2026-0133', customerId: 'CUS-2046', products: 'Industrial valves, steel fittings', categories: ['industrial'], count: 140, date: '2026-10-21', status: 'Quotation in preparation', assignee: 'Murat Demir', priority: 'Medium', feasibility: 'Feasible', details: 'DN50–DN150 valves; certified fittings for mining project.', notes: [], timeline: [{ date: '2026-10-21', label: 'Request submitted' }, { date: '2026-10-24', label: 'Marked feasible' }] },
  { id: 'SR-2026-0128', customerId: 'CUS-2045', products: 'Espresso cups', categories: ['horeca'], count: 2, date: '2026-10-02', status: 'Not feasible', assignee: 'Selin Aydın', priority: 'Low', feasibility: 'Not feasible', details: 'Quantity below supplier minimums.', notes: [], timeline: [{ date: '2026-10-02', label: 'Request submitted' }, { date: '2026-10-04', label: 'Marked not feasible — below MOQ' }] },
];

export const quotations: Quotation[] = [
  { id: 'QT-2026-0091', requestId: 'SR-2026-0145', customerId: 'CUS-2044', status: 'Sent', created: '2026-11-22', validUntil: '2026-12-22', revision: 2, lines: [
    { product: 'Extra virgin olive oil 5L tin', qty: 2400, unit: 'tin', unitPrice: 31.5, leadTime: '3 weeks', supplierId: 'SUP-1003', supplierContact: 'Hakan Çelik · sales@egeolive.example' },
    { product: 'Extra virgin olive oil 750ml glass', qty: 6000, unit: 'bottle', unitPrice: 6.2, leadTime: '3 weeks', supplierId: 'SUP-1003', supplierContact: 'Hakan Çelik · sales@egeolive.example' },
    { product: 'Green table olives 1kg', qty: 1500, unit: 'jar', unitPrice: 4.1, leadTime: '2 weeks', supplierId: 'SUP-1003', supplierContact: 'Hakan Çelik · sales@egeolive.example' },
  ], revisions: [{ date: '2026-11-20', label: 'Revision 1 drafted', by: 'Murat Demir' }, { date: '2026-11-22', label: 'Revision 2 — updated tin price, sent', by: 'Murat Demir' }] },
  { id: 'QT-2026-0088', requestId: 'SR-2026-0142', customerId: 'CUS-2042', status: 'Accepted', created: '2026-11-15', validUntil: '2026-12-15', revision: 1, lines: [
    { product: 'Porcelain dinner plate 27cm', qty: 1800, unit: 'pc', unitPrice: 3.4, leadTime: '5 weeks', supplierId: 'SUP-1004', supplierContact: 'Deniz Öztürk · hello@kapadokya-ceramics.example' },
    { product: 'Wine glass 350ml', qty: 1200, unit: 'pc', unitPrice: 1.9, leadTime: '4 weeks', supplierId: 'SUP-1004', supplierContact: 'Deniz Öztürk · hello@kapadokya-ceramics.example' },
    { product: 'Porcelain floor tile 60×120', qty: 900, unit: 'm²', unitPrice: 14.8, leadTime: '6 weeks', supplierId: 'SUP-1004', supplierContact: 'Deniz Öztürk · hello@kapadokya-ceramics.example' },
  ], revisions: [{ date: '2026-11-15', label: 'Revision 1 sent', by: 'Selin Aydın' }, { date: '2026-11-17', label: 'Accepted by customer' }] },
  { id: 'QT-2026-0093', requestId: 'SR-2026-0133', customerId: 'CUS-2046', status: 'Draft', created: '2026-11-25', validUntil: '2026-12-25', revision: 1, lines: [
    { product: 'Gate valve DN100', qty: 80, unit: 'pc', unitPrice: 142, leadTime: '7 weeks', supplierId: 'SUP-1006', supplierContact: 'Can Koç · export@bursaparts.example' },
  ], revisions: [{ date: '2026-11-25', label: 'Draft started', by: 'Murat Demir' }] },
  { id: 'QT-2026-0079', requestId: 'SR-2026-0128', customerId: 'CUS-2045', status: 'Expired', created: '2026-09-12', validUntil: '2026-10-12', revision: 1, lines: [
    { product: 'Cotton bath towel 70×140', qty: 500, unit: 'pc', unitPrice: 5.6, leadTime: '3 weeks', supplierId: 'SUP-1002', supplierContact: 'Ayşe Yılmaz · export@denizli-cotton.example' },
  ], revisions: [{ date: '2026-09-12', label: 'Revision 1 sent', by: 'Selin Aydın' }, { date: '2026-10-12', label: 'Expired without decision' }] },
];

export const orders: Order[] = [
  { id: 'OR-2026-0052', quotationId: 'QT-2026-0088', customerId: 'CUS-2042', date: '2026-11-18', status: 'In production', summary: 'Tableware, glassware and floor tiles — 3 lines', supplierId: 'SUP-1004', notes: ['Pre-shipment inspection booked for week 50.'], timeline: [{ date: '2026-11-18', label: 'Order confirmed with supplier' }, { date: '2026-11-21', label: 'Production started' }] },
  { id: 'OR-2026-0047', quotationId: 'QT-2026-0071', customerId: 'CUS-2041', date: '2026-10-08', status: 'Shipped', summary: 'Hotel bath towels and bathrobes — 2 lines', supplierId: 'SUP-1002', notes: [], timeline: [{ date: '2026-10-08', label: 'Order confirmed' }, { date: '2026-10-12', label: 'Production started' }, { date: '2026-10-29', label: 'Quality inspection passed' }, { date: '2026-11-03', label: 'Shipped from Mersin' }] },
  { id: 'OR-2026-0041', quotationId: 'QT-2026-0064', customerId: 'CUS-2044', date: '2026-09-02', status: 'Delivered', summary: 'Olive oil 5L tins — 1 line', supplierId: 'SUP-1003', notes: [], timeline: [{ date: '2026-09-02', label: 'Order confirmed' }, { date: '2026-09-20', label: 'Shipped' }, { date: '2026-10-18', label: 'Delivered in Santos' }] },
  { id: 'OR-2026-0055', quotationId: 'QT-2026-0090', customerId: 'CUS-2046', date: '2026-11-22', status: 'Quality inspection', summary: 'Steel pipe fittings — 4 lines', supplierId: 'SUP-1006', notes: [], timeline: [{ date: '2026-11-22', label: 'Order confirmed' }, { date: '2026-11-26', label: 'Inspection scheduled' }] },
];

export const shipments: Shipment[] = [
  { id: 'SH-0031', orderId: 'OR-2026-0047', customerId: 'CUS-2041', origin: 'Mersin, Türkiye', destination: 'Veracruz, Mexico', method: 'Sea freight', provider: 'Sample Line Shipping', tracking: 'MSKU7654321', status: 'In transit', eta: '2026-12-08', notes: 'Transshipment at Valencia.', timeline: [{ date: '2026-11-03', label: 'Container loaded at Mersin' }, { date: '2026-11-12', label: 'Departed Valencia' }] },
  { id: 'SH-0028', orderId: 'OR-2026-0041', customerId: 'CUS-2044', origin: 'İzmir, Türkiye', destination: 'Santos, Brazil', method: 'Sea freight', provider: 'Sample Line Shipping', tracking: 'MSKU1234567', status: 'Delivered', eta: '2026-10-18', notes: '', timeline: [{ date: '2026-09-20', label: 'Departed İzmir' }, { date: '2026-10-14', label: 'Customs cleared' }, { date: '2026-10-18', label: 'Delivered' }] },
  { id: 'SH-0033', orderId: 'OR-2026-0052', customerId: 'CUS-2042', origin: 'İstanbul, Türkiye', destination: 'Dubai, UAE', method: 'Air freight', provider: 'Sample Air Cargo', tracking: 'AWB 235-11223344', status: 'Booked', eta: '2026-12-20', notes: 'Glassware split shipment by air.', timeline: [{ date: '2026-11-26', label: 'Air cargo booked' }] },
];

export const subscriptions: Subscription[] = [
  { id: 'SUB-501', customerId: 'CUS-2041', plan: 'Sourcing Database', price: 15, status: 'Active', start: '2026-05-11', renewal: '2026-12-11', paidThrough: '2026-12-11', history: [{ date: '2026-05-11', label: 'Subscribed' }, { date: '2026-11-11', label: 'Renewed — $15' }] },
  { id: 'SUB-502', customerId: 'CUS-2044', plan: 'Sourcing Database', price: 15, status: 'Cancelled', start: '2026-07-22', renewal: '—', paidThrough: '2026-12-22', history: [{ date: '2026-07-22', label: 'Subscribed' }, { date: '2026-11-22', label: 'Renewed — $15' }, { date: '2026-11-25', label: 'Cancelled — access continues until 2026-12-22' }] },
  { id: 'SUB-503', customerId: 'CUS-2045', plan: 'Sourcing Database', price: 15, status: 'Expired', start: '2026-03-28', renewal: '—', paidThrough: '2026-08-28', history: [{ date: '2026-03-28', label: 'Subscribed' }, { date: '2026-08-28', label: 'Expired' }] },
  { id: 'SUB-504', customerId: 'CUS-2046', plan: 'Sourcing Database', price: 15, status: 'Active', start: '2026-09-05', renewal: '2026-12-05', paidThrough: '2026-12-05', history: [{ date: '2026-09-05', label: 'Subscribed' }] },
];

export const transactions: Transaction[] = [
  { id: 'TX-9012', date: '2026-11-25', customerId: 'CUS-2041', type: 'Quotation fee', reference: 'SR-2026-0148', amount: 20, status: 'Pending' },
  { id: 'TX-9011', date: '2026-11-22', customerId: 'CUS-2044', type: 'Database subscription', reference: 'SUB-502', amount: 15, status: 'Paid' },
  { id: 'TX-9010', date: '2026-11-18', customerId: 'CUS-2044', type: 'Quotation fee', reference: 'SR-2026-0145', amount: 20, status: 'Paid' },
  { id: 'TX-9009', date: '2026-11-11', customerId: 'CUS-2041', type: 'Database subscription', reference: 'SUB-501', amount: 15, status: 'Paid' },
  { id: 'TX-9008', date: '2026-11-10', customerId: 'CUS-2042', type: 'Quotation fee', reference: 'SR-2026-0142', amount: 45, status: 'Paid' },
  { id: 'TX-9007', date: '2026-10-21', customerId: 'CUS-2046', type: 'Quotation fee', reference: 'SR-2026-0133', amount: 45, status: 'Paid' },
  { id: 'TX-9006', date: '2026-10-05', customerId: 'CUS-2045', type: 'Refund', reference: 'SR-2026-0128', amount: -20, status: 'Refunded' },
  { id: 'TX-9005', date: '2026-10-05', customerId: 'CUS-2046', type: 'Database subscription', reference: 'SUB-504', amount: 15, status: 'Failed' },
];

export const auditLog: AuditEntry[] = [
  { id: 'AU-7781', admin: 'Murat Demir', ts: '2026-11-25 14:12', action: 'Created', entity: 'Quotation', entityId: 'QT-2026-0093', description: 'Started draft quotation for SR-2026-0133', ip: '88.247.10.21' },
  { id: 'AU-7780', admin: 'Elif Kaya', ts: '2026-11-25 10:03', action: 'Status changed', entity: 'Sourcing request', entityId: 'SR-2026-0148', description: 'New → Under review', ip: '88.247.10.34' },
  { id: 'AU-7779', admin: 'Selin Aydın', ts: '2026-11-24 17:45', action: 'Updated', entity: 'Supplier', entityId: 'SUP-1004', description: 'Uploaded CE marking document', ip: '78.180.2.9' },
  { id: 'AU-7778', admin: 'Murat Demir', ts: '2026-11-22 09:30', action: 'Sent', entity: 'Quotation', entityId: 'QT-2026-0091', description: 'Revision 2 marked as sent to customer', ip: '88.247.10.21' },
  { id: 'AU-7777', admin: 'Elif Kaya', ts: '2026-11-21 16:20', action: 'Updated', entity: 'Product', entityId: 'restaurant-chair', description: 'Visibility Internal → Public', ip: '88.247.10.34' },
  { id: 'AU-7776', admin: 'Selin Aydın', ts: '2026-11-20 08:55', action: 'Signed in', entity: 'Admin session', entityId: '—', description: 'Signed in to admin panel', ip: '78.180.2.9' },
  { id: 'AU-7775', admin: 'Murat Demir', ts: '2026-11-18 12:10', action: 'Deleted', entity: 'Category draft', entityId: 'kitchen-tools', description: 'Removed duplicate draft category', ip: '88.247.10.21' },
];

export const portalCustomerId = 'CUS-2041';
export const tickets: Ticket[] = [
  { id: 'TK-114', subject: 'Can I add pillows to my towel order?', status: 'Awaiting reply', updated: '2026-11-24', messages: [{ from: 'You', date: '2026-11-23', text: 'Hi, could we add 200 pillows to the textiles order?' }, { from: 'SorsMe', date: '2026-11-24', text: 'Yes — please send the preferred size and fill so we can check with suppliers.' }] },
  { id: 'TK-109', subject: 'Invoice copy for October', status: 'Resolved', updated: '2026-11-02', messages: [{ from: 'You', date: '2026-11-01', text: 'Please resend the October subscription receipt.' }, { from: 'SorsMe', date: '2026-11-02', text: 'Done — you can also view it under Billing History.' }] },
];
export const notices: Notice[] = [
  { id: 'N1', kind: 'Request', title: 'Request SR-2026-0148 is under review', text: 'Elif from SorsMe is checking feasibility with suppliers.', date: '2026-11-25', read: false },
  { id: 'N2', kind: 'Shipment', title: 'Shipment SH-0031 departed Valencia', text: 'Estimated arrival in Veracruz on 8 December.', date: '2026-11-12', read: false },
  { id: 'N3', kind: 'Subscription', title: 'Sourcing Database renewed', text: 'Your $15 monthly subscription renewed. Paid through 11 December.', date: '2026-11-11', read: true },
  { id: 'N4', kind: 'Order', title: 'Order OR-2026-0047 passed inspection', text: 'Quality inspection photos are available from your coordinator.', date: '2026-10-29', read: true },
  { id: 'N5', kind: 'Quotation', title: 'Quotation QT-2026-0071 accepted', text: 'You accepted the towels quotation. Pay the supplier directly for the goods.', date: '2026-10-07', read: true },
];

// ——— Helpers and business rules ———
export const customerName = (id: string | null) => (id ? customers.find((c) => c.id === id)?.company ?? id : 'Guest');
export const supplierName = (id: string) => suppliers.find((s) => s.id === id)?.company ?? id;
export const goodsTotal = (lines: QuoteLine[]) => lines.reduce((s, l) => s + l.qty * l.unitPrice, 0);
/** SorsMe service fee for a quotation, from the number of product lines requested. */
export function quotationFee(q: Quotation) { const r = requests.find((x) => x.id === q.requestId); return quotationPrice(r?.count ?? q.lines.length) ?? 0; }

export type CustomerQuoteLine = Omit<QuoteLine, 'supplierId' | 'supplierContact'>;
/** What a customer may see of a quotation: supplier identity and direct contacts are removed. */
export function toCustomerQuotation(q: Quotation) {
  const { lines, ...rest } = q;
  return { ...rest, lines: lines.map(({ supplierId: _s, supplierContact: _c, ...line }) => line as CustomerQuoteLine) };
}
/** What a database subscriber may see of a supplier: no direct sales-manager contact. */
export function toSubscriberSupplier(s: Supplier) {
  const { salesManager: _m, documents: _d, ...rest } = s;
  return rest;
}

export const statusTone = (s: string): Tone => {
  if (/^(active|verified|paid|delivered|accepted|won|feasible|resolved|qualified)$/i.test(s)) return 'success';
  if (/(pending|review|clarification|draft|preparation|awaiting|production|inspection|booked|transit|customs|proposal|contacted|requested|cancelled|ready)/i.test(s)) return 'warning';
  if (/(rejected|not feasible|failed|expired|suspended|lost|declined|inactive|refunded)/i.test(s)) return 'danger';
  if (/(new|sent|shipped|quoted|open|confirmed|high)/i.test(s)) return 'info';
  return 'neutral';
};

export const monthlyActivity = [
  { month: 'Jun', requests: 9, quotations: 6, orders: 3, revenue: 245, customers: 14, suppliers: 21 },
  { month: 'Jul', requests: 12, quotations: 8, orders: 4, revenue: 330, customers: 19, suppliers: 24 },
  { month: 'Aug', requests: 15, quotations: 10, orders: 6, revenue: 415, customers: 23, suppliers: 27 },
  { month: 'Sep', requests: 13, quotations: 11, orders: 5, revenue: 390, customers: 28, suppliers: 29 },
  { month: 'Oct', requests: 18, quotations: 13, orders: 7, revenue: 520, customers: 34, suppliers: 33 },
  { month: 'Nov', requests: 21, quotations: 15, orders: 9, revenue: 610, customers: 41, suppliers: 36 },
];
export const marketShare = [{ name: 'Latin America', value: 46 }, { name: 'MENA', value: 32 }, { name: 'CIS', value: 17 }, { name: 'Other', value: 5 }];

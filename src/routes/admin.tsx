import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Boxes, ClipboardList, CreditCard, FolderTree, LayoutDashboard, Settings, Truck, Users, FileText, Package, ShoppingCart, TrendingUp, DollarSign, Briefcase, Mail, ClipboardCheck, Building2, BarChart3, Image } from 'lucide-react';
import { AppShell, type NavGroup } from '@/components/admin/shell';
import { auditLog } from '@/lib/sample-data';

const groups: NavGroup[] = [
  { title: 'Overview', items: [{ label: 'Dashboard', to: '/admin', icon: LayoutDashboard, exact: true }, { label: 'CRM & Leads', to: '/admin/crm', icon: Briefcase }] },
  { title: 'Sourcing', items: [{ label: 'Sourcing Requests', to: '/admin/requests', icon: ClipboardList, also: ['/admin/request/'] }, { label: 'Quotations', to: '/admin/quotations', icon: FileText, also: ['/admin/quotation/'] }, { label: 'Orders', to: '/admin/orders', icon: ShoppingCart, also: ['/admin/order/'] }, { label: 'Shipping & Logistics', to: '/admin/shipping', icon: Truck, also: ['/admin/shipment/'] }] },
  { title: 'Catalogue', items: [{ label: 'Suppliers', to: '/admin/suppliers', icon: Truck, also: ['/admin/supplier/'] }, { label: 'Products', to: '/admin/products', icon: Boxes, also: ['/admin/product/'] }, { label: 'Categories', to: '/admin/categories', icon: FolderTree }] },
  { title: 'Customers', items: [{ label: 'Customers', to: '/admin/customers', icon: Users, also: ['/admin/customer/'] }, { label: 'Subscriptions', to: '/admin/subscriptions', icon: CreditCard }] },
  { title: 'Administration', items: [{ label: 'Financials', to: '/admin/financials', icon: DollarSign }, { label: 'Reports & Analytics', to: '/admin/reports', icon: BarChart3 }, { label: 'Audit Logs', to: '/admin/audit-logs', icon: ClipboardList }, { label: 'Site Images', to: '/admin/media', icon: Image }, { label: 'Settings', to: '/admin/settings', icon: Settings }] },
];
const searchEntries = groups.flatMap((g) => g.items.map((i) => ({ label: i.label, hint: g.title, to: i.to })));
const notices = auditLog.slice(0, 4).map((a, i) => ({ title: `${a.action}: ${a.entity} ${a.entityId}`, date: a.ts, unread: i < 2 }));

export const Route = createFileRoute('/admin')({
  head: () => ({ meta: [{ title: 'Admin Panel | SorsMe' }, { name: 'description', content: 'SorsMe administration for suppliers, products, categories and subscriptions.' }, { name: 'robots', content: 'noindex, nofollow' }, { property: 'og:title', content: 'Admin Panel | SorsMe' }, { property: 'og:description', content: 'SorsMe administration panel.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }] }),
  component: () => <AppShell variant="admin" brandTo="/admin" label="Admin Panel" groups={groups} user={{ name: 'Administrator', role: 'Preview — not signed in' }} notices={notices} searchEntries={searchEntries} profileTo="/admin/settings" settingsTo="/admin/settings"><Outlet /></AppShell>,
});

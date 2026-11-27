import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Panel, Tag, Field } from "@/components/admin/primitives";
import { customers, type Customer, statusTone } from "@/lib/sample-data";
import { categories, plans, pageHead } from "@/lib/sorsme";

export const Route = createFileRoute("/customer/")({
  head: () => pageHead("Customer Portal | SorsMe", "Access your sourcing requests, quotations, orders and subscription in the SorsMe customer portal."),
  component: CustomerPortal,
});

function CustomerPortal() {
  const customer = customers[0];
  if (!customer) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  return <Dashboard customer={customer} />;
}

function Dashboard({ customer }: { customer: Customer }) {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <nav className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold">SorsMe Customer Portal</span>
        <Button asChild variant="outline"><Link to="/">Back to Site</Link></Button>
      </nav>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-6 bg-card/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Your Account</h3>
          <div className="space-y-2">
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Company:</strong> {customer.company}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Status:</strong> <Tag tone={statusTone(customer.subscription?.status ?? 'Active')}>{customer.subscription?.status ?? 'Active'}</Tag></p>
          </div>
        </div>

        <div className="rounded-lg border p-6 bg-card/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Subscription</h3>
          <div className="space-y-2">
            <p><strong>Plan:</strong> Sourcing Database</p>
            <p><strong>Price:</strong> ${plans.find(p => p.id === 'database')?.price}/month</p>
            <p><strong>Paid Through:</strong> {customer.subscription?.paidThrough || '—'}</p>
          </div>
        </div>

        <div className="rounded-lg border p-6 bg-card/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Quick Actions</h3>
          <ul className="space-y-2">
            <li><Link to="/request" className="text-primary underline">Submit Sourcing Request</Link></li>
            <li><Link to="/track-request" className="text-primary underline">Track Request</Link></li>
            <li><Link to="/products" className="text-primary underline">Browse Products</Link></li>
            <li><Link to="/contact" className="text-primary underline">Contact Us</Link></li>
          </ul>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <Panel title="Recent Requests">
          <p className="text-muted-foreground">View and manage your sourcing requests, quotations and orders.</p>
        </Panel>
        <Panel title="Sourcing Database">
          <p className="text-muted-foreground">Access ${plans.find(p => p.id === 'database')?.price}/month sourcing database with verified Turkish suppliers.</p>
        </Panel>
      </section>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { categories, products, plans, pageHead } from "@/lib/sorsme";
import { SiteImage } from "@/components/site-image";

export const Route = createFileRoute("/horeca")({
  head: () => pageHead("Horeca Sourcing | Turkish Hotel, Restaurant & Café Suppliers", "Discover Turkish Horeca suppliers — restaurant equipment, furniture, tableware and supplies for hotels, restaurants and cafés."),
  component: HorecaPage,
});

function HorecaPage() {
  const horecaProducts = products.filter((p) => p.category === "horeca" || p.category === "furniture" || p.category === "food");
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <nav className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold">SorsMe</span>
        <Button asChild variant="outline"><Link to="/">Back Home</Link></Button>
      </nav>

      <section className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Horeca Sourcing</h1>
          <p className="text-muted-foreground mt-2">Hotel, restaurant and café equipment, furniture, tableware and supplies from verified Turkish suppliers.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6 bg-card/50">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Horeca Categories</h3>
            <ul className="space-y-2">
              {categories.filter((c) => ["horeca", "food", "furniture"].includes(c.id)).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/$categoryId`} params={{ categoryId: cat.id }} className="text-primary underline">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border p-6 bg-card/50">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Why Source Horeca</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Verified Turkish suppliers</li>
              <li>Quality restaurant and hotel equipment</li>
              <li>Competitive pricing</li>
              <li>Reliable delivery options</li>
            </ul>
          </div>
          <div className="rounded-lg border p-6 bg-card/50">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Get a Quotation</h3>
            <p className="text-muted-foreground mb-4">Tell us what you need for your hotel, restaurant or café.</p>
            <p><strong>Standard:</strong> ${plans.find(p => p.id === 'standard')?.price}/request</p>
            <p><strong>Large:</strong> ${plans.find(p => p.id === 'large')?.price}/request</p>
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <SiteImage slotId="horeca-showcase" className="w-full h-64" alt="Restaurant table setting with Turkish tableware" />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Horeca Products</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {horecaProducts.map((product) => (
              <div key={product.id} className="rounded border p-4">
                <strong>{product.name}</strong>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

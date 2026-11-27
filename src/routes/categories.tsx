import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products, pageHead } from "@/lib/sorsme";

export const Route = createFileRoute("/categories")({
  head: () => pageHead("Product Categories | SorsMe Sourcing", "Browse product categories available for sourcing from Turkish suppliers. Horeca, furniture, textiles, food and more."),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <nav className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold">SorsMe</span>
        </div>
        <Link to="/">Back Home</Link>
      </nav>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-6 md:p-8 bg-card/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">All Categories</h3>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.id} className="p-3 rounded border hover:bg-primary/10 transition-colors">
                <Link to={`/category/$categoryId`} params={{ categoryId: cat.id }} className="font-medium hover-underline">
                  {cat.name}
                </Link>
                <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border p-6 md:p-8 bg-card/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Category Counts</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <strong>{cat.name}</strong>: {products.filter((p) => p.category === cat.id).length} products
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border p-6 md:p-8 bg-card/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Get a Quotation</h3>
          <p className="text-muted-foreground mb-4">Select categories and we'll provide quotes from Turkish suppliers.</p>
          <div className="space-y-2">
            <p><strong>Standard:</strong> $20/request (up to 50 products)</p>
            <p><strong>Large:</strong> $45/request (51-200 products)</p>
          </div>
        </div>
      </section>
    </div>
  );
}

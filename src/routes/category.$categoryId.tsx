import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { categories, products, plans, pageHead } from "@/lib/sorsme";

export const Route = createFileRoute("/category/$categoryId")({
  head: ({ params }) => {
    const cat = categories.find((c) => c.id === params.categoryId);
    return pageHead(`${cat?.name ?? 'Category'} | SorsMe`, cat?.description ?? "Browse products in this category.");
  },
  component: CategoryDetail,
});

function CategoryDetail() {
  const { categoryId } = Route.useParams();
  const selectedCategory = categories.find((c) => c.id === categoryId);

  if (!selectedCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Category not found</h1>
          <Button asChild className="mt-4"><Link to="/categories">Browse All Categories</Link></Button>
        </div>
      </div>
    );
  }

  const categoryProducts = products.filter((p) => p.category === categoryId);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <nav className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold">SorsMe</span>
        <Button asChild variant="outline"><Link to="/categories">Back to Categories</Link></Button>
      </nav>

      <section className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{selectedCategory.name}</h1>
          <p className="text-muted-foreground mt-2">{selectedCategory.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6 bg-card/50 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{categoryProducts.length} Products</h3>
            {categoryProducts.length === 0 && (
              <p className="text-muted-foreground">No products in this category yet.</p>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {categoryProducts.map((product) => (
                <div key={product.id} className="rounded border p-4">
                  <strong>{product.name}</strong>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-6 bg-card/50">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Get a Quotation</h3>
            <p className="text-muted-foreground mb-4">Request a quotation for products in {selectedCategory.name}.</p>
            <div className="space-y-2 mb-4">
              <p><strong>Standard:</strong> ${plans.find(p => p.id === 'standard')?.price}/request (up to 50 products)</p>
              <p><strong>Large:</strong> ${plans.find(p => p.id === 'large')?.price}/request (51-200 products)</p>
            </div>
            <Button asChild className="w-full"><Link to="/request">Request a Quotation</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}

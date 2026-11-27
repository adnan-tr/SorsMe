import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/sorsme";

export const Route = createFileRoute("/customer/login")({
  head: () => pageHead("Sign In | SorsMe", "Sign in to your SorsMe customer account."),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <nav className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold">SorsMe</span>
        <Button asChild variant="outline"><Link to="/">Back Home</Link></Button>
      </nav>
      <section className="max-w-md mx-auto space-y-8">
        <h2 className="text-2xl font-bold">Sign in to your account</h2>
        <p className="text-muted-foreground">Access your sourcing requests, quotations, orders and subscription.</p>
        <form className="space-y-6">
          <div>
            <label className="text-sm font-medium">Email address</label>
            <input type="email" placeholder="you@company.com" className="w-full mt-1 px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" placeholder="••••••••" className="w-full mt-1 px-3 py-2 border rounded-md" />
          </div>
          <Button type="submit">Sign in</Button>
        </form>
        <div className="text-center text-sm">
          <span>Don't have an account? </span>
          <Link to="/customer/register" className="text-primary underline">Create account</Link>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/sorsme";

export const Route = createFileRoute("/customer/register")({
  head: () => pageHead("Create Account | SorsMe", "Create your SorsMe customer account and start sourcing."),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <nav className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold">SorsMe</span>
        <Button asChild variant="outline"><Link to="/">Back Home</Link></Button>
      </nav>
      <section className="max-w-md mx-auto space-y-8">
        <h2 className="text-2xl font-bold">Create your account</h2>
        <p className="text-muted-foreground">Join SorsMe and start sourcing from Turkish suppliers.</p>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Full name</label>
              <input placeholder="John Doe" className="w-full mt-1 px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="text-sm font-medium">Company</label>
              <input placeholder="Your company" className="w-full mt-1 px-3 py-2 border rounded-md" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Email address</label>
            <input type="email" placeholder="you@company.com" className="w-full mt-1 px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" placeholder="••••••••" className="w-full mt-1 px-3 py-2 border rounded-md" />
          </div>
          <Button type="submit">Create account</Button>
        </form>
        <div className="text-center text-sm">
          <span>Already have an account? </span>
          <Link to="/customer/login" className="text-primary underline">Sign in</Link>
        </div>
      </section>
    </div>
  );
}

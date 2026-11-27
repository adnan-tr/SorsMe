import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/sorsme";

export const Route = createFileRoute("/terms")({
  head: () => pageHead("Terms of Service | SorsMe", "Read the terms and conditions governing your use of the SorsMe platform."),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <nav className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold">SorsMe</span>
        <Button asChild variant="outline"><Link to="/">Back Home</Link></Button>
      </nav>
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p className="text-muted-foreground">These Terms of Service govern your use of the SorsMe platform. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Use of Service</h2>
          <ol className="list-decimal pl-5 mb-4 text-muted-foreground">
            <li>You must be at least 18 years old to use the Service.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You must provide accurate, current, and complete information during registration.</li>
            <li>You are responsible for all activities that occur under your account.</li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-muted-foreground">The Service and its original content, features, and functionality are owned by SorsMe and are protected by international copyright, trademark, patent, trade secret and other laws.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Termination</h2>
          <p className="text-muted-foreground">SorsMe may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p className="text-muted-foreground">Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis.</p>
        </section>
        <footer className="mt-8 text-sm text-muted-foreground">
          <p>Last updated: November 2026</p>
          <p>Contact us at legal@sorsme.com for questions about these Terms of Service.</p>
        </footer>
      </main>
    </div>
  );
}

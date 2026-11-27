import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/sorsme";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("Privacy Policy | SorsMe", "Learn how SorsMe collects, uses and protects your personal data."),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <nav className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold">SorsMe</span>
        <Button asChild variant="outline"><Link to="/">Back Home</Link></Button>
      </nav>
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground">SorsMe operates the SorsMe platform. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <h3 className="text-xl font-medium mb-3">Personal Data</h3>
          <ul className="list-disc pl-5 mb-4 text-muted-foreground">
            <li>Name and contact information</li>
            <li>Company name and business address</li>
            <li>Email address and phone number</li>
            <li>Billing and payment information</li>
          </ul>
          <h3 className="text-xl font-medium mb-3">Usage Data</h3>
          <ul className="list-disc pl-5 mb-4 text-muted-foreground">
            <li>Information about how you access and use our service</li>
            <li>Device information and browsing behavior</li>
            <li>IP address and location data</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-5 mb-4 text-muted-foreground">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features of our service</li>
            <li>To provide customer support</li>
            <li>To gather analytics so we can improve our service</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-muted-foreground">We strive to use commercially acceptable means of protecting your personal data. But remember that no method of electronic transmission or storage is 100% secure.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to this Privacy Policy</h2>
          <p className="text-muted-foreground">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
        </section>
        <footer className="mt-8 text-sm text-muted-foreground">
          <p>Last updated: November 2026</p>
          <p>Contact us at privacy@sorsme.com for questions about this Privacy Policy.</p>
        </footer>
      </main>
    </div>
  );
}

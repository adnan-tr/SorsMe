import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Handshake, Globe2, ConciergeBell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Action, Eyebrow, CategoryGrid, Services, Benefits, Process, Packages, RequestBand } from "@/components/sorsme";
import { SiteImage } from "@/components/site-image";
import { pageHead } from "@/lib/sorsme";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => pageHead("Your Sourcing Partner in Türkiye", "Discover Turkish suppliers, explore quality products and source with confidence. SorsMe helps coordinate your sourcing journey."),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="home-hero">
        <SiteImage slotId="home-hero-main" className="hero-photo" alt="Istanbul skyline overlooking the Bosphorus" fetchPriority="high" />
        <div className="hero-collage">
          <SiteImage slotId="home-hero-tableware" className="hero-tableware" alt="Restaurant table setting with Turkish tableware" />
          <SiteImage slotId="home-hero-furniture" className="hero-furniture" alt="Upholstered hospitality chair" />
          <SiteImage slotId="home-hero-restaurant" className="hero-restaurant" alt="Restaurant terrace in Istanbul" />
          <SiteImage slotId="home-hero-industrial" className="hero-industrial" alt="Precision industrial components" />
          <SiteImage slotId="home-hero-textiles" className="hero-textiles" alt="Cotton towels and hotel linens" />
        </div>
        <div className="hero-content"><h1>Your Sourcing<br/>Partner in Türkiye.</h1><p className="hero-description">Discover Turkish suppliers, explore quality products and simplify your sourcing journey. From finding the right manufacturer to supporting your order and delivery, we’re here to help.</p><div className="hero-actions"><Action/><Button asChild variant="outline"><Link to="/products">Explore Categories</Link></Button></div><div className="hero-trust"><div><Handshake/><span>Trusted Turkish<br/>Suppliers</span></div><div><ConciergeBell/><span>Horeca &<br/>Commercial Focus</span></div><div><Globe2/><span>International<br/>Sourcing Support</span></div></div></div>
      </section>
      <Services/>
      <section className="section category-section"><div className="section-heading"><div><Eyebrow>Product Categories</Eyebrow><h2>What Can We Source for You?</h2></div><p>A wide range of products and supplier solutions, with a special focus on Horeca. Explore a selection of our sourcing capabilities.</p></div><CategoryGrid/></section>
      <Benefits/><Process/><Packages/><RequestBand/>
    </>
  );
}

import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { ProjectGrid } from "../components/ProjectGrid";
import { ContactSimple } from "../components/ContactSimple";
import { Footer } from "../components/Footer";

export function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <Hero />
      <ProjectGrid />
      <ContactSimple />
      <Footer />
    </div>
  );
}

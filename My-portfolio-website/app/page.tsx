import ScrollProgress from '@/components/ScrollProgress';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectBento from '@/components/ProjectBento';
import TechMatrix from '@/components/TechMatrix';
import TerminalFooter from '@/components/TerminalFooter';
import MobileNav from '@/components/MobileNav';

export default function Home() {
  return (
    <main className="relative bg-[#070709] min-h-screen selection:bg-[#D4FF00]/20 selection:text-[#D4FF00] overflow-x-hidden">
      {/* Global Liquid Glass Scroll Progress Bar */}
      <ScrollProgress />

      {/* Glassmorphic Floating Navbar */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Featured Works (Exact Two Projects Only) */}
      <ProjectBento />

      {/* Interactive Tech Ecosystem */}
      <TechMatrix />

      {/* Minimal Contact & Footer */}
      <TerminalFooter />

      {/* Ergonomic Floating Bottom Mobile Nav */}
      <MobileNav />
    </main>
  );
}

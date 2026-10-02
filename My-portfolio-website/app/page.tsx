import ScrollProgress from '@/components/ScrollProgress';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectBento from '@/components/ProjectBento';
import TechMatrix from '@/components/TechMatrix';
import TerminalFooter from '@/components/TerminalFooter';
import MobileNav from '@/components/MobileNav';

export default function Home() {
  return (
    <main className="relative bg-[#09090b] min-h-screen selection:bg-[#8052ff]/25 selection:text-[#8052ff] overflow-x-hidden">
      {/* Global Liquid Glass Scroll Progress Bar */}
      <ScrollProgress />

      {/* Glassmorphic Floating Navbar */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Featured Flagship Showcase Cards */}
      <ProjectBento />

      {/* Core Engineering Disciplines */}
      <TechMatrix />

      {/* Dispatch Terminal Footer */}
      <TerminalFooter />

      {/* Ergonomic Floating Bottom Mobile Nav */}
      <MobileNav />
    </main>
  );
}

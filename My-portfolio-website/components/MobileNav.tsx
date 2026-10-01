'use client';

import { Layers, Cpu, Mail, ArrowUp } from 'lucide-react';

export default function MobileNav() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-[92%] max-w-sm">
      <nav className="flex items-center justify-around px-3 py-2 bg-zinc-950/80 border border-white/10 rounded-full backdrop-blur-xl shadow-2xl shadow-black/80">
        <a
          href="#works"
          className="flex flex-col items-center justify-center p-2 rounded-full text-zinc-400 hover:text-[#D4FF00] min-w-[44px] min-h-[44px] transition-colors"
          aria-label="Works"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[9px] font-mono mt-0.5">Works</span>
        </a>

        <a
          href="#disciplines"
          className="flex flex-col items-center justify-center p-2 rounded-full text-zinc-400 hover:text-[#D4FF00] min-w-[44px] min-h-[44px] transition-colors"
          aria-label="Disciplines"
        >
          <Cpu className="w-5 h-5" />
          <span className="text-[9px] font-mono mt-0.5">Disciplines</span>
        </a>

        <a
          href="#contact"
          className="flex flex-col items-center justify-center p-2 rounded-full text-zinc-400 hover:text-[#D4FF00] min-w-[44px] min-h-[44px] transition-colors"
          aria-label="Contact"
        >
          <Mail className="w-5 h-5" />
          <span className="text-[9px] font-mono mt-0.5">Contact</span>
        </a>

        <div className="h-6 w-[1px] bg-white/10 mx-0.5" />

        <button
          onClick={scrollToTop}
          className="flex items-center justify-center p-2 rounded-full bg-white/[0.08] border border-white/10 text-[#D4FF00] min-w-[44px] min-h-[44px] active:scale-90 transition-transform"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}

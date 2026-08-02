import React from 'react';
import { Terminal, Code2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/60 border-b border-cyan-500/20 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Minimalist Glowing 'AY' Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition-all duration-300">
            <span className="font-extrabold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 group-hover:scale-105 transition-transform duration-300">
              AY
            </span>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wider text-slate-100 uppercase flex items-center gap-1.5">
              Ahmed Youssef <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            </span>
            <span className="text-[11px] text-cyan-400/80 tracking-widest font-mono">
              SYSTEMS // FULL-STACK
            </span>
          </div>
        </div>

        {/* Center: Exact Text Specification */}
        <div className="text-center px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/80 shadow-inner">
          <p className="text-xs md:text-sm font-medium tracking-wide text-slate-300 flex items-center justify-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0 hidden sm:inline" />
            <span className="font-semibold text-cyan-300 uppercase tracking-widest">AHMED YOUSSEF</span>
            <span className="text-slate-600">|</span>
            <span className="font-medium text-slate-200">SOFTWARE ENGINEER</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400/90 font-mono text-[11px] md:text-xs">
              Specialist in Python (FastAPI), Node.js, and Full-Stack Development.
            </span>
          </p>
        </div>

        {/* Quick Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-400 tracking-wider">
          <a href="#hero" className="hover:text-cyan-400 transition-colors">HOME</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">SKILLS</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">PROJECTS</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">CONTACT</a>
        </nav>
      </div>
    </header>
  );
};

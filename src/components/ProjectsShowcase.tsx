import React from 'react';
import { ExternalLink, GitBranch, Sparkles, Layers } from 'lucide-react';

export const ProjectsShowcase: React.FC = () => {
  return (
    <section id="projects" className="relative py-20 px-4 overflow-hidden">
      {/* Background glow orb */}
      <div className="glow-backdrop w-[600px] h-[600px] bg-cyan-600/15 top-1/3 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>PRODUCTION-READY SYSTEMS SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects & Engineering Work
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Engineered with modern architecture, clean code practices, and scalable backend services. Rendered in segmented liquid-glass panels with depth-based background blur.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          
          {/* ========================================================================
              PROJECT 1: Full Stack Bookstore
              ======================================================================== */}
          <div
            className="liquid-glass-element glass-panel p-6 sm:p-8 md:p-10 border border-cyan-500/30 transition-all duration-300 shadow-2xl"
            data-config='{"floating": true, "blurAmount": 0.7, "refraction": 1.5, "chromAberration": 0.9, "zRadius": 30, "edgeHighlight": 0.8}'
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* IMAGE PLACEHOLDER CONTAINER: /assets/project-bookstore-placeholder.png */}
              {/* Has dynamic blur applied to background based on depth relative to glass overlay */}
              <div className="lg:col-span-7">
                {/* 
                  ========================================================================
                  PROJECT 1 IMAGE CONTAINER SLOT
                  File path: /assets/project-bookstore-placeholder.png
                  CSS Class: image-placeholder-container project-image-slot
                  ========================================================================
                */}
                <div className="image-placeholder-container project-image-slot relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
                  {/* Dynamic blur backdrop layer */}
                  <div className="absolute inset-0 backdrop-blur-md bg-slate-950/40 z-10 pointer-events-none group-hover:backdrop-blur-none transition-all duration-500" />
                  
                  <img
                    src="assets/Screenshot From 2026-08-02 06-22-45.png"
                    alt="E-commerce Bookstore Administration & Storefront"
                    className="w-full h-[260px] sm:h-[340px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />

                </div>
              </div>

              {/* Project 1 Details */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase block mb-1">
                    PROJECT 01 // E-COMMERCE & ADMIN
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Full Stack Bookstore
                  </h3>
                </div>

                {/* EXACT REQUIRED DETAILS SPECIFICATION */}
                <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed">
                  E-commerce Bookstore Administration & Storefront - Full-Stack Application.
                </p>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Includes secure JWT user authentication, dynamic catalog management, inventory tracking, order processing, and administrative analytics dashboards.
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Python', 'FastAPI', 'Node.js', 'React', 'MySQL', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/80 border border-slate-700/80 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-4 pt-3">
                  <button className="glass-button text-xs tracking-wider cursor-default opacity-80">
                    <GitBranch className="w-4 h-4 text-purple-300" />
                    <a
                    href="sat-ig-website.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button glass-button-primary text-xs tracking-wider inline-flex items-center gap-2"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-4 h-4 text-cyan-300" />
                  </a>
                  </button>
                </div>
              </div>

            </div>
          </div>


          {/* ========================================================================
              PROJECT 2: Web Quiz Game
              ======================================================================== */}
          <div
            className="liquid-glass-element glass-panel p-6 sm:p-8 md:p-10 border border-purple-500/30 transition-all duration-300 shadow-2xl"
            data-config='{"floating": true, "blurAmount": 0.7, "refraction": 1.6, "chromAberration": 1.0, "zRadius": 32, "edgeHighlight": 0.85}'
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Project 2 Details */}
              <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
                <div>
                  <span className="text-xs font-mono text-purple-400 tracking-widest uppercase block mb-1">
                    PROJECT 02 // WEBLOGIC & STATE ENGINE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Web Quiz Game
                  </h3>
                </div>

                {/* EXACT REQUIRED DETAILS SPECIFICATION */}
                <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed">
                  Interactive Web Quiz Game - WebLogic and Frontend State Management.
                </p>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Engineered with real-time question timers, dynamic score counters, interactive feedback animations, category selections, and optimized browser state persistence.
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {['WebLogic', 'Frontend State', 'JavaScript', 'React', 'Vercel Deployment'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/80 border border-slate-700/80 text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* EXPLICIT LIVE DEMO BUTTON POINTING TO SPECIFIED URL */}
                <div className="pt-3">
                  <a
                    href="https://game-quiz-wine.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button glass-button-primary text-xs tracking-wider inline-flex items-center gap-2"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-4 h-4 text-cyan-300" />
                  </a>
                </div>
              </div>

              {/* IMAGE PLACEHOLDER CONTAINER: /assets/project-quiz-placeholder.png */}
              {/* Has dynamic blur applied to background based on depth relative to glass overlay */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                {/* 
                  ========================================================================
                  PROJECT 2 IMAGE CONTAINER SLOT
                  File path: /assets/project-quiz-placeholder.png
                  CSS Class: image-placeholder-container project-image-slot
                  ========================================================================
                */}
                <div className="image-placeholder-container project-image-slot relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
                  {/* Dynamic blur backdrop layer */}
                  <div className="absolute inset-0 backdrop-blur-md bg-slate-950/40 z-10 pointer-events-none group-hover:backdrop-blur-none transition-all duration-500" />

                  <img
                    src="assets/Screenshot From 2026-08-02 07-49-26.png"
                    alt="Interactive Web Quiz Game"
                    className="w-full h-[260px] sm:h-[340px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

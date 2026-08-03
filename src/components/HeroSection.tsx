import React from 'react';
import { ArrowRight, Mail, Sparkles, Move } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onContactClick,
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center py-16 px-4 overflow-hidden">
      {/* Subtle Pulsing Tech-inspired Backlighting */}
      <div className="glow-backdrop w-[500px] h-[500px] bg-cyan-500/20 top-1/4 -left-20" />
      <div className="glow-backdrop w-[450px] h-[450px] bg-purple-600/25 bottom-10 right-0" />

      <div className="relative z-10 max-w-5xl w-full mx-auto">
        {/* Layer 1: Background Content */}
        <div className="relative mb-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 tracking-wider shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>FULL-STACK ARCHITECTURE & SYSTEMS</span>
          </div>
        </div>

        {/* Hero Panel */}
        <div
          className="liquid-glass-element glass-panel p-6 sm:p-10 md:p-12 relative overflow-hidden backdrop-blur-xl border border-white/20 shadow-2xl transition-shadow duration-300"
          data-config='{"floating": true, "blurAmount": 0.65, "refraction": 1.4, "chromAberration": 0.85, "fresnel": 0.9, "specular": 0.95, "edgeHighlight": 0.9, "shadowOpacity": 0.6}'
        >
          {/* Drag Indicator Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 border border-white/10 text-[11px] font-mono text-cyan-300 pointer-events-none select-none z-20">
            <Move className="w-3 h-3 text-cyan-400" />
            <span>INTERACTIVE GLASS SLAB</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* DESIGNATED PROFILE PICTURE IMAGE PLACEHOLDER CONTAINER */}
            {/* Class: profile-picture-container / Path: /assets/profile-placeholder.png */}
            {/* Positioned behind/within the glass slab for realistic refraction */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-75 blur group-hover:opacity-100 transition duration-500" />
                
                {/* 
                  ========================================================================
                  PROFILE IMAGE CONTAINER SLOT 
                  File path: /assets/profile-placeholder.png
                  Replace this src with your custom profile photo path if needed!
                  ========================================================================
                */}
                <div className="image-placeholder-container relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-slate-900/90 border border-cyan-400/30">
                  <img
                    src="/assets/1785639772159.png"
                    alt="Ahmed Youssef - Software Engineer"
                    className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback if local asset is missing
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  {/* Subtle glass distortion line over image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Bio Details */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase block mb-1">
                  // SENIOR FULL-STACK ARCHITECT
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-200">
                    Hi, I'm Ahmed.
                  </span>
                </h1>
                <p className="mt-3 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                  I craft scalable backend solutions and clean, interactive frontend experiences.
                </p>
              </div>

              {/* Stack Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
                {['Python (FastAPI)', 'Node.js', 'React', 'MySQL', 'WebGL Glassmorphism'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-900/70 border border-slate-700/80 text-cyan-300 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Glassmorphic Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={onExploreClick}
                  className="glass-button glass-button-primary liquid-glass-element text-sm tracking-wide active:scale-95 transition-transform"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 text-cyan-300" />
                </button>

                <button
                  onClick={onContactClick}
                  className="glass-button liquid-glass-element text-sm tracking-wide active:scale-95 transition-transform"
                >
                  <Mail className="w-4 h-4 text-purple-300" />
                  <span>Get in Touch</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

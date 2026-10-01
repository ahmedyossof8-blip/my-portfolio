'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Layers, Check, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Project {
  id: string;
  titleKey: string;
  subtitleKey: string;
  categoryKey: string;
  statusLabelKey: string;
  summaryKey: string;
  descKey: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  highlightKeys: string[];
  liveUrl: string;
  ctaKey: string;
  accentColor: string;
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Early resolution scroll curve: resolves fully at start 65% (entering reading zone)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 95%', 'start 65%'],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [0.88, 1.0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 1.0]);
  const rawBlurNum = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const rawBorderOpacity = useTransform(scrollYProgress, [0, 1], [0.08, 0.25]);

  const springConfig = { stiffness: 220, damping: 25, mass: 0.5 };
  const scale = useSpring(rawScale, springConfig);
  const opacity = useSpring(rawOpacity, springConfig);
  const blurNum = useSpring(rawBlurNum, springConfig);
  const borderOpacity = useSpring(rawBorderOpacity, springConfig);

  const filter = useTransform(blurNum, (b) => `blur(${b}px)`);

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
        filter,
        willChange: 'transform, filter, opacity',
      }}
      className={`sticky top-28 z-${10 + index} mb-12`}
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="group relative rounded-3xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/25 hover:bg-white/[0.05] transition-all duration-500 p-6 sm:p-10 overflow-hidden"
      >
        {/* Dynamic Light Refraction Glow linked to active reading focus */}
        <motion.div
          style={{ opacity: borderOpacity }}
          className="absolute inset-0 rounded-3xl border border-white/30 pointer-events-none transition-opacity"
        />

        {/* Diffused Ambient Glow Behind Glass Card */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${project.accentColor} 0%, transparent 70%)`,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Card Info Column */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-zinc-300">
                  {project.categoryKey}
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#D4FF00] bg-[#D4FF00]/10 px-3 py-1 rounded-full border border-[#D4FF00]/20">
                  <span>{project.statusLabelKey}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h3 className="text-2xl sm:text-4xl font-extrabold text-zinc-100 group-hover:text-[#D4FF00] transition-colors flex items-center justify-between gap-2">
                  <span>{t(project.titleKey)}</span>
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
                  {t(project.subtitleKey)}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2.5 my-6 bg-black/40 p-4 rounded-2xl border border-white/[0.06]">
                {project.highlightKeys.map((hk, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                    <span>{t(hk)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#D4FF00] text-zinc-950 font-bold text-xs sm:text-sm tracking-wide hover:bg-[#c4ee00] transition-all shadow-[0_0_25px_rgba(212,255,0,0.25)] hover:shadow-[0_0_35px_rgba(212,255,0,0.45)] active:scale-95 min-h-[44px]"
              >
                <span>{t(project.ctaKey)}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => onSelect(project)}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl glass-button text-zinc-300 hover:text-white text-xs font-mono transition-all active:scale-95 min-h-[44px]"
              >
                <span>{t('projects.specs')}</span>
              </button>
            </div>
          </div>

          {/* Metrics & Badges Sidebar Column */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
            {/* Metrics */}
            <div className="grid grid-cols-1 gap-2.5 p-4 rounded-2xl bg-black/50 border border-white/[0.06]">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">{m.label}</span>
                  <span className="text-xs font-mono font-bold text-[#D4FF00]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 group-hover:border-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectBento() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Background Parallax Light Orb Movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const projects: Project[] = [
    {
      id: 'sat-ig-bookstore',
      titleKey: 'projects.p1.title',
      subtitleKey: 'projects.p1.subtitle',
      categoryKey: 'Flagship Platform',
      statusLabelKey: '● Live Production',
      summaryKey: 'projects.p1.summary',
      descKey: 'projects.p1.desc',
      techStack: ['Next.js / React', 'Supabase CDN', 'Railway', 'Vercel', 'Tailwind CSS'],
      metrics: [
        { label: 'Curriculums', value: '3 Major Boards' },
        { label: 'Order Processing', value: '<1.2s Route' },
        { label: 'CDN Cache Hit', value: '99.4%' },
      ],
      highlightKeys: ['projects.p1.h1', 'projects.p1.h2', 'projects.p1.h3'],
      liveUrl: 'https://sat-ig-website.vercel.app/',
      ctaKey: 'projects.p1.cta',
      accentColor: '#D4FF00',
    },
    {
      id: 'f1-velocity-quiz',
      titleKey: 'projects.p2.title',
      subtitleKey: 'projects.p2.subtitle',
      categoryKey: 'Interactive Game Engine',
      statusLabelKey: '● Live Experience',
      summaryKey: 'projects.p2.summary',
      descKey: 'projects.p2.desc',
      techStack: ['React', 'Node.js', 'Express', 'Framer Motion', 'Tailwind CSS'],
      metrics: [
        { label: 'Frame Rate', value: '120 FPS Smooth' },
        { label: 'Input Latency', value: '<15ms' },
        { label: 'Trivia State Engine', value: 'Real-Time' },
      ],
      highlightKeys: ['projects.p2.h1', 'projects.p2.h2', 'projects.p2.h3'],
      liveUrl: 'https://game-quiz-wine.vercel.app/',
      ctaKey: 'projects.p2.cta',
      accentColor: '#FF9900',
    },
  ];

  return (
    <section ref={containerRef} id="works" className="py-24 relative bg-[#070709] overflow-hidden">
      {/* Background Parallax Light Orb */}
      <motion.div
        style={{ y: orbY }}
        className="absolute top-1/3 left-10 w-[600px] h-[600px] mesh-orb-1 pointer-events-none opacity-15"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-[#D4FF00]" />
            <span className="text-xs font-mono text-[#D4FF00] tracking-widest uppercase">
              {t('projects.badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            {t('projects.heading')}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-2xl">
            {t('projects.subheading')}
          </p>
        </motion.div>

        {/* Scroll-Driven Fast Resolution Stacking Project Cards */}
        <div className="relative space-y-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Deep Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-2xl backdrop-blur-2xl bg-zinc-950/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.08] text-zinc-400 hover:text-zinc-100 hover:bg-white/15 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#D4FF00] bg-[#D4FF00]/10 px-3 py-1 rounded-full border border-[#D4FF00]/30 mb-4">
                <span>{selectedProject.statusLabelKey}</span>
              </div>

              <h3 className="text-3xl font-extrabold text-zinc-100 mb-1">{t(selectedProject.titleKey)}</h3>
              <p className="text-xs font-mono text-zinc-400 mb-4">{t(selectedProject.subtitleKey)}</p>

              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {t(selectedProject.descKey)}
              </p>

              {/* Architecture Highlights */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                  Architecture Highlights
                </h4>
                <div className="space-y-2 bg-black/50 p-4 rounded-2xl border border-white/[0.08]">
                  {selectedProject.highlightKeys.map((hk, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                      <span>{t(hk)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Badges */}
              <div className="mb-8">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
                  Tech Badges Baseline
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-mono text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#D4FF00] text-zinc-950 font-bold text-xs sm:text-sm hover:bg-[#c4ee00] transition-colors min-h-[44px]"
                >
                  <span>{t(selectedProject.ctaKey)}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

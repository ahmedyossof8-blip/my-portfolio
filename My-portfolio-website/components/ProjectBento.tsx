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

  // Fast-focus trigger: enters at start end, reaches 100% full scale & focus at start 65%
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start 65%', 'end 20%', 'end start'],
  });

  const rawScale = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [0.90, 1.0, 1.0, 0.95]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [0.35, 1.0, 1.0, 0.4]);
  const rawBlurNum = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [6, 0, 0, 4]);

  const springConfig = { stiffness: 240, damping: 25, mass: 0.5 };
  const scale = useSpring(rawScale, springConfig);
  const opacity = useSpring(rawOpacity, springConfig);
  const blurNum = useSpring(rawBlurNum, springConfig);

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
      className={`relative z-${10 + index} mb-12`}
    >
      <motion.div
        whileHover={{ scale: 1.008 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="group relative rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 p-6 sm:p-10 overflow-hidden"
      >
        {/* Subtle Accent Glow */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-15 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle, #8052ff 0%, transparent 70%)',
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Main Info Column */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-xs font-mono uppercase tracking-[0.025em] px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-ash-gray">
                  {project.categoryKey}
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-saffron-spark bg-saffron-spark/10 px-3 py-1 rounded-full border border-saffron-spark/20">
                  <span>{project.statusLabelKey}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h3 className="text-3xl sm:text-4xl font-normal tracking-[-0.04em] text-bone-white group-hover:text-electric-iris transition-colors flex items-center justify-between gap-2">
                  <span>{t(project.titleKey)}</span>
                </h3>
                <p className="text-xs sm:text-sm font-mono text-ash-gray mt-1.5">
                  {t(project.subtitleKey)}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2.5 my-6 bg-black/60 p-4 sm:p-5 rounded-2xl border border-white/[0.06]">
                {project.highlightKeys.map((hk, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-silver-mist">
                    <Check className="w-4 h-4 text-saffron-spark shrink-0 mt-0.5" />
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
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-electric-iris hover:bg-electric-iris-hover text-white font-medium text-xs uppercase tracking-[0.025em] transition-all shadow-[0_0_20px_rgba(128,82,255,0.35)] hover:shadow-[0_0_30px_rgba(128,82,255,0.55)] active:scale-95 min-h-[44px]"
              >
                <span>{t(project.ctaKey)}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => onSelect(project)}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full glass-button text-ash-gray hover:text-bone-white text-xs font-mono transition-all active:scale-95 min-h-[44px]"
              >
                <span>{t('projects.specs')}</span>
              </button>
            </div>
          </div>

          {/* Metrics & Tech Badges Column */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
            {/* Metrics */}
            <div className="grid grid-cols-1 gap-3 p-4 rounded-2xl bg-black/60 border border-white/[0.06]">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-xs font-mono text-ash-gray">{m.label}</span>
                  <span className="text-xs font-mono font-medium text-saffron-spark">
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
                  className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-silver-mist group-hover:border-white/20 transition-colors"
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

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
    },
  ];

  return (
    <section ref={containerRef} id="works" className="py-24 relative bg-black overflow-hidden">
      {/* Background Parallax Light Orb */}
      <motion.div
        style={{ y: orbY }}
        className="absolute top-1/3 left-10 w-[600px] h-[600px] mesh-orb-1 pointer-events-none opacity-20"
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
            <Layers className="w-4 h-4 text-electric-iris" />
            <span className="text-xs font-mono text-saffron-spark tracking-widest uppercase">
              {t('projects.badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-bone-white tracking-[-0.04em]">
            {t('projects.heading')}
          </h2>
          <p className="text-silver-mist text-sm sm:text-base mt-3 max-w-2xl font-light">
            {t('projects.subheading')}
          </p>
        </motion.div>

        {/* Scroll-Driven Fast Resolution Project Cards */}
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

      {/* Deep Specs Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-2xl backdrop-blur-2xl bg-black/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.08] text-ash-gray hover:text-bone-white hover:bg-white/15 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 font-mono text-xs text-saffron-spark bg-saffron-spark/10 px-3 py-1 rounded-full border border-saffron-spark/20 mb-4">
                <span>{selectedProject.statusLabelKey}</span>
              </div>

              <h3 className="text-3xl font-normal tracking-[-0.03em] text-bone-white mb-1">{t(selectedProject.titleKey)}</h3>
              <p className="text-xs font-mono text-ash-gray mb-4">{t(selectedProject.subtitleKey)}</p>

              <p className="text-silver-mist text-sm leading-relaxed mb-6 font-light">
                {t(selectedProject.descKey)}
              </p>

              {/* Architecture Highlights */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-ash-gray uppercase tracking-wider mb-3">
                  Architecture Highlights
                </h4>
                <div className="space-y-2 bg-black/60 p-4 rounded-2xl border border-white/[0.08]">
                  {selectedProject.highlightKeys.map((hk, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-silver-mist">
                      <Check className="w-4 h-4 text-saffron-spark shrink-0 mt-0.5" />
                      <span>{t(hk)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="text-xs font-mono text-ash-gray uppercase tracking-wider mb-2.5">
                  Tech Stack Specifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-mono text-bone-white"
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
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-electric-iris hover:bg-electric-iris-hover text-white font-medium text-xs uppercase tracking-[0.025em] transition-colors min-h-[44px]"
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

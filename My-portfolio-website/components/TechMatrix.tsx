'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Cpu, Server, Database, Workflow, Layout } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Discipline {
  id: string;
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  icon: typeof Server;
  highlights: string[];
}

function DisciplineCard({
  discipline,
  index,
}: {
  discipline: Discipline;
  index: number;
}) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Fast resolution scroll curve: resolves fully at start 65% (entering reading zone)
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

  const IconComp = discipline.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
        filter,
        willChange: 'transform, filter, opacity',
      }}
      whileHover={{ scale: 1.01 }}
      className="group relative rounded-3xl backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 p-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Dynamic Light Refraction Glow linked to active reading focus */}
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-0 rounded-3xl border border-white/30 pointer-events-none transition-opacity"
      />

      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4FF00]/5 rounded-full blur-3xl group-hover:bg-[#D4FF00]/10 transition-all duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:border-[#D4FF00]/40 transition-colors">
            <IconComp className="w-6 h-6 text-[#D4FF00]" />
          </div>
          <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.05] px-3 py-1 rounded-full border border-white/10">
            CORE DOMAIN
          </span>
        </div>

        <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-[#D4FF00] transition-colors mb-1">
          {t(discipline.titleKey)}
        </h3>
        <p className="text-xs font-mono text-zinc-400 mb-4">{t(discipline.subtitleKey)}</p>

        <p className="text-zinc-300 text-sm leading-relaxed mb-6">
          {t(discipline.descKey)}
        </p>
      </div>

      {/* Highlights List */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
        {discipline.highlights.map((h) => (
          <span
            key={h}
            className="text-xs font-mono text-zinc-300 bg-black/40 px-3 py-1 rounded-lg border border-white/[0.08] group-hover:border-white/20 transition-colors"
          >
            {h}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function TechMatrix() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const disciplines: Discipline[] = [
    {
      id: 'system-design',
      titleKey: 'disciplines.d1.title',
      subtitleKey: 'disciplines.d1.sub',
      descKey: 'disciplines.d1.desc',
      icon: Server,
      highlights: ['Decoupled Services', 'REST & GraphQL APIs', 'Fault Tolerance', 'Asynchronous Queues'],
    },
    {
      id: 'database-engineering',
      titleKey: 'disciplines.d2.title',
      subtitleKey: 'disciplines.d2.sub',
      descKey: 'disciplines.d2.desc',
      icon: Database,
      highlights: ['Relational Schema Design', 'Query Tuning & Indexing', 'ACID Transactions', 'CDN Cache Storage'],
    },
    {
      id: 'workflow-automation',
      titleKey: 'disciplines.d3.title',
      subtitleKey: 'disciplines.d3.sub',
      descKey: 'disciplines.d3.desc',
      icon: Workflow,
      highlights: ['Automated Background Jobs', 'Webhook Integration', 'CI/CD Pipelines', 'Custom Integration Engines'],
    },
    {
      id: 'modern-frontend',
      titleKey: 'disciplines.d4.title',
      subtitleKey: 'disciplines.d4.sub',
      descKey: 'disciplines.d4.desc',
      icon: Layout,
      highlights: ['Interactive Interfaces', 'Fluid Motion Physics', 'Client-Side State', 'Zero CLS & A11y'],
    },
  ];

  return (
    <section ref={sectionRef} id="disciplines" className="py-24 relative bg-[#070709] overflow-hidden">
      {/* Background Parallax Light Orb */}
      <motion.div
        style={{ y: orbY }}
        className="absolute top-1/2 right-10 w-[550px] h-[550px] mesh-orb-2 pointer-events-none opacity-15"
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
            <Cpu className="w-4 h-4 text-[#D4FF00]" />
            <span className="text-xs font-mono text-[#D4FF00] tracking-widest uppercase">
              {t('disciplines.badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            {t('disciplines.heading')}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-2xl">
            {t('disciplines.subheading')}
          </p>
        </motion.div>

        {/* 4-Card Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {disciplines.map((discipline, idx) => (
            <DisciplineCard key={discipline.id} discipline={discipline} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

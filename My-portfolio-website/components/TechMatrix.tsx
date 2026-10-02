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
}: {
  discipline: Discipline;
  index: number;
}) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Fast resolution scroll curve: reaches 100% scale and sharp focus at start 65%
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
      whileHover={{ scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 p-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Ambient Diffused Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-electric-iris/5 rounded-full blur-3xl group-hover:bg-electric-iris/10 transition-all duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:border-electric-iris/40 transition-colors">
            <IconComp className="w-6 h-6 text-electric-iris" />
          </div>
          <span className="text-[10px] font-mono text-ash-gray bg-white/[0.04] px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
            CORE DOMAIN
          </span>
        </div>

        <h3 className="text-2xl font-normal tracking-[-0.03em] text-bone-white group-hover:text-electric-iris transition-colors mb-1">
          {t(discipline.titleKey)}
        </h3>
        <p className="text-xs font-mono text-ash-gray mb-4">{t(discipline.subtitleKey)}</p>

        <p className="text-silver-mist text-sm leading-relaxed mb-6 font-light">
          {t(discipline.descKey)}
        </p>
      </div>

      {/* Highlights */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
        {discipline.highlights.map((h) => (
          <span
            key={h}
            className="text-xs font-mono text-silver-mist bg-black/60 px-3 py-1 rounded-lg border border-white/[0.08] group-hover:border-white/20 transition-colors"
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

  const orbY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const disciplines: Discipline[] = [
    {
      id: 'system-design',
      titleKey: 'disciplines.d1.title',
      subtitleKey: 'disciplines.d1.sub',
      descKey: 'disciplines.d1.desc',
      icon: Server,
      highlights: ['Decoupled Microservices', 'RESTful APIs', 'Fault Tolerance', 'Event Queues'],
    },
    {
      id: 'database-engineering',
      titleKey: 'disciplines.d2.title',
      subtitleKey: 'disciplines.d2.sub',
      descKey: 'disciplines.d2.desc',
      icon: Database,
      highlights: ['Relational Schema Design', 'Query Tuning & Indexing', 'ACID Compliance', 'CDN Caching'],
    },
    {
      id: 'workflow-automation',
      titleKey: 'disciplines.d3.title',
      subtitleKey: 'disciplines.d3.sub',
      descKey: 'disciplines.d3.desc',
      icon: Workflow,
      highlights: ['Automated Background Jobs', 'Webhook Integration', 'CI/CD Pipelines', 'Integration Engines'],
    },
    {
      id: 'modern-frontend',
      titleKey: 'disciplines.d4.title',
      subtitleKey: 'disciplines.d4.sub',
      descKey: 'disciplines.d4.desc',
      icon: Layout,
      highlights: ['Interactive Interfaces', 'Fluid Motion Physics', 'Client State', 'Zero CLS & A11y'],
    },
  ];

  return (
    <section ref={sectionRef} id="disciplines" className="py-24 relative bg-black overflow-hidden">
      {/* Ambient Parallax Orb */}
      <motion.div
        style={{ y: orbY }}
        className="absolute top-1/2 right-10 w-[550px] h-[550px] mesh-orb-2 pointer-events-none opacity-20"
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
            <Cpu className="w-4 h-4 text-electric-iris" />
            <span className="text-xs font-mono text-saffron-spark tracking-widest uppercase">
              {t('disciplines.badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-bone-white tracking-[-0.04em]">
            {t('disciplines.heading')}
          </h2>
          <p className="text-silver-mist text-sm sm:text-base mt-3 max-w-2xl font-light">
            {t('disciplines.subheading')}
          </p>
        </motion.div>

        {/* 4 Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {disciplines.map((discipline, idx) => (
            <DisciplineCard key={discipline.id} discipline={discipline} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

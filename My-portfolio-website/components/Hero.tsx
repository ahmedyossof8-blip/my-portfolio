'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax Scroll Velocity Offsets
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={heroRef} className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#070709]">
      {/* Background Mesh Light Orbs with Scroll Parallax */}
      <motion.div
        style={{ y: orbY1 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] mesh-orb-1 pointer-events-none opacity-20"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="absolute bottom-10 right-10 w-[550px] h-[550px] mesh-orb-2 pointer-events-none opacity-15"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs with Parallax */}
          <motion.div
            style={{ y: heroTextY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Display Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 text-zinc-100"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
                {t('hero.h1')}
              </span>{' '}
              <span className="relative inline-block text-[#D4FF00]">
                {t('hero.hAccent')}
              </span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-400">
                {t('hero.h2')}
              </span>
            </motion.h1>

            {/* Bio Statement */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl mb-10"
            >
              {t('hero.bio')}
            </motion.p>

            {/* Action CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <a
                href="#works"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-[#D4FF00] text-zinc-950 font-bold text-sm tracking-wide hover:bg-[#c4ee00] transition-all shadow-[0_0_30px_rgba(212,255,0,0.3)] hover:shadow-[0_0_40px_rgba(212,255,0,0.5)] active:scale-95 min-h-[44px]"
              >
                <span>{t('hero.ctaWorks')}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl glass-button text-zinc-200 hover:text-white text-sm font-mono transition-all active:scale-95 min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-[#D4FF00]" />
                <span>{t('hero.ctaContact')}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Creative Liquid Glass Portrait Showcase */}
          <motion.div
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ y: -6, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl border border-white/15 backdrop-blur-xl bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-3 overflow-hidden group"
            >
              {/* Inner Image Container */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-950">
                <Image
                  src="/pic/1785639772159.jpg"
                  alt="Ahmed Yossof"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                  className="object-cover object-center filter grayscale-[15%] contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />

                {/* Bottom Fade Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
              </div>

              {/* Corner Glass Micro-Pill Badge */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl backdrop-blur-2xl bg-zinc-950/80 border border-white/15 text-xs font-mono text-zinc-200 shadow-2xl">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                  <span>{t('hero.badge')}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

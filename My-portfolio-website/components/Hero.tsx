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

  // Subtle Parallax Scroll Offsets
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -12]);

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
    <section ref={heroRef} className="relative min-h-[88vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#09090b]">
      {/* Ambient Ultra-Subtle Gradient Wash */}
      <motion.div
        style={{ y: orbY1 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] mesh-orb-1 pointer-events-none opacity-20"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="absolute bottom-10 right-10 w-[500px] h-[500px] mesh-orb-2 pointer-events-none opacity-15"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Asymmetric 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Typography & High-Impact Statement */}
          <motion.div
            style={{ y: heroTextY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Display Heading — Dala Monolithic Scale & Negative Tracking */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.04em] leading-[1.05] mb-8 text-bone-white"
            >
              <span>{t('hero.h1')}</span>{' '}
              <span className="text-electric-iris font-normal">
                {t('hero.hAccent')}
              </span>{' '}
              <span className="text-bone-white">
                {t('hero.h2')}
              </span>
            </motion.h1>

            {/* Engineering Bio Statement */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-silver-mist font-light leading-relaxed max-w-2xl mb-10"
            >
              {t('hero.bio')}
            </motion.p>

            {/* Action CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <a
                href="#works"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric-iris text-white font-medium text-xs uppercase tracking-[0.025em] hover:bg-electric-iris-hover transition-all shadow-[0_0_25px_rgba(128,82,255,0.35)] hover:shadow-[0_0_40px_rgba(128,82,255,0.6)] active:scale-95 min-h-[46px]"
              >
                <span>{t('hero.ctaWorks')}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full glass-button text-bone-white hover:text-saffron-spark text-xs font-mono transition-all active:scale-95 min-h-[46px]"
              >
                <Sparkles className="w-4 h-4 text-saffron-spark" />
                <span>{t('hero.ctaContact')}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Bespoke Dala Curved Frame Portrait */}
          <motion.div
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 0.8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl border border-white/[0.07] backdrop-blur-2xl bg-white/[0.02] shadow-2xl shadow-black/60 p-3 overflow-hidden group"
            >
              {/* Inner Portrait Container */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#09090b]">
                <Image
                  src="/pic/1785639772159.jpg"
                  alt="Ahmed Yossof"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                  className="object-cover object-center filter contrast-[1.05] group-hover:scale-105 transition-all duration-700"
                />

                {/* Subtle Mask Gradient blending into background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/20 to-transparent opacity-90" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.07] rounded-2xl pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
